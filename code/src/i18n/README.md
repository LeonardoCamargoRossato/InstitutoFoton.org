# Internationalization

The `src/i18n` directory owns locale state, language metadata, and typed translation catalogs.

| Folder | Purpose | Keywords | Detailed responsibility |
|---|---|---|---|
| `catalogs/` (planned) | Translation catalogs | locale, copy, coverage | Future stages will add one validated catalog per language without changing component contracts. |
| `tests/` (planned) | i18n validation | coverage, fallback, responsive | Future stages will centralize locale coverage and selector behavior tests. |

| File | Responsibility |
|---|---|
| `languageTypes.ts` | Defines the locale union, language metadata contract, default locale, and storage key. |
| `languageRegistry.ts` | Registers the official eight-language sequence; only Brazilian Portuguese is enabled in Stage 01. |
| `catalog.ts` | Typed canonical PT-BR shell vocabulary used by shared layout and accessibility controls. |
| `LanguageProvider.tsx` | Provides locale state, persistence, document language metadata, and the typed catalog. |
| `index.ts` | Public exports for the i18n boundary. |
