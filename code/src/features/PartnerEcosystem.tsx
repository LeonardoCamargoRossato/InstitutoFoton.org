import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { ActionCard, InfoCard } from '../components/cards';
import { partnerLogoAssets } from '../content/partnerAssets';
import {
  partnerGroups,
  publishedPartners,
  safePartnerUrl,
  type PartnerRecord,
} from '../content/partners';

function PartnerLogo({
  partner,
  eager,
  critical,
}: {
  partner: PartnerRecord;
  eager: boolean;
  critical: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const logo = partnerLogoAssets(partner.logo_slug);
  if (!logo || broken) {
    return <span className="partner-text-logo">{partner.title}</span>;
  }
  return (
    <img
      alt={partner.title}
      width={192}
      height={108}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={critical ? 'high' : 'auto'}
      decoding={critical ? 'sync' : 'async'}
      src={logo.svg}
      onError={() => setBroken(true)}
    />
  );
}

// Em cards sempre brancos, logos originalmente claras recebem contraste apenas via CSS.
// Os SVGs originais e as versões de exibição permanecem intactos.
const lightLogos = new Set(['instituto-rc', 'unisotech']);
const approvedGroups = partnerGroups(publishedPartners());
function PartnerCard({
  partner,
  eager,
  critical,
  catalogSection,
}: {
  partner: PartnerRecord;
  eager: boolean;
  critical: boolean;
  catalogSection: '1.6' | '3.2';
}) {
  const url = safePartnerUrl(partner.partner_url);
  const cardClass =
    'partner-card' +
    (partner.logo_slug && lightLogos.has(partner.logo_slug) ? ' partner-card-contrast' : '');
  const contents = (
    <>
      <PartnerLogo partner={partner} eager={eager} critical={critical} />
      <span className="sr-only">{partner.title}</span>
      {url && <ExternalLink size={14} aria-hidden="true" className="partner-external-icon" />}
    </>
  );
  if (url) {
    return (
      <ActionCard
        href={url}
        inheritVisuals
        catalogId={`${catalogSection}.C-${partner.id}`}
        title={partner.title}
        label={partner.title + ' — site oficial (abre em nova aba)'}
        className={cardClass}
      >
        {contents}
      </ActionCard>
    );
  }
  return (
    <InfoCard
      as="div"
      inheritVisuals
      catalogId={`${catalogSection}.C-${partner.id}`}
      className={cardClass}
    >
      {contents}
    </InfoCard>
  );
}

export default function PartnerEcosystem({ home = false }: { home?: boolean }) {
  const groups = approvedGroups;
  return (
    <section
      className={
        'section partner-ecosystem spectral-divider ' +
        (home ? 'partner-ecosystem-home' : 'partner-ecosystem-page')
      }
      id={home ? 'parceiros' : 'lista-parceiros'}
      data-lcr-section-id={home ? '1.6' : '3.2'}
      aria-labelledby={home ? 'parceiros-home-title' : 'parceiros-page-title'}
    >
      <div className="container">
        {home ? (
          <div className="partner-section-header">
            <div>
              <p className="eyebrow">
                <span /> Rede institucional
              </p>
              <h2 id="parceiros-home-title">Ecossistema de Parceiros</h2>
              <p>
                Instituições e empresas que integram o ecossistema apresentado pelo Instituto Foton.
              </p>
            </div>
            <Link className="text-link" to="/parceiros">
              Ver todos os parceiros <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <h2 className="sr-only" id="parceiros-page-title">
            Organizações do ecossistema
          </h2>
        )}
        {groups.length > 0 ? (
          <div className="partner-groups">
            {groups.map((group, groupIndex) => (
              <div className="partner-group" key={group.tier}>
                <h3>{group.tier}</h3>
                <div className="partner-logos">
                  {group.items.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      eager={!home}
                      critical={!home && groupIndex === 0}
                      catalogSection={home ? '1.6' : '3.2'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="partner-list-contact">
            <p>
              Para informações sobre o ecossistema de parceiros, consulte os canais institucionais.
            </p>
            {!home && (
              <Link className="text-link" to="/contato">
                Canais de contato <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
