# Inventário de referência

Os ZIPs originais `institutofoton.zip` e `Foton_org_Pacote_Referencias_Codex_V0.zip` excederam o limite de transferência de 32 MiB e **não foram examinados**. O usuário forneceu substitutos menores durante a implementação:

| Entrada | Inspeção e uso |
|---|---|
| `Prompt_Mestre_Codex_InstitutoFoton_org_V0.md` | Especificação lida integralmente; decisões de produto, rotas, modalidade informativa e arquitetura |
| `institutofoton_sem_src.zip` | 50 arquivos extraídos em diretório externo; logos oficiais e favicon aproveitados; manifests e estrutura estudados |
| `src_semAssets.zip` | 117 arquivos extraídos em diretório externo; Manifesto, BlogSection, NewsSection, MissionSection, GovernanceSection, Footer e integrações inspecionados |
| `Manual de Marca - Foton_compressed.pdf` | Texto extraído; origem, Golden Circle, valores, paleta, tipografia e controle de uso conferidos; não publicado |
| `Apresentação_Institucional_Foton_2026 09 10.pdf` | 7 páginas renderizadas e conferidas visualmente, pois o PDF não contém texto extraível; cópia para visualizador público solicitado |
| Imagem do Manifesto na conversa | Conferida visualmente; datas de 2025/2026 tratadas como calendário histórico; arquivo binário não disponível para cópia local |

SHA-256 dos substitutos:

- `institutofoton_sem_src.zip`: `236228c977d3460b7c0f698fa8f8009e26ccb5dff57cbd550d7b4221e5de9fda`
- `src_semAssets.zip`: `7b3a1617e93e0424bf6df7ad2f10c871c9b3edbc2c0e29fe5c4a12b7d554fbd3`

A extração verificou caminhos absolutos, `..` e links simbólicos. Nenhum script dos pacotes foi executado. `.env`, `.git`, caches, dependências e builds são excluídos pelo procedimento de extração; os substitutos não continham entradas desses tipos. Nenhum arquivo de configuração legado foi portado.

Notícias e blog: os componentes consultam `noticias` e `blog_posts` no banco comercial, não contêm os registros completos. Nenhum artigo foi inventado ou migrado. Parceiros e equipes citados no material não foram convertidos em um diretório de vínculo atual. `supabase/config.toml`, migrations e funções comerciais são apenas referência e não foram usados no `.org`.

Faltam os assets do diretório original `src/assets`, incluindo fotografias e imagens das Cartas. Foi adotada composição abstrata editorial, sem redesenhar o logo e sem simular pessoas reais. O arquivo separado de infraestrutura não veio nos substitutos; seus identificadores foram lidos apenas na especificação e ainda exigem confirmação remota.
