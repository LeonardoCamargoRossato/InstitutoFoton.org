import chineseCopy from './chineseCopy.json';
import spanishCopy from './spanishCopy.json';
import type { Locale } from './languageTypes';

const chinese: Record<string, string> = chineseCopy;
const spanish: Record<string, string> = spanishCopy;

export function localizedCopy(locale: Locale) {
  return (pt: string, en: string): string => {
    if (locale === 'zh-CN') return chinese[pt] ?? pt;
    if (locale === 'es-ES') return spanish[pt] ?? pt;
    return locale === 'en-US' ? en : pt;
  };
}
