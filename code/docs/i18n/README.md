# Foton Internationalization

Stage 01 establishes the internationalization boundary with Brazilian Portuguese as the canonical and only enabled locale.

## Official language order

1. Portuguese (Brazil) — `pt-BR`
2. English (United States) — `en-US`
3. Spanish (Spain) — `es-ES`
4. Simplified Chinese — `zh-CN`
5. Italian — `it-IT`
6. French — `fr-FR`
7. German — `de-DE`
8. Japanese — `ja-JP`

The registry contains all eight languages for traceability, but unvalidated languages remain disabled and are not offered to users.

## Stage 01 rules

- PT-BR remains the source catalog and default fallback.
- Locale preference is persisted under `foton.locale`.
- Flags are local SVG assets; no remote flag service is allowed.
- Every future language requires a complete catalog, coverage tests, responsive selector tests, and a separate reviewed PR before activation.
