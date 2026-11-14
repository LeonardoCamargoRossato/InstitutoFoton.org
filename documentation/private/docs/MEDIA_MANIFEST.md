# Inventário de mídia pública — arquitetura atual

- `code/public/assets/PNG/`: mídias e originais autorizados para ampliação.
- `code/public/assets/WebP/`: imagens para primeira renderização.
- `code/public/assets/img-logos-parceiros-foton/assets-svg/`: 31 logos autorizados em SVG.
- `code/public/assets/img-logos-parceiros-foton/display-svg/`: 31 versões SVG otimizadas de exibição.
- `code/public/assets/img-diretoria/`: fotografias da equipe aprovadas.
- `code/public/assets/img-haquantum/`, `code/public/assets/img-jornada/`: materiais de eventos.
- `code/public/documents/`: PDF institucional público.
- `code/scripts/data/`: inventários e relatórios **internos ao build**, não distribuídos pelo site.

Os scripts e testes conferem os 49 pares PNG/WebP e as 31 correspondências SVG. Fontes intermediárias antigas de parceiros foram descartadas da árvore de manutenção porque suas versões oficiais aprovadas já estão em `public/assets/`. Não acrescentar novos arquivos públicos sem autorização.
