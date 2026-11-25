import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { assetUrl } from '../../../lib/siteAssets';
import { PeopleGallery } from '../../../components/galleries/people/PeopleGallery';
import { instituteTeam, type InstituteMember } from '../../../content/instituteTeam';
import { useLanguage } from '../../../i18n';
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

const levelsEnglish = [
  { key: 'diretoria', title: 'Executive Board', subtitle: 'Institutional leadership and management.' },
  { key: 'vice-presidencia', title: 'Vice Presidencies', subtitle: 'Strategic coordination, research, and education.' },
  { key: 'adviser', title: 'Board Advisers', subtitle: 'Experience and knowledge to broaden our perspectives.' },
  { key: 'coordenacao', title: 'Our Scientific Coordination Teams', subtitle: 'Specialized knowledge, interdisciplinary collaboration, and networked research.' },
] as const;

const lineEnglish: Record<string, string> = {
  'Computação Quântica': 'Quantum Computing',
  'Comunicação e Criptografia Quântica': 'Quantum Communication and Cryptography',
  'Sensores e Materiais Quânticos': 'Quantum Sensors and Materials',
  'Algoritmos e Otimização': 'Algorithms and Optimization',
  'Quântica para Negócios': 'Quantum for Business',
  'Quantum no Direito': 'Quantum in Law',
};

const memberEnglish: Record<number, { role: string; roleDescription: string }> = {
  63: { role: 'President', roleDescription: 'Leads strategic direction, institutional representation, and coordination of Instituto Foton.' },
  98: { role: 'Vice President', roleDescription: 'Supports the presidency, institutional alignment, and execution of the Institute’s priorities.' },
  20: { role: 'Treasurer', roleDescription: 'Oversees financial planning and supports responsible management of institutional resources.' },
  13: { role: 'Secretary-General', roleDescription: 'Supports institutional organization, records, and administrative coordination of the secretariat.' },
  15: { role: 'VP of Strategic Relations', roleDescription: 'Coordinates partnerships, strategic relations, and connections with organizations and institutions.' },
  61: { role: 'VP of Research and Education', roleDescription: 'Coordinates research, education, and academic collaboration initiatives.' },
  21: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum Computing field.' },
  109: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum Communication and Cryptography field.' },
  71: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum Sensors and Materials field.' },
  110: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Algorithms and Optimization field.' },
  65: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Algorithms and Optimization field.' },
  52: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum for Business field.' },
  107: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum for Business field.' },
  18: { role: 'Scientific Coordinator', roleDescription: 'Coordinates researchers, initiatives, and interdisciplinary collaboration in the Quantum in Law field.' },
  64: { role: 'Board Adviser', roleDescription: 'Provides strategic advice and contributes experience to institutional work.' },
  45: { role: 'Board Adviser', roleDescription: 'Supports institutional decisions with professional advice and experience.' },
  51: { role: 'Board Adviser', roleDescription: 'Contributes to strategic direction and institutional connections.' },
};

