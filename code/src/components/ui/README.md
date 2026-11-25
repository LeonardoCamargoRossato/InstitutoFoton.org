# Interface components

This folder contains small, reusable interface primitives. They provide consistent interaction, layout, feedback, and modal behavior without owning page-specific content.

## File documentation

| File | Description |
| --- | --- |
| `actions.tsx` | Provides internal links, safe external links, and composable action variants. |
| `layout.tsx` | Provides introductions and section titles with a consistent visual hierarchy. |
| `feedback.tsx` | Provides empty, loading, and error states with accessible semantics. |
| `Modal.tsx` | Provides a controlled `dialog` surface with close handling and focus return. |
| `index.ts` | Re-exports the interface primitives through the folder's public entry point. |

Decorative icons use `aria-hidden`, buttons declare `type="button"`, external links use `noopener noreferrer`, and state components use appropriate ARIA roles.
