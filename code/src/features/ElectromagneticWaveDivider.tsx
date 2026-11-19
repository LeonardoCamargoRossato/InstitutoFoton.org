// Onda eletromagnética: E e B em fase, transversais à direção de propagação x.
// A geometria é calculada uma vez; SVG decorativo sem dependências externas.
type Point = { x: number; y: number };

const ORIGIN: Point = { x: 110, y: 87 };
const END: Point = { x: 604, y: 102 };
const PERIODS = 2.45;

function axisPoint(t: number): Point {
  return {
    x: ORIGIN.x + (END.x - ORIGIN.x) * t,
    y: ORIGIN.y + (END.y - ORIGIN.y) * t,
  };
}

function electricPoint(t: number): Point {
  const axis = axisPoint(t);
  const wave = Math.sin(2 * Math.PI * PERIODS * t);
  return { x: axis.x, y: axis.y - 48 * wave };
}

function magneticPoint(t: number): Point {
  const axis = axisPoint(t);
  const wave = Math.sin(2 * Math.PI * PERIODS * t);
  return { x: axis.x - 41 * wave, y: axis.y + 30 * wave };
}

function vertex(point: Point) {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
}

function wavePath(field: (t: number) => Point) {
  const points: string[] = [];
  for (let index = 0; index <= 160; index += 1) {
    const command = index === 0 ? 'M' : 'L';
    points.push(command + vertex(field(index / 160)));
  }
  return points.join(' ');
}

function vectorPath(field: (t: number) => Point) {
  const vectors: string[] = [];
  for (let index = 1; index <= 49; index += 1) {
    const t = index / 50;
    vectors.push(`M${vertex(axisPoint(t))} L${vertex(field(t))}`);
  }
  return vectors.join(' ');
}

const ELECTRIC_WAVE = wavePath(electricPoint);
const MAGNETIC_WAVE = wavePath(magneticPoint);
const ELECTRIC_VECTORS = vectorPath(electricPoint);
const MAGNETIC_VECTORS = vectorPath(magneticPoint);

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
          <path
            d="M0 0 L6 3 L0 6"
            fill="none"
            stroke="#173965"
            strokeWidth="1.2"
          />
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
        <line x1="110" y1="87" x2="649" y2="104" />
        <line x1="110" y1="87" x2="110" y2="10" />
        <line x1="110" y1="87" x2="40" y2="160" />
        <text x="651" y="113">+x</text>
        <text x="119" y="16">+y</text>
        <text x="12" y="164">+z</text>
      </g>

      <g className="social-em-magnetic-vectors">
        <path d={MAGNETIC_VECTORS} />
      </g>
      <g className="social-em-electric-vectors">
        <path d={ELECTRIC_VECTORS} />
      </g>
      <path className="social-em-magnetic-wave" d={MAGNETIC_WAVE} />
      <path className="social-em-electric-wave" d={ELECTRIC_WAVE} />
      <text className="social-em-label social-em-label--electric" x="277" y="28">
        E
      </text>
      <text className="social-em-label social-em-label--magnetic" x="407" y="156">
        B
      </text>
    </svg>
  );
}
