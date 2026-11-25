# Card library

This folder contains reusable card structures for presenting information, media, actions, and profiles across Instituto Foton. Specialized cards reuse the shared foundation defined in `base/`.

## Folder overview

| Folder         | Short description      | Keywords                          | Detailed purpose                                                                                                       |
| -------------- | ---------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `base/`        | Shared card foundation | structure, types, presets, tokens | Provides the common structure, contracts, appearance rules, presets, and styles consumed by all card variants.         |
| `informative/` | Informational cards    | content, reading, hierarchy       | Contains cards focused on presenting information without assuming a primary navigation or action.                      |
| `interactive/` | Interactive cards      | actions, links, profiles, media   | Contains cards with explicit interaction affordances, including actions, navigation, images, and profile presentation. |

## File documentation

| File                      | Description                                                                       |
| ------------------------- | --------------------------------------------------------------------------------- |
| `index.ts`                | Re-exports the card components and public contracts from the library.             |
| `INVENTARIO_DOS_CARDS.md` | Lists the existing cards, their categories, and the contexts where they are used. |
| `PARAMETROS_DOS_CARDS.md` | Documents card properties, appearance options, presets, and adaptation rules.     |

Card categories must reuse the shared visual foundation instead of introducing isolated styling conventions.
