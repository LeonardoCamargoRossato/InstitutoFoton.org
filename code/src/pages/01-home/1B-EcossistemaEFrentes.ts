import { definePageArea } from '../pageArea';

export const home1B = definePageArea({
  code: '1B',
  title: 'Ecossistema, indicadores, frentes e programas',
  route: '/',
  sectionIds: ['1.3', '1.4'],
  implementation: ['features/PublicPages.tsx#Home'],
  contentSources: ['content/siteStructure.ts', 'content/siteCards.ts'],
  assetSources: ['public/assets/WebP/home'],
});
