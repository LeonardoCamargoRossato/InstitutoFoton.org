# Inventário dos cards — InstitutoFoton.org

**LCR Workflow** · Linha de base da `main`: `413728bef4929541d55b2b16a028d52e212b5930` · Revisão: 22/11/2026.

## Critério e alcance

Auditoria da árvore `code/src/components/`, `features/`, `app/`, `content/`, `styles/` e testes. Um card é classificado como **informativo** quando não executa ações; e **interativo** quando sua estrutura oferece link, botão ou ampliação. O mesmo padrão de efeito pode existir em páginas diferentes sem justificar unificar o conteúdo editorial.

Não foram movidos imagens, logotipos, PDFs ou arquivos das animações aprovadas. **Preservados:** `code/public/assets/`, catálogos de notícias/pesquisa/equipe/parceiros, `ImageZoomDialog`, `BaseCarousel`, rotas e URLs.

| ID      | Página / função                              | TSX e CSS                                                                                | Categoria / ação / hover anterior                          | Mídia e dependências                                     | Reutilização e risco                                           | Estado                                                                              |
| ------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| CARD-01 | O Instituto — missão/visão/propósito         | `pages/02-instituto/sections/InstitutePurpose.tsx` + `.css`                              | Informativo; sem clique, borda e sombra próprias           | Ícones Lucide e textos internos                          | `InfoCard`; baixo                                              | Migração validada na PR #65; IDs 2.A.5.C1–C3                                        |
| CARD-02 | O Instituto — frentes de articulação         | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo; `.info-card:hover` simulava elevação de botão | Ícones Lucide, conteúdo inline                           | `InfoCard`; baixo                                              | Migrado; IDs 2.A.6.C1–C3                                                            |
| CARD-03 | O Instituto — declarações oficiais           | `features/OfficialStatements.tsx` + `styles/site.css`                                    | Informativo; hover elevação genérico                       | `useResource`, backend editorial, fallback Valores       | `InfoCard`; médio                                              | Migrado; IDs 2.A.7.C-*                                                              |
| CARD-04 | Home — frentes e programas                   | `features/PublicPages.tsx` + `styles/site.css`                                           | Interativo; `Link`, hover elevação/rotação                 | `programs`, React Router, ícones                         | `ActionCard`; médio                                            | Migrado; IDs 1.4.C1–C*                                                              |
| CARD-05 | Pesquisa — linhas temáticas                  | `features/ResearchPages.tsx` + `styles/site.css`, `research-journey.css`                 | Interativo; `Link` interno e hover de elevação             | `researchLines`, React Router                            | `ActionCard`; médio                                            | Migrado; IDs 4.A.2.C1–C*                                                            |
| CARD-06 | Nossa Equipe — pessoas                       | `pages/02-instituto/sections/InstituteTeamDashboard.tsx` + `.css`                        | Interativo; botão abre modal, lift, foco                   | `content/instituteTeam.ts`, fotos WebP e diálogo com Esc | `ProfileCard`; alto                                            | Migrado; IDs 2.B.1.C-*                                                              |
| CARD-07 | Notícias — fotografias Leonti                | `pages/06-noticias/sections/NewsPhotoHighlights.tsx` + `features/NewsMedia.css`          | Interativo; botão abre `ImageZoomDialog`                   | `news-media.json`, WebP, PNG, créditos                   | `ImageCard`; alto                                              | Migrado; IDs 6.A.3.C*                                                               |
| CARD-08 | Notícias — miniaturas de publicações         | `features/Publications.tsx` + `styles/site.css`                                          | Interativo; link interno ou `External` seguro              | Backend editorial, ReactMarkdown, capa, URLs externas    | Adaptador futuro sem links aninhados; alto                     | Migrado conservadoramente com InfoCard externo; links internos/externos preservados |
| CARD-09 | Parceiros — logos com site                   | `features/PartnerEcosystem.tsx` + `styles/partners.css`                                  | Interativo; `a` seguro, hover, foco                        | 31 SVG oficiais, `safePartnerUrl`, inversão seletiva     | Migrar após equivalência visual; alto                          | Migrado conservadoramente com ActionCard e CSS original; SVG/URL intactos           |
| CARD-10 | Parceiros — logos sem URL                    | `features/PartnerEcosystem.tsx` + `styles/partners.css`                                  | Informativo; `div` sem clique                              | `partnerAssets.ts`, fallback textual                     | `InfoCard` futuro; alto                                        | Migrado conservadoramente com InfoCard e CSS original                               |
| CARD-11 | Fundação — convite visual                    | `features/foundation/FoundationHistory.tsx` + `.css`                                     | Interativo; link e imagem ampliável próprios               | `foundationCards`, WebP/PNG, `ImageZoomDialog`           | Requer separar CTA e ampliação; médio                          | Rastreado por 2.A.4.C1; preserva botão e modal aprovados                            |
| CARD-12 | Manifesto — cartas regionais                 | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo/editorial; sem clique                          | `manifesto-content.ts`, mídia e textos                   | Composição própria; alto                                       | Migrado com InfoCard herança visual; 5.7.C*                                         |
| CARD-13 | Manifesto — ODQs                             | `features/PublicPages.tsx` + `styles/site.css`                                           | Informativo com destaques editoriais                       | `odqs`, catálogo local                                   | Migrar só sem alterar conteúdo/ordem; médio                    | Migrado com InfoCard herança visual; 5.9.C1–C11                                     |
| CARD-14 | Apoie a Ciência — opções/etapas              | `features/PublicPages.tsx`, `features/Support.tsx`, `styles/site.css`                    | Misto, inclusive CTA e elementos informativos              | URLs e conteúdo institucional                            | Exige auditoria especial: não tocar pagamento; alto            | Rastreado por seções 7.1/7.2; botões de apoio preservados                           |
| CARD-15 | Transparência — documentos                   | `features/TransparencyBoard.tsx` + `styles/site.css`                                     | Misto: links de download e botões                          | `public-documents`, arquivos/URL                         | Preservar segurança de links; alto                             | Migrado com InfoCard; componente ainda sem rota pública                             |
| CARD-16 | Redes sociais — Instagram, LinkedIn, YouTube | `features/InstagramHighlight.tsx`, `LinkedInHighlight.tsx`, `YouTubeHighlight.tsx` + CSS | Interativo; CTA externo e capas exclusivas                 | SVG/PNG/WebP e canal oficial                             | Layouts hero aprovados; não converter em cards genéricos; alto | Rastreado com data-lcr-card-id; layout hero e CTAs originais preservados            |
| CARD-17 | Acesso e estados de conteúdo                 | `features/Access.tsx`, `components/ui/`                                                  | Informativo/ações utilitárias distintas                    | Segurança, estados de recurso                            | Não misturar com biblioteca editorial; médio                   | Organizado como utilitário distinto (não é card editorial)                          |
| CARD-18 | Home — mosaico humano                        | `features/PublicPages.tsx` + `styles/human-editorial.css`                                | Links/figuras com zoom e recortes orgânicos                | Assets editoriais e visualizador                         | Manter geometria validada; alto                                | Identificado e preservado; mosaico é composição visual, não card editorial genérico |

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

