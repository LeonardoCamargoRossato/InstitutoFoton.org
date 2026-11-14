import { useRef, useState, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageZoomDialog } from '../components/ImageZoomDialog';
import researchMedia from '../content/research-media.json';
import { assetUrl } from '../lib/siteAssets';

const photos = researchMedia.haquantum;

export default function HaQuantumGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  function show(index: number, moveFocus = false) {
    const gallery = track.current;
    if (!gallery) return;
    const next = Math.max(0, Math.min(photos.length - 1, index));
    const photo = gallery.children[next] as HTMLButtonElement;
    const smooth = !moveFocus && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    gallery.scrollTo({
      left: photo.offsetLeft + (photo.offsetWidth - gallery.clientWidth) / 2,
      behavior: smooth ? 'smooth' : 'instant',
    });
    if (moveFocus) photo.focus({ preventScroll: true });
  }

  function updatePosition() {
    const gallery = track.current;
    if (!gallery) return;
    let nearest = 0;
    let distance = Infinity;
    Array.from(gallery.children).forEach((item, index) => {
      const photo = item as HTMLButtonElement;
      const centered = photo.offsetLeft + (photo.offsetWidth - gallery.clientWidth) / 2;
      const snap = index === 0 ? 0 : centered;
      const offset = Math.abs(gallery.scrollLeft - snap);
      if (offset < distance) {
        nearest = index;
        distance = offset;
      }
    });
    setPosition(nearest);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const destinations: Record<string, number> = {
      ArrowLeft: position - 1,
      ArrowRight: position + 1,
      Home: 0,
      End: photos.length - 1,
    };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    show(destinations[event.key], true);
  }

  return (
    <div className="haquantum-gallery" role="region" aria-label="Galeria do HaQuantum">
      <div className="haquantum-track" ref={track} onScroll={updatePosition} onKeyDown={onKeyDown}>
        {photos.map((photo, index) => (
          <button
            className="haquantum-photo"
            type="button"
            key={photo.path}
            aria-label={`Ampliar foto ${index + 1}. ${photo.alt}`}
            tabIndex={index === position ? 0 : -1}
            onClick={() => setExpanded(index)}
          >
            <img
              src={assetUrl(photo.path)}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span aria-hidden="true">
              <Maximize2 size={19} />
            </span>
          </button>
        ))}
      </div>
      <div className="haquantum-gallery-controls">
        <div className="haquantum-gallery-arrows">
          <button
            className="icon-button"
            type="button"
            aria-label="Foto anterior"
            disabled={position === 0}
            onClick={() => show(position - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Próxima foto"
            disabled={position === photos.length - 1}
            onClick={() => show(position + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="haquantum-gallery-dots" aria-label="Ir para uma foto" role="group">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.path}
              aria-label={`Ir para a foto ${index + 1}`}
              aria-current={index === position ? 'true' : undefined}
              onClick={() => show(index)}
            />
          ))}
        </div>
        <span className="haquantum-gallery-position" aria-live="polite" aria-atomic="true">
          Foto {position + 1} de {photos.length}
        </span>
      </div>
      {expanded !== null && (
        <ImageZoomDialog
          src={assetUrl(photos[expanded].path)}
          title={`HaQuantum · Foto ${expanded + 1}`}
          caption={photos[expanded].alt}
          onClose={() => setExpanded(null)}
        />
      )}
    </div>
  );
}
