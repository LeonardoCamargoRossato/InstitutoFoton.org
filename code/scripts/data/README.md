# Script data

This folder contains controlled machine-readable inventories and catalogs used by automation scripts.

These files are operational inputs, not site editorial content, route definitions, or reusable UI components.

## File documentation

| File | Description |
| --- | --- |
| `asset-inventory.json` | Canonical inventory of approved PNG/WebP asset pairs, source identifiers, paths, dimensions, and related metadata. |
| `partner-logo-names.json` | Canonical mapping from partner logo slugs to approved SVG filenames. |
| `partner-svg-inventory.json` | Inventory and metadata used to validate the approved partner SVG collection. |

Changes to these files must be reviewed together with the scripts that consume them.
