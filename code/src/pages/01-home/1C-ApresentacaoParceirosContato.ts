import { definePageArea } from '../pageArea';

export const home1C = definePageArea({
  code: '1C',
  title: 'Apresentação, parceiros e contato',
  route: '/',
  sectionIds: ['1.5', '1.6', '1.7'],
  implementation: ['features/PublicPages.tsx#Home', 'features/PartnerEcosystem.tsx'],
  contentSources: ['content/public-documents.ts', 'content/partners.ts'],
  assetSources: ['public/assets/WebP/institucional', 'public/assets/img-logos-parceiros-foton'],
});
