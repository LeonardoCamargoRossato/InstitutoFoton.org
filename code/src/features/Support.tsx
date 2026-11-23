import { HeartHandshake } from 'lucide-react';
import { Intro, Heading, Action } from '../components/UI';

export default function Support() {
  return (
    <>
      <Intro
        eyebrow="Apoie a Ciência"
        title="Apoiar a ciência começa com uma conversa."
        id="apoie-inicio"
        sectionCode="7.1"
      >
        <p>
          O Instituto Foton aproxima ciência, educação e sociedade. Conheça caminhos para dialogar
          com a equipe sobre colaboração institucional.
        </p>
      </Intro>
      <section className="section" id="apoie-contato" data-lcr-section-id="7.2">
        <div className="container split">
          <div>
            <HeartHandshake size={44} strokeWidth={1.3} aria-hidden="true" />
            <Heading eyebrow="Contato institucional" title="Vamos conversar sobre colaboração." />
          </div>
          <div className="body-copy">
            <p>
              Interessado em conhecer o Instituto, discutir cooperação científica ou avaliar
              possibilidades de apoio? Consulte os canais oficiais.
            </p>
            <p>
              O apoio à ciência começa com diálogo, objetivos compartilhados e acompanhamento
              institucional.
            </p>
            <div className="actions">
              <Action to="/contato">Canais de contato</Action>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
