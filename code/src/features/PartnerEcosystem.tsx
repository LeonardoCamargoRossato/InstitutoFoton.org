import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { partnerLogoAssets } from '../content/partnerAssets';
import { partnerGroups, publishedPartners, safePartnerUrl, type PartnerRecord } from '../content/partners';

function PartnerLogo({ partner }: { partner: PartnerRecord }) {
  const [source, setSource] = useState<'webp'|'png'|'text'>('webp');
  const logo = partnerLogoAssets(partner.logo_slug);
  if (!logo || source === 'text') {
    return <span className="partner-text-logo">{partner.title}</span>;
  }
  return (
    <img
      alt={partner.title}
      width={104}
      height={104}
      loading="lazy"
      decoding="async"
      src={source === 'webp' ? logo.webp : logo.png}
      onError={() => setSource((prior) => prior === 'webp' ? 'png' : 'text')}
    />
  );
}

function PartnerCard({ partner }: { partner: PartnerRecord }) {
  const url = safePartnerUrl(partner.partner_url);
  const contents = (
    <>
      <PartnerLogo partner={partner} />
      <span className="sr-only">{partner.title}</span>
      {url && <ExternalLink size={14} aria-hidden="true" className="partner-external-icon" />}
    </>
  );
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={partner.title}
        aria-label={partner.title + ' — site oficial (abre em nova aba)'}
        className="partner-card"
      >
        {contents}
      </a>
    );
  }
  return <div className="partner-card" title={partner.title}>{contents}</div>;
}

export default function PartnerEcosystem({ home = false }: { home?: boolean }) {
  const records = publishedPartners();
  const groups = partnerGroups(records);
  return (
    <section
      className={'section partner-ecosystem spectral-divider ' + (home ? 'partner-ecosystem-home' : 'partner-ecosystem-page')}
      id={home ? 'parceiros' : 'lista-parceiros'}
      aria-labelledby={home ? 'parceiros-home-title' : 'parceiros-page-title'}
    >
      <div className="container">
        {home ? (
          <div className="partner-section-header">
            <div>
              <p className="eyebrow"><span /> Rede institucional</p>
              <h2 id="parceiros-home-title">Ecossistema de Parceiros</h2>
              <p>Instituições e empresas que integram o ecossistema apresentado pelo Instituto Foton.</p>
            </div>
            <Link className="text-link" to="/parceiros">
              Ver todos os parceiros <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <h2 className="sr-only" id="parceiros-page-title">Organizações do ecossistema</h2>
        )}
        {groups.length > 0 ? (
          <div className="partner-groups">
            {groups.map((group) => (
              <div className="partner-group" key={group.tier}>
                <h3>{group.tier}</h3>
                <div className="partner-logos">
                  {group.items.map((partner) => <PartnerCard key={partner.id} partner={partner} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="partner-list-contact">
            <p>Para informações sobre o ecossistema de parceiros, consulte os canais institucionais.</p>
            {!home && <Link className="text-link" to="/contato">Canais de contato <ArrowRight size={16} aria-hidden="true" /></Link>}
          </div>
        )}
      </div>
    </section>
  );
}
