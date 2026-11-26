import { ArrowUpRight } from 'lucide-react';
import { ProfileCard } from '../../cards';
import type { PeopleGalleryCardProps } from './people-gallery.types';
import { useLanguage } from '../../../i18n';
import { localizedCopy } from '../../../i18n/localizedCopy';

/** Card visual reutilizável para uma pessoa, com abertura opcional de detalhes. */
export function PeopleGalleryCard({ item }: PeopleGalleryCardProps) {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  return (
    <ProfileCard
      className="team-person"
      onOpen={item.onOpen ?? (() => undefined)}
      label={locale === 'en-US' ? `View ${item.name}'s profile` : `${copy('Conheça o perfil de', 'View profile')} ${item.name}`}
      catalogId={item.catalogId}
    >
      <span className="team-photo-wrap">
        <img
          src={item.imageSrc}
          alt={
            item.imageAlt ?? `${copy('Fotografia de', 'Photograph of')} ${item.name}`
          }
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
          {copy('Conheça o perfil', 'View profile')}{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </span>
    </ProfileCard>
  );
}
