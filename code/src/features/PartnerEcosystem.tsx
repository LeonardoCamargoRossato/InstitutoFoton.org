import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LogoGallery } from '../components/galleries/logo/LogoGallery';
import { partnerLogoAssets } from '../content/partnerAssets';
import { partnerGroups, publishedPartners, safePartnerUrl } from '../content/partners';

const approvedGroups = partnerGroups(publishedPartners());
const logoGroups = approvedGroups.map((group) => ({
  tier: group.tier,
  items: group.items.map((partner) => ({
    id: partner.id,
    title: partner.title,
    logoSrc: partnerLogoAssets(partner.logo_slug)?.svg,
    href: safePartnerUrl(partner.partner_url),
    invertLogo: partner.logo_slug === 'instituto-rc' || partner.logo_slug === 'unisotech',
  })),
}));

export default function PartnerEcosystem({ home = false }: { home?: boolean }) {
  const groups = logoGroups;
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
          <LogoGallery groups={groups} home={home} catalogSection={home ? '1.6' : '3.2'} />
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
