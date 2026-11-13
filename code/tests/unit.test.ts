import { describe, it, expect } from 'vitest';
import { safeExternalUrl, dateLabel } from '../src/lib/config';
import { odqs, cartas, methodology } from '../src/features/manifesto-content';
import { imageAsset, SITE_ASSETS } from '../src/lib/siteAssets';
import { documents, officialStatements, publications } from '../src/lib/backend';

describe('destinos e configuração', () => {
  it('aceita somente links externos HTTPS sem credenciais', () => {
    expect(safeExternalUrl('https://institutofoton.com.br/manifesto')).toBe(
      'https://institutofoton.com.br/manifesto',
    );
    for (const value of [
      'javascript:alert(1)',
      'data:text/html,test',
      'http://a.test',
      'https://user:pass@a.test',
      '/admin',
    ])
      expect(safeExternalUrl(value)).toBeUndefined();
  });
  it('trata datas inválidas e não altera a data documental pelo fuso', () => {
    expect(dateLabel('invalid')).toBe('');
    expect(dateLabel('2026-09-10')).toContain('10 de setembro de 2026');
  });
});
describe('integridade documental', () => {
  it('preserva os 11 objetivos e os destaques de inclusão e formação', () => {
    expect(odqs.map((o) => o.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(odqs[5].title).toBe('Formação e talento quântico');
    expect(odqs[9].title).toBe('Cultura científica e inclusão quântica');
    expect(cartas).toHaveLength(5);
    // A repetição do título de metodologia existe na origem; não corrigir silenciosamente.
    expect(methodology[4].title).toBe('Mobilização regional');
  });
});

describe('fontes públicas estáticas sem autenticação', () => {
  it('possui 49 imagens canônicas e caminhos GitHub Pages relativos', () => {
    expect(Object.keys(SITE_ASSETS)).toHaveLength(49);
    expect(imageAsset('visita-03').pngPath).toBe('assets/PNG/visitas-tecnicas/visita-03.png');
    expect(imageAsset('visita-03').webpPath).toBe('assets/WebP/visitas-tecnicas/visita-03.webp');
    expect(imageAsset('home-hero-community').sourceType).toBe('ai-illustration');
    for (const asset of Object.values(SITE_ASSETS)) {
      expect(asset.pngPath).toMatch(/^assets\/PNG\/[^/]+\/[^/]+\.png$/);
      expect(asset.webpPath).toMatch(/^assets\/WebP\/[^/]+\/[^/]+\.webp$/);
    }
  });
  it('mantém PDF local aprovado e valores oficiais sem inventar mission/visão', async () => {
    const docs=await documents();
    expect(docs).toHaveLength(1);
    expect(docs[0].file_path).toBe('documents/apresentacao-institucional-2026-09-10.pdf');
    const statements=await officialStatements();
    expect(statements.map(s=>s.key)).toEqual(['institute.values']);
    expect(statements[0].content.split('\n')).toHaveLength(7);
  });
  it('notícias locais começam vazias e preservam filtros e paginação', async () => {
    const result=await publications(0,'algoritmo','Pesquisa','recent');
    expect(result.items).toHaveLength(0);
    expect(result.more).toBe(false);
    expect(result.configured).toBe(true);
  });
});
