# Inventário dos cards — InstitutoFoton.org

**LCR Workflow** · Linha de base da `main`: `413728bef4929541d55b2b16a028d52e212b5930` · Revisão: 22/11/2026.

## Critério e alcance

Auditoria da árvore `code/src/components/`, `features/`, `app/`, `content/`, `styles/` e testes. Um card é classificado como **informativo** quando não executa ações; e **interativo** quando sua estrutura oferece link, botão ou ampliação. O mesmo padrão de efeito pode existir em páginas diferentes sem justificar unificar o conteúdo editorial.

Não foram movidos imagens, logotipos, PDFs ou arquivos das animações aprovadas. **Preservados:** `code/public/assets/`, catálogos de notícias/pesquisa/equipe/parceiros, `ImageZoomDialog`, `BaseCarousel`, rotas e URLs.

| ID      | Página / função                              | TSX e CSS                                                                                | Categoria / ação / hover anterior                          | Mídia e dependências                                     | Reutilização e risco                                           | Estado                     |
| ------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- | -------------------------- |
| CARD-01 | O Instituto — missão/visão/propósito         | `components/InstitutePurpose.tsx` + `.css`                                               | Informativo; sem clique, borda e sombra próprias           | Ícones Lucide e textos internos                          | `InfoCard`; baixo                                              | Implementado; testes na PR |
| CARD-02 | O Instituto — frentes de articulação         | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo; `.info-card:hover` simulava elevação de botão | Ícones Lucide, conteúdo inline                           | `InfoCard`; baixo                                              | Implementado; testes na PR |
| CARD-03 | O Instituto — declarações oficiais           | `features/OfficialStatements.tsx` + `styles/site.css`                                    | Informativo; hover elevação genérico                       | `useResource`, backend editorial, fallback Valores       | `InfoCard`; médio                                              | Implementado; testes na PR |
| CARD-04 | Home — frentes e programas                   | `features/PublicPages.tsx` + `styles/site.css`                                           | Interativo; `Link`, hover elevação/rotação                 | `programs`, React Router, ícones                         | `ActionCard`; médio                                            | Implementado; testes na PR |
| CARD-05 | Pesquisa — linhas temáticas                  | `features/ResearchPages.tsx` + `styles/site.css`, `research-journey.css`                 | Interativo; `Link` interno e hover de elevação             | `researchLines`, React Router                            | `ActionCard`; médio                                            | Implementado; testes na PR |
| CARD-06 | Nossa Equipe — pessoas                       | `components/InstituteTeamDashboard.tsx` + `.css`                                         | Interativo; botão abre modal, lift, foco                   | `content/instituteTeam.ts`, fotos WebP e diálogo com Esc | `ProfileCard`; alto                                            | Implementado; testes na PR |
| CARD-07 | Notícias — fotografias Leonti                | `components/NewsPhotoHighlights.tsx` + `features/NewsMedia.css`                          | Interativo; botão abre `ImageZoomDialog`                   | `news-media.json`, WebP, PNG, créditos                   | `ImageCard`; alto                                              | Implementado; testes na PR |
| CARD-08 | Notícias — miniaturas de publicações         | `features/Publications.tsx` + `styles/site.css`                                          | Interativo; link interno ou `External` seguro              | Backend editorial, ReactMarkdown, capa, URLs externas    | Adaptador futuro sem links aninhados; alto                     | Identificado; pendente     |
| CARD-09 | Parceiros — logos com site                   | `features/PartnerEcosystem.tsx` + `styles/partners.css`                                  | Interativo; `a` seguro, hover, foco                        | 31 SVG oficiais, `safePartnerUrl`, inversão seletiva     | Migrar após equivalência visual; alto                          | Identificado; pendente     |
| CARD-10 | Parceiros — logos sem URL                    | `features/PartnerEcosystem.tsx` + `styles/partners.css`                                  | Informativo; `div` sem clique                              | `partnerAssets.ts`, fallback textual                     | `InfoCard` futuro; alto                                        | Identificado; pendente     |
| CARD-11 | Fundação — convite visual                    | `components/FoundationHistory.tsx` + `.css`                                              | Interativo; link e imagem ampliável próprios               | `foundationCards`, WebP/PNG, `ImageZoomDialog`           | Requer separar CTA e ampliação; médio                          | Identificado; pendente     |
| CARD-12 | Manifesto — cartas regionais                 | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo/editorial; sem clique                          | `manifesto-content.ts`, mídia e textos                   | Composição própria; alto                                       | Identificado; preservar    |
| CARD-13 | Manifesto — ODQs                             | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo com destaques editoriais                       | `odqs`, catálogo local                                   | Migrar só sem alterar conteúdo/ordem; médio                    | Identificado; pendente     |
| CARD-14 | Apoie a Ciência — opções/etapas              | `features/PublicPages.tsx`, `features/Support.tsx`, `styles/site.css`                    | Misto, inclusive CTA e elementos informativos              | URLs e conteúdo institucional                            | Exige auditoria especial: não tocar pagamento; alto            | Identificado; pendente     |
| CARD-15 | Transparência — documentos                   | `features/TransparencyBoard.tsx` + `styles/site.css`                                     | Misto: links de download e botões                          | `public-documents`, arquivos/URL                         | Preservar segurança de links; alto                             | Identificado; pendente     |
| CARD-16 | Redes sociais — Instagram, LinkedIn, YouTube | `features/InstagramHighlight.tsx`, `LinkedInHighlight.tsx`, `YouTubeHighlight.tsx` + CSS | Interativo; CTA externo e capas exclusivas                 | SVG/PNG/WebP e canal oficial                             | Layouts hero aprovados; não converter em cards genéricos; alto | Identificado; preservar    |
| CARD-17 | Acesso e estados de conteúdo                 | `features/Access.tsx`, `components/UI.tsx`                                               | Informativo/ações utilitárias distintas                    | Segurança, estados de recurso                            | Não misturar com biblioteca editorial; médio                   | Identificado; preservar    |
| CARD-18 | Home — mosaico humano                        | `features/PublicPages.tsx` + `styles/human-editorial.css`                                | Links/figuras com zoom e recortes orgânicos                | Assets editoriais e visualizador                         | Manter geometria validada; alto                                | Identificado; preservar    |

