import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// PostgreSQL real em WASM, com schemas Auth/Storage mínimos. Não é Supabase remoto.
const db = new PGlite();
const users = {
  outsider: '10000000-0000-0000-0000-000000000001',
  marketing: '10000000-0000-0000-0000-000000000002',
  director: '10000000-0000-0000-0000-000000000003',
};
beforeAll(async () => {
  await db.exec(`create role anon; create role authenticated;
    create schema auth; create schema storage;
    create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    grant usage on schema auth, public, storage to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant select,insert,update,delete on storage.objects to anon, authenticated;
    insert into auth.users values ('${users.outsider}'),('${users.marketing}'),('${users.director}');`);
  const migration = await readFile('supabase/migrations/202611050001_site_v0.sql','utf8');
  await db.exec(migration);
  await db.exec(migration); // Reapplication must preserve schema/data.
  const seed = await readFile('supabase/seed/public-content.sql','utf8');
  await db.exec(seed);
  await db.exec(seed);
  await db.exec(`insert into public.site_memberships(user_id,role,status) values ('${users.marketing}','marketing','active'),('${users.director}','director','active');
    insert into public.site_publications(slug,type,title,summary,body,category,status,published_at,source_reference) values
    ('public-test','blog','Public','Summary','Body','Pesquisa','published',now(),'test'),
    ('private-test','blog','Draft','Summary','Body','Pesquisa','draft',null,'test'),
    ('scheduled-test','blog','Future','Summary','Body','Pesquisa','published',now()+interval '1 year','test');
    insert into public.site_documents(title,category,description,storage_bucket,storage_path,version_label,is_public,status,published_at,source_reference) values
    ('Public PDF','presentation','Approved','foton-public-documents','test.pdf','1',true,'published',now(),'test'),
    ('Private PDF','statute','Draft','foton-private-documents','secret.pdf','1',false,'draft',null,'test');
    insert into storage.objects(bucket_id,name) values ('foton-public-documents','test.pdf'),('foton-private-documents','secret.pdf');`);
}, 30000);
afterAll(async () => { await db.close(); });

async function asRole<T>(role: 'anon' | 'authenticated', uid: string | null, sql: string) {
  await db.exec(`set role ${role}; select set_config('request.jwt.claim.sub','${uid || ''}',false);`);
  try { return await db.query<T>(sql); } finally { await db.exec('reset role'); }
}
describe('RLS e permissões executadas no PostgreSQL local', () => {
  it('seed é idempotente e busca textual usa título/resumo sem interpolar SQL', async () => {
    expect((await db.query('select * from public.site_research_lines')).rows).toHaveLength(5);
    expect((await db.query('select * from public.site_support_modalities')).rows).toHaveLength(7);
    expect((await db.query('select * from public.site_metrics')).rows).toHaveLength(2);
    expect((await db.query("select * from public.site_content_blocks where key in ('institute.mission','institute.vision')")).rows).toHaveLength(0);
    expect((await db.query("select slug from public.site_publications where search_document @@ websearch_to_tsquery('portuguese', 'Public')")).rows).toHaveLength(1);
  });
  it('anônimo vê apenas publicação pública e não a agendada', async () => {
    const result = await asRole<{slug:string}>('anon',null,'select slug from public.site_publications');
    expect(result.rows.map(r=>r.slug)).toEqual(['public-test']);
  });
  it('autenticado sem membership não recebe autorização nem documentos privados', async () => {
    expect((await asRole('authenticated',users.outsider,'select * from public.site_memberships')).rows).toHaveLength(0);
    expect((await asRole('authenticated',users.outsider,'select * from public.site_documents')).rows).toHaveLength(1);
    expect((await asRole('authenticated',users.outsider,'select * from public.site_audit_events')).rows).toHaveLength(0);
  });
  it('usuário não consegue se tornar diretor via INSERT ou RPC', async () => {
    await expect(asRole('authenticated',users.outsider,`insert into public.site_memberships(user_id,role,status) values ('${users.outsider}','director','active')`)).rejects.toThrow();
    await expect(asRole('authenticated',users.outsider,`select public.site_set_membership('${users.outsider}','director','active')`)).rejects.toThrow();
  });
  it('marketing vê apenas o próprio papel e não lê nem edita documento privado', async () => {
    expect((await asRole('authenticated',users.marketing,'select * from public.site_memberships')).rows).toHaveLength(1);
    expect((await asRole('authenticated',users.marketing,'select * from public.site_documents')).rows).toHaveLength(1);
    await expect(asRole('authenticated',users.marketing,"update public.site_documents set title='Changed'")).rejects.toThrow();
    await expect(asRole('authenticated',users.marketing,`select public.site_set_membership('${users.marketing}','director','active')`)).rejects.toThrow();
  });
  it('diretor lê documentos privados, memberships e auditoria', async () => {
    expect((await asRole('authenticated',users.director,'select * from public.site_documents')).rows).toHaveLength(2);
    expect((await asRole('authenticated',users.director,'select * from public.site_memberships')).rows).toHaveLength(2);
    expect((await asRole('authenticated',users.director,'select * from public.site_audit_events')).rows.length).toBeGreaterThan(0);
  });
  it('Storage não revela arquivo privado a anônimo/marketing e nega upload', async () => {
    for (const [role,uid] of [['anon',null],['authenticated',users.outsider],['authenticated',users.marketing]] as const) {
      expect((await asRole(role,uid,'select * from storage.objects')).rows).toHaveLength(1);
      await expect(asRole(role,uid,"insert into storage.objects(bucket_id,name) values ('foton-public-media','bad.png')")).rejects.toThrow();
    }
    expect((await asRole('authenticated',users.director,'select * from storage.objects')).rows).toHaveLength(2);
  });
  it('diretor altera membership com auditoria e revogação remove privilégios', async () => {
    await asRole('authenticated',users.director,`select public.site_set_membership('${users.marketing}','director','active')`);
    expect((await asRole('authenticated',users.marketing,'select * from public.site_documents')).rows).toHaveLength(2);
    await asRole('authenticated',users.director,`select public.site_set_membership('${users.marketing}','director','revoked')`);
    expect((await asRole('authenticated',users.marketing,'select * from public.site_documents')).rows).toHaveLength(1);
    await expect(asRole('authenticated',users.marketing,`select public.site_set_membership('${users.outsider}','director','active')`)).rejects.toThrow();
  });
  it('último diretor ativo não pode se revogar e logs não recebem conteúdo ou tokens', async () => {
    await expect(asRole('authenticated',users.director,`select public.site_set_membership('${users.director}','director','revoked')`)).rejects.toThrow();
    const audit = await asRole<{metadata_redacted:object}>('authenticated',users.director,'select metadata_redacted from public.site_audit_events');
    expect(audit.rows.every(row=>JSON.stringify(row.metadata_redacted)==='{}')).toBe(true);
  });
});
