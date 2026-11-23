import { ArrowUpRight } from 'lucide-react';
import { ProfileCard } from '../../cards';
import type { PeopleGalleryCardProps } from './people-gallery.types';

/** Card visual reutilizável para uma pessoa, com abertura opcional de detalhes. */
export function PeopleGalleryCard({ item }: PeopleGalleryCardProps) {
  return (
    <ProfileCard
      className="team-person"
      onOpen={item.onOpen ?? (() => undefined)}
      label={`Conheça o perfil de ${item.name}`}
      catalogId={item.catalogId}
    >
      <span className="team-photo-wrap">
        <img
          src={item.imageSrc}
          alt={item.imageAlt ?? `Fotografia de ${item.name}`}
          width={320}
          height={360}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="team-person-info">
        <strong>{item.name}</strong>
        <span>{item.role}</span>
        {item.thematicLine && <small>{item.thematicLine}</small>}
        <span className="team-person-action">
          Conheça o perfil <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </ProfileCard>
  );
}
