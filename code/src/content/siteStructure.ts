/**
 * LCR Workflow — catálogo de páginas e seções.
 * Códigos são referências internas; não alterar títulos ou layout visível.
 * 1 = Início; demais itens seguem a ordem do menu principal.
 */
export type SiteMenuEntry = {
  id: string;
  label: string;
  path: string;
  children?: readonly { id: string; label: string; path: string }[];
};

export const siteMenu = [
  { id: '1', label: 'Início', path: '/' },
  {
    id: '2',
    label: 'O Instituto',
    path: '/instituto',
    children: [
      { id: '2.A', label: 'Conheça o Instituto', path: '/instituto' },
      { id: '2.B', label: 'Nossa Equipe', path: '/instituto#equipe' },
    ],
  },
  { id: '3', label: 'Ecossistema de Parceiros', path: '/parceiros' },
  {
    id: '4',
    label: 'P&D - Cientista Inovador',
    path: '/pesquisa',
    children: [
      { id: '4.A', label: 'Linhas temáticas de pesquisa', path: '/pesquisa#areas-de-pesquisa' },
      { id: '4.B', label: 'Jornadas do Cientista Inovador', path: '/pesquisa/jornada' },
      { id: '4.C', label: 'HaQuantum', path: '/pesquisa/haquantum' },
    ],
  },
  { id: '5', label: 'Manifesto Quântico Nacional', path: '/manifesto' },
  {
    id: '6',
    label: 'Notícias',
    path: '/noticias',
    children: [
      { id: '6.A', label: 'Notícias', path: '/noticias' },
      { id: '6.B', label: 'Redes sociais', path: '/redes-sociais' },
    ],
  },
  { id: '7', label: 'Apoie a Ciência', path: '/apoie' },
] as const satisfies readonly SiteMenuEntry[];

export type SiteSection = {
  id: string;
  name: string;
  path: string;
  anchor?: string;
  source: string;
  cards?: string;
  /** Página ainda sem rota pública no React Router. */
  published?: boolean;
};

/**
 * Quando anchor for omitido, a seção não tem âncora independente aprovada:
 * o link abre a página, sem inventar IDs na URL.
 */
