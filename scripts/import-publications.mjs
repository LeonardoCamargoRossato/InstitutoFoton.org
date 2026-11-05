import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

// Executar apenas em máquina administrativa confiável. Nunca chamado pelo build.
const file = process.argv[2];
if (!file)
  throw new Error('Uso: npm run import:publications -- /caminho/export-aprovado.json [--apply]');
const items = JSON.parse(await readFile(file, 'utf8'));
if (!Array.isArray(items)) throw new Error('Esperado um array de publicações aprovadas.');
for (const [index, item] of items.entries()) {
  if (
    !item.editorial_approval ||
    !item.source_reference ||
    !item.source_id ||
    !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.slug || '')
  )
    throw new Error(`Registro ${index}: origem, aprovação e slug obrigatórios`);
  if (
    !['blog', 'news', 'press'].includes(item.type) ||
    !item.title ||
    !item.summary ||
    !item.category ||
    !item.published_at ||
    Number.isNaN(Date.parse(item.published_at))
  )
    throw new Error(`Registro ${index}: campos editoriais inválidos`);
  if (item.type === 'press' ? !/^https:\/\//.test(item.source_url || '') : !item.body?.trim())
    throw new Error(`Registro ${index}: conteúdo/fonte obrigatório`);
}
// Whitelist impede importar usuários, chaves ou campos de infraestrutura.
const fields = [
  'slug',
  'type',
  'title',
  'summary',
  'body',
  'category',
  'author_display_name',
  'source_name',
  'source_url',
  'source_id',
  'source_reference',
  'published_at',
];
const records = items.map((item) => ({
  ...Object.fromEntries(fields.filter((k) => item[k] != null).map((k) => [k, item[k]])),
  locale: 'pt-BR',
  status: 'published',
}));
if (!process.argv.includes('--apply')) {
  console.log(`${records.length} registros validados. Simulação; nada foi gravado.`);
  process.exit(0);
}
if (
  process.env.SUPABASE_URL !== 'https://qwyrnomhazssofombhem.supabase.co' ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
)
  throw new Error('Configure o projeto .org e a credencial administrativa fora do frontend.');
const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const { error } = await client
  .from('site_publications')
  .upsert(records, { onConflict: 'source_reference,source_id' });
if (error)
  throw new Error(
    'Importação não concluída. Revise esquema, conflitos de slug e permissões sem registrar credenciais.',
  );
console.log(`${records.length} registros importados de forma idempotente.`);
