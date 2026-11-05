# Mídia publicada

| Destino                                                      | Origem                                                                             | Uso e restrição                                                                              |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `public/foton-logo-light.png`                                | `institutofoton_sem_src.zip/public/foton-logo-light.png`                           | Arquivo original inspecionado: marca para fundo claro; sem filtros, deformação ou redesenho  |
| `public/foton-logo.png`                                      | Mesmo ZIP, `public/foton-logo.png`                                                 | Variante clara original para rodapé escuro                                                   |
| `public/favicon.png`                                         | Mesmo ZIP, `public/favicon.png`                                                    | Ícone original fornecido                                                                     |
| `public/documents/apresentacao-institucional-2026-09-10.pdf` | PDF institucional enviado separadamente para implementação do visualizador público | 7 páginas, versão setembro/2026; fallback estático solicitado até Storage remoto operacional |
| `Constellation.tsx` e composição BR                          | Criação editorial CSS                                                              | Abstrações visuais; não logotipo, pessoa, laboratório ou mapa interativo                     |
| Raleway                                                      | Pacote `@fontsource/raleway`                                                       | Fonte local com licença incluída no pacote; pesos 400/500/600/700, subconjunto Latin         |

O Manual de Marca é de uso controlado e **não** está em `public/`, no Git ou nos artefatos. Fotos das equipes e de menores não foram reutilizadas fora da apresentação institucional recebida; não foram criados depoimentos ou retratos fictícios. Logos de parceiros permanecem somente dentro do documento histórico, sem afirmar patrocínio atual.

Revisão futura: subir apenas arquivos aprovados para os buckets públicos e registrar metadados/versão em `site_documents`. A UI prefere documento aprovado do novo Supabase e mantém PDF local independente do JS. Retirar a cópia local em caso de revogação de divulgação e fazer novo build; mover para bucket privado não revoga cópias públicas já distribuídas.
