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

function ArrivingParticles() {
  return (
    <>
      {Array.from({ length: 16 }, (_, index) => (
        <span key={index} className="home-field-particle" />
      ))}
      <img
        className="home-field-seed"
        src={assetUrl('assets/WebP/branding/Favicon.webp')}
        width="58"
        height="66"
        alt=""
      />
    </>
  );
}

function FotonNetwork({
  settled,
  destination,
}: {
  settled: boolean;
  destination: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={destination}
      className={'hero-identity hero-identity--network' + (settled ? ' is-settled' : '')}
      role="img"
      aria-label="Foton conecta formação de ecossistema, conexão de talentos, pesquisa e educação, e geração de novas startups."
      data-testid="home-foton-network"
    >
      <svg
        className="home-network-edges"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 24 22 Q 36 31 50 50" />
        <path d="M 76 22 Q 64 31 50 50" />
        <path d="M 24 78 Q 36 69 50 50" />
        <path d="M 76 78 Q 64 69 50 50" />
        <circle cx="50" cy="50" r="2.3" />
      </svg>
      <div className="home-network-center">
        <img src={assetUrl('assets/WebP/branding/Favicon.webp')} alt="" width="60" height="68" />
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

/** A quiet particle field converges once; the final network remains unchanged. */
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

    const bounds = target.getBoundingClientRect();
    const center = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
    const duration = window.innerWidth <= 700 ? 3800 : 4200;
    const animations: Animation[] = [];
    const finish = () => setSettled(true);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Viewport-based origins cover all eight compass directions, twice.
    const origins = [
      [-0.05, -0.05],
      [0.5, -0.05],
      [1.05, -0.05],
      [1.05, 0.5],
      [1.05, 1.05],
      [0.5, 1.05],
      [-0.05, 1.05],
      [-0.05, 0.5],
    ];
    overlay.querySelectorAll<HTMLElement>('.home-field-particle').forEach((particle, index) => {
      const origin = origins[index % origins.length];
      const x = origin[0] * innerWidth;
      const y = origin[1] * innerHeight;
      const drift = (index % 2 === 0 ? 1 : -1) * Math.min(100, innerWidth * 0.12);
      const control = { x: (x + center.x) / 2 + drift, y: (y + center.y) / 2 - drift * 0.6 };
      const end = { x: center.x + ((index % 3) - 1) * 4, y: center.y + ((index % 5) - 2) * 3 };
      const frames = Array.from({ length: 25 }, (_, step) => {
        const t = step / 24;
        const u = 1 - t;
        return {
          transform: `translate3d(${u * u * x + 2 * u * t * control.x + t * t * end.x}px, ${u * u * y + 2 * u * t * control.y + t * t * end.y}px, 0)`,
          opacity: t < 0.15 ? t * 2.5 : t > 0.8 ? (1 - t) * 1.9 : 0.38,
          offset: t,
        };
      });
      animations.push(
        particle.animate(frames, {
          duration: duration - 900 + (index % 3) * 140,
          delay: Math.floor(index / 8) * 180 + (index % 4) * 70,
          easing: 'cubic-bezier(0.15, 0.65, 0.3, 1)',
          fill: 'both',
        }),
      );
    });
    const seed = overlay.querySelector<HTMLElement>('.home-field-seed')!;
    seed.style.left = center.x + 'px';
    seed.style.top = center.y - 15 + 'px';
    animations.push(
      seed.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: 0.25 },
          { opacity: 0.25, offset: 0.6 },
          { opacity: 0.65, offset: 1 },
        ],
        { duration, easing: 'ease-in-out', fill: 'both' },
      ),
    );
    // One completion signal; no frame loop or polling timer.
    const lifecycle = overlay.animate([{ opacity: 1 }, { opacity: 1 }], { duration });
    lifecycle.onfinish = finish;
    animations.push(lifecycle);
    window.addEventListener('resize', finish);
    window.addEventListener('scroll', finish, { passive: true, once: true });
    reducedMotion.addEventListener('change', finish);
    return () => {
      window.removeEventListener('resize', finish);
      window.removeEventListener('scroll', finish);
      reducedMotion.removeEventListener('change', finish);
      lifecycle.onfinish = null;
      animations.forEach((animation) => animation.cancel());
    };
  }, [settled]);

  return (
    <>
      <FotonNetwork settled={settled} destination={destination} />
      {!settled &&
        createPortal(
          <div
            ref={flight}
            className="home-atom-flight"
            data-testid="home-atom-orbitals"
            aria-hidden="true"
          >
            <ArrivingParticles />
          </div>,
          document.body,
        )}
    </>
  );
}
