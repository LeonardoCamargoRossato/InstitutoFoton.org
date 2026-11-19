// Onda eletromagnética plana: E e B oscilam em fase e em direções transversais.
// Projeção axonométrica original baseada nos eixos e vetores das referências.
type Point = { x: number; y: number };

const ORIGIN: Point = { x: 110, y: 87 };
const END: Point = { x: 604, y: 102 };
const PERIODS = 2.45;
const WAVE_SAMPLES = Array.from({ length: 161 }, (_, index) => index / 160);
const VECTOR_SAMPLES = Array.from({ length: 49 }, (_, index) => (index + 1) / 50);

function axisPoint(t: number): Point {
  return {
    x: ORIGIN.x + (END.x - ORIGIN.x) * t,
    y: ORIGIN.y + (END.y - ORIGIN.y) * t,
  };
}

function electricPoint(t: number): Point {
  const axis = axisPoint(t);
  const oscillation = Math.sin(2 * Math.PI * PERIODS * t);

  return { x: axis.x, y: axis.y - 48 * oscillation };
}

function magneticPoint(t: number): Point {
  const axis = axisPoint(t);
  const oscillation = Math.sin(2 * Math.PI * PERIODS * t);

  return {
    x: axis.x - 41 * oscillation,
    y: axis.y + 30 * oscillation,
  };
}

function makePath(pointAt: (t: number) => Point) {
  return WAVE_SAMPLES.map((t, index) => {
    const point = pointAt(t);
    const command = index === 0 ? 'M' : 'L';
    return `${command}${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

const ELECTRIC_PATH = makePath(electricPoint);
const MAGNETIC_PATH = makePath(magneticPoint);

export default function ElectromagneticWaveDivider() {
  return (
    <svg
      className="social-youtube-transition-wave"
      viewBox="0 0 700 172"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id="social-em-axis-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#173965" strokeWidth="1.2" />
        </marker>
        <marker
          id="social-em-electric-arrow"
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
        >
          <path d="M0 0 L5 2.5 L0 5 Z" fill="#e33b50" />
        </marker>
        <marker
          id="social-em-magnetic-arrow"
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
        >
          <path d="M0 0 L5 2.5 L0 5 Z" fill="#195bcc" />
        </marker>
      </defs>

      <g className="social-em-axes">
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2="649" y2="104" />
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2={ORIGIN.x} y2="10" />
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2="40" y2="160" />
        <text x="651" y="113">+x</text>
        <text x="119" y="16">+y</text>
        <text x="12" y="164">+z</text>
      </g>

      <g className="social-em-magnetic-vectors">
        {VECTOR_SAMPLES.map((t) => {
          const from = axisPoint(t);
          const to = magneticPoint(t);
          return (
            <line
              key={t}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
            />
          );
        })}
      </g>
      <g className="social-em-electric-vectors">
        {VECTOR_SAMPLES.map((t) => {
          const from = axisPoint(t);
          const to = electricPoint(t);
          return (
            <line
              key={t}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
            />
          );
        })}
      </g>
      <path className="social-em-magnetic-wave" d={MAGNETIC_PATH} />
      <path className="social-em-electric-wave" d={ELECTRIC_PATH} />
      <text className="social-em-label social-em-label--electric" x="277" y="28">E</text>
      <text className="social-em-label social-em-label--magnetic" x="407" y="156">B</text>
    </svg>
  );
}
