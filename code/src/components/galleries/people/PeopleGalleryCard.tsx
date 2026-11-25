import { ArrowUpRight } from 'lucide-react';
import { ProfileCard } from '../../cards';
import type { PeopleGalleryCardProps } from './people-gallery.types';
import { useLanguage } from '../../../i18n';

/** Card visual reutilizável para uma pessoa, com abertura opcional de detalhes. */
export function PeopleGalleryCard({ item }: PeopleGalleryCardProps) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <ProfileCard
      className="team-person"
      onOpen={item.onOpen ?? (() => undefined)}
      label={english ? `View ${item.name}'s profile` : `Conheça o perfil de ${item.name}`}
      catalogId={item.catalogId}
    >
      <span className="team-photo-wrap">
        <img
          src={item.imageSrc}
          alt={item.imageAlt ?? (english ? `Photograph of ${item.name}` : `Fotografia de ${item.name}`)}
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
          {english ? 'View profile' : 'Conheça o perfil'} <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </ProfileCard>
  );
}
