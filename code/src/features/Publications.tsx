import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Copy, ArrowUpRight } from 'lucide-react';
import { NewsCarousel } from '../pages/06-noticias/sections/NewsCarousel';
import { InfoCard } from '../components/cards';
import { NewsPhotoHighlights } from '../pages/06-noticias/sections/NewsPhotoHighlights';
import { Intro, Status, Empty, External, TextLink } from '../components/ui';
import { publications, publication, type Publication } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { dateLabel, safeExternalUrl } from '../lib/config';
import { NotFound } from './PublicPages';
import { FoundationGallery } from './foundation';
import { assetUrl } from '../lib/siteAssets';
import newsMedia from '../content/news-media.json';
import newsMediaEnglish from '../content/news-media.en.json';
import './NewsMedia.css';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

export function PublicationCard({ item }: { item: Publication }) {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const body = (
    <>
      <div
        className={
          item.main_image_path ? 'publication-art publication-art--photo' : 'publication-art'
        }
      >
        {item.main_image_path ? (
          <img
            src={assetUrl(item.main_image_path)}
            width={1600}
            height={900}
            loading="lazy"
            alt={item.title}
          />
        ) : (
          <>
            <BookOpen size={45} strokeWidth={1} aria-hidden="true" />
            <span>{copy('Conhecimento em movimento', 'Knowledge in motion')}</span>
          </>
        )}
      </div>
      <div className="publication-content">
        <p className="eyebrow">
          {item.category} · {dateLabel(item.published_at, locale)}
        </p>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <span className="card-link">
          {item.type === 'press'
            ? `${copy('Ler na fonte', 'Read source')}${item.source_name ? ` · ${item.source_name}` : ''}`
            : item.slug === 'fundacao-instituto-foton'
              ? copy('Conheça essa história', 'Discover this story')
              : copy('Continuar leitura', 'Continue reading')}
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </>
  );
  return (
    <InfoCard
      as="article"
      inheritVisuals
      className="publication-card"
      catalogId={`6.A.2.C-${item.slug}`}
    >
      {item.type === 'press' ? (
        <External href={item.source_url}>{body}</External>
      ) : (
        <Link to={`/noticias/${item.slug}`}>{body}</Link>
      )}
    </InfoCard>
  );
}

function ArticleBody({ item, media }: { item: Publication; media: typeof newsMedia }) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const isLeonti = item.slug === 'uniso-quantum-day-entrega-projeto-leonti';
  const heading = english
    ? '### A project built with different skills'
    : '### Uma construção com diferentes competências';
  const splitAt = isLeonti ? item.body.indexOf(heading) : -1;
  const introduction = splitAt < 0 ? item.body : item.body.slice(0, splitAt);
  const continuation = splitAt < 0 ? '' : item.body.slice(splitAt);
  const renderMarkdown = (content: string) => (
    <ReactMarkdown
      skipHtml
      urlTransform={(url) => (url.startsWith('#') ? url : safeExternalUrl(url) || '')}
      components={{
        a: ({ href, children }) =>
          href?.startsWith('#') ? (
            <a href={href}>{children}</a>
          ) : (
            <External href={href}>{children}</External>
          ),
        img: () => null,
      }}
    >
      {content}
    </ReactMarkdown>
  );
  return (
    <div className="markdown">
      {renderMarkdown(introduction)}
      {isLeonti && (
        <NewsPhotoHighlights images={media.filter((image) => image.group === 'uniso-leonti')} />
      )}
      {continuation && renderMarkdown(continuation)}
    </div>
  );
}

