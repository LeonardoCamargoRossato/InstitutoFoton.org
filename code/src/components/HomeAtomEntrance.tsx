import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BookOpen, Network, Pause, Play, Rocket, UsersRound } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';

const fronts = [
  { id: 'ecosystem', label: 'Formação de ecossistema', Icon: Network },
  { id: 'talents', label: 'Conexão de talentos', Icon: UsersRound },
  { id: 'education', label: 'Pesquisa e educação', Icon: BookOpen },
  { id: 'startups', label: 'Geração de novas startups', Icon: Rocket },
] as const;

function QuantumGlass({ paused, formed }: { paused: boolean; formed: boolean }) {
  return (
    <svg
      className="home-quantum-glass"
      viewBox="0 0 1440 720"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-paused={paused}
      data-formed={formed}
    >
      <defs>
        <linearGradient id="home-glass-tone" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a7e9ff" stopOpacity=".02" />
          <stop offset=".45" stopColor="#73d9ff" stopOpacity=".12" />
          <stop offset=".7" stopColor="#d8f6ff" stopOpacity=".03" />
          <stop offset="1" stopColor="#827deb" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id="home-glass-edge">
          <stop stopColor="#9bdeff" stopOpacity="0" />
          <stop offset=".65" stopColor="#b3edff" stopOpacity=".65" />
          <stop offset="1" stopColor="#82aaff" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g className="home-glass-drift">
        <path
          className="home-glass-plate"
          d="M420 70 Q750 -60 1180 110 L1490 300 Q1100 185 740 280 Z"
        />
        <path
          className="home-glass-plate"
          d="M380 610 Q770 380 1430 520 L1500 740 Q870 565 500 735 Z"
        />
        <path
          className="home-glass-plate home-glass-plate-far"
          d="M870 -70 Q1060 200 1500 195 L1470 385 Q1110 280 735 10 Z"
        />
      </g>
      <g className="home-glass-undulation" fill="none" stroke="url(#home-glass-edge)">
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M-80 ${255 + i * 48} C380 ${40 + i * 55} 830 ${650 - i * 35} 1530 ${120 + i * 65}`}
          />
        ))}
      </g>
      <g className="home-glass-refraction" fill="none" stroke="url(#home-glass-edge)">
        <path d="M230 690 Q640 210 1530 415" />
        <path d="M250 704 Q660 220 1530 430" />
        <path d="M570 -50 Q800 290 1480 110" />
      </g>
    </svg>
  );
}

function CollisionField({ count }: { count: number }) {
  return (
    <svg className="home-collider-svg" aria-hidden="true">
      <defs>
        <linearGradient id="home-particle-trail">
          <stop stopColor="#6e9bff" stopOpacity="0" />
          <stop offset=".7" stopColor="#71d9ff" stopOpacity=".65" />
          <stop offset="1" stopColor="#e0faff" />
        </linearGradient>
        <radialGradient id="home-collision-light">
          <stop stopColor="#e3fcff" stopOpacity=".85" />
          <stop offset=".25" stopColor="#80dfff" stopOpacity=".5" />
          <stop offset="1" stopColor="#57b8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#home-particle-trail)" strokeWidth="2">
        <path className="home-primary-trail" />
        <path className="home-primary-trail" />
      </g>
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          className={'home-field-particle' + (i < 2 ? ' home-primary-particle' : '')}
          r={i < 2 ? 8 : 2.5 + (i % 3)}
        />
      ))}
      <g className="home-collision-center">
        <circle className="home-collision-flare" r="115" fill="url(#home-collision-light)" />
        <g className="home-glass-fracture" fill="none" stroke="#b7edff" strokeWidth="1">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 45})`}
              d={`M0 0 L28 -9 L49 4 L78 -16 L${105 + (i % 3) * 22} -9 M49 4 L65 27 L95 32`}
            />
          ))}
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} className="home-impact-wave">
            <ellipse rx="90" ry="65" />
            <ellipse rx="96" ry="68" />
          </g>
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} className="home-impact-fragment" r={1.6 + (i % 2)} />
        ))}
      </g>
    </svg>
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

