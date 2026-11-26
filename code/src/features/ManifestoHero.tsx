import { ArrowDownRight } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';
import '../styles/manifesto-hero.css';

const brazilStates = assetUrl('assets/05 - Manifesto/Imagens da Página/SVG/BrazilStates.svg');
const glassWebp = assetUrl(
  'assets/05 - Manifesto/Imagens do Manifesto/WebP/HeroManifestoFGlass.webp',
);
const glassPng = assetUrl('assets/05 - Manifesto/Imagens do Manifesto/PNG/HeroManifestoFGlass.png');

// City coordinates use the same equirectangular projection as BrazilStates.svg.
// Sources: regional letters in manifesto-content.ts and the public foundation record.
const journeyCities = [
  { name: 'Manaus', state: 'AM', lon: -60.02, lat: -3.12, dx: -14, dy: -17 },
  { name: 'João Pessoa', state: 'PB', lon: -34.86, lat: -7.12, dx: 14, dy: -12 },
  { name: 'Recife', state: 'PE', lon: -34.88, lat: -8.05, dx: 14, dy: 14 },
  { name: 'Brasília', state: 'DF', lon: -47.88, lat: -15.79, dx: -14, dy: -15 },
  { name: 'Sorocaba', state: 'SP', lon: -47.46, lat: -23.5, dx: -14, dy: 21 },
  { name: 'Porto Alegre', state: 'RS', lon: -51.23, lat: -30.03, dx: -14, dy: 20 },
].map((city) => ({ ...city, x: (city.lon + 74) * 14, y: (6 - city.lat) * 14 }));
const regions = [
  { name: 'Norte', x: 216, y: 104 },
  { name: 'Nordeste', x: 480, y: 155 },
  { name: 'Centro-Oeste', x: 250, y: 259 },
  { name: 'Sudeste', x: 342, y: 350 },
  { name: 'Sul', x: 265, y: 472 },
];
const regionEnglishNames: Record<string, string> = {
  Norte: 'North',
  Nordeste: 'Northeast',
  'Centro-Oeste': 'Midwest',
  Sudeste: 'Southeast',
  Sul: 'South',
};

function BrazilConstellation() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const hub = journeyCities[3];
  return (
    <svg
      className="manifesto-hero-brazil"
      viewBox="0 0 680 620"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="manifesto-network-glow">
          <stop stopColor="#27b9e9" stopOpacity=".16" />
          <stop offset="1" stopColor="#27b9e9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="manifesto-connection" x2="1" y2="1">
          <stop stopColor="#65dbef" stopOpacity=".2" />
          <stop offset=".5" stopColor="#a0efff" stopOpacity=".85" />
          <stop offset="1" stopColor="#65dbef" stopOpacity=".3" />
        </linearGradient>
      </defs>
      <circle cx="340" cy="290" r="280" fill="url(#manifesto-network-glow)" />
      <image href={brazilStates} width="620" height="580" />
      <g className="manifesto-map-connections" fill="none" stroke="url(#manifesto-connection)">
        {journeyCities
          .filter((city) => city !== hub)
          .map((city) => (
            <path
              key={city.name}
              d={`M${hub.x},${hub.y} Q${(city.x + hub.x) / 2 - 55},${Math.min(city.y, hub.y) - 48} ${city.x},${city.y}`}
            />
          ))}
        <path
          d={`M${journeyCities[0].x},${journeyCities[0].y} Q365,60 ${journeyCities[1].x},${journeyCities[1].y}`}
          strokeDasharray="3 6"
        />
      </g>
      <g className="manifesto-map-regions">
        {regions.map((region) => (
          <text key={region.name} x={region.x} y={region.y}>
            {english ? regionEnglishNames[region.name] : region.name}
          </text>
        ))}
      </g>
      {journeyCities.map((city) => (
        <g key={city.name} className="manifesto-map-city">
          <circle cx={city.x} cy={city.y} r="10" className="manifesto-map-pin-ring" />
          <circle cx={city.x} cy={city.y} r="3.5" fill="#e0faff" />
          <text
            x={city.x + city.dx}
            y={city.y + city.dy}
            textAnchor={city.dx < 0 ? 'end' : 'start'}
          >
            {city.name}
            <tspan className="manifesto-map-state"> · {city.state}</tspan>
          </text>
        </g>
      ))}
      <g className="manifesto-map-caption">
        <circle cx="112" cy="567" r="3" fill="#a5e8ff" />
        <text x="124" y="571">
          {english ? 'NATIONAL MOVEMENT CONNECTIONS' : 'CONEXÕES DO MOVIMENTO NACIONAL'}
        </text>
      </g>
    </svg>
  );
}

