import { definePageArea } from '../pageArea';

export const parceiros3A = definePageArea({
  code: '3A',
  title: 'Ecossistema de Parceiros',
  route: '/parceiros',
  sectionIds: ['3.1', '3.2'],
  implementation: ['features/PartnersPage.tsx', 'features/PartnerEcosystem.tsx'],
  contentSources: ['content/partners.ts', 'content/partnerAssets.ts', 'content/partners.json'],
  assetSources: ['public/assets/img-logos-parceiros-foton'],
});
