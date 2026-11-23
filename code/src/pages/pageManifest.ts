import { siteMenu, siteSections, type SiteSection } from '../content/siteStructure';

export type PageManifest = {
  id: string;
  label: string;
  route: string;
  sectionIds: readonly string[];
  implementation: string;
};

const sectionIds = (predicate: (section: SiteSection) => boolean) =>
  siteSections.filter(predicate).map(({ id }) => id);

/** Espelho técnico: conteúdo e assets continuam nos catálogos canônicos. */
export const pageManifests = [
  {
    id: 'home',
    label: siteMenu[0].label,
    route: '/',
    sectionIds: sectionIds(({ id }) => id.startsWith('1.')),
    implementation: 'features/PublicPages.tsx#Home',
  },
  {
    id: 'instituto',
    label: siteMenu[1].label,
    route: '/instituto',
    sectionIds: sectionIds(({ id }) => id.startsWith('2.')),
    implementation: 'features/PublicPages.tsx#Institute',
  },
  {
    id: 'parceiros',
    label: siteMenu[2].label,
    route: '/parceiros',
    sectionIds: sectionIds(({ id }) => id.startsWith('3.')),
    implementation: 'features/PartnersPage.tsx',
  },
  {
    id: 'pesquisa',
    label: siteMenu[3].label,
    route: '/pesquisa',
    sectionIds: sectionIds(({ id }) => id.startsWith('4.A.')),
    implementation: 'features/ResearchPages.tsx#Research',
  },
  {
    id: 'jornada',
    label: 'Jornada do Cientista Inovador',
    route: '/pesquisa/jornada',
    sectionIds: sectionIds(({ id }) => id.startsWith('4.B.')),
    implementation: 'features/ResearchPages.tsx#Journey',
  },
  {
    id: 'haquantum',
    label: 'HaQuantum',
    route: '/pesquisa/haquantum',
    sectionIds: sectionIds(({ id }) => id.startsWith('4.C.')),
    implementation: 'features/ResearchPages.tsx#HaQuantum',
  },
  {
    id: 'manifesto',
    label: siteMenu[4].label,
    route: '/manifesto',
    sectionIds: sectionIds(({ id }) => id.startsWith('5.')),
    implementation: 'features/PublicPages.tsx#Manifesto',
  },
  {
    id: 'noticias',
    label: siteMenu[5].label,
    route: '/noticias',
    sectionIds: sectionIds(({ id }) => id.startsWith('6.A.')),
    implementation: 'features/Publications.tsx',
  },
  {
    id: 'redes-sociais',
    label: 'Redes sociais',
    route: '/redes-sociais',
    sectionIds: sectionIds(({ id }) => id.startsWith('6.B.')),
    implementation: 'features/SocialMediaPage.tsx',
  },
  {
    id: 'apoie',
    label: siteMenu[6].label,
    route: '/apoie',
    sectionIds: sectionIds(({ id }) => id.startsWith('7.')),
    implementation: 'features/Support.tsx',
  },
  {
    id: 'auxiliares',
    label: 'Páginas auxiliares',
    route: '/contato',
    sectionIds: sectionIds(({ id, published }) => id.startsWith('8.') && published !== false),
    implementation: 'features/PublicPages.tsx; features/Documents.tsx',
  },
] as const satisfies readonly PageManifest[];

export const auxiliaryRoutes = [
  '/apresentacao',
  '/contato',
  '/entrar',
  '/auth/callback',
  '/admin/*',
  '/privacidade',
  '/termos',
] as const;
