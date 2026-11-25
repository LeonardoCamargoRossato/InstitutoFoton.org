# Checkpoint da reorganização arquitetural — Fase 1

**Projeto:** InstitutoFoton.org  
**Branch:** `refactor/architecture-pages-20261123`  
**Base consolidada:** `main` em `b80dbae3a7028a7a82875b01fdf11f0cb825586b`  
**Data:** 2026-11-23

## Escopo e método

Inventário feito sobre o checkout local, os catálogos `content/siteStructure.ts`, `content/siteCards.ts`, `content/MAPA_SECOES_E_CARDS.md`, as rotas e uma busca global dos importadores. A árvore confirma `app/`, `components/`, `content/`, `features/`, `lib/` e `styles/`; `pages/` ainda não existe. As rotas foram conferidas em `src/main.tsx`.

Não foram alterados arquivos da aplicação, assets, rotas ou conteúdo editorial nesta fase. Componentes sem consumidor confirmado permanecem preservados; não haverá exclusão nesta reorganização.

## Matriz origem → destino → consumidores → risco → status

| Origem                                                                                    | Destino recomendado                                                                           | Consumidores identificados                                                                       | Risco                                                 | Status                                               |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------------- |
| `components/InstitutePurpose.tsx` + CSS                                                   | `pages/02-instituto/sections/`                                                                | `features/PublicPages.tsx` (Institute); reutiliza `components/cards/`                            | Médio: imports, CSS relativo, testes                  | Movido e validado na Fase 3                          |
| `components/InstituteTeamDashboard.tsx` + CSS                                             | `pages/02-instituto/sections/`                                                                | Página Institute; `content/instituteTeam.ts`; cartões e diálogo                                  | Alto: foco/teclado/modal/CSS                          | Movido e validado na Fase 3                          |
| `features/foundation/FoundationHistory.tsx` + CSS                                         | `features/foundation/`                                                                        | Introdução de Fundação em O Instituto e visualização/galeria em Notícias, conforme mapa/catálogo | Alto: responsabilidades e CSS partilhados             | Movido e validado como funcionalidade compartilhada  |
| `components/animations/custom/HomeAtomEntrance.tsx` + `styles/home-atom-entrance.css`     | Biblioteca de animações                                                                       | Home; import CSS global em `main.tsx`                                                            | Alto: eventos, controles, reduced motion e CSS global | Movido e validado; comportamento preservado          |
| `components/animations/custom/PhotonIdentityAnimation.tsx` + `styles/photon-identity.css` | Biblioteca de animações                                                                       | O Instituto; SVG institucional sincronizado                                                      | Alto                                                  | Movido e validado; integridade preservada            |
| `components/animations/custom/Constellation.tsx`                                          | Biblioteca de animações                                                                       | Busca global não encontrou importador direto                                                     | Alto; nenhum descarte                                 | Preservado; uso direto não confirmado                |
| `components/NewsCarousel.tsx`                                                             | `pages/06-noticias/sections/` como adaptador editorial; motor segue em `components/carousel/` | Apenas `features/Publications.tsx`; usa `BaseCarousel` e dados editoriais                        | Médio                                                 | Movido e validado na Fase 3                          |
| `components/viewers/ImageZoomDialog.tsx`                                                  | `components/viewers/`                                                                         | `SiteImageViewer` e componentes/carrossel/galeria                                                | Alto: portal, foco, teclado, fullscreen, download     | Movido e validado; comportamento preservado          |
| `components/viewers/SiteImageViewer.tsx`                                                  | `components/viewers/`                                                                         | Montagem global/layout; seleção delegada por eventos                                             | Alto: seletor global e cobertura da página            | Movido e validado; comportamento preservado          |
| `components/NewsPhotoHighlights.tsx`                                                      | `pages/06-noticias/sections/`                                                                 | Apenas `features/Publications.tsx`; `ImageCard`, dados editoriais, zoom                          | Médio                                                 | Movido e validado na Fase 3                          |
| `components/ui/`                                                                          | `components/ui/`                                                                              | Várias páginas e funcionalidades                                                                 | Médio/alto: muitos imports; não alterar aparência     | Organizado e validado com API pública preservada     |
| `content/siteStructure.ts`, `siteCards.ts`, `MAPA_SECOES_E_CARDS.md`                      | Permanecem fonte canônica referenciada por `pages/`                                           | Rotas, seções, cards e documentação LCR                                                          | Alto se duplicados                                    | Fonte canônica existente; não duplicar               |
| `content/partnerAssets.ts` e catálogo de equipe/notícias                                  | Permanecem em `content/` ou domínio compartilhado existente                                   | Parceiros, equipe, notícias e galerias                                                           | Alto se duplicados                                    | Catálogos únicos; páginas apenas apontarão para eles |
| `features/PublicPages.tsx`, `ResearchPages.tsx`, `Publications.tsx`, etc.                 | Permanecem como implementações atuais até etapa própria                                       | Rotas declaradas em `main.tsx`                                                                   | Alto                                                  | Não reescrever nesta migração                        |
| `public/assets/**`                                                                        | Sem movimentação                                                                              | Referências por catálogo/helpers e componentes                                                   | Muito alto                                            | Fora do escopo; preservar                            |

## Rotas verificadas

Rotas públicas atuais incluem Home (`/`), `/instituto`, `/pesquisa`, `/parceiros`, `/pesquisa/jornada`, `/pesquisa/haquantum`, `/pesquisa/:slug`, `/manifesto`, `/apoie`, `/noticias`, `/redes-sociais` e auxiliares `/apresentacao`, `/contato`, `/entrar`, `/auth/callback`, `/admin/*`, `/privacidade`, `/termos`. `/transparencia` não está roteada; não criar nem anunciar rota nesta reorganização.

## Dependências e validações

- **LCR_ASSET_ORGANIZATION_STANDARD:** consultado no Google Drive em 23/11/2026. Aplicam-se: hierarquia orientada ao produto sem diretórios vazios, kebab-case técnico, catálogos únicos, migração incremental, preservação de compartilhados e validação antes de remoção.
- **Busca global/import graph:** executada com `rg` no checkout local; consumidores registrados na matriz.
- **Fila de PRs:** #32 encerrada como substituída pelo código atual; #68 e #69 testadas e mescladas separadamente. Nenhuma PR aberta após a consolidação.
- **CI da base:** Quality #549 e Deploy #163 verdes em `main`, incluindo 137 testes Playwright.

## Resultado da Fase 1

**Checkpoint concluído como auditoria local verificável.** Componentes de alto risco e compartilhados permanecem nos caminhos originais. As movimentações autorizadas ficam restritas a lotes pequenos com atualização de importadores e gates após cada lote.
