import { ArrowUpRight } from 'lucide-react';
import { LinkedInBrandIcon } from './SocialPlatformIcons';
import { assetUrl } from '../lib/siteAssets';
import mockup from '../content/linkedin-mockup-assets.json';
import { useLanguage } from '../i18n';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/company/fotonictq/';

export default function LinkedInHighlight() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <div className="social-linkedin-highlight">
      <div className="social-linkedin-highlight__visual">
        <a
          href={assetUrl(mockup.png.path)}
          data-lcr-card-id="6.B.3.C2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            english
              ? 'Enlarge the LinkedIn illustration in PNG'
              : 'Ampliar imagem ilustrativa do LinkedIn em PNG'
          }
        >
          <picture>
            <source srcSet={assetUrl(mockup.webp.path)} type="image/webp" />
            <img
              className="social-linkedin-highlight__tablet"
              src={assetUrl(mockup.png.path)}
              alt={
                english
                  ? 'A single hand from the left holds a tablet showing an illustration of Instituto Foton’s LinkedIn profile'
                  : 'Uma única mão vinda da esquerda segura um tablet mostrando uma ilustração do perfil do Instituto Foton no LinkedIn'
              }
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </a>
      </div>
      <div className="social-linkedin-highlight__content">
        <h2 id="social-linkedin-title">
          {english
            ? 'Follow Instituto Foton on LinkedIn'
            : 'Acompanhe o Instituto Foton no LinkedIn'}
        </h2>
        <p className="social-linkedin-highlight__handle">
          <LinkedInBrandIcon size={22} />
          <span>Instituto Foton</span>
        </p>
        <p className="social-linkedin-highlight__description">
          {english
            ? 'Discover our initiatives, research, events, and collaboration opportunities with the people building the science and innovation ecosystem.'
            : 'Conheça nossas iniciativas, pesquisas, eventos e oportunidades de colaboração com quem constrói o ecossistema de ciência e inovação.'}
        </p>
        <a
          className="social-profile-link"
          data-lcr-card-id="6.B.3.C1"
          href={LINKEDIN_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
        >
          {english ? 'Follow on LinkedIn' : 'Acompanhar no LinkedIn'}{' '}
          <ArrowUpRight size={18} aria-hidden="true" />
          <span className="sr-only">
            {' '}
            {english ? '(opens in a new tab)' : '(abre em nova aba)'}
          </span>
        </a>
      </div>
    </div>
  );
}
