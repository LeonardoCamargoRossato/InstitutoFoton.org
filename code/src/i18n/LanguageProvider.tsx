import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from './languageTypes';
import { ENABLED_LANGUAGES, isLocale } from './languageRegistry';
import { enUS, esES, ptBR, zhCN, type TranslationCatalog } from './catalog';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationCatalog;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) && ENABLED_LANGUAGES.some((language) => language.locale === stored)
    ? stored
    : DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = (nextLocale: Locale) => {
    if (!ENABLED_LANGUAGES.some((language) => language.locale === nextLocale)) return;
    setLocaleState(nextLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t =
    locale === 'zh-CN' ? zhCN : locale === 'es-ES' ? esES : locale === 'en-US' ? enUS : ptBR;
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
