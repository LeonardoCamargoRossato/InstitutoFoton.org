// Fonte: decisões de produto do Prompt Mestre V0. Textos abaixo são adaptações
// editoriais, não transcrições de missão, visão, valores, ODQs ou documentos oficiais.
export const researchLines = [
  {
    slug: 'computacao-quantica',
    title: 'Computação quântica',
    label: '01',
    summary: 'Novas formas de processar informação. Novas perguntas para a ciência.',
    description:
      'A computação quântica investiga como propriedades de sistemas quânticos podem ser usadas no processamento de informação. Hardware, software e firmware se encontram em uma área que exige pesquisa fundamental e colaboração entre especialidades.',
    topics: ['Hardware e software', 'Computação fotônica', 'Pesquisa colaborativa'],
  },
  {
    slug: 'comunicacao-e-criptografia',
    title: 'Comunicação e criptografia',
    label: '02',
    summary: 'Conhecimento para pensar o futuro da comunicação e da segurança.',
    description:
      'Comunicação quântica e criptografia pós-quântica são abordagens distintas. A primeira utiliza propriedades físicas de sistemas quânticos; a segunda desenvolve algoritmos criptográficos clássicos concebidos para resistir a ataques de computadores quânticos.',
    topics: ['Comunicação quântica', 'Criptografia pós-quântica', 'Transição criptográfica'],
  },
  {
    slug: 'sensores-e-materiais',
    title: 'Sensores e materiais quânticos',
    label: '03',
    summary: 'Observar com precisão para descobrir possibilidades.',
    description:
      'Sensoriamento quântico explora propriedades quânticas para realizar medições. A pesquisa em materiais busca compreender e desenvolver propriedades físicas. Essas frentes aproximam ciência fundamental e questões de aplicação, por meio de instituições e laboratórios parceiros.',
    topics: ['Medições de precisão', 'Materiais avançados', 'Propriedades físicas'],
  },
  {
    slug: 'algoritmos-e-otimizacao',
    title: 'Algoritmos e otimização',
    label: '04',
    summary: 'Investigar caminhos para problemas complexos.',
    description:
      'Algoritmos quânticos e métodos híbridos são estudados para problemas de cálculo e otimização. Saúde é uma área de interesse para investigação, sem que isso represente comprovação de resultados clínicos ou garantia de vantagem computacional.',
    topics: ['Métodos híbridos', 'Otimização', 'Aplicações em investigação'],
  },
  {
    slug: 'quantica-nos-negocios',
    title: 'Quântica nos negócios',
    label: '05',
    summary: 'Uma ponte entre pesquisa, organizações e sociedade.',
    description:
      'Compreender tecnologias emergentes também envolve formação, gestão e diálogo. Essa frente aproxima o conhecimento científico das questões enfrentadas por organizações, respeitando o estágio de maturidade de cada tecnologia.',
    topics: ['Formação', 'Gestão da inovação', 'Ciência e sociedade'],
  },
];

