# Migração de imagens — InstitutoFoton.org

Branch: `feat/asset-migration-drive-20261115`

## Objetivo
Replicar a organização de `Assets` do Google Drive em `code/public/assets` e usar exclusivamente PNG, WebP e SVG, com revisão antes de remover JPG/JPEG e caminhos legados.

## Estado verificado em 15/11/2026

- [x] Branch isolada criada a partir de `main`.
- [x] Inventário inicial no GitHub: 92 PNG, 113 WebP, 64 SVG, 11 JPG e 22 `.gitkeep` em `code/public/assets`.
- [x] 269 PNG/WebP/SVG existentes duplicados por referência ao mesmo objeto Git na hierarquia padronizada, preservando os caminhos anteriores para não quebrar o site.
- [x] 9 PNG adicionais importados do Drive e inseridos na hierarquia: 6 HaQuantum (1, 3, 5, 6, 8, 9), 1 Jornada, 1 SOFTSUL e 1 Assespro-RS.
- [x] Diretórios com nomenclatura por área seguindo `01 - Início`, `02 - O Instituto`, `03 - Ecossistema de Parceiros`, `04 - P&D - Cientista Inovador`, `05 - Manifesto`, `06 - Notícias`, `08 - Apoie a Ciência`, `09 - Identidade Visual` (pastas vazias não são representadas por Git).
- [x] Os 11 JPG legados foram identificados: 8 HaQuantum, 1 Jornada/Pulso, 1 SOFTSUL e 1 Assespro-RS.
- [x] Importação posterior dos PNG HaQuantum 2 e 4 concluída; a antiga estimativa de 42 WebP faltantes foi revista e não deve ser tratada como inventário atual. Novas diferenças entre GitHub e Drive exigem comparação por arquivo e caminho.
- [ ] Conferir equivalência de conteúdo (não apenas semelhança de nome) entre JPG/JPEG e arquivos substitutos.
- [ ] Atualizar TODOS os caminhos em React, CSS, JSON, testes e scripts.
- [ ] Verificar build, testes, imagens e comportamento de zoom antes de remover JPG/JPEG ou pastas antigas.
- [ ] Eliminar duplicações, remover JPG/JPEG somente quando sem referências e abrir PR para auditoria.

## Regra de segurança
Não remover arquivos de caminhos antigos nem mudar a `main` até completar a migração e validar o site. Em particular, a simples presença de um PNG de nome semelhante não autoriza substituir JPG; confirmar mesma fotografia e a qualidade do PNG.

## Convenção
Renderização inicial preferencial em WebP; ampliação/zoom usa PNG. SVG para marcas e vetores. Não adicionar JPG/JPEG novos.

## Auditoria complementar — 15/11/2026

- **Fundação:** preservar o comportamento da `main` na branch: primeira renderização pelas nove imagens `assets/WebP/instituto/fundacao/Img-Fundacao-Foton-01.webp` a `09.webp`; ampliação pelos nove PNG correspondentes em `assets/PNG/instituto/fundacao/`. Não foram alterados os caminhos nem as imagens na branch.
- **Drive da fundação:** mantidos os nove PNG e nove WebP oficiais nas pastas canônicas de `Assets/02 - O Instituto/02A - Conheça o Instituto/Fundação do Instituto Foton/`. Removidos 9 PNG não usados, 8 JPG antigos e 18 cópias redundantes de nomes/tamanhos correspondentes; arquivo de documentação mantido.
- **Parceiros:** o site aponta para `assets/03 - Ecossistema de Parceiros/Logos dos Parceiros/SVG/assets-svg/`; os 31 SVGs oficiais foram preservados. Os 32 PNG e 32 WebP de `assets/PNG/parceiros/` e `assets/WebP/parceiros/` foram eliminados da branch, incluindo os dois `.gitkeep` dessas pastas.
- **JPG legados:** o inventário atual da branch contém zero `.jpg` e `.jpeg` (substituições anteriores mantidas).
- **Controle de regressão:** teste de ausência de diretórios raster de parceiros acrescentado a `code/tests/partners.test.ts`. Validação de nomes e árvores realizada; build/testes automatizados devem ser executados antes de qualquer merge.

## Limpeza das ilustrações institucionais — 15/11/2026

- Conferidos 114 arquivos de código, configuração, testes e documentação na branch: nenhuma página ou componente em execução aponta para os assets `instituto-community` ou `instituto-community-mobile`.
- Apagadas as 8 cópias PNG/WebP desses dois IDs, tanto na pasta numerada `02 - O Instituto/02A - Conheça o Instituto/` quanto nas pastas legadas `PNG/instituto/` e `WebP/instituto/`.
- Removidos os dois itens de `src/lib/siteAssets.ts`, `scripts/data/asset-inventory.json` e `scripts/bootstrap-static-assets.mjs`.
- Inventário e verificações atualizados de 39 para 37 pares; corrigido o cálculo esperado no verificador de artefatos para evitar falsa falha por total hardcoded.
- Teste de regressão criado para garantir que os arquivos excluídos e IDs do inventário não reapareçam.
- **Preservação:** os 9 PNG e 9 WebP da fundação e as 17 fotos WebP da equipe permanecem sem alteração. A `main` não foi modificada.
- Os testes automatizados devem ser executados na validação antes do merge.

## Revisão de encerramento do PR #27 — 15/11/2026

- A migração foi implementada somente em `feat/asset-migration-drive-20261115`. A `main` não foi alterada por este PR.
- O inventário vigente tem **34 pares canônicos PNG/WebP**, com os arquivos antigos de ilustração de Pesquisa, Jornada e `instituto-community` removidos dos catálogos e da branch.
- O Ecossistema de Parceiros mantém **31 logos SVG** oficiais, sem dependência das logos raster antigas e sem mapeamento `LogoRede40`.
- Em `04A - Linhas temáticas de pesquisa/Imagens de Pesquisa/`, as subpastas `PNG/` e `WebP/` estão vazias, preservadas por `.gitkeep`, removidos apenas do artefato publicado pelo postbuild.
- Em `04B - Jornadas do Cientista Inovador/Imagens da Jornada/`, `EtapaPulsoYouTube.png` é o original preservado e `EtapaPulsoYouTube.webp` é a versão leve usada na primeira renderização do vídeo.
- Em `04C - HaQuantum/Galeria HaQuantum/PNG/`, as oito fotografias documentais aprovadas permanecem no acervo.
- A validação antes de qualquer merge inclui lint, TypeScript, testes unitários, build, verificação de imagens, verificação de artefato e E2E no navegador. Conferir a execução correspondente ao commit final.

## HaQuantum — miniaturas WebP e ampliação PNG (15/11/2026)

- Os oito PNG documentais originais permanecem inalterados em `04C - HaQuantum/Galeria HaQuantum/PNG/`.
- Foram gerados oito WebP a partir desses originais e sincronizados com o Drive em `04C - HaQuantum/Galeria HaQuantum/WebP/`; as miniaturas têm até 1.280 pixels de largura, sem ampliação artificial.
- `HaQuantumGallery.tsx` passa a usar `previewPath` (WebP) na visualização inicial e `path` (PNG) somente quando o usuário amplia uma imagem.
- O catálogo `research-media.json` registra também o hash SHA-256 de cada WebP; o verificador do artefato confirma a presença e integridade dos 16 arquivos.
- O teste E2E verifica oito miniaturas WebP, nenhuma solicitação aos PNG antes do clique e a exibição do PNG original ao ampliar.
- Nenhuma alteração na `main`; o CI completo deve ser confirmado antes de aprovar o PR.
