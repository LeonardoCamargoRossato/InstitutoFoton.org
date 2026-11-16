import { ArrowDownRight } from 'lucide-react';
import { assetUrl } from '../lib/siteAssets';
import '../styles/manifesto-hero.css';

const glassWebp = assetUrl(
  'assets/05 - Manifesto/Imagens do Manifesto/WebP/HeroManifestoFGlass.webp',
);
const glassPng = assetUrl(
  'assets/05 - Manifesto/Imagens do Manifesto/PNG/HeroManifestoFGlass.png',
);

// Silhueta geográfica simplificada do Brasil (Natural Earth, domínio público).
const brazilOutline =
  'M 340 611 L 335 602 L 342 595 L 333 585 L 286 557 L 277 558 L 313 524 L 335 510 L 336 498 L 328 489 L 321 492 L 326 467 L 310 466 L 304 442 L 272 438 L 273 418 L 269 410 L 273 407 L 272 398 L 279 380 L 275 371 L 267 367 L 268 353 L 239 352 L 234 335 L 238 335 L 234 315 L 216 311 L 194 298 L 178 296 L 162 283 L 163 256 L 143 259 L 119 275 L 86 274 L 87 252 L 75 261 L 62 260 L 56 252 L 46 252 L 49 245 L 35 223 L 39 214 L 48 210 L 51 190 L 82 175 L 95 175 L 102 128 L 94 115 L 94 104 L 105 103 L 105 97 L 97 96 L 97 86 L 125 87 L 130 82 L 137 95 L 148 101 L 160 100 L 192 79 L 179 75 L 177 56 L 170 52 L 196 56 L 227 45 L 233 39 L 231 35 L 242 38 L 240 44 L 248 53 L 242 71 L 247 85 L 256 92 L 263 93 L 281 83 L 301 85 L 301 75 L 346 80 L 365 50 L 370 50 L 382 84 L 390 86 L 390 96 L 379 109 L 384 113 L 410 115 L 410 130 L 422 120 L 465 135 L 472 143 L 469 152 L 487 147 L 515 155 L 537 154 L 578 183 L 602 188 L 608 193 L 615 220 L 609 245 L 557 305 L 548 376 L 541 401 L 526 421 L 523 436 L 511 442 L 508 451 L 468 457 L 424 479 L 412 494 L 412 513 L 406 535 L 340 611 Z';

function BrazilConstellation() {
  return (
    <svg
      className="manifesto-hero-brazil"
      viewBox="0 0 680 720"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="manifesto-brazil-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14bbf5" />
          <stop offset="0.52" stopColor="#3edbff" />
          <stop offset="1" stopColor="#1b7de6" />
        </linearGradient>
        <radialGradient id="manifesto-brazil-fill">
          <stop offset="0" stopColor="#118cc3" stopOpacity="0.24" />
          <stop offset="1" stopColor="#083574" stopOpacity="0.08" />
        </radialGradient>
        <clipPath id="manifesto-brazil-mask">
          <path d={brazilOutline} />
        </clipPath>
      </defs>
      <path
        d={brazilOutline}
        fill="url(#manifesto-brazil-fill)"
        stroke="url(#manifesto-brazil-stroke)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
      <g clipPath="url(#manifesto-brazil-mask)" stroke="#6ac9ff" strokeOpacity="0.19">
        {Array.from({ length: 13 }, (_, index) => (
          <path key={index} d={`M 0 ${100 + index * 43} H 680`} />
        ))}
        {Array.from({ length: 13 }, (_, index) => (
          <path key={index} d={`M ${64 + index * 42} 0 V 720`} />
        ))}
        <path d="M 140 225 L 320 171 L 493 259 L 400 407 L 318 485 L 232 328 L 140 225" />
        <path d="M 320 171 L 232 328 L 493 259 M 232 328 L 400 407" />
      </g>
      <g fill="#89e7ff">
        {[
          [140, 225],
          [320, 171],
          [493, 259],
          [232, 328],
          [400, 407],
          [318, 485],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  );
}

export default function ManifestoHero() {
  return (
    <section className="manifesto-hero" aria-labelledby="manifesto-hero-title">
      <div className="manifesto-hero-orbit manifesto-hero-orbit--one" aria-hidden="true" />
      <div className="manifesto-hero-orbit manifesto-hero-orbit--two" aria-hidden="true" />
      <BrazilConstellation />
      <div className="container manifesto-hero-layout">
        <div className="manifesto-hero-copy">
          <span className="manifesto-hero-eyebrow">
            Instituto Foton <span aria-hidden="true">•</span> Uma construção nacional
          </span>
          <h1 id="manifesto-hero-title">
            <span>Manifesto</span>
            <strong>Quântico Nacional</strong>
          </h1>
          <p>
            Um chamado para construir, juntos, o futuro das tecnologias quânticas no Brasil.
          </p>
          <a className="manifesto-hero-action" href="#contribuir-manifesto">
            Venha contribuir <ArrowDownRight aria-hidden="true" size={21} />
          </a>
        </div>
        <div className="manifesto-hero-visual" aria-hidden="true">
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
      </div>
      <span className="manifesto-hero-bottom-line" aria-hidden="true" />
    </section>
  );
}
