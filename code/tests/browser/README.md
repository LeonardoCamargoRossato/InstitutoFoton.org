# Browser tests

This folder contains end-to-end tests executed in a real browser through Playwright.

They verify routes, navigation, responsiveness, carousels, galleries, animations, performance, and visual evidence. Tests should validate observable behavior without depending on unnecessary implementation details.

## File documentation

| File                               | Description                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| `ManifestoHero.spec.ts`            | Verifies the Manifesto hero route, media presentation, and user-visible interactions.   |
| `PhotonIdentity.spec.ts`           | Verifies the Foton identity animation and its observable rendering behavior.            |
| `ResearchJourney.spec.ts`          | Verifies the research journey navigation and rendered journey content.                  |
| `cards-full-migration.spec.ts`     | Confirms the complete migration of page cards to the standardized card structure.       |
| `cards-standardization.spec.ts`    | Checks visual and structural consistency of standardized cards.                         |
| `cards-static-hover.spec.ts`       | Ensures non-interactive cards do not expose misleading interactive hover behavior.      |
| `carousel-universal.spec.ts`       | Verifies shared carousel behavior across supported content contexts.                    |
| `carousel-visual-evidence.spec.ts` | Captures and validates visual evidence for carousel rendering and controls.             |
| `editorial.spec.ts`                | Verifies public editorial pages, content visibility, and primary editorial navigation.  |
| `foundation.spec.ts`               | Verifies the institutional foundation section and its public presentation.              |
| `home-atom-entrance.spec.ts`       | Verifies the Home entrance animation and its initial user-visible state.                |
| `institute-mobile.spec.ts`         | Verifies the Institute page layout and interactions on a mobile viewport.               |
| `institutional-evergreen.spec.ts`  | Checks stable institutional content and evergreen page behavior.                        |
| `news-partnerships.spec.ts`        | Verifies news and partnership-related routes, links, and rendered content.              |
| `partners-performance.spec.ts`     | Verifies partner-gallery rendering and performance-sensitive behavior.                  |
| `presentation-preview.spec.ts`     | Verifies institutional presentation previews and their public access flow.              |
| `site.spec.ts`                     | Covers core site navigation, routes, accessibility expectations, and baseline journeys. |
| `social-media.spec.ts`             | Verifies social-media sections, links, responsive layouts, and public calls to action.  |

Browser tests must remain deterministic, use stable public behavior, and avoid coupling assertions to incidental DOM implementation details.
