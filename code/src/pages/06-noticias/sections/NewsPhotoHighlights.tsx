import { useState } from 'react';
import { ImageZoomDialog } from '../../../components/viewers';
import { ImageCard } from '../../../components/cards';
import type { NewsCarouselImage } from './NewsCarousel';
import { assetUrl } from '../../../lib/siteAssets';
import { useLanguage } from '../../../i18n';
import { localizedCopy } from '../../../i18n/localizedCopy';
import '../../../features/NewsMedia.css';

type Props = {
  images: readonly NewsCarouselImage[];
};

export function NewsPhotoHighlights({ images }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  if (images.length === 0) return null;
  const current = active === null ? null : images[active];

  return (
    <section
      className="news-highlight-photos"
      aria-label={copy('Fotografias do Projeto Leonti', 'Leonti Project photographs')}
    >
      {images.map((image, index) => (
        <figure className="news-highlight-figure" key={image.original}>
          <ImageCard
            className="news-highlight-image-button"
            label={`${copy('Ampliar', 'Enlarge')} ${copy('Projeto Leonti', 'Leonti Project')} ${index + 1}`}
            catalogId={`6.A.3.C${index + 1}`}
            onOpen={() => setActive(index)}
            imagem={{
              src: assetUrl(image.preview),
              alt: image.alt,
              width: image.width,
              height: image.height,
            }}
            estiloGrafico={{
              tema: 'claro',
              borda: 'nenhuma',
              raio: 'md',
              sombra: 'nenhuma',
              hover: 'image-zoom',
            }}
          />
          <figcaption>
            <strong>
              {copy('Projeto Leonti', 'Leonti Project')} {index + 1}
            </strong>
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
