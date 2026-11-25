import { LockKeyhole } from 'lucide-react';
import { Intro, Action } from '../components/ui';
import { useLanguage } from '../i18n';

export default function Access() {
  const { locale } = useLanguage();
  const copy = (pt: string, en: string) => (locale === 'en-US' ? en : pt);
  return (
    <>
      <Intro eyebrow={copy('Área institucional', 'Institutional area')} title={copy('Acesso restrito', 'Restricted access')}>
        <p>
          {copy('O acesso administrativo é destinado às equipes responsáveis pela gestão institucional.', 'Administrative access is intended for teams responsible for institutional management.')}
        </p>
      </Intro>
      <section className="section">
        <div className="container access-shell">
          <div className="access-card">
            <LockKeyhole size={34} strokeWidth={1.3} aria-hidden="true" />
            <h2>{copy('Informações sobre acesso', 'Access information')}</h2>
            <p>{copy('Consulte os canais institucionais para orientações sobre a área administrativa.', 'Contact the institutional channels for guidance about the administrative area.')}</p>
            <Action to="/contato">{copy('Contato institucional', 'Institutional contact')}</Action>
          </div>
        </div>
      </section>
    </>
  );
}