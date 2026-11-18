import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Briefcase,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';
import postsCatalog from '../content/social-posts.json';
import InstagramHighlight from './InstagramHighlight';
import LinkedInHighlight from './LinkedInHighlight';
import './SocialMediaPage.css';

const LINKEDIN_PROFILE = 'https://www.linkedin.com/company/fotonictq/';

type SocialMediaAsset = {
  webp: string;
  png: string;
  alt: string;
  credit: string;
  approval: 'approved';
};
type SocialPost = {
  id: string;
  platform: 'instagram' | 'linkedin';
  title: string;
  summary: string;
  url: string;
  embedId?: string;
  media: SocialMediaAsset | null;
  source: string;
  review: string;
};
const catalog = postsCatalog as SocialPost[];

function NetworkGallery({
  platform,
  heading,
  subtitle,
  handle,
  profile,
  buttonText,
}: {
  platform: 'instagram' | 'linkedin';
  heading: string;
  subtitle: string;
  handle: string;
  profile: string;
  buttonText: string;
}) {
  const entries = catalog.filter(
    (post) => post.platform === platform && post.review === 'link-publico-verificado',
  );
  const [active, setActive] = useState(0);
  const [showEmbed, setShowEmbed] = useState(false);
  const post = entries[active];
  const Icon = platform === 'instagram' ? Camera : Briefcase;

  function select(index: number) {
    setActive(index);
    setShowEmbed(false);
  }

  return (
    <section
      className={`social-network social-network--${platform}`}
      aria-labelledby={`social-${platform}-title`}
    >
      {platform === 'linkedin' ? (
        <LinkedInHighlight />
      ) : (
        <div className="social-network-header">
          <div className="social-network-identity">
            <span className="social-network-icon" aria-hidden="true">
              <Icon size={31} strokeWidth={1.65} />
            </span>
            <div>
              <p className="social-network-kicker">Canal institucional</p>
              <h2 id={`social-${platform}-title`}>{heading}</h2>
              <p className="social-network-handle">{handle}</p>
            </div>
          </div>
          <a
            className="social-profile-link"
            href={profile}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText} <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      )}
      <p className="social-network-subtitle">{subtitle}</p>

      {entries.length === 0 ? (
        <div className="social-gallery-unavailable">
          <span className="social-gallery-unavailable-icon">
            <ImageIcon size={34} aria-hidden="true" />
          </span>
          <div className="social-instagram-profile">
            <h3>Conheça o perfil oficial do Instagram</h3>
            <p>
              A prévia abaixo é carregada diretamente do Instagram e pode apresentar publicações
              reais do perfil @institutofoton. A visualização depende das regras da plataforma. Não
              há cópias ou postagens fictícias nesta seção.
            </p>
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
                  Não apareceu a prévia? O Instagram pode limitar o conteúdo incorporado. Utilize o
                  botão Seguir no Instagram para visualizar as publicações completas.
                </p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="social-embed-trigger social-instagram-embed-trigger"
                  onClick={() => setShowEmbed(true)}
                >
                  Visualizar prévia do perfil aqui <ExternalLink size={16} aria-hidden="true" />
                </button>
                <small>
                  A prévia é fornecida pelo Instagram. Ao ativá-la, seu navegador poderá estabelecer
                  conexão com a plataforma e processar dados conforme suas políticas.
                </small>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="social-gallery" aria-label={`Publicações verificadas do ${heading}`}>
          <div className="social-featured">
            <div className="social-preview-surface">
              {post.media?.approval === 'approved' ? (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir publicação: ${post.title}`}
                >
                  <img
                    className="social-post-image"
                    src={assetUrl(post.media.webp)}
                    alt={post.media.alt}
                    loading="lazy"
                  />
                </a>
              ) : showEmbed && platform === 'linkedin' && /^\d{19}$/.test(post.embedId || '') ? (
                <iframe
                  key={post.id}
                  title={`Publicação oficial do LinkedIn: ${post.title}`}
                  className="social-post-embed"
                  src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${post.embedId}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="social-embed-consent">
                  <span className="social-embed-symbol" aria-hidden="true">
                    <Icon size={48} strokeWidth={1.25} />
                  </span>
                  <p>Publicação original do Instituto Foton</p>
                  <strong>{post.title}</strong>
                  {platform === 'linkedin' && (
                    <>
                      <button
                        type="button"
                        className="social-embed-trigger"
                        onClick={() => setShowEmbed(true)}
                      >
                        Visualizar publicação aqui <ExternalLink size={16} aria-hidden="true" />
                      </button>
                      <small>
                        Ao carregar, o LinkedIn poderá processar dados conforme suas políticas. Se a
                        incorporação estiver indisponível, use o link da publicação original.
                      </small>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="social-featured-detail">
              <span className="social-post-counter" aria-live="polite">
                Publicação {active + 1} de {entries.length}
              </span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <a
                className="social-post-source"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir publicação original <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <div className="social-gallery-controls">
                <button
                  type="button"
                  aria-label="Publicação anterior"
                  onClick={() => select((active - 1 + entries.length) % entries.length)}
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Próxima publicação"
                  onClick={() => select((active + 1) % entries.length)}
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="social-post-selector" aria-label="Selecionar publicação">
            {entries.map((entry, index) => (
              <button
                type="button"
                key={entry.id}
                className={index === active ? 'social-post-tile is-active' : 'social-post-tile'}
                aria-pressed={index === active}
                aria-label={`Selecionar publicação ${index + 1}: ${entry.title}`}
                onClick={() => select(index)}
              >
                <span>0{index + 1}</span>
                <strong>{entry.title}</strong>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
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
            <a href="#social-instagram-title">
              <Camera size={20} aria-hidden="true" />
              Instagram
            </a>
            <a href="#social-linkedin-title">
              <Briefcase size={20} aria-hidden="true" />
              LinkedIn
            </a>
          </nav>
        </div>
      </section>
      <div className="container social-network-list">
        <InstagramHighlight />
        <NetworkGallery
          platform="linkedin"
          heading="LinkedIn"
          subtitle="Publicações sobre ciência, inovação, eventos e conexões do ecossistema."
          handle="Instituto Foton"
          profile={LINKEDIN_PROFILE}
          buttonText="Acompanhar no LinkedIn"
        />
      </div>
    </div>
  );
}