export const siteSections = [
  {
    id: '1.1',
    name: 'Capa — identidade e apresentação',
    path: '/',
    anchor: 'inicio-capa',
    source: 'PublicPages/Home',
  },
  {
    id: '1.2',
    name: 'Por que o Foton existe?',
    path: '/',
    anchor: 'porque-existe',
    source: 'PublicPages/Home',
  },
  {
    id: '1.3',
    name: 'Ecossistema Foton — indicadores',
    path: '/',
    anchor: 'ecossistema',
    source: 'PublicPages/Home',
    cards: 'Indicadores de presença',
  },
  {
    id: '1.4',
    name: 'Frentes e programas',
    path: '/',
    anchor: 'frentes',
    source: 'PublicPages/Home',
    cards: 'Programas e frentes (links)',
  },
  {
    id: '1.5',
    name: 'Documento institucional',
    path: '/',
    anchor: 'apresentacao',
    source: 'PublicPages/Home',
    cards: 'Capas da apresentação (link)',
  },
  {
    id: '1.6',
    name: 'Ecossistema de Parceiros — prévia',
    path: '/',
    anchor: 'parceiros',
    source: 'PartnerEcosystem',
    cards: 'Logotipos oficiais',
  },
  {
    id: '1.7',
    name: 'Contato com o Foton',
    path: '/',
    anchor: 'contato-foton',
    source: 'PublicPages/Home',
  },

  {
    id: '2.A.1',
    name: 'Conheça o Instituto — introdução',
    path: '/instituto',
    anchor: 'instituto-inicio',
    source: 'PublicPages/Institute',
  },
  {
    id: '2.A.2',
    name: 'Nossa história',
    path: '/instituto',
    anchor: 'nossa-historia',
    source: 'PublicPages/Institute',
  },
  {
    id: '2.A.3',
    name: 'Por que Foton? — identidade e animação',
    path: '/instituto',
    anchor: 'identidade-foton',
    source: 'PhotonIdentityAnimation',
  },
  {
    id: '2.A.4',
    name: 'Fundação — encontro e história',
    path: '/instituto',
    anchor: 'fundacao',
    source: 'FoundationTeaser',
    cards: 'Fotografia de capa (ampliação)',
  },
  {
    id: '2.A.5',
    name: 'Por que o Foton existe — missão, visão e propósito',
    path: '/instituto',
    anchor: 'por-que-existimos',
    source: 'InstitutePurpose',
    cards: 'Missão; Visão; Propósito',
  },
  {
    id: '2.A.6',
    name: 'Frentes de articulação',
    path: '/instituto',
    anchor: 'frentes-articulacao',
    source: 'PublicPages/Institute',
    cards: 'Educação e formação; Pesquisa aplicada; Inteligência estratégica',
  },
  {
    id: '2.B.1',
    name: 'Nossa equipe — pessoas',
    path: '/instituto',
    anchor: 'equipe',
    source: 'InstituteTeamDashboard',
    cards: 'Perfis individuais (abrem diálogo)',
  },
  {
    id: '2.A.7',
    name: 'Declarações institucionais',
    path: '/instituto',
    source: 'OfficialStatements',
    cards: 'Declarações oficiais',
  },
  {
    id: '2.A.8',
    name: 'Valores que colocamos em movimento',
    path: '/instituto',
    anchor: 'valores',
    source: 'OfficialStatements',
    cards:
      'Excelência; Protagonismo; Inovação; Estratégia; Valorização de talentos; Ética; Colaboração',
  },

  {
    id: '3.1',
    name: 'Apresentação do Ecossistema',
    path: '/parceiros',
    anchor: 'parceiros-intro',
    source: 'PartnersPage',
  },
  {
    id: '3.2',
    name: 'Organizações parceiras por grupo',
    path: '/parceiros',
    anchor: 'lista-parceiros',
    source: 'PartnerEcosystem',
    cards: '31 logotipos SVG oficiais (links ou informativos)',
  },

  {
    id: '4.A.1',
    name: 'Capa da Pesquisa',
    path: '/pesquisa',
    anchor: 'pesquisa-inicio',
    source: 'ResearchPages/Research',
  },
  {
    id: '4.A.2',
    name: 'Áreas de pesquisa — linhas temáticas',
    path: '/pesquisa',
    anchor: 'areas-de-pesquisa',
    source: 'ResearchPages/Research',
    cards: 'Linhas de pesquisa (links)',
  },
  {
    id: '4.A.3',
    name: 'Jornada — apresentação',
    path: '/pesquisa',
    anchor: 'jornada-do-cientista',
    source: 'ResearchPages/Research',
  },
  {
    id: '4.A.4',
    name: 'Eventos e pesquisa',
    path: '/pesquisa',
    anchor: 'eventos',
    source: 'ResearchPages/Research',
  },
  {
    id: '4.A.5',
    name: 'Etapa Pulso',
    path: '/pesquisa',
    anchor: 'etapa-pulso',
    source: 'ResearchPages/Research',
  },
  {
    id: '4.A.6',
    name: 'HaQuantum — chamada',
    path: '/pesquisa',
    anchor: 'haquantum',
    source: 'ResearchPages/Research',
  },
  {
    id: '4.B.1',
    name: 'Jornada — capa',
    path: '/pesquisa/jornada',
    anchor: 'jornada-inicio',
    source: 'ResearchPages/Journey',
  },
  {
    id: '4.B.2',
    name: 'Aprender e pesquisar em colaboração',
    path: '/pesquisa/jornada',
    anchor: 'jornada-colaboracao',
    source: 'ResearchPages/Journey',
  },
  {
    id: '4.B.3',
    name: 'Quantum Pathway',
    path: '/pesquisa/jornada',
    anchor: 'quantum-pathway',
    source: 'ResearchPages/Journey',
    cards: 'Etapas da jornada',
  },
  {
    id: '4.B.4',
    name: 'Grupos temáticos e atividades',
    path: '/pesquisa/jornada',
    anchor: 'jornada-grupos',
    source: 'ResearchPages/Journey',
  },
  {
    id: '4.B.5',
    name: 'Eventos e comunicação científica',
    path: '/pesquisa/jornada',
    anchor: 'jornada-eventos',
    source: 'ResearchPages/Journey',
  },
  {
    id: '4.C.1',
    name: 'HaQuantum — capa',
    path: '/pesquisa/haquantum',
    anchor: 'haquantum-inicio',
    source: 'ResearchPages/HaQuantum',
  },
  {
    id: '4.C.2',
    name: 'Da otimização quântica a desafios reais',
    path: '/pesquisa/haquantum',
    anchor: 'haquantum-desafios',
    source: 'ResearchPages/HaQuantum',
  },
  {
    id: '4.C.3',
    name: 'Da preparação à apresentação final',
    path: '/pesquisa/haquantum',
    anchor: 'haquantum-etapas',
    source: 'ResearchPages/HaQuantum',
    cards: 'Etapas do evento',
  },
  {
    id: '4.C.4',
    name: 'Registros do HaQuantum',
    path: '/pesquisa/haquantum',
    anchor: 'haquantum-registros',
    source: 'HaQuantumGallery',
    cards: 'Carrossel WebP/PNG',
  },

  {
    id: '5.1',
    name: 'Manifesto — capa',
    path: '/manifesto',
    anchor: 'manifesto-capa',
    source: 'ManifestoHero',
  },
  {
    id: '5.2',
    name: 'Sua voz faz parte dessa construção',
    path: '/manifesto',
    anchor: 'contribuir-manifesto',
    source: 'ManifestoParticipation',
    cards: 'Convite externo ao formulário',
  },
  { id: '5.3', name: 'Navegação por seções', path: '/manifesto', source: 'PublicPages/Manifesto' },
  {
    id: '5.4',
    name: 'O movimento',
    path: '/manifesto',
    anchor: 'sobre-manifesto',
    source: 'PublicPages/Manifesto',
  },
  {
    id: '5.5',
    name: 'Por que isso é importante?',
    path: '/manifesto',
    anchor: 'manifesto-importancia',
    source: 'PublicPages/Manifesto',
  },
  {
    id: '5.6',
    name: 'Metodologia',
    path: '/manifesto',
    anchor: 'metodologia',
    source: 'PublicPages/Manifesto',
    cards: 'Etapas do Manifesto',
  },
  {
    id: '5.7',
    name: 'Cartas regionais',
    path: '/manifesto',
    anchor: 'cartas',
    source: 'PublicPages/Manifesto',
    cards: 'Cinco cartas macrorregionais',
  },
  {
    id: '5.8',
    name: 'Visitas técnicas',
    path: '/manifesto',
    anchor: 'visitas',
    source: 'ManifestoMedia',
    cards: 'Carrossel de vinte visitas',
  },
  {
    id: '5.9',
    name: 'Onze Objetivos de Desenvolvimento Quântico',
    path: '/manifesto',
    anchor: 'odqs',
    source: 'PublicPages/Manifesto',
    cards: 'Onze ODQs',
  },
  {
    id: '5.10',
    name: 'Convite para contribuir',
    path: '/manifesto',
    anchor: 'contribuir-manifesto-final',
    source: 'ManifestoParticipation',
  },

  {
    id: '6.A.1',
    name: 'Notícias — busca e filtros',
    path: '/noticias',
    anchor: 'noticias-inicio',
    source: 'Publications/News',
  },
  {
    id: '6.A.2',
    name: 'Lista de publicações',
    path: '/noticias',
    anchor: 'noticias-publicacoes',
    source: 'Publications/News',
    cards: 'Cards de publicações (links internos ou externos)',
  },
  {
    id: '6.A.3',
    name: 'Detalhe da notícia',
    path: '/noticias',
    source: 'Publications/Article',
    cards: 'Fotos editoriais e carrosséis por matéria',
  },
  {
    id: '6.B.1',
    name: 'Redes sociais — introdução',
    path: '/redes-sociais',
    anchor: 'redes-intro',
    source: 'SocialMediaPage',
  },
  {
    id: '6.B.2',
    name: 'Instagram',
    path: '/redes-sociais',
    anchor: 'social-instagram-title',
    source: 'InstagramHighlight',
    cards: 'Imagem/CTA de acesso ao Instagram',
  },
  {
    id: '6.B.3',
    name: 'LinkedIn',
    path: '/redes-sociais',
    anchor: 'social-linkedin-title',
    source: 'LinkedInHighlight',
    cards: 'Capa/CTA do LinkedIn',
  },
  {
    id: '6.B.4',
    name: 'YouTube',
    path: '/redes-sociais',
    anchor: 'social-youtube-title',
    source: 'YouTubeHighlight',
    cards: 'Capa/CTA do canal oficial',
  },

  {
    id: '7.1',
    name: 'Apoie a Ciência — apresentação',
    path: '/apoie',
    anchor: 'apoie-inicio',
    source: 'Support',
  },
  {
    id: '7.2',
    name: 'Contato para colaboração',
    path: '/apoie',
    anchor: 'apoie-contato',
    source: 'Support',
  },

  {
    id: '8.1',
    name: 'Contato institucional (página auxiliar)',
    path: '/contato',
    anchor: 'contato-intro',
    source: 'PublicPages/Contact',
  },
  {
    id: '8.2',
    name: 'Transparência — documentos públicos',
    path: '/transparencia',
    published: false,
    anchor: 'documentos-publicos',
    source: 'TransparencyBoard',
    cards: 'Documentos PDF com ações independentes',
  },
  {
    id: '8.3',
    name: 'Apresentação institucional',
    path: '/apresentacao',
    source: 'Documents/PdfViewer',
  },
  { id: '8.4', name: 'Privacidade e termos', path: '/privacidade', source: 'PublicPages' },
] as const satisfies readonly SiteSection[];

export function siteSectionLink(section: SiteSection): string {
  return section.path + (section.anchor ? '#' + section.anchor : '');
}
