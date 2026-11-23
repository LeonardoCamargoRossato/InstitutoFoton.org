import { definePageArea } from '../pageArea';

export const noticias6B = definePageArea({
  code: '6B',
  title: 'Redes sociais',
  route: '/redes-sociais',
  sectionIds: ['6.B.1', '6.B.2', '6.B.3', '6.B.4'],
  implementation: [
    'features/SocialMediaPage.tsx',
    'features/InstagramHighlight.tsx',
    'features/LinkedInHighlight.tsx',
    'features/YouTubeHighlight.tsx',
  ],
  contentSources: ['content/social-posts.json', 'content/social-mockup-assets.json'],
  assetSources: [
    'public/assets/WebP/noticias/redes-sociais',
    'public/assets/PNG/noticias/redes-sociais',
  ],
});
