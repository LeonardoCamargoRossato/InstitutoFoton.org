# Shared library (`lib`)

`lib/` contains supporting code that does not render pages directly.

- `backend.ts`: resolves the local static public catalog; it is not an active Supabase connection.
- `config.ts`: centralizes application configuration and paths.
- `siteAssets.ts`: resolves public images and other assets.
- `useResource.ts`: provides a hook for asynchronous resources.

Componentes visuais ficam em `components`; conteúdo editorial em `content`; funcionalidades maiores em `features`. A biblioteca deve permanecer pequena, genérica e sem responsabilidade de renderização de páginas.
