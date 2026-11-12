# Inventário da migração estática — 12/11/2026

Base: main 6bad5c27. Apenas leitura; nenhuma alteração realizada no Supabase.

| Tipo | Dependências encontradas | Ação planejada |
|---|---|---|
| Banco, Storage, Auth | code/src/lib/backend.ts, config.ts | Fontes estáticas; remover cliente |
| Login e administração | Access.tsx, main.tsx, Layout.tsx | Desativar rotas de forma controlada |
| Notícias | Publications.tsx, LatestNews.tsx | Coleção local aprovada ou estado vazio |
| Institucional | OfficialStatements.tsx e seed público | Apenas textos literais confirmados |
| Transparência | Documents.tsx, TransparencyBoard.tsx | PDF público local; sem banco |
| Fotografias | ManifestoMedia.tsx, FotonPhoto.tsx, TechnicalVisitSpotlight.tsx | Prévia WebP e zoom PNG ambos locais |
| Deploy | .github/workflows/deploy-pages.yml | Remover env Supabase |
| Legado | code/supabase, import-publications.mjs, prepare-webp.mjs | Preservar versionado sem execução |

Acervo comprovado no GitHub: 49 WebP (18 imagens ilustrativas, 3 marcas, 8 Manifesto, 20 visitas). Artifact de exportação anterior contém 49 fontes, com zero ausências registradas. Não equivale a auditoria integral dos buckets.

Sem acesso autorizado ao projeto Foton conectado nesta sessão; publicações, documentos não referenciados, usuários e objetos privados não foram inspecionados, nem copiados. Ausência de acesso não implica ausência de registros. Seed identifica missão e visão literais como não confirmadas.

Repositório público: documentação/private não concede sigilo. Gate: inventário PNG/WebP, nenhum backend no browser, E2E, revisão independente e publicação confirmada.
## Resultado do primeiro CI completo (PR #6)

GitHub Actions: run 43330808338. TypeScript, lint, build, scanner, documentação, 49 pares WebP/PNG, inspeção do artefato e testes automatizados aprovados. **17 testes unitários e 25 E2E**. Verificação do artefato: nenhum domínio de Storage Supabase nem cliente Supabase no bundle entregue.

Referência anterior: entrada JavaScript principal 563,04 kB (163,28 kB gzip). Nova branch: 347,14 kB (107,01 kB gzip), redução de aproximadamente 34,5% na transferência gzip desse arquivo. Isso não é benchmark de latência de rede.

PNG: 49 arquivos, 79.664.092 bytes. WebP: 49 arquivos, 3.462.980 bytes. Duplicações detectadas por hash entre os 49 PNG: zero. Vinte PNG de visitas preservados exatamente da exportação; oito imagens do Manifesto incluem JPEG derivado em PNG, sem ganho de qualidade intrínseca; dezoito PNG ilustrativos derivados de AVIF.

**Gates pendentes:** revisão visual das capturas, auditoria independente de qualidade e segurança, aprovação humana e deploy. A página pública em main permanece na versão anterior até a integração aprovada. O acesso integral ao Storage e às publicações do banco não foi possível.
