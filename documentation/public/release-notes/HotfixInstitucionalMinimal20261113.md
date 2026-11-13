# Hotfix institucional — Menos é Mais (13/11/2026)

## Contexto e escopo
Briefing institucional fornecido pelo responsável em 13/11/2026, com descrição página a página de **Apresentação_Institucional_Foton_2026 09 10.pdf**, documento público também disponível no portal em /apresentacao. O Google Drive localizou o arquivo de referência; a extração textual pelo conector devolveu conteúdo vazio. As sete páginas foram interpretadas **pelo conteúdo explicitamente transcrito no briefing**. A revisão visual independente do PDF original permanece como gate editorial.

Branch: \`hotfix/foton-institucional-minimal\`, baseada na refatoração estática \`refactor/foton-static-no-supabase-20261112\` (PR #6 ainda não integrado à main). Não modificar main nem publicar na Hostinger.

## Home — seis blocos
1. Hero sem fotografia gerada por IA: propósito institucional da página 3 do briefing, azul Foton e arte orbital leve em CSS.
2. Por que o Foton existe: propósito, educação, inteligência estratégica, ciência aplicada e potenciais aplicações, sem alegar entregas.
3. Ecossistema: 15 estados e 140+ membros identificados como **setembro de 2026** (página 4), sem prometer atualização em tempo real ou parcerias contratuais.
4. Quatro frentes/programas mencionados em setembro de 2026 (página 6), com status atual pendente de confirmação.
5. Link para o PDF público da apresentação.
6. Contato por canais já existentes.

Removidos da Home: \`HumanMosaic\`, \`manifesto-feature\`, \`values-strip\`, \`human-story-section\`, \`home-legacy-section\`, \`journey-feature\`, \`LatestNews\`, \`TechnicalVisitSpotlight\`, \`SupportCTA\`. Não se removeu a página Manifesto, as cartas, as visitas ou o PDF.

## Páginas internas
- **O Instituto:** fotos fictícias e redundâncias removidas; percurso luminoso até a palavra fóton mantido e ancorado por seletor semântico estável; histórico formal datado não corroborado ficou pendente de revisão.
- **Pesquisa:** cinco áreas editoriais preservadas, sem alegar laboratórios próprios. Explicita divergência com as seis linhas temáticas da apresentação de setembro de 2026.
- **Jornada:** propósito institucional, status de inscrições/bolsas não presumido; sem personagens de IA ou fluxo hipotético.
- **Apoie a Ciência:** sete modalidades e simulações de Pix removidas; somente propósito, contato e transparência.
- **Manifesto:** material documental aprovado preservado, inclusive 20 visitas técnicas com preview WebP e PNG para zoom. Texto de descrição revisto para não presumir vigência de chamada histórica.
- **Transparência:** foto de IA removida; categorias e PDF aprovados preservados.
- **Notícias:** estado vazio simples até importação de conteúdo real aprovado.
- **Contato:** os canais já publicados foram preservados sem criar novos meios, formulário ou pagamentos.
- **Privacidade:** texto atualizado para descrever autenticação temporariamente desativada no frontend estático.

## Pendências e critérios de revisão
- Acessibilidade, responsividade, contraste e inspeção visual mobile/desktop devem passar no CI/Playwright.
- O conteúdo das sete páginas da apresentação deve ser revisado visualmente por um Auditor independente antes de publicação.
- Confirmar vigência de cargos, programas, parcerias, indicadores atuais, fundação e canais de contato antes de divulgar dados novos.
- Sem alterações no domínio, main, Hostinger, autenticação ou Supabase.
- GitHub Actions executa checks automatizados; homologação local exige \`npm ci\` e \`npm run dev\` no diretório \`code/\`.

## Comandos para homologação no Linux Mint
\`\`\`bash
cd "$HOME/Documents/Apps_LEO/Foton Site .org/Projeto Site Foton GitHub"
git fetch origin
git switch --track origin/hotfix/foton-institucional-minimal
cd code
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
\`\`\`

O navegador do responsável abre **http://localhost:5173/** quando o servidor Vite local estiver iniciado. Esse URL não é hospedado ou acessível remotamente pelo Builder.
