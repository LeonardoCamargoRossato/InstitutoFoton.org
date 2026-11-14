import { useEffect, useState, type RefObject } from 'react';
import { assetUrl, imageAsset } from '../lib/siteAssets';

const logo = imageAsset('foton-logo-light');

// Verifica os bytes aprovados antes de importar o SVG para a página.
const approvedIntegrity = 'sha256-64ZXikb0ysnr6nPZRYir8RGW9yH/aGroI/VvlnaiC7c=';

export type PhotonIdentityPhase = 'approach' | 'playing' | 'static';

export default function PhotonIdentityAnimation({
  artwork,
  phase,
}: {
  artwork: RefObject<HTMLDivElement | null>;
  phase: PhotonIdentityPhase;
}) {
  const [fallbackToPng, setFallbackToPng] = useState(false);

  useEffect(() => {
    const host = artwork.current;
    if (!host) return;
    const controller = new AbortController();

    async function loadArtwork(host: HTMLDivElement) {
      try {
        const response = await fetch(assetUrl('assets/AnimacaoIdentidadeFoton.svg'), {
          integrity: approvedIntegrity,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('SVG indisponível');
        const xml = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
        if (controller.signal.aborted) return;
        if (xml.documentElement.localName !== 'svg') throw new Error('SVG inválido');

        // A seção é clara. As regras de reprodução ficam isoladas do restante da página.
        const rules = document.createElement('style');
        rules.textContent = `
          svg { display: block; width: 100%; height: 100%; }
          :host(:not([data-phase="playing"])) svg * { animation: none !important; }
          :host(:not([data-phase="playing"])) .efeitos { display: none !important; }
          :host(:not([data-phase="playing"])) #Marca g[mask] { mask: none; }
          @media (prefers-reduced-motion: no-preference) {
            :host([data-phase="approach"]) #Marca g[mask] { visibility: hidden; }
          }
          @media (prefers-color-scheme: dark) and (forced-colors: none) {
            #Marca .marca-escura { display: inline; }
            #Marca .marca-clara { display: none; }
          }
        `;
        const svg = document.importNode(xml.documentElement, true);
        const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
        shadow.replaceChildren(svg, rules);
        host.setAttribute('data-artwork-status', 'ready');
      } catch {
        // Sem a arte animada, a imagem institucional estática continua no componente.
        if (!controller.signal.aborted) host.setAttribute('data-artwork-status', 'failed');
      }
    }

    void loadArtwork(host);
    return () => controller.abort();
  }, [artwork]);

  return (
    <div className="photon-identity" role="img" aria-label="Instituto Foton">
      <div id="identidade-foton" className="photon-identity-stage" aria-hidden="true">
        <div ref={artwork} className="photon-identity-artwork" data-phase={phase}>
          <img
            className="photon-identity-fallback"
            src={assetUrl(fallbackToPng ? logo.pngPath : logo.webpPath)}
            width={logo.width}
            height={logo.height}
            alt=""
            decoding="async"
            onError={fallbackToPng ? undefined : () => setFallbackToPng(true)}
          />
        </div>
      </div>
      <span className="photon-identity-caption" aria-hidden="true">
        luz · conexão · ciência
      </span>
    </div>
  );
}
