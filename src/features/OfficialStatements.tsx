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
        <section className="section official-statements">
          <div className="container three-grid">
            {statements.map((block) => (
              <article className="info-card" key={block.key}>
                <h2>{block.title}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{block.content}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {values && (
        <section className="values-section" aria-labelledby="values-title">
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
                  <li key={value} className={`value-keyword value-keyword-${(index % 4) + 1}`}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <strong>{value}</strong>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
