# Inventário de mídia pública — arquitetura atual

- `code/public/assets/`: acervo estático organizado em pastas por seção.
- `code/public/assets/04 - P&D - Cientista Inovador/04C - HaQuantum/Galeria HaQuantum/WebP/`: oito pré-visualizações usadas pelo carrossel do HaQuantum.
- `code/public/assets/04 - P&D - Cientista Inovador/04C - HaQuantum/Galeria HaQuantum/PNG/`: oito imagens originais carregadas somente na ampliação.
- `code/public/assets/img-logos-parceiros-foton/assets-svg/`: 31 logos autorizados em SVG.
- `code/public/assets/img-logos-parceiros-foton/display-svg/`: 31 versões SVG otimizadas de exibição.
- `code/public/documents/`: PDFs institucionais públicos.
- `code/scripts/data/`: inventários e relatórios internos ao build, não distribuídos pelo site.

Os inventários, scripts e testes verificam as correspondências de formatos e os arquivos efetivamente publicados. Fontes intermediárias antigas de parceiros foram descartadas da árvore de manutenção porque suas versões oficiais aprovadas já estão em `public/assets/`. Não acrescentar novos arquivos públicos sem autorização.
