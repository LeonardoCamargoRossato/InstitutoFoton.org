import { useState } from 'react';
import { Maximize2, Play } from 'lucide-react';
import { ImageZoomDialog } from '../components/viewers';
import { BaseCarousel, carouselPresets } from '../components/carousel';

import { imageAsset, assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';

const manifestoImage = (id: string) => assetUrl(imageAsset(id).pngPath);

const regionEnglishNames: Record<string, string> = {
  'Carta do Sudeste': 'Southeast Letter',
  'Carta do Norte': 'North Letter',
  'Carta do Nordeste': 'Northeast Letter',
  'Carta do Centro-oeste': 'Midwest Letter',
  'Carta do Sul': 'South Letter',
};

const letterMedia = {
  'Carta do Sudeste': {
    type: 'video',
    src: 'https://www.youtube.com/embed/1gSHhhZiDtQ',
    image: `${manifestoImage('Thumb_CartaSudeste')}`,
  },
  'Carta do Norte': {
    type: 'image',
    image: `${manifestoImage('Thumb_CartaNorte')}`,
  },
  'Carta do Nordeste': { type: 'image', image: `${manifestoImage('Carta_Nordeste')}` },
  'Carta do Centro-oeste': { type: 'image', image: `${manifestoImage('Carta_CentroOeste')}` },
  'Carta do Sul': { type: 'image', image: `${manifestoImage('Carta_Sul')}` },
} as const;

const visitImages = Array.from({ length: 20 }, (_, index) => ({
  src: assetUrl(imageAsset('visita-' + String(index + 1).padStart(2, '0')).pngPath),
  title: `Visita técnica ${String(index + 1).padStart(2, '0')}`,
  caption:
    'Registro da articulação do Instituto Foton com pesquisadores, instituições e ambientes do ecossistema de ciência e inovação.',
}));

// O carregamento inicial usa arquivo WebP servido no GitHub Pages.
// Ao ampliar, a imagem original PNG é carregada exclusivamente do próprio Pages.
const optimized = (src: string) => src.replace('/PNG/', '/WebP/').replace(/\.png$/, '.webp');

function ProgressiveImage({ src, alt }: { src: string; alt: string }) {
  const [fallback, setFallback] = useState(false);
  return (
    <img
      src={fallback ? src : optimized(src)}
      alt={alt}
      data-preview-format={fallback ? 'png-fallback' : 'webp'}
      data-full-image={src}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      draggable={false}
      onError={() => setFallback(true)}
    />
  );
}

function Video({
  src,
  image,
  title,
  english = false,
}: {
  src: string;
  image: string;
  title: string;
  english?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const videoId = src.match(/embed\/([^?]+)/)?.[1];
  const start = new URL(src).searchParams.get('start');
  const external = videoId
    ? `https://www.youtube.com/watch?v=${videoId}${start ? `&t=${start}s` : ''}`
    : src;
  return (
    <div className="manifesto-video-block">
      <div className="manifesto-video">
        {playing ? (
          <iframe
            src={`${src}${src.includes('?') ? '&' : '?'}autoplay=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="manifesto-video-play"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${english ? 'Play' : 'Reproduzir'} ${title}`}
          >
            <ProgressiveImage src={image} alt="" />
            <span className="media-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
          </button>
        )}
        {!playing && (
          <button
            type="button"
            className="manifesto-video-zoom"
            aria-label={`${english ? 'Enlarge cover image' : 'Ampliar imagem de capa'}: ${title}`}
            title={english ? 'Enlarge image' : 'Ampliar imagem'}
            onClick={() => setPosterOpen(true)}
          >
            <Maximize2 size={20} aria-hidden="true" />
          </button>
        )}
      </div>
      {posterOpen && (
        <ImageZoomDialog
          src={image}
          fallback={optimized(image)}
          title={`${english ? 'Cover image' : 'Imagem de capa'}: ${title}`}
          onClose={() => setPosterOpen(false)}
        />
      )}
      <a href={external} target="_blank" rel="noopener noreferrer">
        {english ? 'Open video on YouTube' : 'Abrir vídeo no YouTube'}
      </a>
    </div>
  );
}

function Lightbox({
  images,
  active,
  onClose,
  onChange,
}: {
  images: typeof visitImages;
  active: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const item = images[active];
  const hasMultiple = images.length > 1;
  return (
    <ImageZoomDialog
      key={item.src}
      src={item.src}
      fallback={optimized(item.src)}
      title={item.title}
      caption={item.caption}
      onClose={onClose}
      onPrevious={
        hasMultiple ? () => onChange((active - 1 + images.length) % images.length) : undefined
      }
      onNext={hasMultiple ? () => onChange((active + 1) % images.length) : undefined}
    />
  );
}

export default function ManifestoMedia({
  kind,
  region,
  caption,
}: {
  kind: 'overview' | 'importance' | 'method' | 'letter' | 'visits';
  region?: string;
  caption?: string;
}) {
  const { locale } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const english = locale === 'en-US';
  const copy = localizedCopy(locale);
  const localizedVisitImages = english
    ? visitImages.map((image, index) => ({
        ...image,
        title: `Technical visit ${String(index + 1).padStart(2, '0')}`,
        caption:
          'Record of Foton’s collaboration with researchers, institutions, and science and innovation environments.',
      }))
    : visitImages;

  if (kind === 'importance')
    return (
      <Video
        src="https://www.youtube.com/embed/xiQklvt6d70?start=4615"
        image={`${manifestoImage('thumb_PorqueIssoEImportante')}`}
        title={copy(
          'Por que o Manifesto Quântico Nacional é importante',
          'Why the National Quantum Manifesto matters',
        )}
        english={english}
      />
    );

  if (kind === 'letter' && region && region in letterMedia) {
    const media = letterMedia[region as keyof typeof letterMedia];
    const localizedRegion = english ? (regionEnglishNames[region] ?? region) : region;
    if (media.type === 'video')
      return (
        <Video src={media.src} image={media.image} title={localizedRegion} english={english} />
      );
    const single = [
      {
        src: media.image,
        title: localizedRegion,
        caption:
          caption || copy(`Evidência da ${region}.`, `Evidence from the ${localizedRegion}.`),
      },
    ];
    return (
      <>
        <button className="manifesto-image" onClick={() => setActive(0)} type="button">
          <ProgressiveImage src={media.image} alt={localizedRegion} />
          <span aria-hidden="true">
            <Maximize2 />
          </span>
        </button>
        {active !== null && (
          <Lightbox
            images={single}
            active={active}
            onClose={() => setActive(null)}
            onChange={setActive}
          />
        )}
      </>
    );
  }

  if (kind === 'visits')
    return (
      <div className="visits-carousel">
        <BaseCarousel
          label={copy(
            'Galeria de Visitas Técnicas do Instituto Foton',
            'Foton technical visits gallery',
          )}
          listaWebP={localizedVisitImages.map((image) => ({
            id: image.title,
            src: optimized(image.src),
            alt: image.title,
            title: image.title,
          }))}
          listaPNG={localizedVisitImages.map((image) => ({
            id: image.title,
            src: image.src,
            downloadName: image.src.split('/').at(-1),
            attribution: image.caption,
          }))}
          estiloGrafico={carouselPresets.visitas}
          classNames={{ root: 'visits-universal-carousel' }}
          previousLabel={copy('Visitas anteriores', 'Previous visits')}
          nextLabel={copy('Próximas visitas', 'Next visits')}
          imageLabel={(index, _count, image) =>
            `${english ? 'Enlarge' : 'Ampliar'} ${image.title ?? (english ? `visit ${index + 1}` : `visita ${index + 1}`)}`
          }
          thumbnailLabel={(index) =>
            `${english ? 'Select visit' : 'Selecionar visita'} ${index + 1}`
          }
        />
      </div>
    );

  const image =
    kind === 'overview'
      ? `${manifestoImage('OqueeoManifestoQuanticoNacional')}`
      : `${manifestoImage('ComoFaremosIsso')}`;
  const title =
    kind === 'overview'
      ? copy('O que é o Manifesto Quântico Nacional', 'What is the National Quantum Manifesto?')
      : copy('Como faremos isso', 'How will we do it?');
  const single = [
    {
      src: image,
      title,
      caption: copy(
        'Manifesto Quântico Nacional — Instituto Foton.',
        'National Quantum Manifesto — Instituto Foton.',
      ),
    },
  ];
  return (
    <>
      <button className="manifesto-image" onClick={() => setActive(0)} type="button">
        <ProgressiveImage src={image} alt={title} />
        <span aria-hidden="true">
          <Maximize2 />
        </span>
      </button>
      {active !== null && (
        <Lightbox
          images={single}
          active={active}
          onClose={() => setActive(null)}
          onChange={setActive}
        />
      )}
    </>
  );
}
