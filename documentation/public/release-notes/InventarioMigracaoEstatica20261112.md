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