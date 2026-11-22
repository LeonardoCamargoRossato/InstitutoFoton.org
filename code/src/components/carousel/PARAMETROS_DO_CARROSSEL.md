# Carrossel universal — parâmetros e manutenção

**Projeto:** InstitutoFoton.org · **Biblioteca:** `code/src/components/carousel/` · **LCR Workflow**

## Para que serve

Todos os carrosséis migrados usam **um motor** de troca, hover, contador, miniaturas e visualização de PNG. Os componentes originais de Notícias, Fundação e HaQuantum permanecem como **adaptadores editoriais**, sem repetir lógica de navegação. O carrossel de Visitas Técnicas do Manifesto permanece visualmente intacto e será migrado depois de uma validação de equivalência específica.

## Os três parâmetros, nesta ordem

1. `listaWebP`: prévias leves, com `id`, `src`, `alt`, `title?`, `caption?`, `credit?`, `width?`, `height?`.
2. `listaPNG`: arquivos originais, com o **mesmo `id`**, `src`, `downloadName?` e `attribution?`.
3. `estiloGrafico`: objeto tipado com cor, enquadramento, bordas, hover, animação, navegação e visualizador.

**Não vincule arquivos por índice.** A função `pairCarouselItems` recusa IDs duplicados e fotografias sem PNG correspondente.

```tsx
import { BaseCarousel, carouselPresets } from '../components/carousel';

<BaseCarousel
  listaWebP={[
    {
      id: 'evento-01',
      src: '/assets/WebP/noticias/evento-01.webp',
      alt: 'Pesquisadores reunidos no evento',
      caption: 'Evento de pesquisa',
      credit: 'Acervo institucional',
    },
  ]}
  listaPNG={[
    {
      id: 'evento-01',
      src: '/assets/PNG/noticias/evento-01.png',
      downloadName: 'evento-01.png',
    },
  ]}
  estiloGrafico={carouselPresets.institucional}
  label="Registros do evento"
/>;
```

Os caminhos acima são **exemplo de contrato**, não novos assets publicados. Em páginas reais, usar `assetUrl` e os catálogos existentes.

## Onde alterar cores, bordas e animação

- `carousel.types.ts`: contratos e propriedades realmente implementadas.
- `carousel.presets.ts`: presets `institucional`, `noticias`, `fundacao`, `haquantum` e `visitas`.
- `carousel.styles.css`: tokens `--carousel-*`, zoom de hover, miniaturas, transições e breakpoints.
- `BaseCarousel.tsx`: estado ativo, circularidade, toque, teclado e sincronização.
- `CarouselImage.tsx`: prévia WebP e borda da próxima imagem.
- `CarouselControls.tsx`: setas, contador `1 / N` centralizado, botão de quatro quadrados.
- `CarouselThumbnails.tsx`: miniaturas WebP ocultas inicialmente e grade responsiva.
- `CarouselViewer.tsx`: adaptação para `ImageZoomDialog.tsx`, que é compartilhado com outras imagens do site.

`imagem.apresentacao = 'peek'` e `proximaImagemVisivel = true` mostram o começo da próxima imagem. `imagem.enquadramento` escolhe `cover` ou `contain`. `imagem.proporcao` escolhe `16:9`, `4:5` ou `original`. O hover é controlado por `hover.habilitado`, `escala` e `duracaoMs`. A direção da animação acompanha as setas e o movimento circular. A propriedade `navegacao.miniaturas` aceita `recolhiveis` (padrão), `sempre` ou `desativadas`.

## Ampliação em três estados

1. **Carrossel:** apresenta WebP, animação, próximo recorte, setas e contador. O botão de grade abre/recolhe miniaturas **sem modal**.
2. **Intermediário:** clique na imagem abre `ImageZoomDialog` com `variant="carousel"`, PNG original, fundo do site visível e desfocado, ferramenta de zoom percentual, download, setas e X. Zoom aceita valores entre **25% e 600%**, inclusive `73%`; clique fora e X fecham tudo.
3. **Fullscreen real:** clique em **Expandir para tela cheia** chama `requestFullscreen()` no painel que contém controles e fotografia. O aviso `Tela cheia` desaparece; a barra se oculta com inatividade e reaparece ao chegar ao topo, tocar ou focar. **Reduzir** volta ao intermediário; **X** fecha tudo. O Escape nativo sai do fullscreen mantendo o intermediário. Sem Fullscreen API, o fallback visual é identificado em CSS como `is-fullscreen-fallback`.

O download fica disponível somente com o original PNG configurado. O visualizador não intercepta `Ctrl+` nem `Ctrl−` do navegador.

## Inserir, trocar ou remover imagens

