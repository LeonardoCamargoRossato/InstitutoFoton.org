import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../src/i18n/languageTypes';
import { ENABLED_LANGUAGES, LANGUAGES, isLocale } from '../src/i18n/languageRegistry';
import { enUS, esES, ptBR } from '../src/i18n/catalog';
import { localizedCopy } from '../src/i18n/localizedCopy';
import { publication, publications } from '../src/lib/backend';

describe('Foton internationalization foundation', () => {
  it('keeps the official language order and enables the three locales on the Spanish integration branch', () => {
    expect(LANGUAGES.map((language) => language.locale)).toEqual([
      'pt-BR',
      'en-US',
      'es-ES',
      'zh-CN',
      'it-IT',
      'fr-FR',
      'de-DE',
      'ja-JP',
    ]);
    expect(ENABLED_LANGUAGES.map((language) => language.locale)).toEqual([
      DEFAULT_LOCALE,
      'en-US',
      'es-ES',
    ]);
  });

  it('keeps the Spanish shell catalog aligned with Portuguese', () => {
    expect(Object.keys(esES.common)).toEqual(Object.keys(ptBR.common));
    expect(Object.keys(esES.accessibility)).toEqual(Object.keys(ptBR.accessibility));
    expect(Object.keys(esES.language)).toEqual(Object.keys(ptBR.language));
    expect(localizedCopy('es-ES')('Contato', 'Contact')).toBe('Contacto');
    expect(localizedCopy('en-US')('Contato', 'Contact')).toBe('Contact');
    expect(localizedCopy('pt-BR')('Contato', 'Contact')).toBe('Contato');
  });

  it('serves Spanish articles and filters by the stable category identifier', async () => {
    const original = await publication('fundacao-instituto-foton', 'pt-BR');
    const spanish = await publication('fundacao-instituto-foton', 'es-ES');
    expect(spanish?.title).toBe('El día en que nació el Instituto Foton.');
    expect(spanish?.id).toBe(original?.id);
    const result = await publications(0, '', 'research', 'recent', 'es-ES');
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((item) => item.category === 'Investigación')).toBe(true);
  });

  it('validates locale values and persistence contract', () => {
    expect(isLocale(DEFAULT_LOCALE)).toBe(true);
    expect(isLocale('xx-XX')).toBe(false);
    expect(LOCALE_STORAGE_KEY).toBe('foton.locale');
  });

  it('contains the canonical PT-BR and English shell copy', () => {
    expect(ptBR.accessibility.skipToContent).toBe('Pular para o conteúdo');
    expect(ptBR.common.support).toBe('Apoie a Ciência');
    expect(enUS.accessibility.skipToContent).toBe('Skip to content');
    expect(enUS.common.support).toBe('Support Science');
  });
});
