-- Novo projeto .org somente: qvyrromhazssofombhem.
-- Nenhuma migration do site comercial é reutilizada. Reexecutável e não destrutiva.
begin;

create table if not exists public.site_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null check (role in ('director','marketing')),
  status text not null default 'pending' check (status in ('active','revoked','pending')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id), revoked_at timestamptz
);

create table if not exists public.site_content_blocks (
  id uuid primary key default gen_random_uuid(), key text not null unique,
  title text not null, content text not null, locale text not null default 'pt-BR',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  source_reference text not null, version integer not null default 1,
  last_reviewed_at timestamptz, published_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.site_research_lines (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  title text not null, summary text not null, description text not null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  display_order integer not null default 0, is_emerging boolean not null default false,
  source_reference text not null, updated_at timestamptz not null default now()
);

create table if not exists public.site_projects (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  name text not null, research_line_id uuid references public.site_research_lines(id),
  summary text not null, description text not null, partner_organizations text[] not null default '{}',
  association_type text not null, public_status text not null default 'draft' check (public_status in ('draft','published','archived')),
  source_reference text not null, funding_enabled boolean not null default false check (funding_enabled = false),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_publications (
  id uuid primary key default gen_random_uuid(), slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  type text not null check (type in ('blog','news','press')), title text not null,
  summary text not null, body text not null default '', category text not null,
  author_display_name text, source_name text, source_url text check (source_url is null or source_url ~ '^https://'),
  source_id text, source_reference text not null,
  main_image_path text, locale text not null default 'pt-BR',
  status text not null default 'draft' check (status in ('draft','in_review','approved','published','archived')),
  published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (source_reference, source_id),
  check (status <> 'published' or (published_at is not null and (type = 'press' and source_url is not null or type <> 'press' and length(trim(body)) > 0)))
);
create index if not exists site_publications_public_idx on public.site_publications(status, locale, published_at desc, id);
alter table public.site_publications add column if not exists search_document tsvector
  generated always as (to_tsvector('portuguese', coalesce(title,'') || ' ' || coalesce(summary,''))) stored;
create index if not exists site_publications_search_idx on public.site_publications using gin(search_document);

create table if not exists public.site_partners (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  name text not null, type text not null, summary text not null,
  website_url text check (website_url is null or website_url ~ '^https://'), logo_path text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  display_order integer not null default 0, association_description text not null,
  source_reference text not null, updated_at timestamptz not null default now()
);

create table if not exists public.site_documents (
  id uuid primary key default gen_random_uuid(), title text not null,
  category text not null, description text not null,
  storage_bucket text not null check (storage_bucket in ('foton-public-documents','foton-private-documents')),
  storage_path text not null check (storage_path !~ '(^|/)\.\.(/|$)'),
  version_label text not null, is_public boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz, document_date date, reviewed_by uuid references auth.users(id),
  allow_page_export boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  source_reference text not null, unique(storage_bucket, storage_path),
  check (not is_public or storage_bucket = 'foton-public-documents'),
  check (is_public or storage_bucket = 'foton-private-documents'),
  check (status <> 'published' or published_at is not null)
);
create index if not exists site_documents_public_idx on public.site_documents(status, is_public, category);

create table if not exists public.site_metrics (
  id uuid primary key default gen_random_uuid(), metric_key text not null unique,
  display_label text not null, value_text text not null, period_label text not null,
  source_reference text not null, as_of_date date not null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  description text not null, display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_support_modalities (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  title text not null, summary text not null, description text not null,
  purpose text not null, transparency_text text not null,
  operational_status text not null default 'informational' check (operational_status in ('informational','coming_soon')),
  public_status text not null default 'draft' check (public_status in ('draft','published','archived')),
  display_order integer not null default 0, updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key, value jsonb not null,
  visibility text not null default 'private' check (visibility in ('public','private')),
  updated_at timestamptz not null default now(), updated_by uuid references auth.users(id)
);

create table if not exists public.site_audit_events (
  id uuid primary key default gen_random_uuid(), actor_user_id uuid,
  action text not null, entity_type text not null, entity_id text,
  metadata_redacted jsonb not null default '{}', created_at timestamptz not null default now()
);

-- SECURITY DEFINER evita recursão da policy de membership; não expõe identidades.
create or replace function public.site_is_director()
returns boolean language sql stable security definer set search_path = pg_catalog, public
as $$ select exists(select 1 from public.site_memberships where user_id = auth.uid() and role = 'director' and status = 'active'); $$;
revoke all on function public.site_is_director() from public;
grant execute on function public.site_is_director() to anon, authenticated;

create or replace function public.site_touch_updated_at()
returns trigger language plpgsql set search_path = pg_catalog, public
as $$ begin new.updated_at = now(); return new; end; $$;
revoke all on function public.site_touch_updated_at() from public;

create or replace function public.site_audit_change()
returns trigger language plpgsql security definer set search_path = pg_catalog, public
as $$
declare row_data jsonb;
begin
  if TG_OP = 'DELETE' then row_data := to_jsonb(old); else row_data := to_jsonb(new); end if;
  insert into public.site_audit_events(actor_user_id,action,entity_type,entity_id,metadata_redacted)
  values (auth.uid(),TG_OP,TG_TABLE_NAME,coalesce(row_data->>'id',row_data->>'key'),'{}'::jsonb);
  if TG_OP = 'DELETE' then return old; else return new; end if;
end; $$;
revoke all on function public.site_audit_change() from public;

do $$
declare tab text;
begin
  foreach tab in array array['site_memberships','site_content_blocks','site_research_lines','site_projects','site_publications','site_partners','site_documents','site_metrics','site_support_modalities','site_settings','site_audit_events'] loop
    execute format('alter table public.%I enable row level security', tab);
    execute format('revoke all on public.%I from anon, authenticated', tab);
    execute format('grant select on public.%I to anon, authenticated', tab);
    -- V0: nenhuma escrita por clientes, mesmo se o frontend for manipulado.
    if tab <> 'site_audit_events' then
      execute format('drop trigger if exists site_touch on public.%I',tab);
      execute format('create trigger site_touch before update on public.%I for each row execute function public.site_touch_updated_at()',tab);
      execute format('drop trigger if exists site_audit on public.%I',tab);
      execute format('create trigger site_audit after insert or update or delete on public.%I for each row execute function public.site_audit_change()',tab);
    end if;
  end loop;
  foreach tab in array array['site_content_blocks','site_research_lines','site_publications','site_partners','site_metrics'] loop
    execute format('drop policy if exists site_public_read on public.%I',tab);
    execute format('create policy site_public_read on public.%I for select to anon, authenticated using (status = ''published'' %s)',tab,case when tab='site_publications' then 'and published_at <= now()' else '' end);
  end loop;
end; $$;

drop policy if exists site_membership_read on public.site_memberships;
create policy site_membership_read on public.site_memberships for select to authenticated using (user_id = auth.uid() or public.site_is_director());
drop policy if exists site_document_read on public.site_documents;
create policy site_document_read on public.site_documents for select to anon, authenticated using ((is_public and status='published' and published_at <= now()) or public.site_is_director());
drop policy if exists site_project_read on public.site_projects;
create policy site_project_read on public.site_projects for select to anon, authenticated using (public_status='published');
drop policy if exists site_support_read on public.site_support_modalities;
create policy site_support_read on public.site_support_modalities for select to anon, authenticated using (public_status='published');
drop policy if exists site_setting_read on public.site_settings;
create policy site_setting_read on public.site_settings for select to anon, authenticated using (visibility='public' or public.site_is_director());
drop policy if exists site_audit_read on public.site_audit_events;
create policy site_audit_read on public.site_audit_events for select to authenticated using (public.site_is_director());

-- Administração de papéis: identidade sempre obtida de auth.uid(), com auditoria.
create or replace function public.site_set_membership(target_user_id uuid, new_role text, new_status text)
returns void language plpgsql security definer set search_path = pg_catalog, public
as $$
begin
  -- Serializa alterações e protege o último diretor ativo.
  perform pg_advisory_xact_lock(71005001);
  if not public.site_is_director() then raise exception 'Acesso negado' using errcode='42501'; end if;
  if new_role not in ('director','marketing') or new_status not in ('active','revoked','pending') then raise exception 'Papel ou status inválido'; end if;
  if exists(select 1 from public.site_memberships where user_id=target_user_id and role='director' and status='active')
    and (new_role <> 'director' or new_status <> 'active')
    and (select count(*) from public.site_memberships where role='director' and status='active') <= 1
  then raise exception 'Preserve ao menos um diretor ativo'; end if;
  insert into public.site_memberships(user_id,role,status,created_by,revoked_at)
  values(target_user_id,new_role,new_status,auth.uid(),case when new_status='revoked' then now() end)
  on conflict(user_id) do update set role=excluded.role,status=excluded.status,revoked_at=excluded.revoked_at;
end; $$;
revoke all on function public.site_set_membership(uuid,text,text) from public, anon;
grant execute on function public.site_set_membership(uuid,text,text) to authenticated;

-- Buckets públicos recebem apenas arquivos aprovados via provisionamento confiável.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
('foton-public-media','foton-public-media',true,10485760,array['image/png','image/jpeg','image/webp','image/avif']),
('foton-public-documents','foton-public-documents',true,20971520,array['application/pdf']),
('foton-private-documents','foton-private-documents',false,20971520,array['application/pdf'])
on conflict(id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists foton_public_object_read on storage.objects;
create policy foton_public_object_read on storage.objects for select to anon, authenticated
using (bucket_id in ('foton-public-media','foton-public-documents'));
drop policy if exists foton_private_object_read on storage.objects;
create policy foton_private_object_read on storage.objects for select to authenticated
using (bucket_id='foton-private-documents' and public.site_is_director());
-- Sem policies de INSERT/UPDATE/DELETE: uploads de cliente são negados na V0.
commit;