Atualizar **o catálogo original da página** com o par WebP/PNG e ID estável. Preservar créditos e descrições acessíveis. Não mover nem excluir originais: seguir `LCR_ASSET_ORGANIZATION_STANDARD`, inventário e testes de equivalência. Os adaptadores existentes continuam consumindo os mesmos catálogos.

## Consumidores e rotas

| Página                                                                               | Componente                                                 | Estado                            |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------------------------------- |
| `/noticias/lancamento-lacq-pucrs-instituto-foton` e outras reportagens com carrossel | `NewsCarousel.tsx`                                         | Migrado                           |
| `/noticias/fundacao-instituto-foton`                                                 | `FoundationHistory.tsx` → `FoundationGallery`              | Migrado                           |
| `/pesquisa/haquantum`                                                                | `HaQuantumGallery.tsx`                                     | Migrado                           |
| `/manifesto` → Visitas Técnicas                                                      | `ManifestoMedia.tsx`                                       | **Preservado; migração pendente** |
| `/instituto` → capa da Fundação                                                      | `FoundationTeaser`                                         | Preservado (visualizador legado)  |
| Outras imagens de notícias, vídeos e fotos avulsas                                   | `NewsPhotoHighlights`, `SiteImageViewer`, `ManifestoMedia` | Preservados (visualizador legado) |

## Matriz de dependências auditadas

A auditoria considerou imports, consumidores indiretos, CSS, catálogo, visualizador e scripts de publicação. **Risco** indica possibilidade de regressão e não é classificação de segurança do conteúdo.

| Componente | Página/consumidor | Imagens e metadados | CSS | Dependências compartilhadas | Risco |
|---|---|---|---|---|---|
| `NewsCarousel` | `Publications`: LACQ PUCRS, Mobi Quantum e Quantum Day (2 carrosséis) | `news-media.json`: `name`, `original`, `preview`, `credit`, dimensões | `NewsMedia.css`, `carousel.styles.css` | `assetUrl`, `ImageZoomDialog`, `SiteImageViewer` | Médio: preservação do enquadramento 16:9, títulos e ordem |
| `FoundationGallery` | `Publications`: reportagem da fundação | `foundationCards`, 9 PNG/WebP; `foundationCaption03` e nota histórica | `FoundationHistory.css`, `carousel.styles.css` | `ImageZoomDialog`, `SiteImageViewer` | Alto: legenda histórica aprovada não pode ser alterada |
| `HaQuantumGallery` | `ResearchPages`: página HaQuantum e seção da pesquisa | `research-media.json`: PNG/WebP, dimensões, alt, hashes | `research-journey.css`, `carousel.styles.css` | `assetUrl`, `ImageZoomDialog` | Médio: mobile, teclado e miniaturas |
| `ManifestoMedia(kind='visits')` | `PublicPages`: `/manifesto#visitas` | 20 visitas resolvidas por `imageAsset`, PNG/WebP | `site.css` | `ImageZoomDialog`, `assetUrl` | Alto: **preservado**, dependente de equivalência visual futura |
| `FoundationTeaser` | `PublicPages`: `/instituto#fundacao` | primeira imagem e legenda da fundação | `FoundationHistory.css` | `ImageZoomDialog` legado | Médio: capa é CTA distinto do carrossel |
| `NewsPhotoHighlights` | `Publications`: Projeto Leonti | `news-media.json`: original e preview | `NewsMedia.css` | `ImageZoomDialog` legado | Médio: zoom de fotos editoriais avulsas |
| `SiteImageViewer` | `Layout`: imagens ampliáveis do site | vários catálogos e `data-full-image` | `image-zoom.css` | `ImageZoomDialog`, listeners globais | Alto: eventos capturados globalmente; exclui `.base-carousel` |

**Publicação:** `postbuild.mjs` cria rotas estáticas do GitHub Pages; `check-pages-artifact.mjs` verifica o build. Não há mudanças em caminhos de assets, documentos, APIs, hospedagem ou código dos cartões.

## Testes e aprovação

Em `code/`:

```bash
npm ci
npm run format:check
npm run check
npm run assets:verify
npm run artifact:check
npm run test:e2e
npm run audit:ci
```

A CI verifica também documentação e credenciais. Tests unitários validam uma, duas e treze imagens, pareamento ID e circularidade. Playwright valida página, miniaturas, PNG, zoom, fullscreen e acessibilidade. O merge na `main` ocorre somente após CI verde, auditoria de regressão e autorização humana.

## Decisão e risco

A apresentação do Manifesto é a referência de hover e parte da imagem seguinte, **não foi substituída**. A inclusão de `variant="carousel"` no visualizador preserva a aparência dos consumidores legados; a migração gradual evita alterar cartas, imagens únicas, PDFs e vídeos sem autorização específica.
