# Mapa do site — páginas, abas, seções e cards

**LCR Workflow · InstitutoFoton.org · Catálogo humano, não visual**

Os códigos abaixo servem para comunicação entre Planner, Builder, Auditor e responsáveis pelo conteúdo. **Não são impressos na interface** nem modificam o menu, os títulos, a ordem do conteúdo ou as URLs existentes.

## Convenção de códigos

- Número do **menu**: `1` Início, `2` O Instituto, `3` Parceiros, `4` P&D, `5` Manifesto, `6` Notícias, `7` Apoie a Ciência.
- Letra da **aba suspensa**: `2.A` Conheça o Instituto; `2.B` Nossa Equipe; `4.A` Linhas Temáticas; `4.B` Jornada; `4.C` HaQuantum; `6.A` Notícias; `6.B` Redes Sociais.
- Número da seção: `2.A.5` = O Instituto → Conheça → seção “Por que o Foton existe”.
- Código do card: `2.A.5.C1` = Missão; `2.A.5.C2` = Visão; `2.A.5.C3` = Propósito.
- `C*` = conjunto dinâmico de cards (membros, parceiros, publicações), em que os IDs originais são a identidade estável dos itens no catálogo de origem.

Os arquivos fonte de referência são **`siteStructure.ts` (menu + seções)** e **`siteCards.ts` (nome dos cards + comportamento)**. Esta documentação é a forma de leitura humana da mesma organização.

## Menu 1 — Início

