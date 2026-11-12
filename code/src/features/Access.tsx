import { LockKeyhole } from 'lucide-react';
import { Intro, Action } from '../components/UI';
// Sem login falso: administradores continuam gerenciados no projeto preservado.
export default function Access() {
  return (
    <>
      <Intro eyebrow="Área institucional" title="Acesso temporariamente suspenso.">
        <p>Durante esta fase pública estática, o acesso da Diretoria e do Marketing
           está desativado. Nenhuma autenticação ou alteração administrativa é realizada pelo site.</p>
      </Intro>
      <section className="section">
        <div className="container access-shell">
          <div className="access-card">
            <LockKeyhole size={34} strokeWidth={1.3} aria-hidden="true" />
            <h2>Administração indisponível nesta etapa.</h2>
            <p>Os serviços anteriores permanecem preservados para uma futura reativação autorizada.</p>
            <Action to="/">Voltar ao site público</Action>
          </div>
        </div>
      </section>
    </>
  );
}
