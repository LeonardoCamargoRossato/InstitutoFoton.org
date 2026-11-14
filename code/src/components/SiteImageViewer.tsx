import { useEffect, useState } from 'react';
import { ImageZoomDialog } from './ImageZoomDialog';

type Selected = { src: string; fallback: string; title: string };
export default function SiteImageViewer() {
  const [image, setImage] = useState<Selected | null>(null);
  useEffect(() => {
    function resolve(target: EventTarget | null): Selected | null {
      if (!(target instanceof HTMLElement)) return null;
      const el =
        target instanceof HTMLImageElement
          ? target
          : target.matches('.foton-photo[role="button"], .technical-visit-photo[role="button"]')
            ? target.querySelector('img')
            : null;
      if (!(el instanceof HTMLImageElement) || !el.closest('#conteudo')) return null;
      if (el.closest('.foton-zoom-dialog, .manifesto-image, .gallery-track, .manifesto-video'))
        return null;
      // Identidade visual continua sendo link para a Home. Imagens nos cards
      // abrem o PNG correspondente, sem interceptar cliques no texto do card.
      if (
        el.closest(
          '.site-header, .site-footer, .brand, .partner-card, .publication-card, .foundation-cover-button, .foundation-stage-image',
        )
      )
        return null;
      const preview = el.currentSrc || el.src;
      const local = new URL(preview, window.location.href);
      const canonicalWebP =
        local.origin === window.location.origin &&
        /\/assets\/WebP\/[^?#]+\.webp$/i.test(local.pathname);
      if (canonicalWebP) {
        local.pathname = local.pathname
          .replace('/assets/WebP/', '/assets/PNG/')
          .replace(/\.webp$/i, '.png');
      }
      const src =
        (window.matchMedia('(max-width: 700px)').matches
          ? el.dataset.mobileFullImage || el.dataset.fullImage
          : el.dataset.fullImage) || (canonicalWebP ? local.href : undefined);
      if (!src) return null;
      return { src, fallback: preview, title: el.alt || 'Imagem do Instituto Foton' };
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
    return () => {
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key, true);
    };
  }, []);
  return (
    image && (
      <ImageZoomDialog
        src={image.src}
        fallback={image.fallback}
        title={image.title}
        onClose={() => setImage(null)}
      />
    )
  );
}
