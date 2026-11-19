import InstagramHighlight from './InstagramHighlight';
import LinkedInHighlight from './LinkedInHighlight';
import YouTubeHighlight, { YouTubeBrandIcon } from './YouTubeHighlight';
import { InstagramBrandIcon, LinkedInBrandIcon } from './SocialPlatformIcons';
import SocialPhysicsBackdrop from './SocialPhysicsBackdrop';
import './SocialMediaPage.css';

export default function SocialMediaPage() {
  return (
    <div className="social-media-page">
      <section className="social-intro">
        <SocialPhysicsBackdrop region="intro" />
        <div className="container social-intro-inner">
          <p className="eyebrow">
            <span />
            Conexões que aproximam
          </p>
          <h1>Acompanhe o Foton nas redes sociais</h1>
          <div className="social-intro-copy">
            <p>
              A ciência também acontece nos encontros, nas conversas e nas conexões que construímos
              todos os dias.
            </p>
            <p>
              Acompanhe o Instituto Foton nas redes sociais e fique por dentro das nossas
              iniciativas, pesquisas, eventos e oportunidades de participação.
            </p>
          </div>
          <nav className="social-quick-links" aria-label="Redes nesta página">
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
        </div>
      </section>
      <div className="container social-network-list">
        <InstagramHighlight />
        <section
          className="social-network social-network--linkedin"
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
