import { ArrowUpRight } from 'lucide-react';
import { InstagramBrandIcon } from './SocialPlatformIcons';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

const INSTAGRAM_PROFILE = 'https://www.instagram.com/institutofoton?bqrl=MW54N3RiZjU1a3hncA==';
const phoneSvg = 'assets/06 - Notícias/Redes Sociais/Instagram/SVG/InstagramPhoneHand.svg';

export default function InstagramHighlight() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  return (
    <section
      className="social-network social-network--instagram"
      data-lcr-section-id="6.B.2"
      aria-labelledby="social-instagram-title"
    >
      <div className="social-instagram-highlight">
        <div className="social-instagram-highlight__content">
          <h2 id="social-instagram-title">
            {copy(
              'Acompanhe o Instituto Foton no Instagram',
              'Follow Instituto Foton on Instagram',
            )}
          </h2>
          <p className="social-instagram-highlight__handle">
            <InstagramBrandIcon size={22} />
            <span>@institutofoton</span>
          </p>
          <p className="social-instagram-highlight__description">
            {copy(
              'Um olhar mais próximo sobre a ciência que fazemos juntos. Acompanhe nossos encontros, pesquisas, eventos e histórias nas redes.',
              'A closer look at the science we build together. Follow our meetings, research, events, and stories across social media.',
            )}
          </p>
          <a
            className="social-profile-link"
            data-lcr-card-id="6.B.2.C1"
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy('Seguir no Instagram', 'Follow on Instagram')}{' '}
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> {copy('(abre em nova aba)', '(opens in a new tab)')}</span>
          </a>
        </div>
        <div className="social-instagram-highlight__visual">
          <img
            className="social-instagram-highlight__phone"
            src={assetUrl(phoneSvg)}
            alt={copy(
              'Imagem original de uma mão segurando um celular com tela preta',
              'Original image of a hand holding a phone with a black screen',
            )}
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
