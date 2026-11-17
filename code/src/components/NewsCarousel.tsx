import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageZoomDialog } from './ImageZoomDialog';
import { assetUrl } from '../lib/siteAssets';
import '../features/NewsMedia.css';

export type NewsCarouselImage = {
  name: string;
  original: string;
  preview: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
};

type Props = {
  title: string;
  label: string;
  images: readonly NewsCarouselImage[];
};

/** Padrão único de carrossel para as notícias: WebP na página e PNG no zoom. */
export function NewsCarousel({ title, label, images }: Props) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  if (images.length === 0) return null;
  const current = images[active % images.length];
  const go = (delta: number) =>
    setActive((index) => (index + delta + images.length) % images.length);

  return (
    <section className="news-carousel news-mobi-carousel" aria-label={`Carrossel de fotos do ${label}`}>
      <h2>{title}</h2>
      <div className="news-carousel-stage news-mobi-stage">
        <button
          type="button"
          className="news-carousel-image-button news-mobi-image-button"
          onClick={() => setZoomOpen(true)}
          aria-label={`Ampliar foto ${active + 1} do ${label}`}
        >
          <img
            src={assetUrl(current.preview)}
            alt={current.alt}
            width={current.width}
            height={current.height}
            loading="lazy"
            decoding="async"
          />
        </button>
        <div className="news-carousel-controls news-mobi-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Foto anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite">{active + 1} de {images.length}</span>
          <button type="button" onClick={() => go(1)} aria-label="Próxima foto">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="news-carousel-thumbnails news-mobi-thumbnails" aria-label="Selecionar foto">
        {images.map((media, index) => (
          <button
            type="button"
            key={media.preview}
            className={index === active ? 'is-active' : ''}
            aria-label={`Selecionar foto ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <img src={assetUrl(media.preview)} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <p className="news-carousel-credit news-mobi-credit">{current.credit}</p>
      {zoomOpen && (
        <ImageZoomDialog
          key={current.preview}
          src={assetUrl(current.original)}
          fallback={assetUrl(current.preview)}
          title={current.alt}
          caption={current.credit}
          onClose={() => setZoomOpen(false)}
          onPrevious={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </section>
  );
}
