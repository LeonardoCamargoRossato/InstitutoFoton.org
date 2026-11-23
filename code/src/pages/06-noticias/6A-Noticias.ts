import { definePageArea } from '../pageArea';

export const noticias6A = definePageArea({
  code: '6A',
  title: 'Notícias e reportagens',
  route: '/noticias',
  sectionIds: ['6.A.1', '6.A.2', '6.A.3'],
  implementation: [
    'features/Publications.tsx',
    'sections/NewsCarousel.tsx',
    'sections/NewsPhotoHighlights.tsx',
  ],
  contentSources: ['content/publications.json', 'content/news-media.json'],
  assetSources: ['public/assets/WebP/noticias', 'public/assets/PNG/noticias'],
});
