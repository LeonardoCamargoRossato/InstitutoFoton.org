import { BaseCarousel, carouselPresets } from './carousel';
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

/** Adaptador editorial: a navegação e o visualizador pertencem ao motor universal. */
export function NewsCarousel({ title, label, images }: Props) {
  return (
    <BaseCarousel
      titulo={title}
      label={`Carrossel de fotos do ${label}`}
      listaWebP={images.map((image) => ({
        id: image.name,
        src: assetUrl(image.preview),
        alt: image.alt,
        title: image.alt,
        credit: image.credit,
        width: image.width,
        height: image.height,
      }))}
      listaPNG={images.map((image) => ({
        id: image.name,
        src: assetUrl(image.original),
        downloadName: image.original.split('/').at(-1),
      }))}
      estiloGrafico={carouselPresets.noticias}
      classNames={{
        root: 'news-carousel news-mobi-carousel',
        stage: 'news-carousel-stage news-mobi-stage',
        image: 'news-carousel-image-button news-mobi-image-button',
        controls: 'news-carousel-controls news-mobi-controls',
        thumbnails: 'news-carousel-thumbnails news-mobi-thumbnails',
        credit: 'news-carousel-credit news-mobi-credit',
      }}
      previousLabel="Foto anterior"
      nextLabel="Próxima foto"
      imageLabel={(index) => `Ampliar foto ${index + 1} do ${label}`}
      thumbnailLabel={(index) => `Selecionar foto ${index + 1}`}
    />
  );
}
