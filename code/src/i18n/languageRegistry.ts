import type { LanguageDefinition, Locale } from './languageTypes';

export const LANGUAGES: readonly LanguageDefinition[] = [
  {
    locale: 'pt-BR',
    label: 'Portuguese (Brazil)',
    nativeLabel: 'Português (Brasil)',
    flagAsset: 'BR.svg',
    enabled: true,
  },
  {
    locale: 'en-US',
    label: 'English (United States)',
    nativeLabel: 'English (US)',
    flagAsset: 'US.svg',
    enabled: true,
  },
  {
    locale: 'es-ES',
    label: 'Spanish (Spain)',
    nativeLabel: 'Español',
    flagAsset: 'ES.svg',
    enabled: false,
  },
  {
    locale: 'zh-CN',
    label: 'Simplified Chinese',
    nativeLabel: '简体中文',
    flagAsset: 'CN.svg',
    enabled: false,
  },
  {
    locale: 'it-IT',
    label: 'Italian',
    nativeLabel: 'Italiano',
    flagAsset: 'IT.svg',
    enabled: false,
  },
  {
    locale: 'fr-FR',
    label: 'French',
    nativeLabel: 'Français',
    flagAsset: 'FR.svg',
    enabled: false,
  },
  { locale: 'de-DE', label: 'German', nativeLabel: 'Deutsch', flagAsset: 'DE.svg', enabled: false },
  {
    locale: 'ja-JP',
    label: 'Japanese',
    nativeLabel: '日本語',
    flagAsset: 'JP.svg',
    enabled: false,
  },
] as const;

export const ENABLED_LANGUAGES = LANGUAGES.filter((language) => language.enabled);

export function isLocale(value: string | null | undefined): value is Locale {
  return LANGUAGES.some((language) => language.locale === value);
}
