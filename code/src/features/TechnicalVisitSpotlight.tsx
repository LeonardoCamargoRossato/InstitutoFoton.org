import { useState } from 'react';
import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;
const full = 'https://qvyrromhazssofombhem.supabase.co/storage/v1/object/public/foton-public/img-visitas-tecnicas/visita-03.png';

export default function TechnicalVisitSpotlight() {
  const [fallback, setFallback] = useState(false);
  return (
    <section className="section technical-visit-section spectral-divider" aria-labelledby="technical-visit-title">
      <div className="container technical-visit-grid">
        <figure className="technical-visit-photo" role="button" tabIndex={0}
          aria-label="Ampliar fotografia da Visita Técnica 03">
          <img
            src={fallback ? full : base + 'images/webp/visits/visita-03.webp'}
            data-full-image={full}
            alt="Visita Técnica 03: registro fotográfico do acervo de visitas do Instituto Foton."
            loading="lazy" decoding="async" fetchPriority="low"
            width={1200} height={740}
            onError={() => setFallback(true)}
          />
          <figcaption>Registro real do acervo · Visita Técnica 03</figcaption>
        </figure>
        <div className="technical-visit-copy">
          <p className="eyebrow"><span /> Visitas técnicas</p>
          <h2 id="technical-visit-title">O conhecimento se aproxima quando pessoas se encontram.</h2>
          <p>
            A fotografia faz parte da galeria pública de visitas técnicas do Manifesto Quântico
            Nacional. É um registro documental, diferente das cenas ilustrativas de IA que
            compõem outras áreas do portal.
          </p>
          <Link className="text-link" to="/manifesto#visitas">Conheça a galeria de visitas técnicas</Link>
        </div>
      </div>
    </section>
  );
}
