import type { CardGalleryItemProps } from './card-gallery.types';

/** Ponto de extensão para um item de galeria sem impor um tipo específico de card. */
export function CardGalleryItem({ children }: CardGalleryItemProps) {
  return children;
}
