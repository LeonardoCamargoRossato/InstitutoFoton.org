import { useEffect, useRef, useState } from 'react';
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
          setError(
            'Não foi possível abrir o PDF. Você pode tentar abrir o documento em outra aba.',
          );
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
          setError('Não foi possível renderizar esta página.');
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
      a.download = `foton-apresentacao-2026-pagina-${page}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    }, 'image/png');
  }
  return (
    <div className="pdf-viewer" ref={container}>
      <div className="pdf-toolbar" role="group" aria-label="Controles da apresentação">
        <button
          className="icon-button"
          aria-label="Página anterior"
          disabled={!pdf || page <= 1}
          onClick={() => setPage((n) => n - 1)}
        >
          <ChevronLeft />
        </button>
        <span aria-live="polite">
          Página {page} de {pdf?.numPages ?? '…'}
        </span>
        <button
          className="icon-button"
          aria-label="Próxima página"
          disabled={!pdf || page >= pdf.numPages}
          onClick={() => setPage((n) => n + 1)}
        >
          <ChevronRight />
        </button>
        <span className="toolbar-divider" />
        <button
          className="icon-button"
          aria-label="Diminuir zoom"
          disabled={zoom <= 0.5}
          onClick={() => setZoom((n) => Math.max(0.5, n - 0.25))}
        >
          <ZoomOut />
        </button>
        <button className="text-link" onClick={() => setZoom(1)} aria-label="Ajustar à largura">
          {Math.round(zoom * 100)}%
        </button>
        <button
          className="icon-button"
          aria-label="Aumentar zoom"
          disabled={zoom >= 3}
          onClick={() => setZoom((n) => Math.min(3, n + 0.25))}
        >
          <ZoomIn />
        </button>
        <button
          className="icon-button"
          aria-label="Tela cheia"
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen();
            else
              void container.current
                ?.requestFullscreen?.()
                .catch(() => setError('Tela cheia indisponível neste navegador.'));
          }}
        >
          <Maximize />
        </button>
        <a
          className="icon-button"
          href={url}
          download="foton-apresentacao-2026.pdf"
          aria-label="Baixar PDF integral"
        >
          <Download />
        </a>
        {allowExport && (
          <button
            className="icon-button"
            disabled={!rendered || rendering}
            aria-label="Salvar página em PNG"
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
          Carregando página…
        </p>
      )}
      <div
        className="pdf-canvas-scroll"
        tabIndex={0}
        role="region"
        aria-label="Página da apresentação, use as setas para rolar"
      >
        <canvas
          ref={canvas}
          role="img"
          aria-label={`Página ${page} da apresentação institucional Foton`}
        />
      </div>
      <p className="pdf-fallback">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Abrir PDF em nova aba
        </a>
      </p>
    </div>
  );
}
