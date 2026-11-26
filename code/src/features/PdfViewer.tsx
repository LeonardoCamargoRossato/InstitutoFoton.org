import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
  type RenderTask,
} from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  ImageDown,
} from 'lucide-react';
GlobalWorkerOptions.workerSrc = worker;

export default function PdfViewer({ url, allowExport }: { url: string; allowExport: boolean }) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = localizedCopy(locale);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(800);
  const [error, setError] = useState('');
  const [rendering, setRendering] = useState(true);
  const [rendered, setRendered] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(200, entry.contentRect.width - 32)),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let active = true;
    const task = getDocument({ url });
    task.promise
      .then((document) => {
        if (active) setPdf(document);
      })
      .catch(() => {
        if (active) {
          setError('Unable to open the PDF. You can try opening the document in another tab.');
          setRendering(false);
        }
      });
    return () => {
      active = false;
      void task.destroy();
    };
  }, [url]);
  useEffect(() => {
    if (!pdf || !canvas.current) return;
    let active = true;
    let task: RenderTask | undefined;
    pdf
      .getPage(page)
      .then((current) => {
        if (active) {
          setRendering(true);
          setRendered(false);
        }
        if (!active || !canvas.current) return;
        const base = current.getViewport({ scale: 1 });
        const scale = Math.min(width / base.width, 1.6) * zoom;
        const viewport = current.getViewport({ scale });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const target = canvas.current;
        target.width = viewport.width * ratio;
        target.height = viewport.height * ratio;
        target.style.width = `${viewport.width}px`;
        target.style.height = `${viewport.height}px`;
        task = current.render({ canvas: target, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
        return task.promise;
      })
      .then(() => {
        if (active) {
          setRendering(false);
          setRendered(true);
        }
      })
      .catch((e) => {
        if (active && e?.name !== 'RenderingCancelledException') {
          setError('Unable to render this page.');
          setRendering(false);
        }
      });
    return () => {
      active = false;
      task?.cancel();
    };
  }, [pdf, page, zoom, width]);
  function exportPage() {
    if (!canvas.current || !allowExport || !rendered) return;
    canvas.current.toBlob((blob) => {
      if (!blob) return;
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = english
        ? `foton-presentation-2026-page-${page}.png`
        : `foton-apresentacao-2026-pagina-${page}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    }, 'image/png');
  }
  return (
    <div className="pdf-viewer" ref={container}>
      <div
        className="pdf-toolbar"
        role="group"
        aria-label={copy('Controles da apresentação', 'Presentation controls')}
      >
        <button
          className="icon-button"
          aria-label={copy('Página anterior', 'Previous page')}
          disabled={!pdf || page <= 1}
          onClick={() => setPage((n) => n - 1)}
        >
          <ChevronLeft />
        </button>
        <span aria-live="polite">
          {locale === 'zh-CN'
            ? `第 ${page} 页，共 ${pdf?.numPages ?? '…'} 页`
            : english
              ? `Page ${page} of ${pdf?.numPages ?? '…'}`
              : `Página ${page} de ${pdf?.numPages ?? '…'}`}
        </span>
        <button
          className="icon-button"
          aria-label={copy('Próxima página', 'Next page')}
          disabled={!pdf || page >= pdf.numPages}
          onClick={() => setPage((n) => n + 1)}
        >
          <ChevronRight />
        </button>
        <span className="toolbar-divider" />
        <button
          className="icon-button"
          aria-label={copy('Diminuir zoom', 'Zoom out')}
          disabled={zoom <= 0.5}
          onClick={() => setZoom((n) => Math.max(0.5, n - 0.25))}
        >
          <ZoomOut />
        </button>
        <button
          className="text-link"
          onClick={() => setZoom(1)}
          aria-label={copy('Ajustar à largura', 'Fit to width')}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          className="icon-button"
          aria-label={copy('Aumentar zoom', 'Zoom in')}
          disabled={zoom >= 3}
          onClick={() => setZoom((n) => Math.min(3, n + 0.25))}
        >
          <ZoomIn />
        </button>
        <button
          className="icon-button"
          aria-label={copy('Tela cheia', 'Fullscreen')}
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen();
            else
              void container.current
                ?.requestFullscreen?.()
                .catch(() => setError('Fullscreen is unavailable in this browser.'));
          }}
        >
          <Maximize />
        </button>
        <a
          className="icon-button"
          href={url}
          download="foton-apresentacao-2026.pdf"
          aria-label={copy('Baixar PDF integral', 'Download full PDF')}
        >
          <Download />
        </a>
        {allowExport && (
          <button
            className="icon-button"
            disabled={!rendered || rendering}
            aria-label={copy('Salvar página em PNG', 'Save page as PNG')}
            onClick={exportPage}
          >
            <ImageDown />
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      {rendering && !error && (
        <p role="status" className="status">
          {copy('Carregando página…', 'Loading page…')}
        </p>
      )}
      <div
        className="pdf-canvas-scroll"
        tabIndex={0}
        role="region"
        aria-label={copy(
          'Página da apresentação, use as setas para rolar',
          'Presentation page; use the arrow keys to scroll',
        )}
      >
        <canvas
          ref={canvas}
          role="img"
          aria-label={
            locale === 'zh-CN'
              ? `Foton 研究院机构介绍第 ${page} 页`
              : english
                ? `Page ${page} of the Instituto Foton institutional presentation`
                : `Página ${page} da apresentação institucional Foton`
          }
        />
      </div>
      <p className="pdf-fallback">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {copy('Abrir PDF em nova aba', 'Open PDF in a new tab')}
        </a>
      </p>
    </div>
  );
}