export const supportModalities = [
  {
    slug: 'educacao',
    number: '01',
    title: 'Abra caminhos para aprender',
    subtitle: 'Materiais e educação',
    summary: 'Apoio a materiais didáticos e atividades de aproximação com a ciência.',
    purpose:
      'Materiais de oficinas, recursos didáticos e divulgação científica podem ajudar a transformar curiosidade em aprendizado.',
    use: 'Possíveis destinações: materiais de ensino, impressão e recursos para atividades educacionais. Custos e ações serão definidos em orçamento aprovado.',
    evidence:
      'A proposta prevê divulgação das atividades realizadas e sínteses de utilização dos recursos, preservando dados pessoais dos participantes.',
    condition:
      'Critérios, orçamento, responsáveis pela execução e política de apoio ainda dependem de aprovação institucional.',
  },
  {
    slug: 'computacao',
    number: '02',
    title: 'Dê espaço a novas perguntas',
    subtitle: 'Recursos computacionais',
    summary: 'Condições para estudar, testar hipóteses e desenvolver pesquisa.',
    purpose: 'Pesquisa exige ferramentas para calcular, armazenar e analisar informações.',
    use: 'Computação, armazenamento e ambientes de testes, conforme a necessidade de cada projeto e contratos aprovados. O apoio não dá direito de acesso a hardware quântico.',
    evidence:
      'Marcos de pesquisa e sínteses de destinação dos recursos poderão ser publicados após revisão institucional.',
    condition:
      'Projetos elegíveis, custos e acesso a serviços ainda serão definidos. Não há reserva de capacidade computacional disponível nesta página.',
  },
  {
    slug: 'eventos',
    number: '03',
    title: 'Ajude a ciência a circular',
    subtitle: 'Encontros científicos',
    summary: 'Compartilhar conhecimento também faz parte da pesquisa.',
    purpose:
      'A participação em encontros pode criar conexões e colocar resultados em diálogo com a comunidade científica.',
    use: 'Inscrições, materiais de apresentação, deslocamento e hospedagem, quando previstos e formalmente autorizados.',
    evidence:
      'Participação, resultados compartilháveis e resumo das despesas aprovadas poderão compor os relatórios públicos.',
    condition:
      'Não existe chamada de apoio ou reembolso aberta. Elegibilidade, orçamento e seleção dependem de regulamento.',
  },
  {
    slug: 'pesquisa',
    number: '04',
    title: 'Aproxime uma ideia do mundo',
    subtitle: 'Apoie uma pesquisa',
    summary: 'Fomento a projetos com objetivos, orçamento e acompanhamento.',
    purpose: 'Conectar apoio da sociedade a uma pergunta de pesquisa com escopo definido.',
    use: 'No modelo proposto, cada projeto terá orçamento, etapas e instituição responsável identificados antes de qualquer captação.',
    evidence:
      'Acompanhamento por marcos, atualizações autorizadas e prestação de contas após a execução.',
    condition:
      'Modelo demonstrativo, sem campanha aberta. Nenhum projeto ou meta financeira está sendo apresentado como ativo.',
  },
  {
    slug: 'pesquisador',
    number: '05',
    title: 'Incentive quem faz perguntas',
    subtitle: 'Incentive um pesquisador',
    summary: 'Uma proposta de apoio com critérios e acompanhamento institucional.',
    purpose:
      'Criar condições para que trajetórias científicas continuem, em diferentes momentos da vida.',
    use: 'A proposta considera indicação assistida de pesquisadores autorizados ou alocação institucional com critérios aprovados. Não é uma transferência direta automática a uma pessoa.',
    evidence:
      'Critérios de seleção, destinação e relatos autorizados poderão ser disponibilizados sem expor dados particulares.',
    condition:
      'Beneficiários, valores, duração e regras ainda dependem de definição. Não há bolsa, seleção ou cadastro aberto.',
  },
  {
    slug: 'recorrente',
    number: '06',
    title: 'Faça parte da continuidade',
    subtitle: 'Apoio recorrente',
    summary: 'Uma relação de longo prazo com a ciência brasileira.',
    purpose: 'Continuidade ajuda a planejar atividades e acompanhar sua evolução.',
    use: 'A proposta é destinar apoios periódicos a programas aprovados, com regras públicas de alocação.',
    evidence:
      'O modelo prevê relatórios trimestrais e reconhecimento de apoiadores somente mediante autorização expressa.',
    condition:
      'Recorrência e faixas de reconhecimento ainda não estão ativas. Não há cobrança, assinatura ou benefício contratado.',
  },
  {
    slug: 'patrocinio',
    number: '07',
    title: 'Conecte sua organização à ciência',
    subtitle: 'Patrocínio institucional',
    summary: 'Parcerias orientadas por propósito e independência científica.',
    purpose:
      'Aproximar organizações de iniciativas de pesquisa com objetivos compartilhados e responsabilidades claras.',
    use: 'Apoio a projetos específicos, sujeito a análise de aderência, contrato e orçamento aprovado.',
    evidence:
      'Relatórios e reconhecimento institucional poderão integrar acordos. Marca em materiais e encontros são possibilidades negociadas, nunca contrapartidas automáticas.',
    condition:
      'Elegibilidade, contrapartidas, vigência e regras de conflito de interesse exigem aprovação. Não se promete retorno financeiro ou acesso a dados confidenciais.',
  },
];

export const journeySteps = [
  ['Despertar', 'Toda pesquisa começa com uma pergunta. Sua curiosidade é um ponto de partida.'],
  ['Aprender', 'Construir repertório e compreender fundamentos, no seu momento e no seu ritmo.'],
  ['Conectar', 'Encontrar outras pessoas, perspectivas e áreas do conhecimento.'],
  ['Pesquisar', 'Formular hipóteses e investigar com método, colaboração e responsabilidade.'],
  ['Compartilhar', 'Colocar o conhecimento em diálogo com a sociedade e suas necessidades.'],
];
