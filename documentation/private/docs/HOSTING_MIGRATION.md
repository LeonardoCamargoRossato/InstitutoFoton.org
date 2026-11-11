# Migração para hospedagem institucional

O backend continua no Supabase `.org`. A migração do frontend não requer copiar bancos, chaves privadas ou usuários.

1. Prepare hosting HTTPS com rewrite das rotas desconhecidas para `index.html`, suporte a `.mjs` do worker PDF, compressão e cache. Não reescrever assets inexistentes para HTML.
2. Compile com origem real e `VITE_BASE_PATH=/`: `VITE_BASE_PATH=/ VITE_SITE_ORIGIN=https://DOMINIO-APROVADO npm run build`, mantendo as variáveis públicas do mesmo Supabase.
3. Envie somente `dist/` ao diretório público. Guarde o artefato anterior para rollback. Não publique `.env`, diretório fonte ou referências privadas.
4. Configure headers: CSP compatível com worker PDF local e conexões Supabase, `X-Content-Type-Options: nosniff`, política de referrer e permissões. Valide sem desabilitar TLS. Use cache longo para assets com hash; HTML/documentos revogáveis precisam de política de atualização.
5. Atualize Site URL e Redirect URLs de Supabase para a origem nova e `/auth/callback`; preserve callback Google → Supabase já existente. Revise CORS/allowlists necessários.
6. Teste rotas diretas, 404 real para assets ausentes, navegação, login/logout, permissão por papel, PDF, PNG e Storage privado. Atualize canonical/sitemap/OG.
7. DNS somente com autorização explícita. Preserve registros de email. Nenhum DNS foi alterado nesta execução.
8. Faça rollback do artefato e redirects se os testes falharem; nunca redefina o banco para resolver problemas de hosting.

SEO futuro pode usar pré-renderização/SSR para metadados individuais visíveis a crawlers sem JS. Trocar hosting não torna JS cliente secreto; segurança continua dependendo de Auth/RLS/Storage.
