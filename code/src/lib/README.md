# Biblioteca compartilhada (`lib`)

`lib/` contém código de apoio que não desenha páginas diretamente.

- `backend.ts`: resolve catálogo público estático local; não é uma conexão ativa com Supabase.
- `config.ts`: centraliza configurações e caminhos da aplicação.
- `siteAssets.ts`: resolve imagens e outros assets públicos.
- `useResource.ts`: fornece um hook para recursos assíncronos.

Componentes visuais ficam em `components`; conteúdo editorial em `content`; funcionalidades maiores em `features`. A biblioteca deve permanecer pequena, genérica e sem responsabilidade de renderização de páginas.
