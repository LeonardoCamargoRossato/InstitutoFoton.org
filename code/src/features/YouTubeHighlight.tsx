import { ArrowUpRight } from 'lucide-react';
import SocialPhysicsBackdrop from './SocialPhysicsBackdrop';
import ElectromagneticWaveDivider from './ElectromagneticWaveDivider';
import './YouTubeHighlight.css';
import { useLanguage } from '../i18n';

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
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <section
      className="social-network social-network--youtube"
      data-lcr-section-id="6.B.4"
      aria-labelledby="social-youtube-title"
    >
      <ElectromagneticWaveDivider />
      <div className="social-youtube-highlight">
        <div className="social-youtube-highlight__content">
          <h2 id="social-youtube-title">
            {english ? 'Follow Instituto Foton on YouTube' : 'Acompanhe o Instituto Foton no YouTube'}
          </h2>
          <p className="social-youtube-highlight__handle">
            <YouTubeBrandIcon size={28} />
            <span>@institutofoton</span>
          </p>
          <p className="social-youtube-highlight__description">
            {english
              ? 'Science, technology, and innovation in video. Follow content, meetings, and initiatives that connect people and knowledge.'
              : 'Ciência, tecnologia e inovação em vídeo. Acompanhe conteúdos, encontros e iniciativas que conectam pessoas e conhecimento.'}
          </p>
          <a
            className="social-profile-link social-profile-link--youtube"
            data-lcr-card-id="6.B.4.C2"
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {english ? 'Open YouTube channel' : 'Acessar canal no YouTube'} <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> {english ? '(opens in a new tab)' : '(abre em nova aba)'}</span>
          </a>
        </div>

        <a
          className="social-youtube-highlight__cover"
          data-lcr-card-id="6.B.4.C1"
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            english
              ? 'Open Instituto Foton’s official YouTube channel (opens in a new tab)'
              : 'Abrir canal oficial do Instituto Foton no YouTube (abre em nova aba)'
          }
        >
          <span className="social-youtube-highlight__cover-header" aria-hidden="true">
            <span>{english ? 'OFFICIAL CHANNEL' : 'CANAL OFICIAL'}</span>
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
              {english ? 'Watch' : 'Assistir'} <ArrowUpRight size={20} />
            </span>
          </span>
        </a>
      </div>
      <SocialPhysicsBackdrop region="youtube" />
    </section>
  );
}
