import { useId, useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { carouselIndex, pairCarouselItems } from './carousel.data';
import { CarouselImage } from './CarouselImage';
import { CarouselControls } from './CarouselControls';
import { CarouselThumbnails } from './CarouselThumbnails';
import { CarouselViewer } from './CarouselViewer';
import type { BaseCarouselProps } from './carousel.types';
import './carousel.styles.css';

export function BaseCarousel({
  listaWebP,
  listaPNG,
  estiloGrafico,
  label,
  titulo,
  classNames,
  previousLabel = 'Imagem anterior',
  nextLabel = 'Próxima imagem',
  imageLabel,
  thumbnailLabel,
  onChange,
}: BaseCarouselProps) {
  const items = useMemo(() => pairCarouselItems(listaWebP, listaPNG), [listaWebP, listaPNG]);
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [openViewer, setOpenViewer] = useState(false);
  const [thumbnailsOpen, setThumbnailsOpen] = useState(false);
  const touchStart = useRef<number | null>(null);
  const thumbnailsId = useId();
  const total = items.length;
  const active = carouselIndex(selected, total);
  const thumbnailMode = estiloGrafico.navegacao?.miniaturas ?? 'recolhiveis';
  const thumbnailsVisible = thumbnailMode === 'sempre' || thumbnailsOpen;
  const circular = estiloGrafico.navegacao?.circular !== false;
  if (!total) return null;
  const item = items[active];

  function select(index: number) {
    const next = circular ? carouselIndex(index, total) : Math.max(0, Math.min(total - 1, index));
    if (next === active) return;
    setDirection(index < active ? 'previous' : 'next');
    setSelected(next);
    onChange?.(next);
  }

  function move(delta: number) {
    const next = circular
      ? carouselIndex(active + delta, total)
      : Math.max(0, Math.min(total - 1, active + delta));
    if (next === active) return;
    setDirection(delta < 0 ? 'previous' : 'next');
    setSelected(next);
    onChange?.(next);
  }

  function keyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.target instanceof HTMLInputElement) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(total - 1);
    }
  }

  function touchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 55) move(distance < 0 ? 1 : -1);
  }

  const stageLabel =
    imageLabel?.(active, total, item.preview) ??
    `Ampliar imagem ${active + 1} de ${total}: ${item.preview.title ?? item.preview.alt}`;

  return (
    <section
      className={'base-carousel base-carousel--' + (estiloGrafico.tema ?? 'institucional') + ' ' +
        (classNames?.root ?? '')}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      data-presentation={estiloGrafico.imagem?.apresentacao ?? 'peek'}
      data-ratio={estiloGrafico.imagem?.proporcao ?? 'original'}
      data-fit={estiloGrafico.imagem?.enquadramento ?? 'cover'}
      data-border={estiloGrafico.borda?.estilo ?? 'suave'}
      data-radius={estiloGrafico.borda?.raio ?? 'lg'}
      data-animation={estiloGrafico.animacao?.tipo ?? 'deslizamento-suave'}
      onKeyDown={keyDown}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={touchEnd}
    >
      {titulo && <h2>{titulo}</h2>}
      <div className={'base-carousel-stage ' + (classNames?.stage ?? '')}>
        <CarouselImage
          item={item}
          next={items[carouselIndex(active + 1, total)]}
          index={active}
          count={total}
          direction={direction}
          style={estiloGrafico}
          className={classNames?.image}
          imageLabel={stageLabel}
          onOpen={() => setOpenViewer(true)}
        />
      </div>
      <CarouselControls
        active={active}
        total={total}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
        showCounter={estiloGrafico.navegacao?.contador !== false}
        thumbnailMode={thumbnailMode}
        thumbnailsOpen={thumbnailsVisible}
        thumbnailsId={thumbnailsId}
        onToggle={() => setThumbnailsOpen((open) => !open)}
        className={classNames?.controls}
        positionClassName={classNames?.position}
      />
      {thumbnailMode !== 'desativadas' && (
        <CarouselThumbnails
          items={items}
          active={active}
          onSelect={select}
          id={thumbnailsId}
          open={thumbnailsVisible}
          className={classNames?.thumbnails}
          label={thumbnailLabel}
        />
      )}
      {item.preview.caption && (
        <p className={'base-carousel-caption ' + (classNames?.caption ?? '')}>
          {item.preview.caption}
        </p>
      )}
      {item.preview.credit && (
        <p className={'base-carousel-credit ' + (classNames?.credit ?? '')}>
          {item.preview.credit}
        </p>
      )}
      {openViewer && (
        <CarouselViewer
          item={item}
          onClose={() => setOpenViewer(false)}
          onPrevious={total > 1 ? () => move(-1) : undefined}
          onNext={total > 1 ? () => move(1) : undefined}
          fullscreenDisponivel={estiloGrafico.visualizador?.fullscreenDisponivel !== false}
        />
      )}
    </section>
  );
}
