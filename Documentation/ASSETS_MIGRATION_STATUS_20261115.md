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
- [ ] Importar os demais arquivos PNG/WebP/SVG do Drive que ainda não estão no GitHub. O Drive tinha 42 WebP ausentes da estrutura canônica em auditoria anterior. Dois PNG HaQuantum (2, 4) têm mais de 10 MB e a importação pelo conector expirou.
- [ ] Conferir equivalência de conteúdo (não apenas semelhança de nome) entre JPG/JPEG e arquivos substitutos.
- [ ] Atualizar TODOS os caminhos em React, CSS, JSON, testes e scripts.
- [ ] Verificar build, testes, imagens e comportamento de zoom antes de remover JPG/JPEG ou pastas antigas.
- [ ] Eliminar duplicações, remover JPG/JPEG somente quando sem referências e abrir PR para auditoria.

## Regra de segurança
Não remover arquivos de caminhos antigos nem mudar a `main` até completar a migração e validar o site. Em particular, a simples presença de um PNG de nome semelhante não autoriza substituir JPG; confirmar mesma fotografia e a qualidade do PNG.

## Convenção
Renderização inicial preferencial em WebP; ampliação/zoom usa PNG. SVG para marcas e vetores. Não adicionar JPG/JPEG novos.
