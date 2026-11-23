# Biblioteca de carrossel

Esta pasta reúne o motor compartilhado de carrosséis do Instituto Foton. Os arquivos menores fornecem contratos, dados, configurações e estilos; os arquivos `.tsx` renderizam partes visuais da experiência.

| Arquivo                      | Descrição sucinta                | Descrição detalhada                                                                                                                                                                         |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BaseCarousel.tsx`           | Componente principal             | Coordena o carrossel completo: seleciona a imagem ativa, controla setas, teclado, toque, miniaturas, animações e abertura do visualizador. Recebe listas WebP/PNG e um preset visual.       |
| `CarouselControls.tsx`       | Parte visual dos controles       | Renderiza as setas anterior/próxima, o contador de posição e o botão que abre ou recolhe as miniaturas. Não decide a navegação; recebe essas ações por propriedades.                        |
| `CarouselImage.tsx`          | Parte visual da imagem           | Exibe a prévia WebP ativa, o efeito de hover e, quando configurado, uma amostra da próxima imagem. Ao clicar, solicita a abertura da imagem ampliada.                                       |
| `CarouselThumbnails.tsx`     | Parte visual das miniaturas      | Mostra a grade de miniaturas WebP e indica qual item está ativo. Cada miniatura funciona como um botão para selecionar diretamente uma imagem.                                              |
| `CarouselViewer.tsx`         | Adaptador do visualizador        | Liga o carrossel ao visualizador compartilhado `ImageZoomDialog`. Passa o PNG original, legenda, créditos, download, fullscreen e navegação entre imagens.                                  |
| `carousel.types.ts`          | Contratos e tipos                | Define o formato esperado para imagens WebP e PNG, itens pareados, presets visuais e propriedades do componente principal. É código de TypeScript, não uma tela renderizada.                |
| `carousel.data.ts`           | Dados e funções auxiliares       | Contém funções que pareiam WebP com PNG pelo mesmo `id` e calculam índices circulares. Também valida arquivos incompletos, duplicados ou sem correspondência.                               |
| `carousel.presets.ts`        | Objetos de configuração visual   | Exporta presets como `institucional`, `noticias`, `fundacao`, `haquantum` e `visitas`. Eles agrupam tema, proporção, borda, hover, animação, navegação e visualizador sem duplicar o motor. |
| `carousel.styles.css`        | Aparência e comportamento visual | Define cores, bordas, proporções, hover, transições, miniaturas, controles, responsividade e estados do carrossel. Não é um componente isolado; é a camada visual compartilhada.            |
| `index.ts`                   | Ponto de entrada público         | Reexporta o componente principal, presets, funções auxiliares e tipos para que as páginas importem a biblioteca por `components/carousel`, sem conhecer cada arquivo interno.               |
| `PARAMETROS_DO_CARROSSEL.md` | Documentação técnica             | Explica o contrato de uso, os parâmetros, o pareamento WebP/PNG, os presets, o visualizador em três estados e os cuidados para manutenção dos catálogos de imagens.                         |

## Como ler a estrutura

- **Componentes visuais:** `BaseCarousel.tsx`, `CarouselControls.tsx`, `CarouselImage.tsx`, `CarouselThumbnails.tsx` e `CarouselViewer.tsx`.
- **Código de apoio:** `carousel.types.ts`, `carousel.data.ts`, `carousel.presets.ts` e `index.ts`.
- **Estilo e documentação:** `carousel.styles.css` e `PARAMETROS_DO_CARROSSEL.md`.

Os arquivos minúsculos não aparecem sozinhos na tela. Eles são módulos reutilizados pelos componentes visuais para manter o carrossel consistente e fácil de manter.
