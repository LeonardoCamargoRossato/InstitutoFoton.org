import { useState } from 'react';
import { ImageZoomDialog } from './ImageZoomDialog';
import type { NewsCarouselImage } from './NewsCarousel';
import { assetUrl } from '../lib/siteAssets';
import '../features/NewsMedia.css';

type Props = {
  images: readonly NewsCarouselImage[];
};

/** Fotos editoriais em destaque: WebP na leitura, PNG original sob demanda. */
export function NewsPhotoHighlights({ images }: Props) {
  const [active, setActive] = useState<number | null>(null);
  if (images.length === 0) return null;
  const current = active === null ? null : images[active];

  return (
    <section className="news-highlight-photos" aria-label="Fotografias do Projeto Leonti">
      {images.map((image, index) => (
        <figure className="news-highlight-figure" key={image.original}>
          <button
            type="button"
            className="news-highlight-image-button"
            aria-label={`Ampliar Projeto Leonti ${index + 1}`}
            onClick={() => setActive(index)}
          >
            <img
              src={assetUrl(image.preview)}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
          </button>
          <figcaption>
            <strong>Projeto Leonti {index + 1}</strong>
            <span>{image.alt}</span>
            <small>{image.credit}</small>
          </figcaption>
        </figure>
      ))}
      {current && (
        <ImageZoomDialog
          key={current.original}
          src={assetUrl(current.original)}
          fallback={assetUrl(current.preview)}
          title={current.alt}
          caption={current.credit}
          onClose={() => setActive(null)}
          onPrevious={() =>
            setActive((index) => (index === null ? 0 : (index - 1 + images.length) % images.length))
          }
          onNext={() => setActive((index) => (index === null ? 0 : (index + 1) % images.length))}
        />
      )}
    </section>
  );
}
