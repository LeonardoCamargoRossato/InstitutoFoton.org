import { describe, it, expect } from 'vitest';
import { safeReturnTo, safeExternalUrl, validateBackend, dateLabel } from '../src/lib/config';
import { odqs, cartas, methodology } from '../src/features/manifesto-content';

describe('destinos e configuração', () => {
  it('rejeita redirecionamentos externos, codificados e rotas públicas', () => {
    for (const value of [
      'https://evil.test',
      '//evil.test',
      '/\\evil.test',
      '/%2f%2fevil.test',
      '/admin?next=https://evil.test',
      '/noticias',
    ])
      expect(safeReturnTo(value)).toBe('/admin');
    expect(safeReturnTo('/admin/marketing')).toBe('/admin/marketing');
    expect(safeReturnTo('/admin/diretoria')).toBe('/admin/diretoria');
  });
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
  it('recusa chaves administrativas e outro projeto Supabase', () => {
    expect(validateBackend(undefined, undefined)).toBeTruthy();
    expect(validateBackend('https://other.supabase.co', 'sb_publishable_example')).toBeTruthy();
    expect(
      validateBackend('https://qwyrnomazssofombhem.supabase.co', 'sb_secret_example'),
    ).toBeTruthy();
    const jwt = `header.${btoa(JSON.stringify({ role: 'service_role' }))}.signature`;
    expect(validateBackend('https://qwyrnomazssofombhem.supabase.co', jwt)).toBeTruthy();
    expect(
      validateBackend('https://qwyrnomazssofombhem.supabase.co', 'sb_publishable_example'),
    ).toBeNull();
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
