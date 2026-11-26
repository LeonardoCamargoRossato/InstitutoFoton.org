import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LogoGallery } from '../components/galleries/logo/LogoGallery';
import { partnerLogoAssets } from '../content/partnerAssets';
import { partnerGroups, publishedPartners, safePartnerUrl } from '../content/partners';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

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
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const tierTranslations: Record<string, string> = {
    'Ciência e Pesquisa': 'Science and Research',
    'Ecossistema e Instituições': 'Ecosystem and Institutions',
    'Foton: Tecnologias Quânticas': 'Foton: Quantum Technologies',
    'Empresas Parceiras': 'Partner Companies',
    Parceiros: 'Partners',
  };
  const groups = logoGroups.map((group) => ({
    ...group,
    tier: copy(group.tier, tierTranslations[group.tier] ?? group.tier),
  }));
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
                <span /> {copy('Rede institucional', 'Institutional network')}
              </p>
              <h2 id="parceiros-home-title">
                {copy('Ecossistema de Parceiros', 'Partner Ecosystem')}
              </h2>
              <p>
                {copy(
                  'Instituições e empresas que integram o ecossistema apresentado pelo Instituto Foton.',
                  'Institutions and companies that are part of the ecosystem presented by Instituto Foton.',
                )}
              </p>
            </div>
            <Link className="text-link" to="/parceiros">
              {copy('Ver todos os parceiros', 'View all partners')}{' '}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <h2 className="sr-only" id="parceiros-page-title">
            {copy('Organizações do ecossistema', 'Ecosystem organizations')}
          </h2>
        )}
        {groups.length > 0 ? (
          <LogoGallery groups={groups} home={home} catalogSection={home ? '1.6' : '3.2'} />
        ) : (
          <div className="partner-list-contact">
            <p>
              {copy(
                'Para informações sobre o ecossistema de parceiros, consulte os canais institucionais.',
                'For information about the partner ecosystem, contact the institutional channels.',
              )}
            </p>
            {!home && (
              <Link className="text-link" to="/contato">
                {copy('Canais de contato', 'Contact channels')}{' '}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
