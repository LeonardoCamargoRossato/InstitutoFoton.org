import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { ENABLED_LANGUAGES } from '../../i18n/languageRegistry';
import type { Locale } from '../../i18n/languageTypes';
import brFlag from '../../assets/flags/BR.svg';
import usFlag from '../../assets/flags/US.svg';
import esFlag from '../../assets/flags/ES.svg';
import cnFlag from '../../assets/flags/CN.svg';
import './LanguageSelector.css';

const flags: Partial<Record<Locale, string>> = {
  'pt-BR': brFlag,
  'en-US': usFlag,
  'es-ES': esFlag,
  'zh-CN': cnFlag,
};

function LanguageFlag({ locale }: { locale: Locale }) {
  const id = useId();
  return (
    <svg className="language-flag" viewBox="0 0 30 24" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d="M2 3 Q9 0.1 16 3 Q22 5 28 2.6 L28 20.8 Q21 23.4 15 20.8 Q8 18.2 2 21 Z" />
        </clipPath>
        <linearGradient id={id + '-shade'}>
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".25" stopColor="#fff" stopOpacity=".2" />
          <stop offset=".6" stopColor="#000" stopOpacity=".12" />
          <stop offset=".85" stopColor="#fff" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        <image href={flags[locale] ?? brFlag} width="30" height="24" preserveAspectRatio="none" />
        <rect width="30" height="24" fill={`url(#${id}-shade)`} />
      </g>
    </svg>
  );
}

export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  return (
    <div
      className="language-selector"
      ref={box}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-control"
        aria-label={t.language.current}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <LanguageFlag locale={locale} />
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      <div id={menuId} className="language-menu" hidden={!open}>
        {ENABLED_LANGUAGES.map((language) => (
          <button
            key={language.locale}
            type="button"
            lang={language.locale}
            aria-pressed={language.locale === locale}
            onClick={() => {
              setLocale(language.locale);
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            <LanguageFlag locale={language.locale} />
            <span>{language.nativeLabel}</span>
            {language.locale === locale && <Check size={14} aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
