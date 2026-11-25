# Logo gallery

This folder contains the reusable visual structure for partner and brand-logo collections.

## File documentation

| File | Description |
| --- | --- |
| `LogoGallery.tsx` | Renders grouped logos and delegates each item to the visual logo card without knowing site-specific partner data. |
| `LogoGalleryCard.tsx` | Displays a brand mark, textual fallback, optional contrast treatment, external link, and accessibility metadata. |
| `logo-gallery.types.ts` | Defines generic logo data and gallery/card properties without importing Foton-specific partner content. |

A feature adapts its institutional data to the generic gallery item contract, allowing this gallery to be reused by another site.
