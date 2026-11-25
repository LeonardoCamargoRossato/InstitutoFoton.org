# Automation scripts

This folder contains deterministic scripts used for builds, audits, asset preparation, publication generation, and project validation. They are safe to run in CI and do not contain application UI components.

## Folder overview

| Folder  | Short description | Keywords                    | Detailed purpose                                                                                                                                                          |
| ------- | ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/` | Validation data   | inventories, catalogs, JSON | Stores machine-readable inventories and catalogs consumed by the automation scripts. These files describe controlled project inputs; they are not editorial page content. |

## File documentation

| File                                | Description                                                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `audit-dependencies.mjs`            | Audits production and development npm dependencies, applying the documented temporary exception policy when applicable.                         |
| `audit-dependencies.test.mjs`       | Unit tests for dependency-audit classification and exception handling.                                                                          |
| `bootstrap-static-assets.mjs`       | Prepares the approved static asset tree, converts source media when required, and writes the asset inventory used by validation.                |
| `check-documentation.mjs`           | Verifies documentation boundaries, approved public documentation files, and required repository documentation controls.                         |
| `check-pages-artifact.mjs`          | Validates the generated static-site artifact, expected routes, assets, partner logos, and publication constraints before deployment.            |
| `generate-presentation-preview.mjs` | Renders the approved institutional PDF pages into optimized WebP previews for the published site.                                               |
| `postbuild.mjs`                     | Finalizes the Vite output by generating route copies, fallback navigation, metadata, robots instructions, sitemap data, and deployment markers. |
| `prepare-webp.mjs`                  | Validates PNG/WebP pairs, detects duplicate source content, optionally generates WebP previews, and writes conversion reports.                  |
| `scan-secrets.mjs`                  | Scans tracked and untracked project files for restricted paths, credentials, private keys, and known secret patterns.                           |
| `SECURITY_EXCEPTION_PICOMATCH.md`   | Records the temporary, scoped npm advisory exception, its controls, review deadline, and removal criteria.                                      |

## Data folder

The `data/` folder contains controlled JSON inputs shared by validation and asset scripts:

- `asset-inventory.json`: canonical inventory of approved PNG/WebP asset pairs and their metadata.
- `partner-logo-names.json`: canonical mapping between partner logo slugs and approved SVG filenames.
- `partner-svg-inventory.json`: inventory and metadata used to verify the approved partner SVG collection.

The data files are operational inputs, not pages or reusable UI components. Changes to them must be reviewed together with the scripts that consume them.

Scripts must remain deterministic, documented, and safe to run in CI.
