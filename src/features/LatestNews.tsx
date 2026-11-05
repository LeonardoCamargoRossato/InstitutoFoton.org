import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Empty, External, Status, TextLink } from '../components/UI';
import { publications } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { dateLabel } from '../lib/config';

export default function LatestNews() {
  const loader = useCallback(() => publications(0), []);
  const resource = useResource(loader);
  return (
    <>
      <Status {...resource} />
      {!resource.loading &&
        !resource.error &&
        (resource.data?.items.length ? (
          <div className="three-grid">
            {resource.data.items.slice(0, 3).map((item) => (
              <article key={item.id} className="info-card">
                <p className="eyebrow">
                  {item.category} · {dateLabel(item.published_at)}
                </p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.type === 'press' ? (
                  <External href={item.source_url} className="text-link">
                    Ler na fonte
                  </External>
                ) : (
                  <Link to={`/noticias/${item.slug}`} className="text-link">
                    Continuar leitura
                  </Link>
                )}
              </article>
            ))}
          </div>
        ) : (
          <Empty title="Novas histórias começam por aqui.">
            Acompanhe nossas próximas publicações. Enquanto isso, conheça a Jornada do Cientista e o
            Manifesto Quântico Nacional.
          </Empty>
        ))}
      <div className="inline-links">
        <TextLink to="/jornada">Conheça a Jornada</TextLink>
        <TextLink to="/manifesto">Explore o Manifesto</TextLink>
      </div>
    </>
  );
}
