import { Link } from 'react-router-dom';
import { safeExternalUrl } from '../../../lib/config';
import { BaseCard } from '../base/BaseCard';
import { cardAppearance } from '../base/card.appearance';
import { cardPresets } from '../base/card.presets';
import type { CardVisualProps } from '../base/card.types';

type Destination = { to: string; href?: never } | { href: string; to?: never };
export type ActionCardProps = CardVisualProps &
  Destination & {
    label?: string;
  };

/** Links são links: navegação interna por Router; externa com URL validada. */
export function ActionCard({
  to,
  href,
  className,
  estiloGrafico = cardPresets.pesquisa,
  children,
  label,
}: ActionCardProps) {
  const appearance = cardAppearance(className, estiloGrafico, true);
  if (to !== undefined) {
    return (
      <Link to={to} aria-label={label} {...appearance}>
        {children}
      </Link>
    );
  }
  const url = safeExternalUrl(href);
  if (!url) {
    // URL não permitida não se converte em link quebrado ou clicável falso.
    return (
      <BaseCard as="div" className={className}>
        {children}
      </BaseCard>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} {...appearance}>
      {children}
    </a>
  );
}
