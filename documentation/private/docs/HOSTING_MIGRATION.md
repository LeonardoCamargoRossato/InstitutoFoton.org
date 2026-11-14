# Migração para hospedagem institucional — aplicação estática

O portal atual não possui backend, contas ou credenciais para migrar. Transferir exclusivamente o build público.

1. Preparar HTTPS e rewrite de rotas da SPA para `index.html`; não redirecionar arquivos inexistentes de `assets/` e `documents/` para HTML.
2. Executar em `code/`: `npm ci` e `VITE_BASE_PATH=/ VITE_SITE_ORIGIN=https://DOMINIO-APROVADO npm run build`.
3. Transferir somente `dist/`, mantendo o artefato anterior para rollback. Nunca copiar testes, inventários, scripts ou arquivos-fonte.
4. Configurar compressão, MIME, worker do PDF, políticas de cache, CSP, política de referrer, TLS e `X-Content-Type-Options`.
5. Testar rotas diretas, 404 de arquivos ausentes, 31 SVGs, PNG/WebP, PDF, animação, responsividade, SEO, navegação e acessibilidade.
6. Alterar DNS apenas com autorização, preservando os registros de e-mail.
7. Se houver falha, reverter artefato e rewrite.

Qualquer integração futura de API, autenticação ou banco deve ter escopo e auditoria independentes.
