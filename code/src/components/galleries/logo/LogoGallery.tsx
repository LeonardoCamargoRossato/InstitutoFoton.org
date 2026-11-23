import type { LogoGalleryProps } from './logo-gallery.types';
import { LogoGalleryCard } from './LogoGalleryCard';

/** Grade reutilizável de logos agrupadas por categoria. */
export function LogoGallery({ groups, home = false, catalogSection = '3.2' }: LogoGalleryProps) {
  return (
    <div className="partner-groups">
      {groups.map((group, groupIndex) => (
        <div className="partner-group" key={group.tier}>
          <h3>{group.tier}</h3>
          <div className="partner-logos">
            {group.items.map((partner) => (
              <LogoGalleryCard
                key={partner.id}
                item={partner}
                eager={!home}
                critical={!home && groupIndex === 0}
                catalogSection={catalogSection}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { LogoGalleryCard } from './LogoGalleryCard';
export type { LogoGalleryCardProps, LogoGalleryProps } from './logo-gallery.types';
