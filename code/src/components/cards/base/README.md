# Base cards

This folder contains the shared technical foundation used by every card variant.

## File documentation

| File                 | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `BaseCard.tsx`       | Provides the shared visual structure and common states used by the different card types.                 |
| `card.types.ts`      | Defines the properties, variants, and data contracts accepted by the card family; it does not render UI. |
| `card.appearance.ts` | Converts card properties into consistent visual classes and attributes.                                  |
| `card.presets.ts`    | Provides reusable appearance combinations to keep card behavior consistent across pages.                 |
| `card.styles.css`    | Defines shared card surfaces, borders, typography, spacing, responsiveness, and visual states.           |

The final card variants live in `informative/` and `interactive/`; this folder remains their shared foundation.
