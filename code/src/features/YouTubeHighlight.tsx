import { ArrowUpRight } from 'lucide-react';
import SocialPhysicsBackdrop from './SocialPhysicsBackdrop';
import './YouTubeHighlight.css';

const YOUTUBE_CHANNEL = 'https://youtube.com/@institutofoton?si=asOgikmknRyM5y7_';

export function YouTubeBrandIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="1" y="4.2" width="22" height="15.6" rx="4.5" fill="#ff0033" />
      <path d="m10 8 6.1 4-6.1 4z" fill="#fff" />
    </svg>
  );
}

export default function YouTubeHighlight() {
  return (
    <section
      className="social-network social-network--youtube"
      aria-labelledby="social-youtube-title"
    >
      <SocialPhysicsBackdrop region="youtube" />
      <svg
        className="social-youtube-transition-wave"
        viewBox="0 0 660 32"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="social-youtube-wave-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e96481" />
            <stop offset="26%" stopColor="#f5b560" />
            <stop offset="53%" stopColor="#7cc9a3" />
            <stop offset="77%" stopColor="#55b8df" />
            <stop offset="100%" stopColor="#9d7de3" />
          </linearGradient>
        </defs>
        <path
          d="M0 16 C80 0 134 0 210 16 S348 32 425 16 S560 0 660 16"
          stroke="url(#social-youtube-wave-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="social-youtube-highlight">
        <div className="social-youtube-highlight__content">
          <h2 id="social-youtube-title">Acompanhe o Instituto Foton no YouTube</h2>
          <p className="social-youtube-highlight__handle">
            <YouTubeBrandIcon size={28} />
            <span>@institutofoton</span>
          </p>
          <p className="social-youtube-highlight__description">
            Ciência, tecnologia e inovação em vídeo. Acompanhe conteúdos, encontros e iniciativas
            que conectam pessoas e conhecimento.
          </p>
          <a
            className="social-profile-link social-profile-link--youtube"
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar canal no YouTube <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        <a
          className="social-youtube-highlight__cover"
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir canal oficial do Instituto Foton no YouTube (abre em nova aba)"
        >
          <span className="social-youtube-highlight__cover-header" aria-hidden="true">
            <span>CANAL OFICIAL</span>
            <YouTubeBrandIcon size={31} />
          </span>
          <span className="social-youtube-highlight__play" aria-hidden="true">
            <span className="social-youtube-highlight__play-triangle" />
          </span>
          <span className="social-youtube-highlight__cover-bottom" aria-hidden="true">
            <span className="social-youtube-highlight__cover-name">
              INSTITUTO FOTON
              <small>@institutofoton</small>
            </span>
            <span className="social-youtube-highlight__cover-cta">
              Assistir <ArrowUpRight size={20} />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
