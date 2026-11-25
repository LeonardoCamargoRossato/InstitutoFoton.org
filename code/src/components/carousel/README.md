# Carousel library

This folder contains Instituto Foton's shared carousel engine. The `.tsx` files render visual parts of the experience, while the TypeScript, CSS, configuration, and documentation files provide its contracts and support.

## File documentation

| File | Description |
| --- | --- |
| `BaseCarousel.tsx` | Coordinates the complete carousel: active-item selection, arrows, keyboard and touch input, thumbnails, animation, and viewer opening. It receives paired WebP/PNG media and a visual preset. |
| `CarouselControls.tsx` | Renders previous/next controls, the position counter, and the thumbnail toggle. Navigation decisions remain in the parent and arrive through props. |
| `CarouselImage.tsx` | Displays the active WebP preview, hover treatment, and optional next-image cue. Clicking requests the enlarged image experience. |
| `CarouselThumbnails.tsx` | Displays the WebP thumbnail grid, marks the active item, and exposes each thumbnail as a direct selection button. |
| `CarouselViewer.tsx` | Adapts the carousel to the shared `ImageZoomDialog`, passing the original PNG, caption, credits, download, fullscreen, and image-navigation behavior. |
| `carousel.types.ts` | Defines the WebP/PNG media contracts, paired items, visual presets, and main-component properties. It is TypeScript support code, not a rendered screen. |
| `carousel.data.ts` | Pairs WebP and PNG media by identifier, calculates circular indexes, and rejects incomplete, duplicated, or unmatched media records. |
| `carousel.presets.ts` | Exports visual presets such as institutional, news, foundation, HaQuantum, and technical-visit variants without duplicating the carousel engine. |
| `carousel.styles.css` | Defines carousel colors, borders, proportions, hover states, transitions, thumbnails, controls, responsiveness, and visual states. It is a shared style layer, not an isolated component. |
| `index.ts` | Re-exports the main component, presets, helper functions, and types so pages can import the library through the carousel entry point. |
| `PARAMETROS_DO_CARROSSEL.md` | Documents usage contracts, parameters, WebP/PNG pairing, presets, the three-state viewer flow, and catalog-maintenance guidance. |

## Reading the structure

- **Visual components:** `BaseCarousel.tsx`, `CarouselControls.tsx`, `CarouselImage.tsx`, `CarouselThumbnails.tsx`, and `CarouselViewer.tsx`.
- **Support code:** `carousel.types.ts`, `carousel.data.ts`, `carousel.presets.ts`, and `index.ts`.
- **Style and documentation:** `carousel.styles.css` and `PARAMETROS_DO_CARROSSEL.md`.

The support modules do not appear on screen by themselves. They are reused by the visual components to keep carousel behavior consistent and maintainable.
