import { ArrowUpRight, Camera } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/institutofoton?bqrl=MW54N3RiZjU1a3hncA==';

// SVG integral aprovado: sem rasterização, legendas falsas ou sobreposição na tela.
const phoneSvg = 'assets/06 - Notícias/Redes Sociais/Instagram/SVG/InstagramPhoneHand.svg';

export default function InstagramHighlight() {
  return (
    <section
      className="social-network social-network--instagram"
      aria-labelledby="social-instagram-title"
    >
      <div className="social-instagram-highlight">
        <div className="social-instagram-highlight__content">
          <p className="social-network-kicker">Instagram • Canal oficial</p>
          <h2 id="social-instagram-title">Acompanhe o Instituto Foton no Instagram</h2>
          <p className="social-instagram-highlight__handle">
            <Camera size={20} aria-hidden="true" />
            <span>@institutofoton</span>
          </p>
          <p className="social-instagram-highlight__description">
            Um olhar mais próximo sobre a ciência que fazemos juntos. Acompanhe nossos encontros,
            pesquisas, eventos e histórias nas redes.
          </p>
          <a
            className="social-profile-link"
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Seguir no Instagram <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
        <div className="social-instagram-highlight__visual">
          <img
            className="social-instagram-highlight__phone"
            src={assetUrl(phoneSvg)}
            alt="Imagem original de uma mão segurando um celular com tela preta"
            width="1080"
            height="1920"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
