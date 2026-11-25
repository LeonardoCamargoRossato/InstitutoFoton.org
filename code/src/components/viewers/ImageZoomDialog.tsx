import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import { useLanguage } from '../../i18n';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  X,
} from 'lucide-react';

type Props = {
  src: string;
  fallback?: string;
  title: string;
  caption?: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previewUntilLoaded?: boolean;
  /** Modo padrão preserva a apresentação dos demais consumidores do site. */
  variant?: 'legacy' | 'carousel';
  allowFullscreen?: boolean;
  downloadName?: string;
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
  variant = 'legacy',
  allowFullscreen = true,
  downloadName,
}: Props) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const isCarousel = variant === 'carousel';
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);
  const currentSrc =
    errorSrc === src && fallback
      ? fallback
      : previewUntilLoaded && fallback && loadedSrc !== src
        ? fallback
        : src;
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const [zoomDraft, setZoomDraft] = useState('100%');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [nativeFullscreen, setNativeFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const [toolsVisible, setToolsVisible] = useState(true);
  const [showFullscreenToast, setShowFullscreenToast] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const fullscreen = nativeFullscreen || fallbackFullscreen;

  useEffect(() => {
    if (!previewUntilLoaded || !fallback) return;
    const fullResolution = new Image();
    fullResolution.onload = () => setLoadedSrc(src);
    fullResolution.onerror = () => setErrorSrc(src);
    fullResolution.src = src;
    return () => {
      fullResolution.onload = null;
      fullResolution.onerror = null;
    };
  }, [src, fallback, previewUntilLoaded]);

  const setScale = useCallback(
    (next: number | ((current: number) => number)) => {
      const value = typeof next === 'function' ? next(zoomRef.current) : next;
      const clamped = Math.min(6, Math.max(isCarousel ? 0.25 : 1, value));
      zoomRef.current = clamped;
      setZoom(clamped);
      setZoomDraft(Math.round(clamped * 100) + '%');
      if (clamped <= 1) setPan({ x: 0, y: 0 });
    },
    [isCarousel],
  );

  useLayoutEffect(() => {
    const before = document.body.style.overflow;
    const root = document.getElementById('root');
    const wasInert = root?.hasAttribute('inert') ?? false;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    root?.setAttribute('inert', '');
    return () => {
      document.body.style.overflow = before;
      if (!wasInert) root?.removeAttribute('inert');
      previousFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function syncFullscreen() {
      const active = document.fullscreenElement === panelRef.current;
      setNativeFullscreen(active);
      setToolsVisible(true);
      setShowFullscreenToast(active);
    }
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    panelRef.current?.focus();
    const timer = window.setTimeout(() => setShowFullscreenToast(false), 1500);
    return () => window.clearTimeout(timer);
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen || !toolsVisible) return;
    const timer = window.setTimeout(() => {
      const focused = document.activeElement;
      const toolbar = panelRef.current?.querySelector('.foton-zoom-tools');
      if (!toolbar?.contains(focused)) setToolsVisible(false);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [fullscreen, toolsVisible]);

  useLayoutEffect(() => {
    function key(event: KeyboardEvent) {
      const target = event.target;
      const typing = target instanceof HTMLInputElement;
      if (event.key === 'Escape') {
        if (document.fullscreenElement === panelRef.current) {
          event.preventDefault();
          void document.exitFullscreen();
          return;
        }
        event.preventDefault();
        if (fallbackFullscreen) {
          setFallbackFullscreen(false);
          return;
        }
        onClose();
      }
      if (typing) return;
      if (event.key === 'ArrowLeft' && onPrevious) {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === 'ArrowRight' && onNext) {
        event.preventDefault();
        onNext();
      }
      if (!event.ctrlKey && !event.metaKey && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        setScale((v) => v + (isCarousel ? 0.25 : 0.5));
      }
      if (!event.ctrlKey && !event.metaKey && event.key === '-') {
        event.preventDefault();
        setScale((v) => v - (isCarousel ? 0.25 : 0.5));
      }
      if (!event.ctrlKey && !event.metaKey && event.key === '0') {
        event.preventDefault();
        setScale(1);
      }
      if (event.key === 'Tab') {
        const controls = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled)',
          ) ?? [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
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
  }, [onClose, onPrevious, onNext, fallbackFullscreen, setScale, isCarousel]);

  function commitPercent() {
    const parsed = Number(zoomDraft.trim().replace('%', '').replace(',', '.'));
    if (Number.isFinite(parsed)) setScale(parsed / 100);
    else setZoomDraft(Math.round(zoom * 100) + '%');
  }

  function wheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setScale((current) => current + (event.deltaY < 0 ? 0.25 : -0.25));
  }

  function down(event: PointerEvent<HTMLImageElement>) {
    if (zoom <= 1) return;
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
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  async function expand() {
    if (!allowFullscreen) return;
    if (!panelRef.current?.requestFullscreen) {
      setToolsVisible(true);
      setShowFullscreenToast(true);
      setFallbackFullscreen(true);
      return;
    }
    try {
      await panelRef.current.requestFullscreen();
    } catch {
      setToolsVisible(true);
      setShowFullscreenToast(true);
      setFallbackFullscreen(true);
    }
  }

  async function reduce() {
    if (nativeFullscreen && document.fullscreenElement === panelRef.current) {
      await document.exitFullscreen();
    }
    setFallbackFullscreen(false);
    setToolsVisible(true);
  }

  async function closeAll() {
    if (nativeFullscreen && document.fullscreenElement === panelRef.current) {
      try {
        await document.exitFullscreen();
      } catch {
        // Em caso de falha, a desmontagem React ainda restaura o site.
      }
    }
    setFallbackFullscreen(false);
    onClose();
  }

  return createPortal(
    <div
      ref={dialogRef}
      className={'foton-zoom-dialog' + (isCarousel ? ' foton-zoom-dialog--carousel' : '')}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (isCarousel && event.target === event.currentTarget) void closeAll();
      }}
    >
      <div
        ref={panelRef}
        className={
          'foton-zoom-panel' +
          (fallbackFullscreen ? ' is-fullscreen-fallback' : '') +
          (toolsVisible ? ' tools-visible' : '')
        }
        tabIndex={-1}
        onPointerMove={(event) => {
          if (fullscreen && event.clientY < 130) setToolsVisible(true);
        }}
        onTouchStart={() => {
          if (fullscreen) setToolsVisible(true);
        }}
      >
        <div className="foton-zoom-topbar" onFocusCapture={() => setToolsVisible(true)}>
          <div className="foton-zoom-title">
            <strong>{title}</strong>
            <span>{caption}</span>
          </div>
          <div className="foton-zoom-tools">
            <button
              type="button"
              onClick={() => setScale((value) => value + (isCarousel ? 0.25 : 0.5))}
              disabled={zoom >= 6}
              aria-label={english ? 'Enlarge image' : 'Ampliar imagem'}
              title={english ? 'Enlarge image' : 'Ampliar imagem'}
            >
              <Plus size={20} />
            </button>
            {isCarousel ? (
              <input
                className="foton-zoom-percent"
                type="text"
                inputMode="decimal"
                aria-label={english ? 'Zoom percentage' : 'Percentual do zoom'}
                title={english ? 'Enter zoom percentage' : 'Digite o percentual de zoom'}
                value={zoomDraft}
                onChange={(event) => setZoomDraft(event.target.value)}
                onBlur={commitPercent}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    commitPercent();
                    event.currentTarget.blur();
                  }
                  event.stopPropagation();
                }}
              />
            ) : (
              <span aria-live="polite" className="foton-zoom-level">
                {Math.round(zoom * 100)}%
              </span>
            )}
            <button
              type="button"
              onClick={() => setScale((value) => value - (isCarousel ? 0.25 : 0.5))}
              disabled={zoom <= (isCarousel ? 0.25 : 1)}
              aria-label={english ? 'Zoom out' : 'Reduzir imagem'}
              title={english ? 'Zoom out' : 'Reduzir imagem'}
            >
              <Minus size={20} />
            </button>
            {isCarousel && (
              <>
                <a
                  href={src}
                  download={downloadName ?? src.split('/').pop() ?? 'fotografia.png'}
                  aria-label={english ? 'Download original PNG' : 'Baixar PNG original'}
                  title={english ? 'Download original PNG' : 'Baixar PNG original'}
                >
                  <Download size={20} />
                </a>
                {allowFullscreen && (
                  <button
                    type="button"
                    aria-label={
                      fullscreen
                        ? english
                          ? 'Exit fullscreen'
                          : 'Reduzir para visualização intermediária'
                        : english
                          ? 'Enter fullscreen'
                          : 'Expandir para tela cheia'
                    }
                    title={
                      fullscreen
                        ? english
                          ? 'Exit fullscreen'
                          : 'Reduzir para visualização intermediária'
                        : english
                          ? 'Enter fullscreen'
                          : 'Expandir para tela cheia'
                    }
                    onClick={() => {
                      if (fullscreen) void reduce();
                      else void expand();
                    }}
                  >
                    {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                )}
              </>
            )}
            {!isCarousel && (
              <button
                type="button"
                onClick={() => setScale(1)}
                aria-label={english ? 'Fit image to screen' : 'Ajustar imagem à tela'}
              >
                <Maximize size={20} />
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={() => void closeAll()}
              aria-label={english ? 'Close gallery' : 'Fechar galeria'}
              title={english ? 'Close gallery' : 'Fechar galeria'}
            >
              <X size={22} />
            </button>
          </div>
        </div>
        <div className="foton-zoom-stage" onWheel={wheel}>
          {onPrevious && (
            <button
              className="foton-zoom-arrow previous"
              onClick={onPrevious}
              aria-label={english ? 'Previous image' : 'Imagem anterior'}
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
              if (fallback && currentSrc !== fallback) setErrorSrc(src);
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
            <button
              className="foton-zoom-arrow next"
              onClick={onNext}
              aria-label={english ? 'Next image' : 'Próxima imagem'}
            >
              <ChevronRight />
            </button>
          )}
          {showFullscreenToast && fullscreen && (
            <span className="foton-fullscreen-toast" role="status">
              {english ? 'Fullscreen' : 'Tela cheia'}
            </span>
          )}
        </div>
        <p className="foton-zoom-help">
          {english
            ? 'Mouse wheel: zoom · Drag to pan · Double-click: enlarge · Esc: close'
            : 'Roda do mouse: zoom · Arraste para mover · Duplo clique: ampliar · Esc: voltar'}
        </p>
      </div>
    </div>,
    document.body,
  );
}
