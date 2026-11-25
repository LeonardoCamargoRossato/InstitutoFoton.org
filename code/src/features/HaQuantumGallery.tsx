import { BaseCarousel, carouselPresets } from '../components/carousel';
import researchMedia from '../content/research-media.json';
import researchMediaEnglish from '../content/research-media.en.json';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';

export default function HaQuantumGallery() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const photos = (english ? researchMediaEnglish : researchMedia).haquantum;
  return (
    <div className="haquantum-gallery">
      <BaseCarousel
        label={english ? 'HaQuantum gallery' : 'Galeria do HaQuantum'}
        listaWebP={photos.map((photo, index) => ({
          id: photo.path,
          src: assetUrl(photo.previewPath),
          alt: photo.alt,
          title: `HaQuantum · ${english ? 'Photo' : 'Foto'} ${index + 1}`,
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
        previousLabel={english ? 'Previous photo' : 'Foto anterior'}
        nextLabel={english ? 'Next photo' : 'Próxima foto'}
        imageLabel={(index, _total, image) =>
          `${english ? 'Enlarge photo' : 'Ampliar foto'} ${index + 1}. ${image.alt}`
        }
      />
    </div>
  );
}
