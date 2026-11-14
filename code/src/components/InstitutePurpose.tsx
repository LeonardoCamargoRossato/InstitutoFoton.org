import { Compass, Globe2, Target } from 'lucide-react';
import './InstitutePurpose.css';

const pillars = [
  {
    key: 'missao',
    number: '01',
    icon: Target,
    title: 'Missão',
    subtitle: 'O que fazemos e para quem',
    text: 'Orquestrar a transição científica e tecnológica, preparando organizações, governos, pesquisadores e talentos para transformar ciência de fronteira em decisões estratégicas, soluções aplicadas e capacidade real de resolver problemas complexos.',
  },
  {
    key: 'visao',
    number: '02',
    icon: Compass,
    title: 'Visão',
    subtitle: 'Onde queremos chegar',
    text: 'Ser uma instituição de referência em inteligência estratégica, educação executiva, pesquisa aplicada e articulação de ecossistemas para tecnologias emergentes.',
  },
  {
    key: 'proposito',
    number: '03',
    icon: Globe2,
    title: 'Propósito',
    subtitle: 'Por que existimos',
    text: 'Liderar a construção de um legado geracional, transformando o conhecimento em oportunidades, qualidade de vida e impacto positivo para o mundo.',
  },
] as const;

export default function InstitutePurpose() {
  return (
    <section
      id="por-que-existimos"
      className="section institute-purpose"
      aria-labelledby="institute-purpose-title"
    >
      <div className="container">
        <div className="institute-purpose-heading">
          <p className="institute-purpose-eyebrow">Nossa essência</p>
          <h2 id="institute-purpose-title">Por que o Foton existe.</h2>
        </div>
        <div className="institute-purpose-grid">
          {pillars.map(({ key, number, icon: Icon, title, subtitle, text }) => (
            <article className={`institute-purpose-card institute-purpose-card--${key}`} key={key}>
              <header className="institute-purpose-card-header">
                <span className="institute-purpose-icon" aria-hidden="true">
                  <Icon size={25} strokeWidth={1.6} />
                </span>
                <span className="institute-purpose-index" aria-hidden="true">
                  {number}
                </span>
              </header>
              <h3>{title}</h3>
              <p className="institute-purpose-text">{text}</p>
              <p className="institute-purpose-subtitle">{subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
