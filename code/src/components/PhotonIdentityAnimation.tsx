import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../lib/siteAssets';

const letters = ['f', 'ó', 't', 'o', 'n'];

/**
 * Sequência acessível, acionada somente quando a identidade entra na viewport:
 * partícula → impacto no f → reação das cinco letras → ícone oficial → texto digitado.
 * O estado final permanece estável, inclusive com movimento reduzido.
 */
export default function PhotonIdentityAnimation() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.35, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className={'photon-identity' + (active ? ' is-active' : '')}
      role="img"
      aria-label="Fóton: uma partícula luminosa toca a palavra, ilumina suas letras e revela o símbolo do Foton."
    >
      <div className="photon-identity-stage" aria-hidden="true">
        <div className="photon-identity-initial">
          <span className="photon-identity-particle" />
          <span className="photon-identity-impact-ring" />
          <span className="photon-identity-word">
            {letters.map((letter, index) => (
              <span className="photon-identity-letter" key={index}>
                {letter}
              </span>
            ))}
          </span>
        </div>
        <div className="photon-identity-final">
          <span className="photon-identity-icon">
            <img
              src={assetUrl('assets/WebP/branding/favicon.webp')}
              alt=""
              width={88}
              height={98}
              decoding="async"
            />
          </span>
          <span className="photon-identity-typed">
            {letters.map((letter, index) => (
              <span className="photon-identity-type-letter" key={index}>
                {letter}
              </span>
            ))}
            <span className="photon-identity-cursor" />
          </span>
        </div>
      </div>
      <span className="photon-identity-caption" aria-hidden="true">
        luz · conexão · ciência
      </span>
    </div>
  );
}
