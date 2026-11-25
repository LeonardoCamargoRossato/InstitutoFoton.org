import { ArrowUpRight } from 'lucide-react';
import { InstagramBrandIcon } from './SocialPlatformIcons';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/institutofoton?bqrl=MW54N3RiZjU1a3hncA==';
const phoneSvg = 'assets/06 - Notícias/Redes Sociais/Instagram/SVG/InstagramPhoneHand.svg';

export default function InstagramHighlight() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <section
      className="social-network social-network--instagram"
      data-lcr-section-id="6.B.2"
      aria-labelledby="social-instagram-title"
    >
      <div className="social-instagram-highlight">
        <div className="social-instagram-highlight__content">
          <h2 id="social-instagram-title">
            {english
              ? 'Follow Instituto Foton on Instagram'
              : 'Acompanhe o Instituto Foton no Instagram'}
          </h2>
          <p className="social-instagram-highlight__handle">
            <InstagramBrandIcon size={22} />
            <span>@institutofoton</span>
          </p>
          <p className="social-instagram-highlight__description">
            {english
              ? 'A closer look at the science we build together. Follow our meetings, research, events, and stories across social media.'
              : 'Um olhar mais próximo sobre a ciência que fazemos juntos. Acompanhe nossos encontros, pesquisas, eventos e histórias nas redes.'}
          </p>
          <a
            className="social-profile-link"
            data-lcr-card-id="6.B.2.C1"
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            {english ? 'Follow on Instagram' : 'Seguir no Instagram'}{' '}
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only">
              {' '}
              {english ? '(opens in a new tab)' : '(abre em nova aba)'}
            </span>
          </a>
        </div>
        <div className="social-instagram-highlight__visual">
          <img
            className="social-instagram-highlight__phone"
            src={assetUrl(phoneSvg)}
            alt={
              english
                ? 'Original image of a hand holding a phone with a black screen'
                : 'Imagem original de uma mão segurando um celular com tela preta'
            }
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
