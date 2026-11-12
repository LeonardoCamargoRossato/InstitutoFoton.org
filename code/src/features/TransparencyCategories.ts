export type TransparencyCategory = 'statute' | 'assembly' | 'annual' | 'periodic' | 'financial' | 'other';

export const TRANSPARENCY_CATEGORIES: ReadonlyArray<{
  id: Exclude<TransparencyCategory, 'other'>;
  title: string;
  description: string;
}> = [
  {
    id: 'statute',
    title: 'Estatuto social',
    description: 'Documento que estabelece a organização e os princípios institucionais.',
  },
  {
    id: 'assembly',
    title: 'Atas das assembleias',
    description: 'Registros de assembleias disponibilizados oficialmente.',
  },
  {
    id: 'annual',
    title: 'Relatórios anuais',
    description: 'Balanços narrativos das atividades de cada ano, quando publicados.',
  },
  {
    id: 'periodic',
    title: 'Relatórios periódicos de atividades',
    description: 'Acompanhamento das atividades ao longo do ano.',
  },
  {
    id: 'financial',
    title: 'Documentos contábeis e demonstrações financeiras',
    description: 'Demonstrações e informações financeiras publicadas oficialmente.',
  },
];

export function transparencyCategory(value: string): TransparencyCategory {
  const text = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[_-]/g, ' ').trim();
  if (/(?:^|\b)(?:statute|estatuto|bylaws)(?:\b|$)/.test(text)) return 'statute';
  if (/\b(?:ata|atas|assembleia|assembly|minutes)\b/.test(text)) return 'assembly';
  if (/\b(?:annual|anual|anuais)\b/.test(text) && /\b(?:report|relatorio|relatorios)\b/.test(text)) return 'annual';
  if (/\b(?:periodic|periodico|periodicos|trimestral|semestral|quarterly|activity|atividades|atividade)\b/.test(text)) return 'periodic';
  if (/\b(?:financial|financeiro|financeira|contabil|contabeis|balanco|dre|accounting|balance)\b/.test(text)) return 'financial';
  return 'other';
}
