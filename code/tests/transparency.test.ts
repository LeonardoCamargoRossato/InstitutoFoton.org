import { describe, expect, it } from 'vitest';
import {
  TRANSPARENCY_CATEGORIES,
  transparencyCategory,
} from '../src/features/TransparencyCategories';

describe('classificação de documentos públicos', () => {
  it('mantém as cinco categorias essenciais explícitas', () => {
    expect(TRANSPARENCY_CATEGORIES.map((category) => category.id)).toEqual([
      'statute',
      'assembly',
      'annual',
      'periodic',
      'financial',
    ]);
  });
  it('aceita as categorias em português e inglês sem inferir categorias desconhecidas', () => {
    expect(transparencyCategory('statute')).toBe('statute');
    expect(transparencyCategory('Estatuto Social')).toBe('statute');
    expect(transparencyCategory('assembly_minutes')).toBe('assembly');
    expect(transparencyCategory('Atas das assembleias')).toBe('assembly');
    expect(transparencyCategory('annual_report')).toBe('annual');
    expect(transparencyCategory('Relatório anual')).toBe('annual');
    expect(transparencyCategory('activity_report')).toBe('periodic');
    expect(transparencyCategory('Relatórios periódicos')).toBe('periodic');
    expect(transparencyCategory('financial_statements')).toBe('financial');
    expect(transparencyCategory('Balanço Patrimonial')).toBe('financial');
    expect(transparencyCategory('presentation')).toBe('other');
    expect(transparencyCategory('não classificado')).toBe('other');
  });
});
