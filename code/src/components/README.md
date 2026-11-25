# Component library

`components/` contains Instituto Foton's reusable visual building blocks. Pages compose these components with page-specific content and behavior; editorial data and route logic remain outside this library.

| Folder         | Short description         | Keywords                           | Detailed purpose                                                                                                                                                |
| -------------- | ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animations/`  | Visual motion library     | motion, transitions, identity      | Contains reusable animation primitives and Foton-specific motion implementations, including documented custom identity animations.                              |
| `cards/`       | Card component library    | base, informative, interactive     | Organizes shared card foundations and the informative or interactive card variants used across the site.                                                        |
| `carousel/`    | Media carousel engine     | WebP, PNG, navigation, thumbnails  | Provides the shared carousel behavior for preview media, original media, controls, thumbnails, image navigation, and enlargement.                               |
| `foundations/` | Design foundations        | tokens, color, spacing, typography | Defines the global visual tokens that establish consistent color, spacing, typography, shape, shadow, motion, and layout decisions.                             |
| `galleries/`   | Reusable gallery patterns | cards, logos, people, collections  | Groups reusable gallery compositions for card collections, partner logos, and people profiles, keeping presentation structure separate from site-specific data. |
| `ui/`          | Interface primitives      | actions, feedback, layout, modal   | Contains small reusable interface pieces such as actions, feedback states, layout helpers, and modal surfaces.                                                  |
| `viewers/`     | Image viewing experiences | zoom, fullscreen, download, media  | Centralizes image enlargement, navigation, download, fullscreen, and related media-viewing interactions.                                                        |

Each component subfolder documents its own files and responsibilities in a local README. The `components/` root should not contain unrelated loose visual files; reusable pieces remain grouped by responsibility.
