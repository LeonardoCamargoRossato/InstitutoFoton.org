import { describe, expect, it } from 'vitest';
import { publishedPartners, partnerGroups, safePartnerUrl, type PartnerRecord } from '../src/content/partners';
import { partnerLogoAssets } from '../src/content/partnerAssets';

describe('catálogo de parceiros publicados', () => {
  it('não inventa registros quando a exportação aprovada ainda não foi fornecida', () => {
    expect(publishedPartners()).toEqual([]);
    expect(partnerGroups()).toEqual([]);
  });
  it('preserva a ordem informada e agrupa por partner_tier', () => {
    const record = (title: string, partner_tier: string | null, display_order: number): PartnerRecord => ({
      id: title, slug: 'item-' + display_order, title, partner_tier, display_order,
      status: 'publicado', locale: 'pt-br', partner_url: null, logo_slug: null,
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
    expect(partnerLogoAssets('marca-exemplo')).toEqual({
      png: expect.stringMatching(/assets\/PNG\/parceiros\/marca-exemplo\.png$/),
      webp: expect.stringMatching(/assets\/WebP\/parceiros\/marca-exemplo\.webp$/),
    });
    expect(partnerLogoAssets('../segredo')).toBeNull();
  });
});
