# LogoGallery

| Arquivo                 | Descrição sucinta    | Descrição detalhada                                                                                          |
| ----------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `LogoGallery.tsx`       | Grade de logos       | Renderiza grupos de logos e delega cada item ao card visual. Não conhece os dados editoriais de parceiros.   |
| `LogoGalleryCard.tsx`   | Card visual de logo  | Exibe a marca, fallback textual, contraste opcional, link externo e acessibilidade.                          |
| `logo-gallery.types.ts` | Contratos da galeria | Define os dados genéricos de uma logo e as propriedades da galeria e do card. Não importa conteúdo do Foton. |

A feature adapta seus dados institucionais para `LogoGalleryItem`. Por isso, a galeria pode ser copiada para outro site sem levar o catálogo de parceiros junto.
