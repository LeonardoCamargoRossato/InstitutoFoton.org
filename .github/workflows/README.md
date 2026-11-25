# GitHub workflows

This folder contains GitHub Actions workflow definitions used by the repository quality gate.

## File documentation

| File | Description |
| --- | --- |
| `ci.yml` | Runs the repository validation pipeline, including security scans, documentation checks, formatting, tests, asset validation, and artifact checks. |
| `deploy-pages.yml` | Builds and publishes the approved static site to GitHub Pages. |

Workflow files are infrastructure configuration; they do not render site pages or ship as public assets.
