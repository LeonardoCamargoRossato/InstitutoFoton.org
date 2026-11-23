import { definePageArea } from '../pageArea';

export const manifesto5A = definePageArea({
  code: '5A',
  title: 'Manifesto Quântico Nacional',
  route: '/manifesto',
  sectionIds: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10'],
  implementation: [
    'features/PublicPages.tsx#Manifesto',
    'features/ManifestoHero.tsx',
    'features/ManifestoMedia.tsx',
  ],
  contentSources: ['features/manifesto-content.ts', 'content/public-documents.ts'],
  assetSources: ['public/assets/WebP/manifesto-quantico', 'public/assets/PNG/manifesto-quantico'],
});
