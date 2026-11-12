import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react';
import { ImageZoomDialog } from '../components/ImageZoomDialog';

import { imageAsset, assetUrl } from '../lib/siteAssets';

const manifestoImage = (id: string) => assetUrl(imageAsset(id).pngPath);

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
  src: assetUrl(imageAsset('visita-'+String(index + 1).padStart(2,'0')).pngPath),
  title: `Visita técnica ${String(index + 1).padStart(2, '0')}`,
  caption:
    'Registro da articulação do Instituto Foton com pesquisadores, instituições e ambientes do ecossistema de ciência e inovação.',
}));

// O carregamento inicial usa arquivo WebP servido no GitHub Pages.
// Ao ampliar, a imagem original PNG é carregada exclusivamente do próprio Pages.
const optimized = (src: string) => src.replace('/assets/PNG/','/assets/WebP/').replace(/\.png$/,'.webp');

function ProgressiveImage({ src, alt }: { src: string; alt: string }) {
  const [fallback, setFallback] = useState(false);
  return (
    <img src={fallback ? src : optimized(src)} alt={alt}
      data-full-image={src}
      loading="lazy" decoding="async" fetchPriority="low"
      draggable={false}
      onError={() => setFallback(true)} />
  );
}

function Video({ src, image, title }: { src: string; image: string; title: string }) {
  const [playing, setPlaying] = useState(false);
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
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Reproduzir ${title}`}>
            <ProgressiveImage src={image} alt="" />
            <span className="media-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <a href={external} target="_blank" rel="noopener noreferrer">
        Abrir vídeo no YouTube
      </a>
    </div>
  );
}

function Lightbox({ images, active, onClose, onChange }: {
  images: typeof visitImages; active: number;
  onClose: () => void; onChange: (index: number) => void;
}) {
  const item = images[active];
  const hasMultiple = images.length > 1;
  return <ImageZoomDialog key={item.src}
    src={item.src} fallback={optimized(item.src)}
    title={item.title} caption={item.caption} onClose={onClose}
    onPrevious={hasMultiple ? () => onChange((active - 1 + images.length) % images.length) : undefined}
    onNext={hasMultiple ? () => onChange((active + 1) % images.length) : undefined}
  />;
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
  const [active, setActive] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);

  if (kind === 'importance')
    return (
      <Video
        src="https://www.youtube.com/embed/xiQklvt6d70?start=4615"
        image={`${manifestoImage('thumb_PorqueIssoEImportante')}`}
        title="Por que o Manifesto Quântico Nacional é importante"
      />
    );

  if (kind === 'letter' && region && region in letterMedia) {
    const media = letterMedia[region as keyof typeof letterMedia];
    if (media.type === 'video')
      return <Video src={media.src} image={media.image} title={region} />;
    const single = [
      {
        src: media.image,
        title: region,
        caption: caption || `Evidência da ${region}.`,
      },
    ];
    return (
      <>
        <button className="manifesto-image" onClick={() => setActive(0)} type="button">
          <ProgressiveImage src={media.image} alt={region} />
          <span aria-hidden="true"><Maximize2 /></span>
        </button>
        {active !== null && (
          <Lightbox images={single} active={active} onClose={() => setActive(null)} onChange={setActive} />
        )}
      </>
    );
  }

  if (kind === 'visits')
    return (
      <>
        <div className="visits-carousel">
          <div className="gallery-track" ref={track}>
            {visitImages.map((image, index) => (
              <button key={image.src} type="button" onClick={() => setActive(index)}>
                <ProgressiveImage src={image.src} alt={image.title} />
                <span>{image.title}</span>
                <Maximize2 aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="gallery-controls">
            <button
              type="button"
              onClick={() => track.current?.scrollBy({ left: -track.current.clientWidth * 0.8, behavior: 'smooth' })}
              aria-label="Visitas anteriores"
            >
              <ChevronLeft />
            </button>
            <span>20 registros de conexão com o ecossistema</span>
            <button
              type="button"
              onClick={() => track.current?.scrollBy({ left: track.current.clientWidth * 0.8, behavior: 'smooth' })}
              aria-label="Próximas visitas"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {active !== null && (
          <Lightbox
            images={visitImages}
            active={active}
            onClose={() => setActive(null)}
            onChange={setActive}
          />
        )}
      </>
    );

  const image =
    kind === 'overview'
      ? `${manifestoImage('OqueeoManifestoQuanticoNacional')}`
      : `${manifestoImage('ComoFaremosIsso')}`;
  const title = kind === 'overview' ? 'O que é o Manifesto Quântico Nacional' : 'Como faremos isso';
  const single = [{ src: image, title, caption: 'Manifesto Quântico Nacional — Instituto Foton.' }];
  return (
    <>
      <button className="manifesto-image" onClick={() => setActive(0)} type="button">
        <ProgressiveImage src={image} alt={title} />
        <span aria-hidden="true"><Maximize2 /></span>
      </button>
      {active !== null && (
        <Lightbox images={single} active={active} onClose={() => setActive(null)} onChange={setActive} />
      )}
    </>
  );
}
