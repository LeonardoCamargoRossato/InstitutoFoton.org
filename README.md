# Instituto Foton .org — V0

Portal científico e social do Instituto Foton. React, TypeScript e Vite; backend dedicado Supabase `qvyrromhazssofombhem`. Não utiliza o banco comercial, ResearchFlow ou AnimeFinder.

```sh
cd /workspace/InstitutoFoton.org
npm ci
npm run dev
```

Node 24 foi usado na validação. Cada tarefa cloud já é isolada: use este checkout, sem criar worktrees. Copie `.env.example` para `.env.local` apenas quando houver configuração pública confirmada. O site público abre sem configuração Supabase; consultas editoriais ficam vazias e o acesso institucional fica indisponível de forma explícita.

```sh
npm run check
npx playwright install --with-deps chromium
npm run test:e2e
VITE_BASE_PATH=/InstitutoFoton.org/ VITE_SITE_ORIGIN=https://leonardocamargorossato.github.io npm run build
npm run preview
```

No ambiente cloud com Chromium instalado: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Os testes de navegador exigem um build anterior e o mesmo `VITE_BASE_PATH` usado nele. O build produz `dist/`; o deploy é realizado pelo workflow Pages em pushes para `main`, quando Pages/Actions estão autorizados.

`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` são **públicas**. Actions usa `secrets.*`. Nenhuma chave administrativa deve começar com `VITE_`. Login Google só é operacional após migrations, configuração de OAuth e provisionamento autorizado de memberships. Veja [implantação](docs/DEPLOYMENT.md), [Supabase](docs/SUPABASE_SETUP.md) e [aceite observado](docs/V0_ACCEPTANCE.md).

Rotas: início, instituto, pesquisa/detalhes, jornada, manifesto, notícias/artigo, apresentação, transparência, apoio, contato, privacidade, termos e acesso institucional. Apoio é informativo; não há transações financeiras ou formulários simulados. O CMS operacional é V1.

Fontes e direitos: [inventário](docs/REFERENCE_INVENTORY.md), [validação editorial](docs/CONTENT_VALIDATION.md) e [mídia](docs/MEDIA_MANIFEST.md). O Manual de Marca é referência controlada e não integra o site público. A apresentação fornecida está disponível em PDF independente do bundle; imagens de supostos pesquisadores não foram inventadas.

Responsáveis: desenvolvimento e operação devem ser atribuídos institucionalmente; o código não presume cargos ou contatos pessoais atuais. Mudanças de conteúdo oficial exigem validação da Diretoria/Marketing.
