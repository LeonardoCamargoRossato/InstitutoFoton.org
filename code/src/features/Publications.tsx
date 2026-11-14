import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Copy, ArrowUpRight } from 'lucide-react';
import { Intro, Status, Empty, External, TextLink } from '../components/UI';
import { publications, publication, type Publication } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { dateLabel, safeExternalUrl } from '../lib/config';
import { NotFound } from './PublicPages';
import { FoundationGallery, foundationRoute, foundationCards } from '../components/FoundationHistory';
import { assetUrl } from '../lib/siteAssets';

export function PublicationCard({ item }: { item: Publication }) {
  const body = (
    <>
      <div className={item.main_image_path ? 'publication-art publication-art--photo' : 'publication-art'}>
        {item.main_image_path ? (
          <img
            src={assetUrl(item.main_image_path)}
            width={1080}
            height={1350}
            loading="lazy"
            alt={item.slug === foundationRoute.split('/').at(-1) ? foundationCards[0].title : item.title}
          />
        ) : (
          <>
            <BookOpen size={45} strokeWidth={1} aria-hidden="true" />
            <span>Conhecimento em movimento</span>
          </>
        )}
      </div>
      <div className="publication-content">
        <p className="eyebrow">
          {item.category} · {dateLabel(item.published_at)}
        </p>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <span className="card-link">
          {item.type === 'press'
            ? `Ler na fonte${item.source_name ? ` · ${item.source_name}` : ''}`
            : item.slug === 'fundacao-instituto-foton'
              ? 'Conheça essa história'
              : 'Continuar leitura'}
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </>
  );
  return (
    <article className="publication-card">
      {item.type === 'press' ? (
        <External href={item.source_url}>{body}</External>
      ) : (
        <Link to={`/noticias/${item.slug}`}>{body}</Link>
      )}
    </article>
  );
}

export function News() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [category, setCategory] = useState('Todas');
  const [sort, setSort] = useState('recent');
  const loader = useCallback(
    () => publications(page, debounced, category, sort),
    [page, debounced, category, sort],
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
      <Intro eyebrow="Notícias e histórias" title="Há sempre mais para descobrir.">
        <p>
          Ciência, comunidade e novas perspectivas. Um espaço para compartilhar o conhecimento e
          acompanhar o Instituto.
        </p>
      </Intro>
      <section className="section">
        <div className="container">
          <div className="news-controls">
            <label>
              Buscar publicações
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="O que você quer descobrir?"
                maxLength={160}
              />
            </label>
            <label>
              Categoria
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(0);
                }}
              >
                {[
                  ['Todas', 'Todas'],
                  ['blog', 'Blog'],
                  ['press', 'Na mídia'],
                  ['Manifesto', 'Manifesto'],
                  ['Pesquisa', 'Pesquisa'],
                  ['Comunidade', 'Comunidade'],
                  ['Eventos', 'Eventos'],
                  ['Educação', 'Educação'],
                ].map(([v, l]) => (
                  <option value={v} key={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ordenação
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(0);
                }}
              >
                <option value="recent">Mais recentes</option>
                <option value="oldest">Mais antigas</option>
              </select>
            </label>
          </div>
          <Status {...resource} />
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
                  search || category !== 'Todas'
                    ? 'Nenhuma publicação encontrada.'
                    : 'Publicações do Instituto'
                }
              >
                {search || category !== 'Todas'
                  ? 'Tente outra palavra ou categoria.'
                  : 'Conheça o Manifesto Quântico Nacional e as áreas de pesquisa do Instituto.'}
              </Empty>
            ))}
          <div className="inline-links">
            <TextLink to="/manifesto">Manifesto Quântico Nacional</TextLink>
            <TextLink to="/pesquisa">Pesquisa em rede</TextLink>
          </div>
          <div className="pagination" aria-label="Paginação de notícias">
            <button
              className="button button-secondary"
              disabled={page === 0 || resource.loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </button>
            <span>Página {page + 1}</span>
            <button
              className="button button-secondary"
              disabled={!resource.data?.more || resource.loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Próxima
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export function Article() {
  const { slug = '' } = useParams();
  const loader = useCallback(() => publication(slug), [slug]);
  const resource = useResource(loader);
  const [copied, setCopied] = useState(false);
  const item = resource.data;
  useEffect(() => {
    if (item) document.title = `${item.title} — Instituto Foton`;
  }, [item]);
  if (!resource.loading && !resource.error && !item) return <NotFound />;
  return (
    <>
      <Intro eyebrow="Publicações" title={item?.title || 'Carregando publicação…'}>
        {item && (
          <>
            <p>{item.summary}</p>
            <p className="article-meta">
              {dateLabel(item.published_at)}
              {item.author_display_name && ` · ${item.author_display_name}`}
              {item.body &&
                ` · ${Math.max(1, Math.ceil(item.body.split(/\s+/).length / 200))} min de leitura`}
            </p>
          </>
        )}
      </Intro>
      <section className="section">
        <div className="container reading">
          <Status {...resource} />
          {item && (
            <>
              {item.type === 'press' ? (
                <External href={item.source_url} className="button">
                  Ler na fonte · {item.source_name}
                </External>
              ) : (
                <div className="markdown">
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
                    {item.body}
                  </ReactMarkdown>
                </div>
              )}
              {item.slug === 'fundacao-instituto-foton' && <FoundationGallery />}
              {item.source_url && (
                <p className="source-note">
                  <External href={item.source_url}>
                    Fonte: {item.source_name || 'Documento de referência'}
                  </External>
                </p>
              )}
              <p className="source-note">Atualização: {dateLabel(item.updated_at)}</p>
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
                {copied ? 'Link copiado' : 'Copiar link da publicação'}
              </button>
            </>
          )}
          <div className="inline-links">
            <TextLink to="/noticias">Todas as publicações</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
