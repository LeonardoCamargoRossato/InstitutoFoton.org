# Fundamentos do Design System

Esta pasta contém as decisões visuais globais do Instituto Foton. Ela não renderiza componentes nem contém conteúdo editorial.

| Arquivo | Função |
|---|---|
| `tokens.css` | Centraliza cores, superfícies, espaçamentos, tipografia, raios, sombras, transições e limites de layout. |

## Escalas adotadas

- Espaçamento: `--space-1` (4px) até `--space-20` (80px), incluindo `--space-7` (28px).
- Raios: `sm` (8px), `md` (12px), `lg` (20px), `xl` (32px) e `pill`.
- Sombras: níveis globais e sombras específicas de cards.
- Movimento: durações rápidas e normais com easing compartilhado.

Novos componentes devem preferir estes tokens. Valores específicos devem representar exceções intencionais e ser documentados. A migração dos estilos existentes é gradual e validada visualmente e pelo CI.
