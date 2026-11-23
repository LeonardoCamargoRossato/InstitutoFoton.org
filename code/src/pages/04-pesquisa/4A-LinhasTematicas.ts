import { definePageArea } from '../pageArea';

export const pesquisa4A = definePageArea({
  code: '4A',
  title: 'Linhas temáticas de pesquisa',
  route: '/pesquisa',
  sectionIds: ['4.A.1', '4.A.2', '4.A.3', '4.A.4', '4.A.5', '4.A.6'],
  implementation: ['features/ResearchPages.tsx#Research'],
  contentSources: ['content/research-lines.json', 'content/research-media.json'],
  assetSources: ['public/assets/WebP/pesquisa', 'public/assets/PNG/pesquisa'],
});
