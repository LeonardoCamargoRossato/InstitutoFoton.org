# Tests

This folder contains the automated quality checks for the application.

## Folder overview

| Folder     | Short description  | Keywords                       | Detailed purpose                                                                                                                                                                      |
| ---------- | ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `browser/` | Browser validation | E2E, Playwright, visual checks | Contains end-to-end tests that exercise the published user experience in a real browser, including navigation, responsive behavior, visual evidence, and performance-sensitive flows. |

## File documentation

| File                             | Description                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `cards.test.tsx`                 | Verifies reusable card rendering and expected card content behavior.                                         |
| `carousel.data.test.ts`          | Validates carousel data contracts, presets, and media metadata.                                              |
| `documentation-security.test.ts` | Tests documentation security boundaries and prevents restricted documentation from entering public surfaces. |
| `news.test.ts`                   | Validates the public news catalog, records, slugs, and required editorial fields.                            |
| `partners.test.ts`               | Validates the partner catalog, publication status, grouping, and approved logo references.                   |
| `site-structure.test.ts`         | Verifies the declared site structure, navigation entries, routes, and page-map relationships.                |
| `transparency.test.ts`           | Verifies transparency-related content and rendering contracts.                                               |
| `unit.test.ts`                   | Provides general unit coverage for shared application utilities and baseline behavior.                       |

The `browser/` subfolder documents its own E2E files in its local README. New behavior should include the narrowest appropriate test and must preserve existing coverage.
