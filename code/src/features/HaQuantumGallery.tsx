import { BaseCarousel, carouselPresets } from '../components/carousel';
import researchMedia from '../content/research-media.json';
import { assetUrl } from '../lib/siteAssets';

const photos = researchMedia.haquantum;

/** A galeria HaQuantum usa o mesmo motor, preservando os registros e metadados. */
export default function HaQuantumGallery() {
  return (
    <div className="haquantum-gallery">
      <BaseCarousel
        label="Galeria do HaQuantum"
        listaWebP={photos.map((photo, index) => ({
          id: photo.path,
          src: assetUrl(photo.previewPath),
          alt: photo.alt,
          title: `HaQuantum · Foto ${index + 1}`,
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
        previousLabel="Foto anterior"
        nextLabel="Próxima foto"
        imageLabel={(index, _total, image) => `Ampliar foto ${index + 1}. ${image.alt}`}
      />
    </div>
  );
}
