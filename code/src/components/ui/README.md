# Interface components

This folder contains small, reusable interface pieces.

- `actions.tsx`: internal links, safe external links, and composable action variants.
- `layout.tsx`: introductions and section titles with consistent hierarchy.
- `feedback.tsx`: empty, loading, and error states with accessible semantics.
- `Modal.tsx`: `dialog` window, controlled closing, and focus return.
- `index.ts`: ponto de entrada dos componentes.

Os ícones decorativos usam `aria-hidden`, botões têm `type="button"`, links externos usam `noopener noreferrer` e estados usam papéis ARIA apropriados.