/** Finite particle collision forms the network; controllable glass motion stays behind it. */
export default function HomeAtomEntrance() {
  const destination = useRef<HTMLDivElement>(null);
  const flight = useRef<HTMLDivElement>(null);
  const running = useRef<Animation[]>([]);
  const [compact] = useState(() => innerWidth <= 700);
  const [skip] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      Boolean(location.hash) ||
      scrollY > 150,
  );
  const [settled, setSettled] = useState(skip);
  const [arriving, setArriving] = useState(!skip);
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const hero = destination.current?.closest('.home-hero');
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    if (hero) observer.observe(hero);
    const onVisibility = () => setTabVisible(!document.hidden);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      setPaused(media.matches);
      if (media.matches) {
        setSettled(true);
        setArriving(false);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener('change', onMotion);
    // Reconcile changes between initial render and listener registration.
    onVisibility();
    onMotion();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener('change', onMotion);
    };
  }, []);

  useEffect(() => {
    running.current.forEach((animation) => {
      if (!visible || !tabVisible || paused) {
        if (animation.playState === 'running') animation.pause();
      } else if (animation.playState === 'paused') animation.play();
    });
  }, [visible, tabVisible, paused]);

  useLayoutEffect(() => {
    if (!arriving) return;
    const target = destination.current;
    const overlay = flight.current;
    const hero = target?.closest('.home-hero');
    if (!target || !overlay || !hero) return;
    const area = hero.getBoundingClientRect();
    const bounds = target.getBoundingClientRect();
    const center = {
      x: bounds.left - area.left + bounds.width / 2,
      y: bounds.top - area.top + bounds.height / 2,
    };
    const width = area.width,
      height = area.height;
    const duration = compact ? 4300 : 4800;
    const impact = duration * 0.46;
    const animations: Animation[] = [];
    const finish = () => {
      setSettled(true);
      setArriving(false);
    };
    overlay.querySelector('svg')!.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const origins = [
      [-0.03, -0.03],
      [0.5, -0.03],
      [1.03, -0.03],
      [1.03, 0.5],
      [1.03, 1.03],
      [0.5, 1.03],
      [-0.03, 1.03],
      [-0.03, 0.5],
    ];
    const trails = overlay.querySelectorAll<SVGPathElement>('.home-primary-trail');
    overlay
      .querySelectorAll<SVGCircleElement>('.home-field-particle')
      .forEach((particle, index) => {
        const primary = index < 2;
        const origin = primary ? [-0.03, index === 0 ? 0.08 : 0.94] : origins[(index - 2) % 8];
        const start = { x: origin[0] * width, y: origin[1] * height };
        const pass = !primary && index % 5 === 0;
        const end = pass ? { x: width * 1.08, y: height * (0.2 + (index % 3) * 0.22) } : center;
        const bend = primary
          ? (index === 0 ? -1 : 1) * height * 0.25
          : (index % 2 ? 1 : -1) * width * 0.12;
        const control = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 + bend };
        const frames = Array.from({ length: 33 }, (_, step) => {
          const t = step / 32,
            u = 1 - t;
          return {
            transform: `translate3d(${u * u * start.x + 2 * u * t * control.x + t * t * end.x}px, ${u * u * start.y + 2 * u * t * control.y + t * t * end.y}px, 0) scale(${primary ? 1.65 - t * 1.18 : 1})`,
            opacity: t < 0.1 ? t * 8 : t > 0.9 ? (1 - t) * 8 : primary ? 0.9 : 0.66,
            offset: t,
          };
        });
        animations.push(
          particle.animate(frames, {
            duration: primary ? impact : impact - 180 + (index % 3) * 90,
            delay: primary ? 0 : (index % 4) * 35,
            easing: 'cubic-bezier(.3,.1,.48,1)',
            fill: 'both',
          }),
        );
        if (primary) {
          const path = trails[index];
          path.setAttribute(
            'd',
            `M${start.x} ${start.y} Q${control.x} ${control.y} ${end.x} ${end.y}`,
          );
          const length = path.getTotalLength();
          path.style.strokeDasharray = String(length);
          animations.push(
            path.animate(
              [
                { strokeDashoffset: String(length), opacity: 0 },
                { strokeDashoffset: String(length * 0.75), opacity: 0.5, offset: 0.3 },
                { strokeDashoffset: '0', opacity: 0.75, offset: 0.92 },
                { strokeDashoffset: '0', opacity: 0 },
              ],
              { duration: impact + 180, easing: 'ease-in-out', fill: 'both' },
            ),
          );
        }
      });
    const collision = overlay.querySelector<SVGGElement>('.home-collision-center')!;
    collision.setAttribute('transform', `translate(${center.x} ${center.y})`);
    const flare = overlay.querySelector('.home-collision-flare')!;
    animations.push(
      flare.animate([{ opacity: 0 }, { opacity: 0.75, offset: 0.15 }, { opacity: 0 }], {
        delay: impact,
        duration: 1000,
        fill: 'both',
      }),
    );
    const fracture = overlay.querySelector('.home-glass-fracture')!;
    animations.push(
      fracture.animate(
        [
          { opacity: 0, transform: 'scale(.65)' },
          { opacity: 0.8, transform: 'scale(1)', offset: 0.16 },
          { opacity: 0, transform: 'scale(1.12)' },
        ],
        { delay: impact, duration: duration - impact, fill: 'both' },
      ),
    );
    overlay.querySelectorAll('.home-impact-wave').forEach((wave, index) =>
      animations.push(
        wave.animate(
          [
            { opacity: 0, transform: 'scale(.1)' },
            { opacity: 0.5, offset: 0.12 },
            { opacity: 0, transform: `scale(${Math.max(width, height) / 65})` },
          ],
          {
            delay: impact + index * 140,
            duration: duration - impact - index * 140,
            easing: 'cubic-bezier(.12,.55,.28,1)',
            fill: 'both',
          },
        ),
      ),
    );
    overlay.querySelectorAll('.home-impact-fragment').forEach((fragment, index) => {
      const angle = (index * Math.PI) / 4;
      animations.push(
        fragment.animate(
          [
            { opacity: 0, transform: 'translate(0px,0px)' },
            { opacity: 0.8, offset: 0.1 },
            {
              opacity: 0,
              transform: `translate(${Math.cos(angle) * 160}px,${Math.sin(angle) * 110}px)`,
            },
          ],
          { delay: impact, duration: 1300, fill: 'both', easing: 'ease-out' },
        ),
      );
    });
    const formation = overlay.animate([{ opacity: 1 }, { opacity: 1 }], {
      duration: duration * 0.64,
    });
    formation.onfinish = () => setSettled(true);
    const lifecycle = overlay.animate([{ opacity: 1 }, { opacity: 1 }], { duration });
    lifecycle.onfinish = finish;
    animations.push(formation, lifecycle);
    running.current = animations;
    window.addEventListener('resize', finish);
    window.addEventListener('scroll', finish, { once: true, passive: true });
    return () => {
      window.removeEventListener('resize', finish);
      window.removeEventListener('scroll', finish);
      formation.onfinish = null;
      lifecycle.onfinish = null;
      animations.forEach((animation) => animation.cancel());
      running.current = [];
    };
  }, [arriving, compact]);

  return (
    <>
      <QuantumGlass paused={paused || !visible || !tabVisible} formed={settled} />
      <FotonNetwork settled={settled} destination={destination} />
      {arriving && (
        <div
          ref={flight}
          className="home-atom-flight"
          data-testid="home-atom-orbitals"
          aria-hidden="true"
        >
          <CollisionField count={compact ? 12 : 18} />
        </div>
      )}
      <button
        className="home-motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => {
          setPaused((value) => !value);
          setSettled(true);
          setArriving(false);
        }}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        {paused ? 'Ativar movimento' : 'Pausar movimento'}
      </button>
    </>
  );
}
