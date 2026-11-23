# Checkpoint da reorganização arquitetural — Fase 1

**Projeto:** InstitutoFoton.org  
**Branch:** `refactor/architecture-pages-20261123`  
**Base:** `main` em `2caa8db4869e48e60840639451d2d7c6ef812a28`  
**Data:** 2026-11-23

## Escopo e método

Inventário feito sobre a árvore Git recursiva, os catálogos `content/siteStructure.ts`, `content/siteCards.ts`, `content/MAPA_SECOES_E_CARDS.md`, os arquivos prioritários e os imports visíveis. A árvore confirma `app/`, `components/`, `content/`, `features/`, `lib/` e `styles/`; `pages/` ainda não existe. As rotas foram conferidas em `src/main.tsx`.

Não foram alterados arquivos da aplicação, assets, rotas ou conteúdo editorial nesta fase. A árvore pública do GitHub não oferece uma execução local de busca completa/import graph/build; por isso, itens cujo uso só pode ser comprovado com busca no checkout estão identificados como pendentes, sem exclusão ou movimentação.

## Matriz origem → destino → consumidores → risco → status

| Origem | Destino recomendado | Consumidores identificados | Risco | Status |
|---|---|---|---|---|
| `components/InstitutePurpose.tsx` + CSS | `pages/instituto/sections/` na Fase 3 | `features/PublicPages.tsx` (Institute); reutiliza `components/cards/` | Médio: imports, CSS relativo, testes | Candidato; confirmar busca completa |
| `components/InstituteTeamDashboard.tsx` + CSS | `pages/instituto/sections/` na Fase 3 | Página Institute; `content/instituteTeam.ts`; cartões e diálogo | Alto: foco/teclado/modal/CSS | Candidato; preservar comportamento e testar |
| `components/FoundationHistory.tsx` + CSS | Manter em `features/fundacao/` ou módulo compartilhado | Introdução de Fundação em O Instituto e visualização/galeria em Notícias, conforme mapa/catálogo | Alto: responsabilidades e CSS partilhados | Compartilhado; não mover para uma página |
| `components/HomeAtomEntrance.tsx` + `styles/home-atom-entrance.css` | Manter biblioteca de animações; possível subpasta após busca | Home; import CSS global em `main.tsx` | Alto: eventos, controles, reduced motion e CSS global | Manter; não mover nesta fase |
| `components/PhotonIdentityAnimation.tsx` + `styles/photon-identity.css` | Manter biblioteca de animações | O Instituto; SVG institucional sincronizado | Alto | Manter; integridade e sincronização protegidas |
| `components/Constellation.tsx` | Possível `components/animations/` ou `pages/home/sections/` após prova | Nenhum consumidor pode ser provado apenas pela inspeção pontual | Alto até busca completa; nenhum descarte | Uso pendente; manter origem |
| `components/NewsCarousel.tsx` | `pages/noticias/sections/` como adaptador editorial; motor segue em `components/carousel/` | Notícias e matéria editorial; usa `BaseCarousel`, assets e CSS de notícias | Médio | Candidato; confirmar todos imports e CSS |
| `components/ImageZoomDialog.tsx` | `components/viewers/` | `SiteImageViewer` e componentes/carrossel/galeria | Alto: portal, foco, teclado, fullscreen, download | Compartilhado; migração requer regressão |
| `components/SiteImageViewer.tsx` | `components/viewers/` | Montagem global/layout; seleção delegada por eventos | Alto: seletor global e cobertura da página | Compartilhado; migração requer regressão |
| `components/NewsPhotoHighlights.tsx` | `pages/noticias/sections/` | Página Notícias; `ImageCard`, dados editoriais, zoom | Médio | Específico de Notícias; confirmar uso |
| `components/UI.tsx` | Possível `components/ui/` | Várias páginas e funcionalidades | Médio/alto: muitos imports; não alterar aparência | Biblioteca compartilhada; mover só com import graph |
| `content/siteStructure.ts`, `siteCards.ts`, `MAPA_SECOES_E_CARDS.md` | Permanecem fonte canônica referenciada por `pages/` | Rotas, seções, cards e documentação LCR | Alto se duplicados | Fonte canônica existente; não duplicar |
| `content/partnerAssets.ts` e catálogo de equipe/notícias | Permanecem em `content/` ou domínio compartilhado existente | Parceiros, equipe, notícias e galerias | Alto se duplicados | Catálogos únicos; páginas apenas apontarão para eles |
| `features/PublicPages.tsx`, `ResearchPages.tsx`, `Publications.tsx`, etc. | Permanecem como implementações atuais até etapa própria | Rotas declaradas em `main.tsx` | Alto | Não reescrever nesta migração |
| `public/assets/**` | Sem movimentação | Referências por catálogo/helpers e componentes | Muito alto | Fora do escopo; preservar |

## Rotas verificadas

Rotas públicas atuais incluem Home (`/`), `/instituto`, `/pesquisa`, `/parceiros`, `/pesquisa/jornada`, `/pesquisa/haquantum`, `/pesquisa/:slug`, `/manifesto`, `/apoie`, `/noticias`, `/redes-sociais` e auxiliares `/apresentacao`, `/contato`, `/entrar`, `/auth/callback`, `/admin/*`, `/privacidade`, `/termos`. `/transparencia` não está roteada; não criar nem anunciar rota nesta reorganização.

## Dependências e validações pendentes

- **Google Drive/LCR_ASSET_ORGANIZATION_STANDARD:** acesso não foi confirmado nesta execução; nenhum conteúdo do documento foi presumido.
- **GUARDRAILS.md privado:** não disponível nesta execução; nenhuma operação dependente de política privada foi executada.
- **Busca global/import graph e scripts:** impossíveis de executar sem checkout local. Antes de qualquer movimentação de código, obter checkout e executar os gates definidos em `code/package.json`.
- PRs abertas observadas ao iniciar: #68 (documentação) e #69 (metadado de cartas regionais); a #32 também continua aberta. Nenhuma foi modificada ou mesclada.
- CI de `main` em `2caa8db`: endpoint de status retornou lista vazia; não há status verde verificável neste checkpoint.

## Resultado da Fase 1

**Checkpoint concluído como inventário inicial baseado em fontes GitHub.** A classificação de consumidores está parcial onde depende de busca integral no checkout; componentes de alto risco foram mantidos nos caminhos originais. Não autoriza marcar a Fase 1 como auditoria exaustiva nem iniciar movimentações físicas até a validação local.
