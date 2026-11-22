import type { CardVisualProps } from './card.types';
import { cardAppearance } from './card.appearance';
import { cardPresets } from './card.presets';
import './card.styles.css';

export type BaseCardProps = CardVisualProps & {
  as?: 'article' | 'section' | 'div';
};

/** Sem ação e sem cursor de clique: estrutura informativa semanticamente correta. */
export function BaseCard({
  as: Element = 'article',
  className,
  estiloGrafico = cardPresets.informativo,
  children,
}: BaseCardProps) {
  return <Element {...cardAppearance(className, estiloGrafico, false)}>{children}</Element>;
}
