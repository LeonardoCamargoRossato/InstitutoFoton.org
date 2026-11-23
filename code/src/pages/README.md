# Espelho navegável do site

As pastas seguem a ordem visual do menu. Dentro de cada página, arquivos `1A`, `2A`, `2B` etc. descrevem as áreas reais com rota, IDs das seções, componentes, fontes de conteúdo e assets. `PAGE.ts` funciona como índice de código da página.

1. `01-home`
2. `02-instituto`
3. `03-parceiros`
4. `04-pesquisa`
5. `05-manifesto`
6. `06-noticias`
7. `07-apoie`
8. `08-auxiliares`

## Onde alterar

- Ordem, nome e âncora: `content/siteStructure.ts`.
- Cards: `content/siteCards.ts` e `content/MAPA_SECOES_E_CARDS.md`.
- Equipe: `content/instituteTeam.ts`; apresentação exclusiva em `02-instituto/sections/`.
- Parceiros: catálogos `content/partners*` e `content/partnerAssets.ts`.
- Notícias: catálogos em `content/`; adaptações exclusivas em `06-noticias/sections/`.
- Componentes reutilizáveis: `components/`; assets publicados: `public/assets/`.

Uma seção exclusiva pode morar na página. Tudo que tenha vários consumidores ou comportamento transversal permanece compartilhado. Não criar pastas vazias, cópias paralelas nem segunda fonte de verdade.
