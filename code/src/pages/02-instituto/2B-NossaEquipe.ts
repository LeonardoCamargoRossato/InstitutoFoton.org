import { definePageArea } from '../pageArea';

export const instituto2B = definePageArea({
  code: '2B',
  title: 'Nossa Equipe',
  route: '/instituto#equipe',
  sectionIds: ['2.B.1'],
  implementation: ['sections/InstituteTeamDashboard.tsx'],
  contentSources: ['content/instituteTeam.ts'],
  assetSources: ['public/assets/WebP/instituto/equipe'],
});
