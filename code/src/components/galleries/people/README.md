# People gallery

This folder contains the reusable visual structure for people and profile collections.

## File documentation

| File                      | Description                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `PeopleGallery.tsx`       | Renders a reusable profile collection in a grid and accepts layout classes from the consuming feature. |
| `PeopleGalleryCard.tsx`   | Displays photography, name, role, thematic line, and an optional action for opening details.           |
| `people-gallery.types.ts` | Defines generic people data without importing `InstituteMember` or other Foton-specific content.       |

Dialogs, profile curation, and grouping by role remain responsibilities of the consuming feature.
