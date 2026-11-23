import { definePageArea } from '../pageArea';

export const pesquisa4C = definePageArea({
  code: '4C',
  title: 'HaQuantum',
  route: '/pesquisa/haquantum',
  sectionIds: ['4.C.1', '4.C.2', '4.C.3', '4.C.4'],
  implementation: ['features/ResearchPages.tsx#HaQuantum', 'features/HaQuantumGallery.tsx'],
  contentSources: ['content/research-media.json'],
  assetSources: ['public/assets/WebP/pesquisa/haquantum', 'public/assets/PNG/pesquisa/haquantum'],
});
