# Instituto Foton — International Compliance Baseline

**Repository:** [InstitutoFoton.org](https://github.com/LeonardoCamargoRossato/InstitutoFoton.org)  
**Reference branch:** `main`  
**Reference SHA:** `e4db9832c9c8c815309c554a0a030ca7d47c0bb8`  
**Assessment date:** 2026-11-24  
**Assessment type:** diagnostic baseline only

## Scope and guardrails

This assessment covered architecture, documentation, naming, assets, CI/CD, testing, security, privacy, external services, and product-structure mapping. It did not modify functionality, appearance, routes, assets, dependencies, permissions, workflows, or production services.

The reference standards were the current LCR Framework documents: `LCR_WORKFLOW.md`, `LCR_GUARDRAILS.md`, `LCR_NAMING_CONVENTIONS.md`, `LCR_FRAMEWORK_DOCUMENTATION_STANDARD.md`, `LCR_ASSET_ORGANIZATION_STANDARD.md`, `LCR_CICD_STANDARD.md`, `LCR_TESTING_STANDARD.md`, `LCR_PERFORMANCE_STANDARD.md`, `LCR_RESOURCE_GOVERNANCE_STANDARD.md`, `LCR_QUALITY_SECURITY_AUDITOR_README.md`, ADR-0014, ADR-0015, and ADR-0016 from the [LCR Framework documentation](https://github.com/LeonardoCamargoRossato/NV-Quantum-VirtualLab/tree/main/documentation).

## Repository baseline

| Area | Evidence |
| --- | --- |
| Source | `code/src/` |
| Public assets | `code/public/assets/` |
| Scripts | `code/scripts/` |
| Tests | `code/tests/` |
| Documentation | `documentation/` |
| CI | `.github/workflows/ci.yml` |
| Deployment | `.github/workflows/deploy-pages.yml` |
| Tracked files | 641 |
| Tracked directories | 160 |
| TypeScript/TSX files | 137 |
| CSS files | 18 |
| Markdown files | 59 |
| README files | 46 |

## GitHub and Quality Gate

- Open pull requests at assessment time: **0**.
- Latest main Quality checks: [run 634](https://github.com/LeonardoCamargoRossato/InstitutoFoton.org/actions/runs/45486520028).
- Latest main Quality checks conclusion: **success**.
- The CI runs secret scanning, documentation validation, formatting, typecheck, lint, unit tests, build, asset validation, static-artifact validation, E2E tests, and dependency auditing.
- GitHub Pages deployment is separated into a workflow triggered from `main`.
- Earlier failures during the README documentation PR were corrected before merge and are historical, not current regressions.

## Compliance matrix

| Requirement ID | Standard | Current implementation / evidence | Status | Severity | Recommended correction | Validation |
| --- | --- | --- | --- | --- | --- | --- |
| BASE-01 | LCR Workflow | Source, documentation, scripts, tests, assets, and workflows have recognizable locations. | Compliant | — | Maintain separation. | Tree inventory |
| BASE-02 | Documentation | Architectural directories contain READMEs; public documentation has an allowlist in `check-documentation.mjs`. | Partially compliant | P2 | Keep inventories synchronized. | `docs:check` passed |
| BASE-03 | International language | Public READMEs, comments, menu labels, page titles, asset directories, and source catalog names contain Portuguese. | Non-compliant | P1 | Plan a staged English migration with reference updates and editorial review. | Not started |
| BASE-04 | Naming | Technical source names are mostly consistent, but public assets contain spaces, accents, numeric prefixes, and Portuguese names. | Partially compliant | P1 | Create a migration map before renaming public paths. | Not started |
| BASE-05 | Product structure mapping | `siteMenu`, `siteSections`, `pageManifests`, routes, and implementations are explicitly linked and tested. | Compliant | — | Preserve and extend the map. | Structure tests passed |
| BASE-06 | Asset organization | Assets are grouped by page/function and preserve WebP/PNG/SVG variants. | Partially compliant | P2 | Complete an asset catalog with logical IDs, sources, derivatives, approval, and references. | Partially evidenced |
| BASE-07 | CI/CD | One principal Quality Gate and a separate Pages deployment workflow exist. | Compliant | — | Verify branch protection settings separately. | Workflow and run verified |
| BASE-08 | Testing | Unit, component, structure, asset, documentation, and Playwright E2E tests exist. | Compliant | — | Add contract tests for future external boundaries. | Quality Gate passed |
| BASE-09 | Test isolation | Current CI path is static and has no required production backend. | Partially compliant | P2 | Add explicit network/endpoint assertions for future integrations. | Not fully verified |
| BASE-10 | Security/privacy | Secret scanning, documentation allowlisting, prohibited-path checks, and public-agent guardrails exist. | Compliant | — | Verify repository settings and branch protection. | Code controls passed |
| BASE-11 | Performance | WebP preparation, asset checks, artifact checks, and E2E validation exist. | Partially compliant | P2 | Establish route-level byte, request, LCP, INP, and CLS baselines. | Not quantitatively verified |
| BASE-12 | Resource governance | Static GitHub Pages delivery and versioned local assets are used. | Partially compliant | P2 | Record hosting, CI-minute, storage, and egress assumptions. | Not verified |
| BASE-13 | External services | GitHub Pages is verified; no production external service was exercised. | Partially compliant | P2 | Maintain a service inventory with owner, limits, and contingency. | Partial |
| BASE-14 | Documentation language | Documentation is versioned and linked, but public material remains partly Portuguese. | Partially compliant | P1 | Establish English as the repository language without rewriting history silently. | Not started |
| BASE-15 | Privacy boundary | Public guardrails reject private documents, secrets, and raw private records. | Compliant | — | Keep sensitive evidence outside this repository. | CI controls passed |
| BASE-16 | Operational evidence | SHA, PR state, workflow state, inventory, and findings are recorded here. | Compliant | — | Re-run after each migration batch. | Baseline complete |

## Architecture map

```text
Navigation menu
  -> code/src/content/siteStructure.ts
  -> code/src/pages/pageManifest.ts
  -> feature route implementations
  -> content catalogs and page mirror
  -> reusable components and styles
  -> public assets
```

The relationship is explicit and tested. The main structural risk is the cost of renaming Portuguese paths and public labels while preserving GitHub Pages URLs and runtime asset references.

## Confirmed language and naming findings

Examples include:

- `01 - Início`, `O Instituto`, `Visitas Técnicas`, and `P&D - Cientista Inovador` in public asset paths.
- Portuguese labels such as `Início`, `O Instituto`, `Nossa Equipe`, `Notícias`, and `Apoie a Ciência` in the site catalog.
- Portuguese prose in public READMEs, comments, and documentation.
- Portuguese institutional concepts in public asset filenames.

Recommended migration order:

1. Translate documentation and comments without changing identifiers.
2. Translate user-visible labels through content catalogs.
3. Introduce stable asset aliases and catalog IDs.
4. Migrate internal directory names with automated reference checks.
5. Change public routes only with compatibility aliases or redirects.
6. Run the complete Quality Gate after each bounded batch.

## Not verified

- Branch protection and required-check settings.
- GitHub Pages environment approval settings.
- Google Drive backup synchronization.
- Production headers, cache behavior, and field performance.
- Billing, quota, egress, and external service dashboards.
- External DNS/domain configuration.

## Acceptance result

- Reference SHA recorded: **yes**.
- Open PR/conflict/check inventory: **yes; zero open PRs; main Quality Gate green**.
- Architecture inventory: **yes**.
- Validation command inventory: **yes**.
- Historical failures separated from current regressions: **yes**.
- Security/privacy controls mapped: **yes**.
- Navigation, route, page, and asset relationships mapped: **yes**.
- LCR naming contradictions identified: **yes**.
- Functional regressions introduced: **none; diagnostic-only**.

This report records the baseline. It does not authorize the English migration or any asset/path rename. Those changes require a separate bounded implementation plan and validation cycle.
