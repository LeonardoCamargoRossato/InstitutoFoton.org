import InstagramHighlight from './InstagramHighlight';
import LinkedInHighlight from './LinkedInHighlight';
import YouTubeHighlight, { YouTubeBrandIcon } from './YouTubeHighlight';
import './SocialMediaPage.css';

function InstagramBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="50%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <rect
        x="2.3"
        y="2.3"
        width="19.4"
        height="19.4"
        rx="5.5"
        fill="none"
        stroke="url(#instagram-brand-gradient)"
        strokeWidth="2.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4.4"
        fill="none"
        stroke="url(#instagram-brand-gradient)"
        strokeWidth="2.5"
      />
      <circle cx="18.2" cy="5.9" r="1.4" fill="#dd2a7b" />
    </svg>
  );
}

function LinkedInBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="2.5" fill="#0a66c2" />
      <circle cx="6.6" cy="7.1" r="1.6" fill="#fff" />
      <path
        d="M5.2 10h2.8v8.4H5.2zM10 10h2.7v1.2c.6-.9 1.5-1.5 2.9-1.5 2.5 0 3.3 1.5 3.3 4v4.7h-2.8v-4.2c0-1.1-.1-2.1-1.5-2.1-1.3 0-1.8 1-1.8 2v4.3H10z"
        fill="#fff"
      />
    </svg>
  );
}

export default function SocialMediaPage() {
  return (
    <div className="social-media-page">
      <section className="social-intro">
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
          <LinkedInHighlight />
        </section>
        <YouTubeHighlight />
      </div>
    </div>
  );
}
