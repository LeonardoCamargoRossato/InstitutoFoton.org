import { definePageArea } from '../pageArea';

export const apoie7A = definePageArea({
  code: '7A',
  title: 'Apoie a Ciência',
  route: '/apoie',
  sectionIds: ['7.1', '7.2'],
  implementation: ['features/Support.tsx'],
  contentSources: ['content/siteStructure.ts'],
  assetSources: ['public/assets/WebP/apoie', 'public/assets/PNG/apoie'],
});
