import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../src/i18n/languageTypes';
import { ENABLED_LANGUAGES, LANGUAGES, isLocale } from '../src/i18n/languageRegistry';
import { enUS, ptBR } from '../src/i18n/catalog';

describe('Foton internationalization foundation', () => {
  it('keeps the official language order and enables validated PT-BR and English in Stage 02', () => {
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
    expect(ENABLED_LANGUAGES.map((language) => language.locale)).toEqual([DEFAULT_LOCALE, 'en-US']);
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
