import { HeartHandshake } from 'lucide-react';
import { Intro, Heading, Action } from '../components/ui';
import { useLanguage } from '../i18n';

export default function Support() {
  const { locale } = useLanguage();
  const copy = (pt: string, en: string) => (locale === 'en-US' ? en : pt);
  return (
    <>
      <Intro
        eyebrow={copy('Apoie a Ciência', 'Support Science')}
        title={copy('Apoiar a ciência começa com uma conversa.', 'Supporting science starts with a conversation.')}
        id="apoie-inicio"
        sectionCode="7.1"
      >
        <p>
          {copy('O Instituto Foton aproxima ciência, educação e sociedade. Conheça caminhos para dialogar com a equipe sobre colaboração institucional.', 'Instituto Foton brings science, education, and society closer. Explore ways to discuss institutional collaboration with our team.')}
        </p>
      </Intro>
      <section className="section" id="apoie-contato" data-lcr-section-id="7.2">
        <div className="container split">
          <div>
            <HeartHandshake size={44} strokeWidth={1.3} aria-hidden="true" />
            <Heading eyebrow={copy('Contato institucional', 'Institutional contact')} title={copy('Vamos conversar sobre colaboração.', 'Let’s talk about collaboration.')} />
          </div>
          <div className="body-copy">
            <p>
              {copy('Interessado em conhecer o Instituto, discutir cooperação científica ou avaliar possibilidades de apoio? Consulte os canais oficiais.', 'Would you like to learn about the Institute, discuss scientific cooperation, or explore support opportunities? Contact the official channels.')}
            </p>
            <p>
              {copy('O apoio à ciência começa com diálogo, objetivos compartilhados e acompanhamento institucional.', 'Supporting science begins with dialogue, shared goals, and institutional follow-up.')}
            </p>
            <div className="actions">
              <Action to="/contato">{copy('Canais de contato', 'Contact channels')}</Action>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}