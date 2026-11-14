import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function AtomArtwork() {
  return (
    <>
      <span className="hero-identity-orbit hero-identity-orbit-one" />
      <span className="hero-identity-orbit hero-identity-orbit-two" />
      <span className="hero-identity-orbit hero-identity-orbit-three" />
      <span className="hero-identity-nucleus" />
      <span className="hero-identity-spark spark-one" />
      <span className="hero-identity-spark spark-two" />
      <span className="hero-identity-spark spark-three" />
      <span className="hero-identity-spark spark-four" />
      <span className="hero-identity-equation">E = hν</span>
    </>
  );
}

/**
 * Usa uma cópia transitória do átomo original sobre a viewport e faz a transição
 * até as coordenadas reais do átomo da Home. A cópia desaparece ao terminar;
 * o elemento estático original ocupa exatamente a mesma posição.
 *
 * Uma única animação por montagem da Home; sem imagens, bibliotecas adicionais,
 * polling, scroll-jank ou alterações de layout.
 */
export default function HomeAtomEntrance() {
  const stationary = useRef<HTMLDivElement>(null);
  const flying = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      Boolean(window.location.hash) ||
      window.scrollY > 150,
  );

  useLayoutEffect(() => {
    if (settled) return;
    const destination = stationary.current;
    const overlay = flying.current;
    if (!destination || !overlay) return;

    const target = destination.getBoundingClientRect();
    const mobile = window.innerWidth <= 700;
    const centerX = target.left + target.width / 2;
    const fromX = window.innerWidth * (mobile ? 0.45 : 0.48) - centerX;
    const fromY = -target.top - target.height * (mobile ? 1.55 : 1.85);
    const duration = mobile ? 2200 : 2900;

    // Layout idêntico ao destino: apenas transform/opacity são animados.
    Object.assign(overlay.style, {
      left: target.left + 'px',
      top: target.top + 'px',
      width: target.width + 'px',
      height: target.height + 'px',
      visibility: 'visible',
    });

    const frames: Keyframe[] = [
      {
        offset: 0,
        opacity: 1,
        transform: `translate3d(${fromX}px, ${fromY}px, 0) rotate(-115deg) scale(${mobile ? 1.9 : 2.65})`,
        easing: 'cubic-bezier(0.42, 0, 0.72, 0.95)',
      },
      {
        offset: 0.38,
        opacity: 1,
        transform: `translate3d(${fromX * 0.72}px, ${fromY * 0.32}px, 0) rotate(-64deg) scale(${mobile ? 1.45 : 1.85})`,
        easing: 'cubic-bezier(0.18, 0.78, 0.3, 1)',
      },
      {
        offset: 0.73,
        opacity: 1,
        transform: `translate3d(${-Math.min(45, target.width * 0.14)}px, -${Math.min(54, target.height * 0.16)}px, 0) rotate(14deg) scale(1.17)`,
        easing: 'cubic-bezier(0.22, 0.8, 0.22, 1)',
      },
      {
        offset: 0.92,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
      },
      {
        offset: 1,
        opacity: 0,
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
      },
    ];
    const animation = overlay.animate(frames, {
      duration,
      easing: 'linear',
      fill: 'both',
    });
    animation.onfinish = () => setSettled(true);

    return () => {
      animation.onfinish = null;
      animation.cancel();
    };
  }, [settled]);

  return (
    <>
      <div
        ref={stationary}
        className={'hero-identity hero-identity--static' + (settled ? ' is-settled' : '')}
        aria-hidden="true"
      >
        <AtomArtwork />
      </div>
      {!settled &&
        createPortal(
          <div
            ref={flying}
            className="hero-identity hero-identity--flight"
            aria-hidden="true"
            data-testid="hero-atom-flight"
          >
            <AtomArtwork />
          </div>,
          document.body,
        )}
    </>
  );
}