## Dependências reversas verificadas

- `InstitutePurpose` é usado por `PublicPages`, inclusive na rota `/instituto`.
- `InstituteTeamDashboard` é usado na página `/instituto`; o diálogo usa Escape, restauração de foco e links externos.
- `OfficialStatements` é usado por `PublicPages`; depende do backend editorial com fallback.
- `ResearchPages` serve `/pesquisa`, áreas temáticas e HaQuantum.
- `NewsPhotoHighlights` integra `Publications`, compartilhando `ImageZoomDialog` com outros consumidores.
- `PartnerEcosystem` está na Home e em `/parceiros` e usa SVGs com tratamento individual de contraste.
- `UI.tsx`, `styles/site.css`, `styles/research-journey.css` e `styles/partners.css` possuem classes amplamente compartilhadas; nenhum seletor global foi substituído em massa.
- `components/carousel/` permanece intocado: cards podem compartilhar tokens sem reimplementar carrosséis.

## Estados e regra para próximos lotes

**Identificado** = dependência mapeada; **planejado** = mudança desenhada; **implementado** = commit na branch; **testado** = CI passou; **validado** = auditoria, merge e deploy confirmados; **pendente** = sem autorização ou equivalência insuficiente.

As linhas marcadas “implementado; testes na PR” **não comprovam aprovação** por si mesmas. Atualizar o estado após CI e publicação.

Próxima etapa sugerida: separar `PublicationCard` (link com fallback externo) e `PartnerCard` (link vs. logo estático), comparando capturas desktop/mobile antes de migrar. **Não excluir CSS legado antes de comprovar ausência de consumidores.**
