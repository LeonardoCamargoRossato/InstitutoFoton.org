import type { ReactNode } from 'react';
import { FotonPhoto, type PhotoId } from './FotonPhoto';

export function HumanPageHero({
  eyebrow, title, description, photoId, children, badge,
}: {
  eyebrow: string;
  title: string;
  description: string;
  photoId: PhotoId;
  children?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <section className="human-page-hero">
      <div className="container human-page-hero-grid">
        <div className="human-page-hero-copy">
          <p className="eyebrow"><span />{eyebrow}</p>
          <h1>{title}</h1>
          <p className="human-page-description">{description}</p>
          {badge && <div className="human-hero-badge">{badge}</div>}
          {children && <div className="actions human-page-actions">{children}</div>}
        </div>
        <FotonPhoto id={photoId} priority className="human-page-hero-photo" />
      </div>
      <span className="human-hero-spectrum" aria-hidden="true" />
    </section>
  );
}
