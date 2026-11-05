import { officialStatements } from '../lib/backend';
import { useResource } from '../lib/useResource';

export default function OfficialStatements() {
  const { data } = useResource(officialStatements);
  if (!data?.length) return null;
  return <section className="section"><div className="container"><div className="three-grid">{data.map(block => <article className="info-card" key={block.key}><h2>{block.title}</h2><p style={{whiteSpace:'pre-line'}}>{block.content}</p><p className="source-note">{block.source_reference}</p></article>)}</div></div></section>;
}
