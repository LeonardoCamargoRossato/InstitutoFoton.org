import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';
import { instituteTeam, type InstituteMember } from '../content/instituteTeam';
import './InstituteTeamDashboard.css';

const levels = [
  { key: 'diretoria', title: 'Diretoria Executiva', subtitle: 'Liderança e gestão institucional.' },
  {
    key: 'vice-presidencia',
    title: 'Vice-Presidências',
    subtitle: 'Articulação estratégica, pesquisa e ensino.',
  },
  {
    key: 'adviser',
    title: 'Conselheiros e Advisers',
    subtitle: 'Experiência e conhecimento para ampliar nossas perspectivas.',
  },
  {
    key: 'coordenacao',
    title: 'Nossas Coordenações Científicas',
    subtitle: 'Conhecimento especializado, colaboração interdisciplinar e pesquisa em rede.',
  },
] as const;

function PersonCard({
  member,
  onOpen,
}: {
  member: InstituteMember;
  onOpen: (member: InstituteMember) => void;
}) {
  return (
    <button
      type="button"
      className="team-person"
      onClick={() => onOpen(member)}
      aria-label={`Conheça o perfil de ${member.fullName}`}
    >
      <span className="team-photo-wrap">
        <img
          src={assetUrl(member.photo)}
          alt={`Fotografia de ${member.fullName}`}
          width={320}
          height={360}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="team-person-info">
        <strong>{member.displayName}</strong>
        <span>{member.role}</span>
        {member.thematicLine && <small>{member.thematicLine}</small>}
        <span className="team-person-action">
          Conheça o perfil <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

function ProfileDialog({ member, onClose }: { member: InstituteMember; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialog.current) return;
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>('button, a[href]'));
      if (!items.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="team-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="team-dialog"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-profile-name"
        tabIndex={-1}
      >
        <button
          className="team-dialog-close"
          ref={closeButton}
          onClick={onClose}
          type="button"
          aria-label="Fechar perfil"
        >
          <X size={22} />
        </button>
        <img
          src={assetUrl(member.photo)}
          alt={`Fotografia de ${member.fullName}`}
          width={320}
          height={360}
        />
        <div className="team-dialog-copy">
          <p className="team-label">Nossa Equipe</p>
          <h3 id="team-profile-name">{member.fullName}</h3>
          <strong>{member.role}</strong>
          {member.thematicLine && <p className="team-thematic">{member.thematicLine}</p>}
          {member.shortBio && (
            <>
              <h4>Trajetória profissional</h4>
              <p>{member.shortBio}</p>
            </>
          )}
          <h4>Atuação no Foton</h4>
          <p>{member.roleDescription}</p>
          {!member.shortBio && (
            <p className="team-bio-note">Biografia profissional em atualização.</p>
          )}
          <div className="team-profile-links">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight size={16} />
              </a>
            )}
            {member.researchGate && (
              <a href={member.researchGate} target="_blank" rel="noopener noreferrer">
                ResearchGate <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstituteTeamDashboard() {
  const [selected, setSelected] = useState<InstituteMember | null>(null);
  const grouped = (level: InstituteMember['level']) =>
    instituteTeam.filter((member) => member.level === level);
  return (
    <section id="equipe" className="section institute-team-section" aria-labelledby="team-heading">
      <div className="container">
        <div className="team-intro">
          <p className="team-label">Nossa Equipe</p>
          <h2 id="team-heading">As pessoas que constroem o Foton</h2>
          <p className="team-subtitle">Diferentes trajetórias. Um propósito em comum.</p>
          <p>
            O Instituto Foton reúne lideranças, pesquisadores e profissionais de diferentes áreas do
            conhecimento. Nossa estrutura multidisciplinar conecta ciência, tecnologia, educação e
            estratégia para fortalecer o desenvolvimento das tecnologias quânticas no Brasil.
          </p>
        </div>
        <div className="team-stats" aria-label="Composição da equipe">
          <span>
            <strong>{grouped('diretoria').length + grouped('vice-presidencia').length}</strong>{' '}
            Diretoria e Vice-Presidências
          </span>
          <span>
            <strong>{grouped('coordenacao').length}</strong> Coordenação Científica
          </span>
          <span>
            <strong>{grouped('adviser').length}</strong> Conselheiros e Advisers
          </span>
        </div>
        {levels.map(({ key, title, subtitle }) => {
          const members = grouped(key);
          const lines =
            key === 'coordenacao' ? Array.from(new Set(members.map((m) => m.thematicLine))) : [];
          return (
            <div className="team-level" key={key}>
              <div className="team-level-heading">
                <h3>{title}</h3>
                <p>{subtitle}</p>
              </div>
              {key === 'coordenacao' ? (
                <div className="team-lines">
                  {lines.map((line) => (
                    <div
                      className={`team-line ${members.filter((m) => m.thematicLine === line).length === 1 ? 'team-line--single' : 'team-line--multiple'}`}
                      key={line}
                    >
                      <h4>{line}</h4>
                      <div className="team-grid">
                        {members
                          .filter((m) => m.thematicLine === line)
                          .map((m) => (
                            <PersonCard key={m.id} member={m} onOpen={setSelected} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={key === 'vice-presidencia' ? 'team-grid team-grid--centered' : 'team-grid'}>
                  {members.map((m) => (
                    <PersonCard key={m.id} member={m} onOpen={setSelected} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selected && <ProfileDialog member={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
