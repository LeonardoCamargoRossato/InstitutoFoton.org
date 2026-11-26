import spanishCopy from './spanishCopy.json';
import type { Locale } from './languageTypes';

const spanish: Record<string, string> = spanishCopy;

export function localizedCopy(locale: Locale) {
  return (pt: string, en: string): string => {
    if (locale === 'es-ES') return spanish[pt] ?? pt;
    return locale === 'en-US' ? en : pt;
  };
}