function ProfileDialog({ member, onClose }: { member: InstituteMember; onClose: () => void }) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
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
          aria-label={english ? "Close profile" : "Fechar perfil"}
        >
          <X size={22} />
        </button>
        <img
          src={assetUrl(member.photo)}
          alt={english ? `Photograph of ${member.fullName}` : `Fotografia de ${member.fullName}`}
          width={320}
          height={360}
        />
        <div className="team-dialog-copy">
          <p className="team-label">{english ? "Our Team" : "Nossa Equipe"}</p>
          <h3 id="team-profile-name">{member.fullName}</h3>
          <strong>{member.role}</strong>
          {member.thematicLine && <p className="team-thematic">{member.thematicLine}</p>}
          {member.shortBio && (
            <>
              <h4>{english ? 'Professional background' : 'Trajetória profissional'}</h4>
              <p>{member.shortBio}</p>
            </>
          )}
          <h4>{english ? 'Role at Foton' : 'Atuação no Foton'}</h4>
          <p>{member.roleDescription}</p>
          {!member.shortBio && (
            <p className="team-bio-note">{english ? "Professional biography under review." : "Biografia profissional em atualização."}</p>
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
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const team = english
    ? instituteTeam.map((member) => ({
        ...member,
        role: memberEnglish[member.id]?.role ?? member.role,
        roleDescription: memberEnglish[member.id]?.roleDescription ?? member.roleDescription,
        thematicLine: member.thematicLine ? lineEnglish[member.thematicLine] ?? member.thematicLine : member.thematicLine,
      }))
    : instituteTeam;
  const activeLevels = english ? levelsEnglish : levels;
  const [selected, setSelected] = useState<InstituteMember | null>(null);
  const grouped = (level: InstituteMember['level']) =>
    team.filter((member) => member.level === level);
  return (
    <section
      id="equipe"
      className="section institute-team-section"
      aria-labelledby="team-heading"
      data-lcr-section-id="2.B.1"
    >
      <div className="container">
        <div className="team-intro">
          <p className="team-label">{english ? "Our Team" : "Nossa Equipe"}</p>
          <h2 id="team-heading">{english ? 'The people building Foton' : 'As pessoas que constroem o Foton'}</h2>
          <p className="team-subtitle">{english ? "Different paths. One shared purpose." : "Diferentes trajetórias. Um propósito em comum."}</p>
          <p>
            {english
            ? 'Instituto Foton brings together leaders, researchers, and professionals from different fields of knowledge. Our multidisciplinary structure connects science, technology, education, and strategy to strengthen quantum technology development in Brazil.'
            : 'O Instituto Foton reúne lideranças, pesquisadores e profissionais de diferentes áreas do conhecimento. Nossa estrutura multidisciplinar conecta ciência, tecnologia, educação e estratégia para fortalecer o desenvolvimento das tecnologias quânticas no Brasil.'}
          </p>
        </div>
        <div className="team-stats" aria-label={english ? "Team composition" : "Composição da equipe"}>
          <span>
            <strong>{grouped('diretoria').length + grouped('vice-presidencia').length}</strong>{' '}
            {english ? 'Board and Vice Presidencies' : 'Diretoria e Vice-Presidências'}
          </span>
          <span>
            <strong>{grouped('coordenacao').length}</strong> {english ? 'Scientific Coordination' : 'Coordenação Científica'}
          </span>
          <span>
            <strong>{grouped('adviser').length}</strong> {english ? 'Board Advisers' : 'Conselheiros e Advisers'}
          </span>
        </div>
        {activeLevels.map(({ key, title, subtitle }) => {
          const members = grouped(key);
          const lines =
            key === 'coordenacao'
              ? Array.from(new Set(members.map((m) => m.thematicLine))).sort(
                  (a, b) =>
                    members.filter((m) => m.thematicLine === a).length -
                    members.filter((m) => m.thematicLine === b).length,
                )
              : [];
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
                      className={`team-line ${
                        members.filter((m) => m.thematicLine === line).length === 1
                          ? 'team-line--single'
                          : 'team-line--multiple'
                      }`}
                      key={line}
                    >
                      <h4>{line}</h4>
                      <PeopleGallery
                        className="team-grid"
                        items={members
                          .filter((m) => m.thematicLine === line)
                          .map((m) => ({
                            id: m.id,
                            name: m.displayName,
                            role: m.role,
                            imageSrc: assetUrl(m.photo),
                            thematicLine: m.thematicLine,
                            catalogId: `2.B.1.C-${m.id}`,
                            onOpen: () => setSelected(m),
                          }))}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <PeopleGallery
                  className={
                    key === 'vice-presidencia'
                      ? 'team-grid team-grid--centered team-grid--vice'
                      : key === 'adviser'
                        ? 'team-grid team-grid--centered'
                        : 'team-grid'
                  }
                  items={members.map((m) => ({
                    id: m.id,
                    name: m.displayName,
                    role: m.role,
                    imageSrc: assetUrl(m.photo),
                    thematicLine: m.thematicLine,
                    catalogId: `2.B.1.C-${m.id}`,
                    onOpen: () => setSelected(m),
                  }))}
                />
              )}
            </div>
          );
        })}
      </div>
      {selected && <ProfileDialog member={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
