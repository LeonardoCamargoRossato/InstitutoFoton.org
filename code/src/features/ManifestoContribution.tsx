import { ArrowUpRight, ClipboardList, Clock3 } from 'lucide-react';

const questionnaireUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeYr2fuajfrVqG4fnEH4Gitja26eao_7hf7ybqRWfB98pgNgg/viewform';

type ManifestoContributionProps = {
  position: 'inicio' | 'final';
};

export default function ManifestoContribution({ position }: ManifestoContributionProps) {
  const isFirst = position === 'inicio';

  return (
    <section
      id={isFirst ? 'contribua-manifesto' : 'contribua-manifesto-final'}
      className={`section manifesto-contribution ${isFirst ? 'manifesto-contribution-top' : 'manifesto-contribution-bottom'}`}
      aria-labelledby={isFirst ? 'manifesto-form-title-top' : 'manifesto-form-title-bottom'}
    >
      <div className="container manifesto-contribution-layout">
        <div className="manifesto-contribution-copy">
          <p className="eyebrow">
            <span /> Participe da construção coletiva
          </p>
          <h2 id={isFirst ? 'manifesto-form-title-top' : 'manifesto-form-title-bottom'}>
            {isFirst
              ? 'Venha contribuir com o Manifesto Quântico Nacional.'
              : 'Sua voz também faz parte do Manifesto.'}
          </h2>
          <p>
            Você também pode participar. Você também pode contribuir com o Manifesto Quântico
            Nacional. Basta clicar no link e responder ao formulário.
          </p>
          <p>
            Compartilhe suas ideias para uma agenda brasileira de ciência, inovação e tecnologias
            quânticas.
          </p>
          <div className="manifesto-contribution-details">
            <span>
              <Clock3 size={17} aria-hidden="true" /> Cerca de 5 a 10 minutos (estimativa)
            </span>
            <span>Online e gratuito</span>
          </div>
          <p className="manifesto-contribution-disclaimer">
            O tempo varia conforme o detalhamento das suas respostas.
          </p>
        </div>
        <div className="manifesto-contribution-media">
          <a
            className="manifesto-form-link"
            href={questionnaireUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Responder ao questionário do Manifesto Quântico Nacional (abre em nova aba)"
          >
            <span className="manifesto-form-stack" aria-hidden="true">
              <span className="manifesto-form-sheet manifesto-form-preview-back">
                <span className="manifesto-form-line manifesto-form-line-wide" />
                <span className="manifesto-form-line" />
                <span className="manifesto-form-line manifesto-form-line-short" />
              </span>
              <span className="manifesto-form-sheet manifesto-form-preview-front">
                <span className="manifesto-form-band" />
                <span className="manifesto-form-preview-content">
                  <span className="manifesto-form-icon">
                    <ClipboardList size={26} strokeWidth={1.8} />
                  </span>
                  <span className="manifesto-form-preview-label">Consulta participativa</span>
                  <span className="manifesto-form-preview-title">Manifesto Quântico Nacional</span>
                  <span className="manifesto-form-question">
                    <span className="manifesto-form-line manifesto-form-line-wide" />
                    <span className="manifesto-form-line manifesto-form-line-short" />
                  </span>
                  <span className="manifesto-form-question">
                    <span className="manifesto-form-line" />
                    <span className="manifesto-form-line manifesto-form-line-wide" />
                  </span>
                </span>
              </span>
              <span className="manifesto-form-action">
                Responder formulário <ArrowUpRight size={18} />
              </span>
            </span>
          </a>
          <p className="manifesto-form-caption">
            Prévia ilustrativa. Clique no card para abrir o questionário no Google Forms.
          </p>
        </div>
      </div>
    </section>
  );
}