| Código | Nome da seção | Local no site | Cards |
|---|---|---|---|
| 1.1 | Capa — identidade e apresentação | [Home](/) | animação exclusiva, não é card |
| 1.2 | Por que o Foton existe? | [Home, propósito](/#porque-existe) | sem cards |
| 1.3 | Ecossistema Foton — indicadores | [Home, ecossistema](/#ecossistema) | 1.3.C1 Estados; 1.3.C2 Membros |
| 1.4 | Frentes e programas | [Home, frentes](/#frentes) | 1.4.C* Programas clicáveis |
| 1.5 | Documento institucional | [Home, apresentação](/#apresentacao) | 1.5.C1 Capa de apresentação (link) |
| 1.6 | Ecossistema de Parceiros — prévia | [Home, parceiros](/#parceiros) | 1.6.C* Logos (com/sem site) |
| 1.7 | Contato com o Foton | [Home](/) | CTA de contato |

## Menu 2 — O Instituto

| Código | Aba / seção | Local no site | Cards |
|---|---|---|---|
| 2.A.1 | Conheça — introdução | [O Instituto](/instituto) | — |
| 2.A.2 | Nossa história | [O Instituto](/instituto) | — |
| 2.A.3 | Por que Foton? — identidade | [O Instituto](/instituto) | animação SVG aprovada |
| 2.A.4 | Fundação | [O Instituto](/instituto) | 2.A.4.C1 Capa histórica e zoom |
| 2.A.5 | Por que o Foton existe | [Missão/Visão/Propósito](/instituto#por-que-existimos) | **C1 Missão; C2 Visão; C3 Propósito** |
| 2.A.6 | Frentes de articulação | [O Instituto](/instituto) | **C1 Educação; C2 Pesquisa; C3 Inteligência estratégica** |
| 2.B.1 | Nossa Equipe | [Nossa Equipe](/instituto#equipe) | 2.B.1.C* Perfis clicáveis |
| 2.A.7 | Declarações institucionais | [O Instituto](/instituto) | 2.A.7.C* Declarações informativas |
| 2.A.8 | Valores que colocamos em movimento | [O Instituto](/instituto) | **C1 Excelência; C2 Protagonismo; C3 Inovação; C4 Estratégia; C5 Valorização de talentos; C6 Ética; C7 Colaboração** |

*A seção de Valores aparece visualmente após a Equipe, mas permanece catalogada na aba “Conheça” por afinidade de conteúdo. Nenhuma seção foi reordenada.*

## Menu 3 — Ecossistema de Parceiros

| Código | Seção | Local no site | Cards |
|---|---|---|---|
| 3.1 | Apresentação da rede | [Parceiros](/parceiros) | — |
| 3.2 | Grupos de parceiros | [Logos](/parceiros#lista-parceiros) | 3.2.C* Logotipos SVG com link quando disponível |

## Menu 4 — P&D – Cientista Inovador

| Código | Aba / seção | Local no site | Cards |
|---|---|---|---|
| 4.A.1 | Pesquisa — capa | [P&D](/pesquisa) | — |
| 4.A.2 | Linhas temáticas | [Áreas de pesquisa](/pesquisa#areas-de-pesquisa) | 4.A.2.C* Linhas com ação |
| 4.A.3 | Apresentação da Jornada | [Jornada](/pesquisa#jornada-do-cientista) | — |
| 4.A.4 | Eventos | [Eventos](/pesquisa#eventos) | — |
| 4.A.5 | Etapa Pulso | [Pulso](/pesquisa#etapa-pulso) | — |
| 4.A.6 | HaQuantum — chamada | [HaQuantum](/pesquisa#haquantum) | — |
| 4.B.1 a 4.B.5 | Jornada — capa, cooperação, Quantum Pathway, grupos, eventos | [Jornada](/pesquisa/jornada) | 4.B.3.C* Etapas |
| 4.C.1 a 4.C.4 | HaQuantum — capa, preparação, etapas e registros | [HaQuantum](/pesquisa/haquantum) | 4.C.3.C1–C3 Etapas; 4.C.4 Galeria |

## Menu 5 — Manifesto Quântico Nacional

| Código | Seção | Local no site | Cards |
|---|---|---|---|
| 5.1 a 5.5 | Capa, participação, navegação, movimento, importância | [Manifesto](/manifesto) | 5.2.C1 Formulário |
| 5.6 | Metodologia | [Metodologia](/manifesto#metodologia) | 5.6.C* Etapas |
| 5.7 | Cartas regionais | [Cartas](/manifesto#cartas) | 5.7.C* Cinco cartas |
| 5.8 | Visitas técnicas | [Visitas](/manifesto#visitas) | Carrossel universal |
| 5.9 | Onze ODQs | [Objetivos](/manifesto#odqs) | 5.9.C* Onze cards informativos |
| 5.10 | Convite final ao Manifesto | [Manifesto](/manifesto) | CTA externo |

## Menu 6 — Notícias

| Código | Aba / seção | Local no site | Cards |
|---|---|---|---|
| 6.A.1 | Notícias — busca e filtros | [Notícias](/noticias) | — |
| 6.A.2 | Lista de publicações | [Notícias](/noticias) | 6.A.2.C* Notícias e matérias clicáveis |
| 6.A.3 | Matéria individual | [Notícias](/noticias) | 6.A.3.C* Fotos/editoriais e carrosséis |
| 6.B.1 | Redes sociais — introdução | [Redes sociais](/redes-sociais) | — |
| 6.B.2 | Instagram | [Redes sociais](/redes-sociais#social-instagram-title) | 6.B.2.C1 Capa Instagram |
| 6.B.3 | LinkedIn | [Redes sociais](/redes-sociais#social-linkedin-title) | 6.B.3.C1 Capa LinkedIn |
| 6.B.4 | YouTube | [Redes sociais](/redes-sociais#social-youtube-title) | 6.B.4.C1 Capa YouTube |

## Menu 7 — Apoie a Ciência

| Código | Seção | Local no site |
|---|---|---|
| 7.1 | Apoie — apresentação | [Apoie](/apoie) |
| 7.2 | Contato para colaboração | [Apoie](/apoie) |

**Páginas auxiliares (8.x):** Contato, Transparência, Apresentação, Privacidade e Termos. Elas são catalogadas sem criar novos itens no menu público.

## Status de migração e regras

A biblioteca de cards está em `code/src/components/cards/`; a biblioteca independente de carrossel está em `code/src/components/carousel/`. Ao padronizar, diferenciar links de cards informativos; **nenhum hover de ação sem clique**. Preservar animações de entrada para ambos.

Os cards em `InstitutePurpose`, `OfficialStatements`, `PublicPages`, `ResearchPages`, `InstituteTeamDashboard` e `NewsPhotoHighlights` já compartilham componentes da biblioteca inicial. Os elementos de Parceiros, Notícias, ODQs, Cartas, Transparência e etapas precisam de migração conservadora para não quebrar layout, imagens, downloads nem navegação. Cada lote deve concluir CI e regressão antes do próximo.

O catálogo é versionado junto com o site e deve ser atualizado sempre que se introduzir, remover, renomear ou mover uma seção. **Nunca usar a numeração interna como texto visível do site.**
