import { BaseCarousel, carouselPresets } from '../../../components/carousel';
import { assetUrl } from '../../../lib/siteAssets';
import { useLanguage } from '../../../i18n';
import '../../../features/NewsMedia.css';

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

export function NewsCarousel({ title, label, images }: Props) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);

  return (
    <BaseCarousel
      titulo={title}
      label={copy(`Carrossel de fotos do ${label}`, `Photo carousel for ${label}`)}
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
      previousLabel={copy('Foto anterior', 'Previous photo')}
      nextLabel={copy('Próxima foto', 'Next photo')}
      imageLabel={(index) =>
        `${copy('Ampliar foto', 'Enlarge photo')} ${index + 1} ${copy('do', 'from')} ${label}`
      }
      thumbnailLabel={(index) => `${copy('Selecionar foto', 'Select photo')} ${index + 1}`}
    />
  );
}
