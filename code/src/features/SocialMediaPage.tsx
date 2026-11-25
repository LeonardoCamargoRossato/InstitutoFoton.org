import InstagramHighlight from './InstagramHighlight';
import LinkedInHighlight from './LinkedInHighlight';
import YouTubeHighlight, { YouTubeBrandIcon } from './YouTubeHighlight';
import { InstagramBrandIcon, LinkedInBrandIcon } from './SocialPlatformIcons';
import SocialPhysicsBackdrop from './SocialPhysicsBackdrop';
import './SocialMediaPage.css';
import { useLanguage } from '../i18n';

export default function SocialMediaPage() {
  const { locale } = useLanguage();
  const copy = (pt: string, en: string) => (locale === 'en-US' ? en : pt);
  return (
    <div className="social-media-page">
      <section className="social-intro" id="redes-intro" data-lcr-section-id="6.B.1">
        <div className="container social-intro-inner">
          <p className="eyebrow">
            <span />
            {copy('Conexões que aproximam', 'Connections that bring us closer')}
          </p>
          <h1>{copy('Acompanhe o Foton nas redes sociais', 'Follow Foton on social media')}</h1>
          <div className="social-intro-copy">
            <p>
              {copy(
                'A ciência também acontece nos encontros, nas conversas e nas conexões que construímos todos os dias.',
                'Science also happens through the encounters, conversations, and connections we build every day.',
              )}
            </p>
            <p>
              {copy(
                'Acompanhe o Instituto Foton nas redes sociais e fique por dentro das nossas iniciativas, pesquisas, eventos e oportunidades de participação.',
                'Follow Instituto Foton on social media for our initiatives, research, events, and opportunities to participate.',
              )}
            </p>
          </div>
          <nav
            className="social-quick-links"
            aria-label={copy('Redes nesta página', 'Networks on this page')}
          >
            <a className="social-quick-link--instagram" href="#social-instagram-title">
              <InstagramBrandIcon />
              Instagram
            </a>
            <a className="social-quick-link--linkedin" href="#social-linkedin-title">
              <LinkedInBrandIcon />
              LinkedIn
            </a>
            <a className="social-quick-link--youtube" href="#social-youtube-title">
              <YouTubeBrandIcon />
              YouTube
            </a>
          </nav>
          <SocialPhysicsBackdrop region="intro" />
        </div>
      </section>
      <div className="container social-network-list">
        <InstagramHighlight />
        <section
          className="social-network social-network--linkedin"
          data-lcr-section-id="6.B.3"
          aria-labelledby="social-linkedin-title"
        >
          <SocialPhysicsBackdrop region="linkedin" />
          <LinkedInHighlight />
        </section>
        <YouTubeHighlight />
      </div>
    </div>
  );
}
