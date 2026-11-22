import { ImageZoomDialog } from '../ImageZoomDialog';
import type { CarouselItem } from './carousel.types';

type Props = {
  item: CarouselItem;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  fullscreenDisponivel?: boolean;
};

/** Adapta os dados do carrossel ao visualizador compartilhado do site. */
export function CarouselViewer({
  item,
  onClose,
  onPrevious,
  onNext,
  fullscreenDisponivel = true,
}: Props) {
  return (
    <ImageZoomDialog
      src={item.original.src}
      fallback={item.preview.src}
      title={item.preview.title ?? item.preview.alt}
      caption={item.preview.caption ?? item.preview.credit ?? item.original.attribution}
      onClose={onClose}
      onPrevious={onPrevious}
      onNext={onNext}
      variant="carousel"
      allowFullscreen={fullscreenDisponivel}
      downloadName={item.original.downloadName}
    />
  );
}
