import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import {
  publishedPartners,
  partnerGroups,
  safePartnerUrl,
  type PartnerRecord,
} from '../src/content/partners';
import { partnerLogoAssets } from '../src/content/partnerAssets';

describe('catálogo de parceiros publicados', () => {
  it('preserva somente os 31 SVGs canônicos', () => {
    for (const partner of publishedPartners()) {
      const file = partner.logo_filename;
      expect(file).toMatch(/^Logo[A-Za-z0-9]+\.svg$/);
      expect(
        existsSync(
          'public/assets/03 - Ecossistema de Parceiros/Logos dos Parceiros/SVG/assets-svg/' + file,
        ),
      ).toBe(true);
    }
  });
  it('não mantém logotipos PNG/WebP legados nem rasterização canônica de parceiros', () => {
    for (const directory of [
      'public/assets/PNG/parceiros',
      'public/assets/WebP/parceiros',
      'public/assets/03 - Ecossistema de Parceiros/Logos dos Parceiros/PNG',
      'public/assets/03 - Ecossistema de Parceiros/Logos dos Parceiros/WebP',
    ]) {
      expect(existsSync(directory)).toBe(false);
    }
  });
  it('contém 31 SVGs únicos e os 4 grupos autorizados', () => {
    const entries = publishedPartners();
    expect(entries).toHaveLength(31);
    expect(new Set(entries.map((p) => p.logo_filename)).size).toBe(31);
    expect(partnerGroups(entries).map((g) => [g.tier, g.items.length])).toEqual([
      ['Ciência e Pesquisa', 8],
      ['Ecossistema e Instituições', 9],
      ['Foton: Tecnologias Quânticas', 5],
      ['Empresas Parceiras', 9],
    ]);
    expect(
      entries.some((p) => /Logo(?:SUCESURS|Tecnosinos|Rede40)\.svg$/.test(p.logo_filename ?? '')),
    ).toBe(false);
    expect(entries.filter((p) => p.partner_url === null).map((p) => p.title)).toEqual([
      'RC',
      'Instituto Planeta',
    ]);
  });
  it('expõe somente registros publicados em pt-br, com ordem estável e IDs únicos', () => {
    const partners = publishedPartners();
    expect(partners.every((p) => p.status === 'publicado' && p.locale === 'pt-br')).toBe(true);
    expect(new Set(partners.map((p) => p.id)).size).toBe(partners.length);
    expect(partners.map((p) => p.display_order)).toEqual(
      [...partners.map((p) => p.display_order)].sort((a, b) => a - b),
    );
  });
  it('preserva a ordem informada e agrupa por partner_tier', () => {
    const record = (
      title: string,
      partner_tier: string | null,
      display_order: number,
    ): PartnerRecord => ({
      id: title,
      slug: 'item-' + display_order,
      title,
      partner_tier,
      display_order,
      status: 'publicado',
      locale: 'pt-br',
      partner_url: null,
      logo_slug: null,
    });
    const input = [
      record('Entidade A', 'Ecossistema de Instituições', 1),
      record('Entidade B', 'Ecossistema de Instituições', 2),
      record('Entidade C', 'Empresas de Quantum', 3),
      record('Entidade D', null, 4),
    ];
    expect(partnerGroups(input)).toEqual([
      { tier: 'Ecossistema de Instituições', items: input.slice(0, 2) },
      { tier: 'Empresas de Quantum', items: [input[2]] },
      { tier: 'Parceiros', items: [input[3]] },
    ]);
  });
  it('bloqueia URLs perigosas e não cria hotlinks do Storage', () => {
    expect(safePartnerUrl('javascript:alert(1)')).toBeNull();
    expect(safePartnerUrl('data:text/html,test')).toBeNull();
    expect(safePartnerUrl('https://usuario:senha@example.org')).toBeNull();
    expect(safePartnerUrl('https://example.org/sobre')).toBe('https://example.org/sobre');
    expect(safePartnerUrl('http://example.org')).toBe('http://example.org/');
    expect(partnerLogoAssets('ihr')).toEqual({
      svg: expect.stringMatching(
        /assets\/03 - Ecossistema de Parceiros\/Logos dos Parceiros\/SVG\/assets-svg\/LogoIHR\.svg$/,
      ),
    });
    expect(partnerLogoAssets('marca-exemplo')).toBeNull();
    expect(partnerLogoAssets('rede4-0')).toBeNull();
    expect(partnerLogoAssets('../segredo')).toBeNull();
  });
});
