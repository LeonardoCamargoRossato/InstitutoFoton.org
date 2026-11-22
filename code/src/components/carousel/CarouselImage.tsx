import { Maximize2 } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { CarouselItem, CarouselGraphicStyle } from './carousel.types';

type Props = {
  item: CarouselItem;
  next?: CarouselItem;
  index: number;
  count: number;
  direction: 'next' | 'previous';
  style: CarouselGraphicStyle;
  className?: string;
  imageLabel: string;
  onOpen: () => void;
};

export function CarouselImage({
  item,
  next,
  index,
  count,
  direction,
  style,
  className,
  imageLabel,
  onOpen,
}: Props) {
  const peek = style.imagem?.apresentacao !== 'unica' &&
    style.imagem?.proximaImagemVisivel !== false &&
    count > 1 &&
    Boolean(next);
  const variables = {
    '--carousel-hover-scale': style.hover?.habilitado === false ? 1 : style.hover?.escala ?? 1.04,
    '--carousel-hover-duration': (style.hover?.duracaoMs ?? 280) + 'ms',
    '--carousel-enter-duration': (style.animacao?.duracaoMs ?? 350) + 'ms',
  } as CSSProperties;
  return (
    <div className={peek ? 'base-carousel-scene has-peek' : 'base-carousel-scene'} style={variables}>
      <button
        className={'base-carousel-primary ' + (className ?? '')}
        type="button"
        onClick={onOpen}
        aria-label={imageLabel}
        title="Ampliar fotografia"
        data-direction={direction}
      >
        <img
          key={item.preview.id}
          src={item.preview.src}
          alt={item.preview.alt}
          width={item.preview.width}
          height={item.preview.height}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
        <span className="base-carousel-expand" aria-hidden="true">
          <Maximize2 size={19} /> Ampliar
        </span>
      </button>
      {peek && next && (
        <div className="base-carousel-peek" aria-hidden="true">
          <img src={next.preview.src} alt="" loading="lazy" decoding="async" draggable={false} />
        </div>
      )}
    </div>
  );
}
