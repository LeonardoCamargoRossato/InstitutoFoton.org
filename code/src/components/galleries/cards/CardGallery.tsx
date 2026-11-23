import { CardGalleryItem } from './CardGalleryItem';
import type { CardGalleryProps } from './card-gallery.types';

/** Organiza qualquer conjunto de cards em uma grade reutilizável. */
export function CardGallery<T>({
  items,
  renderItem,
  className = 'card-gallery',
}: CardGalleryProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <CardGalleryItem key={index}>{renderItem(item, index)}</CardGalleryItem>
      ))}
    </div>
  );
}

export { CardGalleryItem } from './CardGalleryItem';
export type { CardGalleryItemProps, CardGalleryProps } from './card-gallery.types';
