import { BaseCarousel, carouselPresets } from '../components/carousel';
import researchMedia from '../content/research-media.json';
import researchMediaEnglish from '../content/research-media.en.json';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

export default function HaQuantumGallery() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const photos = researchMedia.haquantum.map((photo, index) => ({
    ...photo,
    alt: copy(photo.alt, researchMediaEnglish.haquantum[index].alt),
  }));
  return (
    <div className="haquantum-gallery">
      <BaseCarousel
        label={copy('Galeria do HaQuantum', 'HaQuantum gallery')}
        listaWebP={photos.map((photo, index) => ({
          id: photo.path,
          src: assetUrl(photo.previewPath),
          alt: photo.alt,
          title: `HaQuantum · ${copy('Foto', 'Photo')} ${index + 1}`,
          caption: photo.alt,
          width: photo.width,
          height: photo.height,
        }))}
        listaPNG={photos.map((photo) => ({
          id: photo.path,
          src: assetUrl(photo.path),
          downloadName: photo.path.split('/').at(-1),
        }))}
        estiloGrafico={carouselPresets.haquantum}
        previousLabel={copy('Foto anterior', 'Previous photo')}
        nextLabel={copy('Próxima foto', 'Next photo')}
        imageLabel={(index, _total, image) =>
          `${copy('Ampliar foto', 'Enlarge photo')} ${index + 1}. ${image.alt}`
        }
      />
    </div>
  );
}
