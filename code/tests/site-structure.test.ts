import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { siteMenu, siteSections, siteSectionLink } from '../src/content/siteStructure';
import { siteCards } from '../src/content/siteCards';
import { auxiliaryRoutes, pageManifests } from '../src/pages/pageManifest';
import { home1A, home1B, home1C } from '../src/pages/01-home/PAGE';
import { instituto2A, instituto2B } from '../src/pages/02-instituto/PAGE';
import { parceiros3A } from '../src/pages/03-parceiros/PAGE';
import { pesquisa4A, pesquisa4B, pesquisa4C } from '../src/pages/04-pesquisa/PAGE';
import { manifesto5A } from '../src/pages/05-manifesto/PAGE';
import { noticias6A, noticias6B } from '../src/pages/06-noticias/PAGE';
import { apoie7A } from '../src/pages/07-apoie/PAGE';
import { auxiliares8A } from '../src/pages/08-auxiliares/PAGE';

describe('LCR — mapa de páginas, seções e cards', () => {
  it('mantém navegáveis todos os links locais dos mapas visuais', () => {
    const pagesRoot = resolve('src/pages');
    const readmes = readdirSync(pagesRoot, { recursive: true })
      .filter((entry) => String(entry).endsWith('README.md'))
      .map((entry) => join(pagesRoot, String(entry)));
    const missing: string[] = [];

    for (const readme of readmes) {
      const markdown = readFileSync(readme, 'utf8');
      for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        const href = match[1];
        if (/^(https?:|#)/.test(href)) continue;

        const target = resolve(dirname(readme), decodeURIComponent(href.split('#')[0]));
        if (!existsSync(target)) missing.push(`${readme}: ${href}`);
      }
    }

    expect(readmes).toHaveLength(9);
    expect(missing).toEqual([]);
  });

  it('mantém o espelho de páginas ligado às seções canônicas', () => {
    const manifestIds = pageManifests.flatMap(({ sectionIds }) => [...sectionIds]);
    const publishedIds = siteSections
      .filter(({ published }) => published !== false)
      .map(({ id }) => id);

    expect(new Set(manifestIds).size).toBe(manifestIds.length);
    expect(manifestIds.sort()).toEqual(publishedIds.sort());
    expect(pageManifests.map(({ route }) => route)).toContain('/instituto');
    expect(auxiliaryRoutes).toContain('/privacidade');
  });

  it('expõe todas as áreas numeradas como arquivos navegáveis', () => {
    const areas = [
      home1A,
      home1B,
      home1C,
      instituto2A,
      instituto2B,
      parceiros3A,
      pesquisa4A,
      pesquisa4B,
      pesquisa4C,
      manifesto5A,
      noticias6A,
      noticias6B,
      apoie7A,
      auxiliares8A,
    ];
    const mirroredIds = areas.flatMap(({ sections }) => sections.map(({ id }) => id));

    expect(areas.map(({ code }) => code)).toEqual([
      '1A',
      '1B',
      '1C',
      '2A',
      '2B',
      '3A',
      '4A',
      '4B',
      '4C',
      '5A',
      '6A',
      '6B',
      '7A',
      '8A',
    ]);
    expect(new Set(mirroredIds).size).toBe(mirroredIds.length);
    expect(mirroredIds.sort()).toEqual(siteSections.map(({ id }) => id).sort());
  });
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

  it('não anuncia como publicada uma página sem rota no React Router', () => {
    const transparency = siteSections.find((section) => section.id === '8.2');
    expect(transparency?.published).toBe(false);
    expect(transparency?.source).toBe('TransparencyBoard');
    expect(siteMenu.some((item) => item.path === '/transparencia')).toBe(false);
  });

  it('identifica os sete valores como informativos, sem clique', () => {
    const values = siteCards.filter((card) => card.sectionId === '2.A.8');
    expect(values).toHaveLength(7);
    expect(values.every((card) => card.kind === 'informativo')).toBe(true);
  });

  it('classifica as cartas regionais como informativas, sem ação no card', () => {
    const cartas = siteCards.find((card) => card.id === '5.7.C*');
    expect(cartas?.kind).toBe('informativo');
  });
});
