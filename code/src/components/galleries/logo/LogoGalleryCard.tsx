import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ActionCard, InfoCard } from '../../cards';
import type { LogoGalleryCardProps } from './logo-gallery.types';

function Logo({
  item,
  eager,
  critical,
}: Pick<LogoGalleryCardProps, 'item' | 'eager' | 'critical'>) {
  const [broken, setBroken] = useState(false);
  if (!item.logoSrc || broken) return <span className="partner-text-logo">{item.title}</span>;
  return (
    <img
      alt={item.title}
      width={192}
      height={108}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={critical ? 'high' : 'auto'}
      decoding={critical ? 'sync' : 'async'}
      src={item.logoSrc}
      onError={() => setBroken(true)}
    />
  );
}

/** Card visual reutilizável para logos com link opcional. */
export function LogoGalleryCard({
  item,
  eager = false,
  critical = false,
  catalogSection = '3.2',
}: LogoGalleryCardProps) {
  const cardClass = 'partner-card' + (item.invertLogo ? ' partner-card-contrast' : '');
  const contents = (
    <>
      <Logo item={item} eager={eager} critical={critical} />
      <span className="sr-only">{item.title}</span>
      {item.href && <ExternalLink size={14} aria-hidden="true" className="partner-external-icon" />}
    </>
  );
  if (item.href) {
    return (
      <ActionCard
        href={item.href}
        inheritVisuals
        catalogId={`${catalogSection}.C-${item.id}`}
        title={item.title}
        label={item.title + ' — site oficial (abre em nova aba)'}
        className={cardClass}
      >
        {contents}
      </ActionCard>
    );
  }
  return (
    <InfoCard
      as="div"
      inheritVisuals
      title={item.title}
      catalogId={`${catalogSection}.C-${item.id}`}
      className={cardClass}
    >
      {contents}
    </InfoCard>
  );
}