export function News() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('recent');
  const loader = useCallback(
    () => publications(page, debounced, category, sort, locale),
    [page, debounced, category, sort, locale],
  );
  const resource = useResource(loader);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
      setPage(0);
    }, 200);
    return () => clearTimeout(timer);
  }, [search]);
  const items = resource.data?.items || [];
  return (
    <>
      <Intro
        eyebrow={copy('Notícias e histórias', 'News and stories')}
        title={copy('Há sempre mais para descobrir.', 'There is always more to discover.')}
        id="noticias-inicio"
        sectionCode="6.A.1"
      >
        <p>
          {copy(
            'Ciência, comunidade e novas perspectivas. Um espaço para compartilhar o conhecimento e acompanhar o Instituto.',
            'Science, community, and new perspectives. A space to share knowledge and follow the Institute.',
          )}
        </p>
      </Intro>
      <section className="section" id="noticias-publicacoes" data-lcr-section-id="6.A.2">
        <div className="container">
          <div className="news-controls">
            <label>
              {copy('Buscar publicações', 'Search publications')}
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={copy('O que você quer descobrir?', 'What would you like to discover?')}
                maxLength={160}
              />
            </label>
            <label>
              {copy('Categoria', 'Category')}
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(0);
                }}
              >
                {[
                  ['all', copy('Todas', 'All')],
                  ['blog', 'Blog'],
                  ['press', copy('Na mídia', 'In the media')],
                  ['manifesto', 'Manifesto'],
                  ['research', copy('Pesquisa', 'Research')],
                  ['community', copy('Comunidade', 'Community')],
                  ['events', copy('Eventos', 'Events')],
                  ['education', copy('Educação', 'Education')],
                ].map(([v, l]) => (
                  <option value={v} key={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {copy('Ordenação', 'Sort order')}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(0);
                }}
              >
                <option value="recent">{copy('Mais recentes', 'Most recent')}</option>
                <option value="oldest">{copy('Mais antigas', 'Oldest')}</option>
              </select>
            </label>
          </div>
          <Status
            {...resource}
            loadingLabel={copy('Carregando conteúdo…', 'Loading content…')}
            retryLabel={copy('Tentar novamente', 'Try again')}
          />
          {!resource.loading &&
            !resource.error &&
            (items.length ? (
              <div className="three-grid">
                {items.map((item) => (
                  <PublicationCard item={item} key={item.id} />
                ))}
              </div>
            ) : (
              <Empty
                title={
                  search || category !== 'all'
                    ? copy('Nenhuma publicação encontrada.', 'No publications found.')
                    : copy('Publicações do Instituto', 'Institute publications')
                }
              >
                {search || category !== 'all'
                  ? copy('Tente outra palavra ou categoria.', 'Try another keyword or category.')
                  : copy(
                      'Conheça o Manifesto Quântico Nacional e as áreas de pesquisa do Instituto.',
                      'Explore the National Quantum Manifesto and the Institute’s research areas.',
                    )}
              </Empty>
            ))}
          <div className="inline-links">
            <TextLink to="/manifesto">
              {copy('Manifesto Quântico Nacional', 'National Quantum Manifesto')}
            </TextLink>
            <TextLink to="/pesquisa">{copy('Pesquisa em rede', 'Network research')}</TextLink>
          </div>
          <div className="pagination" aria-label={copy('Paginação de notícias', 'News pagination')}>
            <button
              className="button button-secondary"
              disabled={page === 0 || resource.loading}
              onClick={() => setPage((p) => p - 1)}
            >
              {copy('Anterior', 'Previous')}
            </button>
            <span>
              {copy('Página', 'Page')} {page + 1}
            </span>
            <button
              className="button button-secondary"
              disabled={!resource.data?.more || resource.loading}
              onClick={() => setPage((p) => p + 1)}
            >
              {copy('Próxima', 'Next')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export function Article() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = localizedCopy(locale);
  const { slug = '' } = useParams();
  const loader = useCallback(() => publication(slug, locale), [slug, locale]);
  const media = english ? newsMediaEnglish : newsMedia;
  const resource = useResource(loader);
  const [copied, setCopied] = useState(false);
  const item = resource.data;
  useEffect(() => {
    if (item) document.title = `${item.title} — Instituto Foton`;
  }, [item]);
  if (!resource.loading && !resource.error && !item) return <NotFound />;
  return (
    <>
      <Intro
        eyebrow={copy('Publicações', 'Publications')}
        title={item?.title || copy('Carregando publicação…', 'Loading publication…')}
        id="noticia-artigo"
        sectionCode="6.A.3"
      >
        {item && (
          <>
            <p>{item.summary}</p>
            <p className="article-meta">
              {dateLabel(item.published_at, locale)}
              {item.author_display_name && ` · ${item.author_display_name}`}
              {item.body &&
                ` · ${Math.max(1, Math.ceil(item.body.split(/\s+/).length / 200))} ${copy('min de leitura', 'min read')}`}
            </p>
          </>
        )}
      </Intro>
      <section className="section">
        <div className="container reading">
          <Status
            {...resource}
            loadingLabel={copy('Carregando conteúdo…', 'Loading content…')}
            retryLabel={copy('Tentar novamente', 'Try again')}
          />
          {item && (
            <>
              {item.type === 'press' ? (
                <External href={item.source_url} className="button">
                  {copy('Ler na fonte', 'Read source')} · {item.source_name}
                </External>
              ) : (
                <ArticleBody item={item} media={media} />
              )}
              {item.slug === 'fundacao-instituto-foton' && <FoundationGallery />}
              {item.slug === 'lancamento-lacq-pucrs-instituto-foton' && (
                <NewsCarousel
                  label={copy('lançamento da LACQ PUCRS', 'LACQ PUCRS launch')}
                  title={copy(
                    'Registros do lançamento da LACQ PUCRS',
                    'Records from the LACQ PUCRS launch',
                  )}
                  images={media.filter((media) => media.group === 'lacq-pucrs')}
                />
              )}
              {item.slug === 'foton-mobi-quantum-festival-2026' && (
                <NewsCarousel
                  label="Mobi Quantum"
                  title={copy('Registros do Mobi Quantum', 'Mobi Quantum records')}
                  images={media.filter((media) => media.group === 'mobi-quantum')}
                />
              )}
              {item.slug === 'uniso-quantum-day-entrega-projeto-leonti' && (
                <>
                  <NewsCarousel
                    label="Quantum Day 1"
                    title="Quantum Day — Day 1"
                    images={media.filter((media) => media.group === 'quantum-day-1')}
                  />
                  <NewsCarousel
                    label="Quantum Day 2"
                    title="Quantum Day — Day 2"
                    images={media.filter((media) => media.group === 'quantum-day-2')}
                  />
                </>
              )}
              {[
                'foton-softsul-cooperacao-tecnologias-quanticas',
                'foton-assespro-rs-termo-cooperacao',
                'seminario-cubotech-direito-computacao-quantica',
              ].includes(item.slug) && (
                <section
                  className="news-media"
                  aria-label={copy(
                    'Registros visuais da notícia',
                    'Visual records for this article',
                  )}
                >
                  <h2>{copy('Registros institucionais', 'Institutional records')}</h2>
                  <div className="news-media-grid">
                    {media
                      .filter((media) =>
                        item.slug.startsWith('foton-softsul')
                          ? media.group === 'softsul' &&
                            [
                              'AcordoFotonSoftsul.png',
                              'FotonSoftsulAcervo20250314WA0021.png',
                            ].includes(media.name)
                          : item.slug.startsWith('foton-assespro')
                            ? media.group === 'assespro-rs'
                            : media.group === 'cubotech',
                      )
                      .map((media) => (
                        <figure className="news-media-figure" key={media.original}>
                          <img
                            className="news-media-photo"
                            src={assetUrl(media.preview)}
                            data-full-image={assetUrl(media.original)}
                            alt={media.alt}
                            width={media.width}
                            height={media.height}
                            loading="lazy"
                            tabIndex={0}
                            role="button"
                            aria-label={`${english ? 'Enlarge' : 'Ampliar'}: ${media.alt}`}
                          />
                          <figcaption>{media.credit}</figcaption>
                        </figure>
                      ))}
                  </div>
                </section>
              )}
              {item.source_url && (
                <p className="source-note">
                  <External href={item.source_url}>
                    {copy('Ler publicação original', 'Read original publication')} ·{' '}
                    {item.source_name || copy('Fonte pública', 'Public source')}
                  </External>
                </p>
              )}
              <p className="source-note">
                {copy('Atualização', 'Updated')}: {dateLabel(item.updated_at, locale)}
              </p>
              <button
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(location.href);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                <Copy size={16} />
                {copied
                  ? copy('Link copiado', 'Link copied')
                  : copy('Copiar link da publicação', 'Copy publication link')}
              </button>
            </>
          )}
          <div className="inline-links">
            <TextLink to="/noticias">{copy('Todas as publicações', 'All publications')}</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
