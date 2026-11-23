# CardGallery

| Arquivo | Descrição sucinta | Descrição detalhada |
|---|---|---|
| `CardGallery.tsx` | Grade genérica de cards | Recebe uma lista e uma função `renderItem`, permitindo organizar ActionCard, InfoCard ou qualquer outro card. |
| `CardGalleryItem.tsx` | Item de extensão | Mantém um ponto de composição para itens individuais sem impor markup ou tipo visual específico. |
| `card-gallery.types.ts` | Contratos da galeria | Define a lista de dados, a função de renderização e as propriedades do item. |

A galeria organiza; o card concreto continua responsável por sua aparência, ação e conteúdo.