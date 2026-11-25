import { useLanguage } from '../../i18n';
import { ENABLED_LANGUAGES } from '../../i18n/languageRegistry';
import brFlag from '../../assets/flags/BR.svg';

const FLAG_ASSETS = { 'pt-BR': brFlag } as const;

export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <label className="language-selector">
      <span className="sr-only">{t.language.selectorLabel}</span>
      <select
        aria-label={t.language.current}
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
      >
        {ENABLED_LANGUAGES.map((language) => (
          <option key={language.locale} value={language.locale}>
            {language.nativeLabel}
          </option>
        ))}
      </select>
      <img
        src={FLAG_ASSETS[locale as keyof typeof FLAG_ASSETS] ?? brFlag}
        alt=""
        aria-hidden="true"
        width="20"
        height="14"
      />
    </label>
  );
}