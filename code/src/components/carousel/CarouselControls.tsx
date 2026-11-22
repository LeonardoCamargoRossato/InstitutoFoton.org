import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

type Props = {
  active: number;
  total: number;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  showCounter: boolean;
  thumbnailMode: 'recolhiveis' | 'sempre' | 'desativadas';
  thumbnailsOpen: boolean;
  thumbnailsId: string;
  onToggle: () => void;
  className?: string;
  positionClassName?: string;
};

export function CarouselControls({
  active,
  total,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  showCounter,
  thumbnailMode,
  thumbnailsOpen,
  thumbnailsId,
  onToggle,
  className,
  positionClassName,
}: Props) {
  return (
    <div className={'base-carousel-controls ' + (className ?? '')}>
      <div className="base-carousel-nav">
        <button
          className="base-carousel-arrow"
          type="button"
          onClick={onPrevious}
          aria-label={previousLabel}
          disabled={total < 2}
        >
          <ChevronLeft size={23} aria-hidden="true" />
        </button>
        {showCounter && (
          <span
            className={'base-carousel-count ' + (positionClassName ?? '')}
            aria-live="polite"
            aria-atomic="true"
          >
            {active + 1} / {total}
          </span>
        )}
        <button
          className="base-carousel-arrow"
          type="button"
          onClick={onNext}
          aria-label={nextLabel}
          disabled={total < 2}
        >
          <ChevronRight size={23} aria-hidden="true" />
        </button>
      </div>
      {thumbnailMode === 'recolhiveis' && (
        <button
          type="button"
          className="base-carousel-grid-toggle"
          onClick={onToggle}
          aria-label={thumbnailsOpen ? 'Ocultar miniaturas' : 'Mostrar miniaturas'}
          aria-expanded={thumbnailsOpen}
          aria-controls={thumbnailsId}
          title={thumbnailsOpen ? 'Ocultar miniaturas' : 'Mostrar miniaturas'}
        >
          <LayoutGrid size={21} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
