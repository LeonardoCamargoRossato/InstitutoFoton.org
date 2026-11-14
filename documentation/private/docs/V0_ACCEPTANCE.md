# Matriz de aceite atual — portal estático

Esta matriz substitui as descrições da antiga V0 com Auth/SQL. A migração de limpeza ainda exige auditoria independente e aprovação humana.

| Área | Comportamento e referência atual |
| --- | --- |
| `/`, `/instituto` | Conteúdo institucional, equipe, Missão/Visão/Propósito e animações locais |
| `/pesquisa` | Seis verticais em `src/content/research-lines.json` |
| `/pesquisa/jornada`, `/jornada` | Jornada e compatibilidade com redirecionamento |
| `/pesquisa/haquantum` | Fotografias históricas e evento |
| `/manifesto` | Cartas e mídias aprovadas |
| `/noticias` | Catálogo editorial local, sem inventar artigos ausentes |
| `/apresentacao` | PDF local e pré-visualizações |
| `/parceiros` | 31 logos SVG aprovados |
| `/transparencia` | Conteúdo documental local e estados honestos |
| `/apoie`, `/contato` | Informação institucional, sem pagamento ou formulário simulado |
| `/entrar` | Informação de indisponibilidade; não há autenticação |
| GitHub Pages | Build estático, fallback de rotas, assets íntegros e sem runtime remoto |

## Verificações exigidas

Executar em `code/`: `npm ci`, `npm run scan:secrets`, `npm run docs:check`, `npm run format:check`, `npm run check`, `npm run assets:verify`, `npm run artifact:check` e `npm run test:e2e`.

Conferir que `dist/` não inclui inventários, scripts, fontes de mídia intermediárias, credenciais ou SQL. A publicação e revisão visual final dependem da auditoria e autorização.
