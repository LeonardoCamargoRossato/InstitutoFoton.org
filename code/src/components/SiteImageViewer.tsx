import { useEffect, useState } from 'react';
import { ImageZoomDialog } from './ImageZoomDialog';

type Selected = { src: string; fallback: string; title: string };
export default function SiteImageViewer() {
  const [image, setImage] = useState<Selected | null>(null);
  useEffect(() => {
    function resolve(target: EventTarget | null): Selected | null {
      if (!(target instanceof HTMLElement)) return null;
      const el = target instanceof HTMLImageElement ? target :
        (target.matches('.foton-photo[role="button"], .technical-visit-photo[role="button"]') ? target.querySelector('img') : null);
      if (!(el instanceof HTMLImageElement) || !el.closest('#conteudo')) return null;
      if (el.closest('.foton-zoom-dialog, .manifesto-image, .gallery-track, .manifesto-video')) return null;
      if (el.closest('a') && !el.closest('.human-mosaic-tile')) return null;
      const src = el.dataset.fullImage || el.currentSrc || el.src;
      return src ? { src, fallback: el.currentSrc || el.src, title: el.alt || 'Fotografia do Instituto Foton' } : null;
    }
    function click(event: MouseEvent) {
      const match = resolve(event.target);
      if (!match) return;
      event.preventDefault();
      event.stopPropagation();
      setImage(match);
    }
    function key(event: KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const match = resolve(event.target);
      if (!match) return;
      event.preventDefault();
      setImage(match);
    }
    document.addEventListener('click', click, true);
    document.addEventListener('keydown', key, true);
    return () => { document.removeEventListener('click', click, true); document.removeEventListener('keydown', key, true); };
  }, []);
  return image && <ImageZoomDialog src={image.src} fallback={image.fallback} title={image.title} onClose={() => setImage(null)} />;
}
