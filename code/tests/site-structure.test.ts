import { describe, expect, it } from 'vitest';
import { siteMenu, siteSections, siteSectionLink } from '../src/content/siteStructure';
import { siteCards } from '../src/content/siteCards';

describe('LCR — mapa de páginas, seções e cards', () => {
  it('mantém a numeração pública do menu de 1 a 7, sem duplicações', () => {
    expect(siteMenu.map((item) => item.id)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
    const allIds = siteMenu.flatMap((item) => [
      item.id,
      ...(item.children ?? []).map((child) => child.id),
    ]);
    expect(new Set(allIds).size).toBe(allIds.length);
    expect(siteMenu.find((item) => item.id === '2')?.children?.map((item) => item.id)).toEqual([
      '2.A',
      '2.B',
    ]);
    expect(siteMenu.find((item) => item.id === '4')?.children?.map((item) => item.id)).toEqual([
      '4.A',
      '4.B',
      '4.C',
    ]);
    expect(siteMenu.find((item) => item.id === '6')?.children?.map((item) => item.id)).toEqual([
      '6.A',
      '6.B',
    ]);
  });

  it('garante códigos únicos e caminhos internos do site', () => {
    expect(new Set(siteSections.map((section) => section.id)).size).toBe(siteSections.length);
    for (const section of siteSections) {
      expect(section.path.startsWith('/')).toBe(true);
      expect(siteSectionLink(section)).toBe(
        section.anchor ? section.path + '#' + section.anchor : section.path,
      );
    }
  });

  it('vincula todos os cards a uma seção e não repete identificadores', () => {
    const ids = new Set(siteSections.map((section) => section.id));
    expect(new Set(siteCards.map((card) => card.id)).size).toBe(siteCards.length);
    for (const card of siteCards) {
      expect(ids.has(card.sectionId), card.name).toBe(true);
      expect(card.id.startsWith(card.sectionId + '.C')).toBe(true);
    }
  });

  it('nomeia a Missão, Visão, Propósito e as três frentes do Instituto', () => {
    expect(siteCards.filter((card) => card.sectionId === '2.A.5').map((card) => card.name)).toEqual(
      ['Missão', 'Visão', 'Propósito'],
    );
    expect(siteCards.filter((card) => card.sectionId === '2.A.6').map((card) => card.name)).toEqual(
      ['Educação e formação', 'Pesquisa aplicada', 'Inteligência estratégica'],
    );
  });

  it('identifica os sete valores como informativos, sem clique', () => {
    const values = siteCards.filter((card) => card.sectionId === '2.A.8');
    expect(values).toHaveLength(7);
    expect(values.every((card) => card.kind === 'informativo')).toBe(true);
  });
});
