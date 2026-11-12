# Refinamento editorial e transparência — 11/11/2026

**Registro inicial de execução:** 11/11/2026, 23h26 (America/Sao_Paulo).

## Objetivo
Reforçar a conexão entre ciência e pessoas no portal do Instituto Foton, preservando a identidade visual. Apresentar cinco categorias fixas de transparência, com documentos reais oriundos do acervo público.

## Referências
[Fundo Amanhã](https://fundoamanha.com/) e [Transparência do Fundo Amanhã](https://fundoamanha.com/transparencia/) — referências de hierarquia documental e narrativa humana, sem reprodução de seus materiais. A referência ao Efí orienta apenas composição de imagem, texto e respiro; não se replica layout, marca ou paleta.

## Escopo implementado
- Home com composição fotográfica do acervo público de visitas técnicas, destaques editoriais e acesso à transparência.
- Página do Instituto com registro fotográfico complementar, sem modificar a sequência luminosa da palavra “fóton”.
- Transparência com estatuto, atas, relatórios anuais, relatórios periódicos e documentos financeiros, estados vazios e erro de consulta distintos, filtro apenas em acervo volumoso, visualização e download.
- PDF da apresentação institucional de setembro de 2026 preservado como documento estático público.

## Limitações e integridade editorial
As imagens usadas são endereços já existentes na galeria pública do projeto; a disponibilidade e a permissão de uso de cada fotografia requerem confirmação institucional antes da aprovação final. As imagens têm fallback e legendas genéricas, sem atribuir identidade ou resultados. Não foi adicionada fotografia de terceiros ou pessoa fictícia.

Não há, no checkout público auditado, estatuto, atas, relatórios anuais/periódicos ou demonstrações financeiras aprovados como PDFs. A interface não os fabrica. Documentos publicados no Supabase do projeto poderão aparecer quando o backend estiver configurado e acessível.

O projeto não dispõe de versões redimensionadas confirmadas das fotografias no repositório; não foram criadas variantes presumidas nem migrado o Storage. O carregamento é progressivo e a primeira imagem do destaque recebe prioridade.

## Verificação
Executar verificações de TypeScript, lint, testes unitários, build, scanner e checagem de artefato; testar navegador e rotas em desktop/mobile. Confirmar a disponibilidade dos assets reais por HTTP e a autorização editorial antes de fechar o gate humano.

ADR reavaliado: não necessário para a mudança editorial e organização visual na infraestrutura existente.
