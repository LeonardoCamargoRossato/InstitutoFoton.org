export type Locale = 'pt-BR' | 'en-US' | 'es-ES' | 'zh-CN' | 'it-IT' | 'fr-FR' | 'de-DE' | 'ja-JP';

export type LanguageDefinition = {
  locale: Locale;
  label: string;
  nativeLabel: string;
  flagAsset: string;
  enabled: boolean;
};

export const DEFAULT_LOCALE: Locale = 'pt-BR';
export const LOCALE_STORAGE_KEY = 'foton.locale';
