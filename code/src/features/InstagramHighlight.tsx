import { useState } from 'react';
import { ArrowUpRight, Camera, ExternalLink } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/institutofoton?bqrl=MW54N3RiZjU1a3hncA==';

// SVG integral aprovado: sem rasterização, legendas falsas ou sobreposição na tela.
const phoneSvg = 'assets/06 - Notícias/Redes Sociais/Instagram/SVG/InstagramPhoneHand.svg';

export default function InstagramHighlight() {
  const [showEmbed, setShowEmbed] = useState(false);

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
          <div className="social-instagram-highlight__embed">
            <h3>Conheça o perfil oficial do Instagram</h3>
            {showEmbed ? (
              <div className="social-instagram-frame-wrap">
                <iframe
                  title="Prévia do perfil oficial do Instituto Foton no Instagram"
                  src="https://www.instagram.com/institutofoton/embed/"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="social-instagram-profile-frame"
                />
                <p>
                  O Instagram pode limitar o conteúdo incorporado. Utilize o botão Seguir no
                  Instagram para visualizar as publicações completas.
                </p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="social-embed-trigger"
                  onClick={() => setShowEmbed(true)}
                >
                  Visualizar prévia do perfil aqui <ExternalLink size={16} aria-hidden="true" />
                </button>
                <small>
                  A incorporação depende do Instagram. Ao ativá-la, seu navegador poderá
                  compartilhar dados com a plataforma.
                </small>
              </>
            )}
          </div>
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
