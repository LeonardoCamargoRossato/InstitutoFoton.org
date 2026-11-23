# Estrutura de `src`

`src/` contém o código-fonte da aplicação React. Cada pasta tem uma responsabilidade diferente: páginas organizam o mapa do site, componentes fornecem peças visuais reutilizáveis, features concentram funcionalidades de negócio, e `lib` reúne utilitários compartilhados.

| Pasta/arquivo | Descrição sucinta           | Descrição detalhada                                                                                        |
| ------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `app/`        | Estrutura da aplicação      | Contém a composição geral da aplicação, como layout e elementos que envolvem as páginas.                   |
| `components/` | Biblioteca visual           | Reúne componentes reutilizáveis de animação, cards, carrossel, interface e visualização de imagens.        |
| `content/`    | Conteúdo e catálogos        | Centraliza textos, listas, metadados, documentos, parceiros, publicações e catálogos consumidos pelo site. |
| `features/`   | Funcionalidades das páginas | Contém blocos funcionais maiores, normalmente ligados a uma área específica do site.                       |
| `lib/`        | Código compartilhado        | Reúne configurações, resolução de assets, backend legado controlado e hooks utilitários.                   |
| `pages/`      | Mapa das páginas            | Mantém o espelho organizado das páginas, suas áreas e seções.                                              |
| `styles/`     | Estilos globais e de áreas  | Contém as folhas de estilo compartilhadas pela aplicação e por funcionalidades específicas.                |
| `main.tsx`    | Entrada da aplicação        | Inicializa o React e monta a aplicação no documento HTML.                                                  |

As pastas possuem READMEs próprios quando a documentação detalhada já foi consolidada.
