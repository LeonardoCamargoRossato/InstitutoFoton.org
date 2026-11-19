// Divisor espectral vetorial: soma explícita de três harmônicos de Fourier.
// O desenho é estático, leve, e não interfere na interação da página.
const WIDTH = 660;
const AXIS = 42;
const HARMONICS = [
  { amplitude: 12, frequency: 1, phase: 0 },
  { amplitude: 7, frequency: 2, phase: 0.7 },
  { amplitude: 3.5, frequency: 3, phase: -0.45 },
] as const;

function harmonicValue(x: number, index: number) {
  const harmonic = HARMONICS[index];
  return harmonic.amplitude * Math.sin((2 * Math.PI * harmonic.frequency * x) / 275 + harmonic.phase);
}

function waveHeight(x: number) {
  return AXIS - HARMONICS.reduce((sum, _harmonic, index) => sum + harmonicValue(x, index), 0);
}

function wavePath(component?: number) {
  return Array.from({ length: 133 }, (_, index) => {
    const x = index * 5;
    const y = component === undefined ? waveHeight(x) : AXIS - harmonicValue(x, component);
    return (index === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(2);
  }).join(' ');
}

const RESULTANT_PATH = wavePath();
const COMPONENT_PATHS = HARMONICS.map((_harmonic, index) => wavePath(index));
const VECTOR_POINTS = Array.from({ length: 11 }, (_, index) => (index + 1) * 55);

export default function FourierSpectrumDivider() {
  return (
    <svg
      className="social-youtube-transition-wave"
      viewBox="0 0 660 84"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="social-fourier-light-spectrum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ec638e" />
          <stop offset="21%" stopColor="#f4b56a" />
          <stop offset="43%" stopColor="#80caa6" />
          <stop offset="67%" stopColor="#35a9df" />
          <stop offset="100%" stopColor="#8175d9" />
        </linearGradient>
      </defs>
      <line className="social-fourier-axis" x1="0" y1={AXIS} x2={WIDTH} y2={AXIS} />
      {COMPONENT_PATHS.map((path, index) => (
        <path className="social-fourier-harmonic" d={path} key={index} />
      ))}
      {VECTOR_POINTS.map((x) => (
        <g className="social-fourier-vector" key={x}>
          <line x1={x} y1={AXIS} x2={x} y2={waveHeight(x)} />
          <circle cx={x} cy={waveHeight(x)} r="2.5" />
        </g>
      ))}
      <path className="social-fourier-resultant-glow" d={RESULTANT_PATH} />
      <path className="social-fourier-resultant" d={RESULTANT_PATH} />
    </svg>
  );
}
