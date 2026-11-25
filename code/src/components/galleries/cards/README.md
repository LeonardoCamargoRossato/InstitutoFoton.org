# Card gallery

This folder contains a generic collection layout that composes concrete card components without imposing their visual type.

## File documentation

| File                    | Description                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `CardGallery.tsx`       | Receives a collection and a `renderItem` function, allowing the gallery to arrange ActionCard, InfoCard, or any other card implementation. |
| `CardGalleryItem.tsx`   | Provides an extension point for individual items without imposing markup or a specific visual type.                                        |
| `card-gallery.types.ts` | Defines the collection data, render function, and item properties used by the gallery.                                                     |

The gallery organizes the collection; each concrete card remains responsible for its own appearance, action, and content.
