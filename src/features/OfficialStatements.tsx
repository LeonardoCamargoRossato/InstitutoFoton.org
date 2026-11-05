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
  return (
    <section className="section">
      <div className="container">
        <div className="three-grid">
          {blocks.map((block) => (
            <article className="info-card" key={block.key}>
              <h2>{block.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{block.content}</p>
              <p className="source-note">{block.source_reference}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
