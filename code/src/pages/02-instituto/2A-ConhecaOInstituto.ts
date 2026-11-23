import { definePageArea } from '../pageArea';

export const instituto2A = definePageArea({
  code: '2A',
  title: 'Conheça o Instituto',
  route: '/instituto',
  sectionIds: ['2.A.1', '2.A.2', '2.A.3', '2.A.4', '2.A.5', '2.A.6', '2.A.7', '2.A.8'],
  implementation: [
    'features/PublicPages.tsx#Institute',
    'sections/InstitutePurpose.tsx',
    'features/foundation/FoundationHistory.tsx',
    'components/PhotonIdentityAnimation.tsx',
  ],
  contentSources: ['content/institutional.ts', 'content/siteCards.ts'],
  assetSources: ['public/assets/WebP/instituto', 'public/assets/PNG/instituto'],
});
