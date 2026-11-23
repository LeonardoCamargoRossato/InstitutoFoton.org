import type { PeopleGalleryProps } from './people-gallery.types';
import { PeopleGalleryCard } from './PeopleGalleryCard';

/** Grade reutilizável de perfis de pessoas. */
export function PeopleGallery({ items, className }: PeopleGalleryProps) {
  return (
    <div className={className ?? 'team-grid'}>
      {items.map((item) => (
        <PeopleGalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export { PeopleGalleryCard } from './PeopleGalleryCard';
export type {
  PeopleGalleryCardProps,
  PeopleGalleryItem,
  PeopleGalleryProps,
} from './people-gallery.types';
