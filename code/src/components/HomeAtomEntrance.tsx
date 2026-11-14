import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Network, Rocket, UsersRound } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';

const fronts = [
  { id: 'ecosystem', label: 'Formação de ecossistema', Icon: Network },
  { id: 'talents', label: 'Conexão de talentos', Icon: UsersRound },
  { id: 'education', label: 'Pesquisa e educação', Icon: BookOpen },
  { id: 'startups', label: 'Geração de novas startups', Icon: Rocket },
] as const;

function ArrivingOrbitals() {
  return (
    <svg className="home-atom-flight-svg" viewBox="0 0 420 420" aria-hidden="true">
      <defs>
        <radialGradient id="home-atom-electron-glow">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".42" stopColor="#9deeff" />
          <stop offset="1" stopColor="#269cff" />
        </radialGradient>
      </defs>
      <g className="home-arriving-orbit home-arriving-orbit-one">
        <ellipse cx="210" cy="210" rx="149" ry="62" />
        <circle className="home-orbit-electron" cx="359" cy="210" r="6" />
        <circle className="home-orbit-electron home-orbit-electron-small" cx="62" cy="210" r="3" />
      </g>
      <g className="home-arriving-orbit home-arriving-orbit-two">
        <ellipse cx="210" cy="210" rx="142" ry="58" />
        <circle className="home-orbit-electron" cx="68" cy="210" r="5.5" />
      </g>
      <g className="home-arriving-orbit home-arriving-orbit-three">
        <ellipse cx="210" cy="210" rx="155" ry="54" />
        <circle className="home-orbit-electron" cx="210" cy="156" r="5" />
      </g>
      <g className="home-singular-atom">
        <circle className="home-singular-halo" cx="210" cy="210" r="31" />
        <circle className="home-singular-nucleus" cx="210" cy="210" r="14" />
        <circle className="home-singular-highlight" cx="206" cy="206" r="4" />
      </g>
      <g className="home-atom-burst">
        <circle cx="210" cy="210" r="34" className="home-atom-burst-ring" />
        <circle cx="210" cy="210" r="65" className="home-atom-burst-ring-secondary" />
        {Array.from({ length: 12 }, (_, index) => {
          const radians = (index * Math.PI) / 6;
          return (
            <line
              key={index}
              x1={210 + Math.cos(radians) * 28}
              y1={210 + Math.sin(radians) * 28}
              x2={210 + Math.cos(radians) * 108}
              y2={210 + Math.sin(radians) * 108}
            />
          );
        })}
      </g>
    </svg>
  );
}

function FotonNetwork({ settled, destination }: { settled: boolean; destination: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={destination}
      className={'hero-identity hero-identity--network' + (settled ? ' is-settled' : '')}
      role="img"
      aria-label="Foton conecta formação de ecossistema, conexão de talentos, pesquisa e educação, e geração de novas startups."
      data-testid="home-foton-network"
    >
      <svg className="home-network-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 24 22 Q 36 31 50 50" />
        <path d="M 76 22 Q 64 31 50 50" />
        <path d="M 24 78 Q 36 69 50 50" />
        <path d="M 76 78 Q 64 69 50 50" />
        <circle cx="50" cy="50" r="2.3" />
      </svg>
      <div className="home-network-center">
        <img src={assetUrl('assets/WebP/branding/favicon.webp')} alt="" width="60" height="68" />
        <strong>Foton</strong>
      </div>
      {fronts.map(({ id, label, Icon }) => (
        <div className={'home-network-node home-network-node--' + id} key={id}>
          <Icon size={17} strokeWidth={2} aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Orbitais individuais chegam do alto sem um card ao redor.
 * Eles convergem em um único núcleo, há um pulso de expansão e só então
 * surge o grafo do Foton. A arte final permanece estática e acessível.
 */
export default function HomeAtomEntrance() {
  const destination = useRef<HTMLDivElement>(null);
  const flight = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      Boolean(window.location.hash) ||
      window.scrollY > 150,
  );

  useLayoutEffect(() => {
    if (settled) return;
    const target = destination.current;
    const overlay = flight.current;
    if (!target || !overlay) return;

    const placeOrbitals = () => {
      const bounds = target.getBoundingClientRect();
      Object.assign(overlay.style, {
        left: bounds.left + 'px',
        top: bounds.top + 'px',
        width: bounds.width + 'px',
        height: bounds.height + 'px',
        visibility: 'visible',
      });
      const fall = bounds.top + bounds.height / 2 + Math.max(260, innerHeight * 0.52);
      overlay.style.setProperty('--orbital-fall', fall + 'px');
    };

    placeOrbitals();
    window.addEventListener('resize', placeOrbitals);
    const mobile = window.innerWidth <= 700;
    overlay.style.setProperty('--motion-factor', mobile ? '0.82' : '1');

    // Mantém o ciclo de vida alinhado ao término da explosão (sem polling/timers).
    const animation = overlay.animate([{ opacity: 1 }, { opacity: 1 }], {
      duration: mobile ? 3150 : 3850,
      fill: 'both',
    });
    animation.onfinish = () => setSettled(true);

    return () => {
      window.removeEventListener('resize', placeOrbitals);
      animation.onfinish = null;
      animation.cancel();
    };
  }, [settled]);

  return (
    <>
      <FotonNetwork settled={settled} destination={destination} />
      {!settled &&
        createPortal(
          <div ref={flight} className="home-atom-flight" data-testid="home-atom-orbitals" aria-hidden="true">
            <ArrivingOrbitals />
          </div>,
          document.body,
        )}
    </>
  );
}
