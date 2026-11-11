# Configuração do Supabase dedicado

Projeto previsto na especificação: **SiteInstitutoFoton.org**, ref `qvyrromhazssofombhem`. Não criar outro projeto. Nesta execução não foram fornecidas credenciais de administração Supabase; aplicar em produção e testar Auth/Storage remotos permanecem tarefas externas.

## Aplicação autorizada

1. Abra o Dashboard do projeto correto e confira ref, nome e região. Faça backup dos dados existentes antes de qualquer aplicação. Não executar SQL do site comercial.
2. No SQL Editor administrativo, execute `supabase/migrations/202611050001_site_v0.sql`. Ela cria tabelas, índices, RLS, funções, auditoria e três buckets. Não elimina tabelas ou dados; reexecução preserva conteúdo.
3. Execute `supabase/seed/public-content.sql`. Usa `ON CONFLICT DO NOTHING`; não substitui edições posteriores. Não inclui artigos inventados, usuários ou documentos privados. Regeneração local: `node scripts/generate-seed.mjs` em Node 24.
4. Revise as tabelas e a aba Policies; verifique se não existem policies amplas preexistentes. Os testes locais não conseguem inspecionar esse estado remoto.
5. Em Storage, confirme `foton-public-media` (10 MiB, imagens), `foton-public-documents` (20 MiB, PDF) e `foton-private-documents` (privado, 20 MiB, PDF). Upload administrativo apenas de arquivos aprovados.

Após upload e verificação da apresentação, registre metadados (ajuste `reviewed_by` para UUID real autorizado):

```sql
insert into public.site_documents(title,category,description,storage_bucket,storage_path,version_label,is_public,status,published_at,document_date,allow_page_export,source_reference)
values ('Apresentação institucional Foton','presentation','Apresentação de setembro de 2026',
 'foton-public-documents','apresentacoes/foton-2026-09-10.pdf','2026-09-10',true,'published',now(),'2026-09-10',true,
 'Apresentação_Institucional_Foton_2026 09 10.pdf — fornecida para o portal')
on conflict(storage_bucket,storage_path) do nothing;
```

Confirme primeiro que esse caminho realmente contém o PDF aprovado. O frontend usa fallback local da apresentação fornecida até haver registro remoto válido.

## Auth e papéis

Google deve estar habilitado no projeto existente; não criar cliente novo. Callback Google → Supabase: `https://qvyrromhazssofombhem.supabase.co/auth/v1/callback`.

Site URL após publicação confirmada: origem real do site. Permita o retorno frontend exato `https://leonardocamargorossato.github.io/InstitutoFoton.org/auth/callback` e a versão com `?returnTo=/admin` conforme as regras de glob do Supabase. Para desenvolvimento adicione somente URLs locais explicitamente usadas. Verifique a URL completa emitida pelo cliente e a correspondência da allowlist. Não confundir os dois callbacks.

As pessoas autorizadas precisam autenticar primeiro para existir em `auth.users`. Depois confirme UUID e identidade pelo painel administrativo. Bootstrap do **primeiro Diretor** deve ocorrer exclusivamente no SQL Editor autorizado:

```sql
-- Substitua o placeholder por UUID conferido no painel. Nunca use email do navegador como autoridade.
insert into public.site_memberships(user_id,role,status)
values ('<UUID-CONFIRMADO>'::uuid,'director','active')
on conflict(user_id) do nothing;
```

Depois, um Diretor autorizado pode chamar a RPC `site_set_membership(target_user_id,new_role,new_status)`. Não há tela de edição enganosa na V0. Não copie usuários do banco comercial.

## Testes reais antes de declarar pronto

Use contas autorizadas para quatro perfis: anon, autenticado sem papel, Marketing e Diretor. Repita casos em `tests/rls.test.ts` pela Data API/Storage remotos com JWTs reais. Teste OAuth, refresh, logout, revogação e novo download de arquivo privado após expiração. Nunca registrar tokens. Confirme rascunho e arquivo privado invisíveis a anon/Marketing, inserção direta de membership negada e upload anônimo negado.

## Importação editorial

```sh
npm run import:publications -- /caminho/export-aprovado.json
# Somente em contexto administrativo confiável, com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY seguros:
npm run import:publications -- /caminho/export-aprovado.json --apply
```

Cada registro exige `editorial_approval`, `source_reference`, `source_id`, `slug`, `type`, `title`, `summary`, `category`, `published_at`; artigo exige `body`, imprensa exige `source_url` HTTPS. Dry-run não grava. Importador faz whitelist dos campos e upsert por origem + ID. Slugs únicos impedem colisões silenciosas. Credencial administrativa não participa do build, do Actions público ou do frontend.

## Rollback

Desabilite funcionalidades e revogue memberships quando necessário; mantenha backup e dados. Não há script destrutivo automático de DROP. Em um projeto já com conteúdo, revisão administrativa é obrigatória antes de desfazer schema, revogar divulgação ou retirar objetos públicos. Restaurar backup é operação separada e autorizada.
