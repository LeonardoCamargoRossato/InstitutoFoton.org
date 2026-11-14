import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize, Minus, Plus, X } from 'lucide-react';

type Props = {
  src: string;
  fallback?: string;
  title: string;
  caption?: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previewUntilLoaded?: boolean;
};

export function ImageZoomDialog({
  src,
  fallback,
  title,
  caption,
  onClose,
  onPrevious,
  onNext,
  previewUntilLoaded = false,
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(previewUntilLoaded && fallback ? fallback : src);
  useEffect(() => {
    if (!previewUntilLoaded || !fallback) {
      setCurrentSrc(src);
      return;
    }
    setCurrentSrc(fallback);
    const fullResolution = new Image();
    fullResolution.onload = () => setCurrentSrc(src);
    fullResolution.src = src;
    return () => {
      fullResolution.onload = null;
    };
  }, [src, fallback, previewUntilLoaded]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previousFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'ArrowLeft' && onPrevious) {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === 'ArrowRight' && onNext) {
        event.preventDefault();
        onNext();
      }
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setZoom((v) => Math.min(6, v + 0.5));
      }
      if (event.key === '-') {
        event.preventDefault();
        setZoom((v) => Math.max(1, v - 0.5));
      }
      if (event.key === '0') {
        event.preventDefault();
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
      if (event.key === 'Tab') {
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>('.foton-zoom-dialog button:not(:disabled)'),
        );
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose, onPrevious, onNext]);

  function setScale(next: number) {
    const value = Math.min(6, Math.max(1, next));
    setZoom(value);
    if (value === 1) setPan({ x: 0, y: 0 });
  }
  function wheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setScale(zoom + (event.deltaY < 0 ? 0.25 : -0.25));
  }
  function down(event: PointerEvent<HTMLImageElement>) {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, ox: pan.x, oy: pan.y };
  }
  function move(event: PointerEvent<HTMLImageElement>) {
    if (!drag.current) return;
    setPan({
      x: drag.current.ox + event.clientX - drag.current.x,
      y: drag.current.oy + event.clientY - drag.current.y,
    });
  }
  function release(event: PointerEvent<HTMLImageElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return createPortal(
    <div className="foton-zoom-dialog" role="dialog" aria-modal="true" aria-label={title}>
      <div className="foton-zoom-topbar">
        <div className="foton-zoom-title">
          <strong>{title}</strong>
          <span>{caption}</span>
        </div>
        <div className="foton-zoom-tools">
          <button
            type="button"
            onClick={() => setScale(zoom - 0.5)}
            disabled={zoom <= 1}
            aria-label="Reduzir imagem"
          >
            <Minus size={20} />
          </button>
          <span aria-live="polite" className="foton-zoom-level">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale(zoom + 0.5)}
            disabled={zoom >= 6}
            aria-label="Ampliar imagem"
          >
            <Plus size={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              setScale(1);
              setPan({ x: 0, y: 0 });
            }}
            aria-label="Ajustar imagem à tela"
          >
            <Maximize size={20} />
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar galeria">
            <X size={22} />
          </button>
        </div>
      </div>
      <div
        className="foton-zoom-stage"
        onWheel={wheel}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {onPrevious && (
          <button
            className="foton-zoom-arrow previous"
            onClick={onPrevious}
            aria-label="Imagem anterior"
          >
            <ChevronLeft />
          </button>
        )}
        <img
          src={currentSrc}
          alt={title}
          draggable={false}
          style={{ transform: 'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ')' }}
          onError={() => {
            if (fallback && currentSrc !== fallback) setCurrentSrc(fallback);
          }}
          onDoubleClick={() => setScale(zoom >= 2 ? 1 : 2)}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={release}
          onPointerCancel={() => {
            drag.current = null;
          }}
          className={zoom > 1 ? 'is-pannable' : ''}
        />
        {onNext && (
          <button className="foton-zoom-arrow next" onClick={onNext} aria-label="Próxima imagem">
            <ChevronRight />
          </button>
        )}
      </div>
      <p className="foton-zoom-help">
        Roda do mouse: zoom · Arraste para mover · Duplo clique: ampliar · Esc: fechar
      </p>
    </div>,
    document.body,
  );
}
