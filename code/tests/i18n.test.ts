import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../src/i18n/languageTypes';
import { ENABLED_LANGUAGES, LANGUAGES, isLocale } from '../src/i18n/languageRegistry';
import { ptBR } from '../src/i18n/catalog';

describe('Foton internationalization foundation', () => {
  it('keeps the official language order and enables only PT-BR in Stage 01', () => {
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
    expect(ENABLED_LANGUAGES.map((language) => language.locale)).toEqual([DEFAULT_LOCALE]);
  });

  it('validates locale values and persistence contract', () => {
    expect(isLocale(DEFAULT_LOCALE)).toBe(true);
    expect(isLocale('xx-XX')).toBe(false);
    expect(LOCALE_STORAGE_KEY).toBe('foton.locale');
  });

  it('contains the canonical PT-BR shell copy', () => {
    expect(ptBR.accessibility.skipToContent).toBe('Pular para o conteúdo');
    expect(ptBR.common.support).toBe('Apoie a Ciência');
  });
});