export default function ManifestoHero() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = localizedCopy(locale);
  return (
    <section
      className="manifesto-hero"
      id="manifesto-capa"
      data-lcr-section-id="5.1"
      aria-labelledby="manifesto-hero-title"
    >
      <div className="manifesto-hero-orbit manifesto-hero-orbit--one" aria-hidden="true" />
      <div className="manifesto-hero-orbit manifesto-hero-orbit--two" aria-hidden="true" />
      <div className="container manifesto-hero-layout">
        <div className="manifesto-hero-copy">
          <span className="manifesto-hero-eyebrow">
            Instituto Foton <span aria-hidden="true">•</span>{' '}
            {copy('Uma construção nacional', 'A national endeavor')}
          </span>
          <h1 id="manifesto-hero-title">
            <span>{'Manifesto '}</span>
            <strong>{copy('Quântico Nacional', 'National Quantum Manifesto')}</strong>
          </h1>
          <p>
            {copy(
              'Ciência, cooperação e soberania tecnológica. Um movimento para conectar o Brasil e construir, juntos, o futuro das tecnologias quânticas.',
              'Science, cooperation, and technological sovereignty. A movement to connect Brazil and build the future of quantum technologies together.',
            )}
          </p>
          <p className="sr-only">
            {copy(
              'O mapa conecta registros de Manaus (AM), João Pessoa (PB), Recife (PE), Brasília (DF), Sorocaba (SP) e Porto Alegre (RS). As linhas representam a articulação do movimento.',
              'The map connects records from Manaus (AM), João Pessoa (PB), Recife (PE), Brasília (DF), Sorocaba (SP), and Porto Alegre (RS). The lines represent the movement’s network.',
            )}
          </p>
          <div
            className="manifesto-hero-pillars"
            aria-label={copy(
              'Abrangência e objetivos do Manifesto',
              'Manifesto scope and objectives',
            )}
          >
            <a href="#odqs">
              <strong>11</strong>
              <span>
                ODQs
                <small>
                  {copy('Objetivos de Desenvolvimento Quântico', 'Quantum Development Objectives')}
                </small>
              </span>
            </a>
            <a href="#cartas">
              <strong>5</strong>
              <span>
                {copy('macrorregiões', 'macro-regions')}
                <small>{copy('Uma construção nacional', 'A national endeavor')}</small>
              </span>
            </a>
          </div>
          <a className="manifesto-hero-action" href="#contribuir-manifesto">
            {copy('Venha contribuir', 'Contribute')} <ArrowDownRight aria-hidden="true" size={21} />
          </a>
        </div>
        <div className="manifesto-hero-visual" aria-hidden="true">
          <BrazilConstellation />
          <div className="manifesto-hero-glass-halo" />
          <picture className="manifesto-hero-picture">
            <source type="image/webp" srcSet={glassWebp} />
            <img
              className="manifesto-hero-glass-f"
              src={glassPng}
              alt=""
              width="1254"
              height="1254"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <p className="manifesto-hero-places">
          <span>{copy('Conexões do movimento', 'Movement connections')}</span> Manaus · João Pessoa
          · Recife · Brasília · Sorocaba · Porto Alegre
        </p>
      </div>
      <span className="manifesto-hero-bottom-line" aria-hidden="true" />
    </section>
  );
}
