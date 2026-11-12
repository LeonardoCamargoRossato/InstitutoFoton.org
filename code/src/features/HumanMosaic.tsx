import { Link } from 'react-router-dom';
import { FotonPhoto, type PhotoId } from './FotonPhoto';

export const HUMAN_MOSAIC: Array<{
  id: PhotoId;
  title: string;
  description: string;
  to: string;
}> = [
  { id: 'mosaic-collaborators', title: 'Colaboradores', description: 'Saberes e experiências em diálogo.', to: '/instituto' },
  { id: 'mosaic-society', title: 'Sociedade', description: 'Ciência em conversa com as pessoas.', to: '/instituto' },
  { id: 'mosaic-students', title: 'Estudantes', description: 'Curiosidade, aprendizado e formação.', to: '/jornada' },
  { id: 'mosaic-community', title: 'Comunidade', description: 'Conhecimento acessível e compartilhado.', to: '/jornada' },
  { id: 'mosaic-partners', title: 'Parceiros', description: 'Conexões para criar novas possibilidades.', to: '/contato' },
  { id: 'mosaic-training', title: 'Formação', description: 'Experiências que inspiram descobertas.', to: '/pesquisa' },
];

export function HumanMosaic({ compact = false }: { compact?: boolean }) {
  return (
    <section className={'section human-mosaic-section spectral-divider' + (compact ? ' is-compact' : '')}>
      <div className="container">
        <div className="human-mosaic-intro">
          <div>
            <p className="eyebrow"><span /> Ciência feita por pessoas</p>
            <h2>Quem faz parte dessa conversa?</h2>
          </div>
          <p>
            Diferentes gerações, saberes e interesses podem se encontrar na ciência.
            Conheça caminhos para participar do Instituto.
          </p>
        </div>
        <div className="human-mosaic-grid">
          {HUMAN_MOSAIC.slice(0, compact ? 3 : undefined).map((card) => (
            <Link className="human-mosaic-tile" to={card.to} key={card.id}>
              <FotonPhoto id={card.id} className="human-mosaic-photo" showCaption={false} />
              <div className="human-mosaic-overlay">
                <strong>{card.title}</strong>
                <span>{card.description}</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="human-media-note">
          Cenas ilustrativas geradas por IA. As pessoas retratadas não são identificadas como integrantes do Foton.
        </p>
      </div>
    </section>
  );
}
