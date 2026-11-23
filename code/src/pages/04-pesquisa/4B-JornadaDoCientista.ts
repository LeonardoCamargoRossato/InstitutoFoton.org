import { definePageArea } from '../pageArea';

export const pesquisa4B = definePageArea({
  code: '4B',
  title: 'Jornada do Cientista Inovador',
  route: '/pesquisa/jornada',
  sectionIds: ['4.B.1', '4.B.2', '4.B.3', '4.B.4', '4.B.5'],
  implementation: ['features/ResearchPages.tsx#Journey'],
  contentSources: ['content/research-lines.json', 'content/siteCards.ts'],
  assetSources: ['public/assets/WebP/jornada', 'public/assets/PNG/jornada'],
});
