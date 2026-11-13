import { LockKeyhole } from 'lucide-react';
import { Intro, Action } from '../components/UI';

export default function Access() {
  return (
    <>
      <Intro eyebrow="Área institucional" title="Acesso restrito">
        <p>O acesso administrativo é destinado às equipes responsáveis
          pela gestão institucional.</p>
      </Intro>
      <section className="section">
        <div className="container access-shell">
          <div className="access-card">
            <LockKeyhole size={34} strokeWidth={1.3} aria-hidden="true" />
            <h2>Informações sobre acesso</h2>
            <p>Consulte os canais institucionais para orientações sobre a área administrativa.</p>
            <Action to="/contato">Contato institucional</Action>
          </div>
        </div>
      </section>
    </>
  );
}
