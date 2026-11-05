# Publicação no GitHub Pages

Repositório solicitado: `LeonardoCamargoRossato/InstitutoFoton.org`. O repositório remoto estava sem refs na inspeção inicial. A branch de trabalho local era `work`, sem commits.

O workflow `deploy-pages.yml` roda em `main`: Node 24, npm ci, types/lint/testes/build, Playwright, upload do dist e deploy Pages. O job de deploy tem `pages: write`/`id-token: write`; build possui apenas `contents: read`.

1. Em Settings → Pages do repositório, confirme Source **GitHub Actions**. Nenhum domínio próprio ou DNS é alterado.
2. Confirme os secrets `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` do projeto **.org**. A especificação informa que já existem, mas sua presença não foi verificada pela API nesta execução.
3. Envie a implementação para `main` e acompanhe o workflow. Build não aplica SQL nem configura OAuth.
4. Abra a URL retornada por Pages e teste início, rotas profundas, refresh, PDF e callback.

Endereço esperado, **não uma comprovação de publicação**: `https://leonardocamargorossato.github.io/InstitutoFoton.org/`. Não informar esse endereço como site no ar sem acesso HTTP e verificação da aplicação.

O proxy do ambiente permitiu leitura Git mas bloqueou `api.github.com`, o site comercial e o host Pages com CONNECT 403. Destinos necessários foram salvos no rascunho das configurações do ambiente; salvar rascunho não altera o acesso de rede em execução nem publica o site. O usuário deve revisar/salvar as configurações e publicar o ambiente quando indicado pela plataforma para ativar a configuração. Depois revalidar as operações, sem presumir permissão de API a partir de Git read.

Roteamento Pages: o `404.html` leva para `index` preservando caminho, query e hash. O script de index restaura URL limpa antes de React/Supabase; callback OAuth não usa o hash como navegação. A primeira resposta de rota profunda continua 404 por limitação do Pages, embora o navegador finalize no aplicativo. No hosting futuro configure rewrite de SPA.

`VITE_SITE_ORIGIN` determina canonical/sitemap/OG; `VITE_BASE_PATH` determina assets e basename. Sem origem configurada, nenhum domínio futuro é inventado. Não configure `CNAME` antes de autorização de DNS.
