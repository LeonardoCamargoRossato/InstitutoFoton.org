# Design system foundations

This folder contains Instituto Foton's global visual decisions. It does not render components and does not contain editorial content.

## File documentation

| File | Description |
| --- | --- |
| `tokens.css` | Centralizes colors, surfaces, spacing, typography, radii, shadows, transitions, and layout limits used by the design system. |

## Adopted scales

- **Spacing:** `--space-1` (4px) through `--space-20` (80px), including `--space-7` (28px).
- **Radii:** `sm` (8px), `md` (12px), `lg` (20px), `xl` (32px), and `pill`.
- **Shadows:** shared levels plus card-specific elevations.
- **Motion:** fast and normal durations with shared easing.

New components should prefer these tokens. Specific values represent intentional exceptions and must be documented. Migration of existing styles is gradual and validated visually and through CI.
