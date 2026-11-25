# Image viewers

This folder centralizes the shared experience for viewing images at enlarged size.

## File documentation

| File | Description |
| --- | --- |
| `ImageZoomDialog.tsx` | Opens an image in a dialog with zoom, navigation, download, credits, and fullscreen support. |
| `SiteImageViewer.tsx` | Connects site-content images to the shared viewer when the user clicks or uses the keyboard. |
| `index.ts` | Re-exports viewer components for carousels and pages without exposing the internal file organization. |

Viewer components own the media-viewing interaction; page features remain responsible for supplying content, captions, and context.
