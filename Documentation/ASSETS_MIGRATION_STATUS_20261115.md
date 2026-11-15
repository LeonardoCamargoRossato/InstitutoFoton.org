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
