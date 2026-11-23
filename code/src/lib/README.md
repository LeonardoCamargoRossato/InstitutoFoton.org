# Biblioteca compartilhada (`lib`)

`lib/` contém código de apoio usado por diferentes partes do site. Esses arquivos normalmente não desenham uma seção diretamente; eles fornecem configurações, dados resolvidos, integrações e hooks para os componentes e features.

| Arquivo          | Descrição sucinta            | Descrição detalhada                                                                                                                  |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `backend.ts`     | Camada de backend            | Mantém os pontos de acesso e tipos relacionados ao backend configurado no projeto. Deve ser consultado antes de alterar integrações. |
| `config.ts`      | Configurações compartilhadas | Centraliza valores de configuração usados pela aplicação, evitando repetir constantes em páginas e componentes.                      |
| `siteAssets.ts`  | Resolução de assets          | Define como os caminhos de imagens e outros assets do site são localizados e utilizados pelo código.                                 |
| `useResource.ts` | Hook de recursos             | Fornece um hook reutilizável para carregar e acompanhar recursos assíncronos em componentes React.                                   |

## O que não fica em `lib`

Componentes visuais devem permanecer em `components/`; conteúdo editorial deve ficar em `content/`; funcionalidades maiores devem ficar em `features/`. A `lib` deve permanecer pequena e genérica para evitar virar uma pasta de arquivos sem relação.