**Evidência atual:** PR #66 (`abbace3`) e PR #67 (`2caa8db`) integradas à `main`; Quality checks #545 e Deploy #161 concluídos com sucesso. O código publicado está tecnicamente verificado; a inspeção visual manual e eventuais aprovações editoriais são verificações independentes. Não confundir CI verde com revisão visual concluída.

## Conclusão do lote de padronização

Todas as **famílias de cards editoriais montadas atualmente** possuem agora um componente
compartilhado da biblioteca, ou identificação `data-lcr-card-id` quando são
composições exclusivas aprovadas (capas, mídias e CTAs). Os cards compostos
continuam semanticamente corretos: notícias mantêm o artigo com link; documentos
mantêm duas ações independentes; Parceiros com URL usam link, sem URL usam card estático.

A opção `inheritVisuals` mantém **CSS e tokens legados já aprovados**, evitando uma
mudança global de raio, altura ou padding. O hover da categoria `informativo`
permanece desligado e a animação de entrada da página é mantida.

O `TransparencyBoard` está implementado e inventariado, mas a rota `/transparencia`
**não consta** do React Router atual. Não anunciar o caminho como publicado.

**Não excluir CSS legado antes de comprovar ausência de consumidores.** Qualquer
remoção futura deve vir em PR independente com equivalência visual.
