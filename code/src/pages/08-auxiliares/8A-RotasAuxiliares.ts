import { definePageArea } from '../pageArea';

export const auxiliares8A = definePageArea({
  code: '8A',
  title: 'Contato, apresentação, transparência e páginas legais',
  route: '/contato',
  sectionIds: ['8.1', '8.2', '8.3', '8.4'],
  implementation: [
    'features/PublicPages.tsx',
    'features/Documents.tsx',
    'features/TransparencyBoard.tsx',
  ],
  contentSources: ['content/public-documents.ts'],
  assetSources: ['public/assets/WebP/institucional', 'public/assets/PNG/institucional'],
});
