import { InfoCard } from '../components/cards';
import { officialStatements } from '../lib/backend';
import { useResource } from '../lib/useResource';

export default function OfficialStatements() {
  const { data } = useResource(officialStatements);
  const fallback = {
    key: 'institute.values',
    title: 'Valores',
    content:
      'Excelência\nProtagonismo\nInovação\nEstratégia\nValorização de talentos\nÉtica\nColaboração',
    source_reference: 'Manual de Marca Foton 2026, página 9 — transcrição literal',
  };
  const blocks = data?.some((block) => block.key === fallback.key)
    ? data
    : [fallback, ...(data || [])];
  const values = blocks.find((block) => block.key === 'institute.values');
  const statements = blocks.filter((block) => block.key !== 'institute.values');

  return (
    <>
      {statements.length > 0 && (
        <section
          className="section official-statements"
          id="declaracoes-institucionais"
          data-lcr-section-id="2.A.7"
        >
          <div className="container three-grid">
            {statements.map((block) => (
              <InfoCard className="info-card" key={block.key} catalogId={`2.A.7.C-${block.key}`}>
                <h2>{block.title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{block.content}</p>
              </InfoCard>
            ))}
          </div>
        </section>
      )}
      {values && (
        <section
          className="values-section"
          id="valores"
          aria-labelledby="values-title"
          data-lcr-section-id="2.A.8"
        >
          <div className="values-glow values-glow-one" aria-hidden="true" />
          <div className="values-glow values-glow-two" aria-hidden="true" />
          <div className="container values-layout">
            <div className="values-heading">
              <p className="eyebrow">
                <span /> O que orienta nossas escolhas
              </p>
              <h2 id="values-title">Valores que colocamos em movimento.</h2>
              <p>
                Princípios que conectam ciência, pessoas e impacto em cada passo da nossa jornada.
              </p>
            </div>
            <ul className="values-keywords" aria-label="Valores do Instituto Foton">
              {values.content
                .split('\n')
                .map((value: string) => value.trim())
                .filter(Boolean)
                .map((value: string, index: number) => (
                  <InfoCard
                    as="li"
                    key={value}
                    className={`value-keyword value-keyword-${(index % 4) + 1}`}
                    catalogId={`2.A.8.C${index + 1}`}
                    inheritVisuals
                  >
                    <span aria-hidden="true">0{index + 1}</span>
                    <strong>{value}</strong>
                  </InfoCard>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
