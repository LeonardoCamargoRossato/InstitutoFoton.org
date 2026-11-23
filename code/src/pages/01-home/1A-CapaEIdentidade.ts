import { definePageArea } from '../pageArea';

export const home1A = definePageArea({
  code: '1A',
  title: 'Capa, identidade e apresentação',
  route: '/',
  sectionIds: ['1.1', '1.2'],
  implementation: ['features/PublicPages.tsx#Home', 'components/HomeAtomEntrance.tsx'],
  contentSources: ['content/siteStructure.ts', 'features/content.ts'],
  assetSources: ['public/assets/WebP/home', 'public/assets/PNG/home'],
});
