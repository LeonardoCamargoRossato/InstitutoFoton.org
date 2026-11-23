# Mapa técnico das páginas

Esta pasta é o espelho humano da navegação pública. `pageManifest.ts` liga cada rota às seções canônicas de `content/siteStructure.ts`; ele não duplica textos, cards, pessoas, parceiros ou caminhos de assets.

## Onde alterar

- Ordem, nome e âncora: `content/siteStructure.ts`.
- Cards: `content/siteCards.ts` e `content/MAPA_SECOES_E_CARDS.md`.
- Equipe: `content/instituteTeam.ts`; apresentação exclusiva em `instituto/sections/`.
- Parceiros: catálogos `content/partners*` e `content/partnerAssets.ts`.
- Notícias: catálogos em `content/`; adaptações exclusivas em `noticias/sections/`.
- Componentes reutilizáveis: `components/`; assets publicados: `public/assets/`.

Uma seção exclusiva pode morar na página. Tudo que tenha vários consumidores ou comportamento transversal permanece compartilhado. Não criar pastas vazias, cópias paralelas nem segunda fonte de verdade.
