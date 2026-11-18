import { ArrowUpRight, Briefcase } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';
import mockup from '../content/linkedin-mockup-assets.json';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/company/fotonictq/';

export default function LinkedInHighlight() {
  return (
    <div className="social-linkedin-highlight">
      <div className="social-linkedin-highlight__visual">
        <a
          href={assetUrl(mockup.png.path)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ampliar imagem ilustrativa do LinkedIn em PNG"
        >
          <picture>
            <source srcSet={assetUrl(mockup.webp.path)} type="image/webp" />
            <img
              className="social-linkedin-highlight__tablet"
              src={assetUrl(mockup.png.path)}
              alt="Uma única mão vinda da esquerda segura um tablet mostrando uma ilustração do perfil do Instituto Foton no LinkedIn"
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </a>
      </div>
      <div className="social-linkedin-highlight__content">
        <p className="social-network-kicker">LinkedIn • Canal oficial</p>
        <h2 id="social-linkedin-title">Acompanhe o Instituto Foton no LinkedIn</h2>
        <p className="social-linkedin-highlight__handle">
          <Briefcase size={20} aria-hidden="true" />
          <span>Instituto Foton</span>
        </p>
        <p className="social-linkedin-highlight__description">
          Conheça nossas iniciativas, pesquisas, eventos e oportunidades de colaboração com quem
          constrói o ecossistema de ciência e inovação.
        </p>
        <a
          className="social-profile-link"
          href={LINKEDIN_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Acompanhar no LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
        <p className="social-linkedin-highlight__note">
          Imagem ilustrativa aprovada, não uma visualização em tempo real. Veja as publicações
          oficiais abaixo.
        </p>
      </div>
    </div>
  );
}
