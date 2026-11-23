import type { CardVisualProps } from './card.types';
import { cardAppearance, legacyCardAppearance } from './card.appearance';
import { cardPresets } from './card.presets';
import './card.styles.css';

export type BaseCardProps = CardVisualProps & {
  as?: 'article' | 'section' | 'div' | 'li';
};

/** Sem ação e sem cursor de clique: estrutura informativa semanticamente correta. */
export function BaseCard({
  as: Element = 'article',
  className,
  estiloGrafico = cardPresets.informativo,
  catalogId,
  inheritVisuals = false,
  children,
}: BaseCardProps) {
  const appearance = inheritVisuals
    ? legacyCardAppearance(className, false, catalogId)
    : { ...cardAppearance(className, estiloGrafico, false), 'data-lcr-card-id': catalogId };
  return <Element {...appearance}>{children}</Element>;
}
