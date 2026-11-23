import { Intro } from '../components/UI';
import PartnerEcosystem from './PartnerEcosystem';

export default function PartnersPage() {
  return (
    <>
      <Intro
        eyebrow="Rede institucional"
        title="Ecossistema de Parceiros"
        id="parceiros-intro"
        sectionCode="3.1"
      >
        <p>Conheça as instituições e empresas do ecossistema apresentado pelo Instituto Foton.</p>
      </Intro>
      <PartnerEcosystem />
    </>
  );
}
