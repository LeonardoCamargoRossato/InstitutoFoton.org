import { Intro } from '../components/ui';
import PartnerEcosystem from './PartnerEcosystem';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

export default function PartnersPage() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  return (
    <>
      <Intro
        eyebrow={copy('Rede institucional', 'Institutional network')}
        title={copy('Ecossistema de Parceiros', 'Partner Ecosystem')}
        id="parceiros-intro"
        sectionCode="3.1"
      >
        <p>
          {copy(
            'Conheça as instituições e empresas do ecossistema apresentado pelo Instituto Foton.',
            'Explore the institutions and companies in the ecosystem presented by Instituto Foton.',
          )}
        </p>
      </Intro>
      <PartnerEcosystem />
    </>
  );
}
