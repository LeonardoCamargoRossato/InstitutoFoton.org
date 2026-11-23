import { cardAppearance } from '../base/card.appearance';
import { cardPresets } from '../base/card.presets';
import type { CardVisualProps } from '../base/card.types';

export type ProfileCardProps = CardVisualProps & {
  onOpen: () => void;
  label: string;
};

/** O modal e o ciclo de foco continuam sob responsabilidade do consumidor. */
export function ProfileCard({
  onOpen,
  label,
  className,
  estiloGrafico = cardPresets.perfil,
  children,
  catalogId,
}: ProfileCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      data-lcr-card-id={catalogId}
      {...cardAppearance(className, estiloGrafico, true)}
    >
      {children}
    </button>
  );
}
