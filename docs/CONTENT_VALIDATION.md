# Conteúdo e validação

| Conteúdo | Fonte | Tratamento |
|---|---|---|
| Marca Foton; assinatura “Tecnologia através da ciência.” | Manual 2026 e apresentação p.1 | Preservados |
| Origem desde 2023; fundação 14/04/2025; 35 membros fundadores | Manual p.2 | História documental, não contagem atual |
| “Foton é luz. É ciência em movimento. É tecnologia com direção.” | Manual p.3 | Citação literal com fonte |
| “Acreditamos que a ciência e a engenharia devem ser protagonistas na construção de um Brasil soberano, inteligente e humano.” | Manual p.7, Golden Circle | Identificado como Golden Circle; não renomeado como Missão/Visão |
| Ensino, pesquisa e negócios/inovação | Manual p.7 e arquitetura dos pilares | Títulos/descritivos adaptados para portal; não declaração de novas capacidades |
| Excelência; Protagonismo; Inovação; Estratégia; Valorização de talentos; Ética; Colaboração | Manual p.9 | Nomes literais no seed; publicação dinâmica em `institute.values` |
| Missão e Visão | Não foi encontrado quadro completo aprovado no manual/apresentação | **Não publicadas como declarações oficiais**; MissionSection comercial diverge em foco e valores |
| Propósito na apresentação | Apresentação p.3 | Literal encontrado: “Transformar ciência de fronteira em decisões, soluções e oportunidades.” Não classificado automaticamente como Missão |
| 15 estados e 140+ membros | Apresentação p.4, setembro de 2026 | Fonte/data explícitas em Transparência; não métricas em tempo real |
| Jornada do Cientista Inovador | Apresentação p.6 | Programa citado; percurso pedagógico do portal é ilustração editorial, não inscrição/bolsa |
| 11 ODQs | `src_semAssets/pages/Manifesto.tsx`, array `odqs` | Enumeração, títulos e descrições copiados literalmente |
| Cartas e metodologia | Mesmo arquivo, arrays `cartas`/`metodologia` | Textos preservados. Título “Mobilização regional” repetido na etapa 5 é da fonte e foi mantido |
| Datas 2025/2026 da imagem | Imagem fornecida na conversa | Histórico de planejamento; não prova conclusão das etapas nem chamada futura ativa |
| Apoio científico | Prompt Mestre §13 | Propostas informativas, sem valores, beneficiários, pagamentos ou contrapartidas garantidas |
| Hero e frases de campanha | Prompt Mestre §1.1 | Propostas editoriais, não slogan oficial nem citação de missão |

## Divergências que exigem decisão editorial

- A apresentação p.5 diz **6 linhas** e inclui “Quantum no Direito”. O código de governança lista cinco, e a especificação classifica Direito como emergente. Não publicado como programa consolidado; aguarda confirmação de denominação e estágio.
- O cargo de Cynthia Michels aparece como Relações Estratégicas na apresentação e Relações Internacionais no componente legado. Diretório nominal não publicado como atual.
- A apresentação p.4 escreve `+140`; percentuais do gráfico e logos refletem aquele documento e não foram convertidos em vínculos/indicadores atuais.
- A p.3 e o manual contêm propósito/Golden Circle, mas isso não autoriza completar uma Missão/Visão oficial por inferência. Novos textos aprovados podem entrar em `site_content_blocks` com fonte literal.

## Pendências de migração

Não há exportação de `blog_posts`, `noticias` ou `parceiros`. Importador idempotente aceita registros aprovados com origem e identificador, sem usuários. Não foi acessado o banco comercial. Imagens externas do legado não foram importadas por URL sem validação de direitos.
