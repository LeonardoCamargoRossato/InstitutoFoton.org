import { Compass, Globe2, Target } from 'lucide-react';
import { InfoCard, cardPresets } from '../../../components/cards';
import { useLanguage } from '../../../i18n';
import { localizedCopy } from '../../../i18n/localizedCopy';
import './InstitutePurpose.css';

const pillars = [
  {
    key: 'missao',
    number: '01',
    icon: Target,
    title: 'Missão',
    titleEnglish: 'Mission',
    subtitle: 'O que fazemos e para quem',
    subtitleEnglish: 'What we do and for whom',
    text: 'Orquestrar a transição científica e tecnológica, preparando organizações, governos, pesquisadores e talentos para transformar ciência de fronteira em decisões estratégicas, soluções aplicadas e capacidade real de resolver problemas complexos.',
    textEnglish:
      'Coordinate the scientific and technological transition, preparing organizations, governments, researchers, and talent to turn frontier science into strategic decisions, applied solutions, and real capacity to solve complex problems.',
  },
  {
    key: 'visao',
    number: '02',
    icon: Compass,
    title: 'Visão',
    titleEnglish: 'Vision',
    subtitle: 'Onde queremos chegar',
    subtitleEnglish: 'Where we want to go',
    text: 'Ser uma instituição de referência em inteligência estratégica, educação executiva, pesquisa aplicada e articulação de ecossistemas para tecnologias emergentes.',
    textEnglish:
      'Be a reference institution in strategic intelligence, executive education, applied research, and ecosystem coordination for emerging technologies.',
  },
  {
    key: 'proposito',
    number: '03',
    icon: Globe2,
    title: 'Propósito',
    titleEnglish: 'Purpose',
    subtitle: 'Por que existimos',
    subtitleEnglish: 'Why we exist',
    text: 'Liderar a construção de um legado geracional, transformando o conhecimento em oportunidades, qualidade de vida e impacto positivo para o mundo.',
    textEnglish:
      'Lead the creation of a generational legacy by turning knowledge into opportunities, quality of life, and positive impact for the world.',
  },
] as const;

export default function InstitutePurpose() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  return (
    <section
      id="por-que-existimos"
      data-lcr-section-id="2.A.5"
      className="section institute-purpose"
      aria-labelledby="institute-purpose-title"
    >
      <div className="container">
        <div className="institute-purpose-heading">
          <p className="institute-purpose-eyebrow">{copy('Nossa essência', 'Our essence')}</p>
          <h2 id="institute-purpose-title">
            {copy('Por que o Foton existe.', 'Why Foton exists.')}
          </h2>
        </div>
        <div className="institute-purpose-grid">
          {pillars.map(
            ({
              key,
              number,
              icon: Icon,
              title,
              titleEnglish,
              subtitle,
              subtitleEnglish,
              text,
              textEnglish,
            }) => (
              <InfoCard
                className={`institute-purpose-card institute-purpose-card--${key}`}
                key={key}
                catalogId={`2.A.5.C${Number(number)}`}
                estiloGrafico={cardPresets.institucionalInformativo}
              >
                <header className="institute-purpose-card-header">
                  <span className="institute-purpose-icon" aria-hidden="true">
                    <Icon size={25} strokeWidth={1.6} />
                  </span>
                  <span className="institute-purpose-index" aria-hidden="true">
                    {number}
                  </span>
                </header>
                <h3>{copy(title, titleEnglish)}</h3>
                <p className="institute-purpose-text">{copy(text, textEnglish)}</p>
                <p className="institute-purpose-subtitle">{copy(subtitle, subtitleEnglish)}</p>
              </InfoCard>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
