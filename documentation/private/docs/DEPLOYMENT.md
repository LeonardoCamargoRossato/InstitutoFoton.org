# Publicação estática — GitHub Pages

Repositório: `LeonardoCamargoRossato/InstitutoFoton.org`. Aplicação: `code/`.

O workflow `.github/workflows/deploy-pages.yml` executa Node, instalação de dependências, scanner de segredos, validação da documentação, Prettier, TypeScript, lint, testes, build, auditoria de assets, auditoria de artefato e Playwright antes de publicar o diretório `dist/`.

1. Implementar em branch própria, abrir PR, solicitar Auditor Quality & Security independente e aprovação humana antes do merge.
2. Conferir `Settings → Pages → Source: GitHub Actions`; não alterar domínio nem DNS sem autorização.
3. Validar a partir de `code/`: `npm ci`, `npm run scan:secrets`, `npm run docs:check`, `npm run format:check`, `npm run check`, `npm run assets:verify`, `npm run artifact:check` e `npm run test:e2e`.
4. Após aprovação, integrar a `main` e confirmar o resultado do workflow, imagens, PDF, rotas, refresh e responsividade.
5. Publicar **somente `dist/`**. Não há cliente de banco, seed, migração ou segredo de backend no build.

Site oficial no Pages: https://leonardocamargorossato.github.io/InstitutoFoton.org/

`VITE_BASE_PATH` controla basename/assets e `VITE_SITE_ORIGIN` controla origem pública/canonical. O fallback de rota profunda em Pages pode inicialmente responder HTTP 404, embora a SPA restaure a navegação.

Rollback: reverter a integração na `main` ou restaurar o artefato anteriormente aprovado, sem alterar DNS.
