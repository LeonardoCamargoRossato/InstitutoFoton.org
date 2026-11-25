# Codebase structure

## Folder overview

| Folder     | Short description         | Keywords                    | Detailed purpose                                                                                                                                                   |
| ---------- | ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/`     | Application source        | React, TypeScript, routes   | Contains the application, reusable components, product features, editorial catalogs, styles, and route mirrors.                                                    |
| `public/`  | Published static files    | documents, licenses, assets | Contains files delivered directly by the static site. It must not contain README files because they become public artifacts and are rejected by the artifact gate. |
| `scripts/` | Automation and validation | build, audit, assets, CI    | Contains deterministic scripts used to validate, transform, and prepare the application.                                                                           |
| `tests/`   | Automated quality checks  | unit, integration, E2E      | Contains tests that verify behavior, structure, accessibility, and browser journeys.                                                                               |

## File documentation

- `package.json`: commands, dependencies, and project metadata.
- `package-lock.json`: reproducible dependency resolution.
- `index.html`: Vite document shell.
- `vite.config.ts`: Vite build configuration.
- `tsconfig.json`: TypeScript project configuration.
- `playwright.config.ts`: browser-test configuration.

Each architectural subfolder must document its own purpose, child folders, keywords, detailed objective, and direct files in its local `README.md`. Public assets are documented through the asset inventory and public architecture documentation rather than files deployed with the site.
