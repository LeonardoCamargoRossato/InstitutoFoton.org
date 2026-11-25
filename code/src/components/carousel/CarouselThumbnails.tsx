import type { CarouselItem } from './carousel.types';
import { useLanguage } from '../../i18n';

type Props = {
  items: readonly CarouselItem[];
  active: number;
  onSelect: (index: number) => void;
  id: string;
  open: boolean;
  className?: string;
  label?: (index: number) => string;
};

export function CarouselThumbnails({ items, active, onSelect, id, open, className, label }: Props) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <div
      id={id}
      className={'base-carousel-thumbnails ' + (className ?? '')}
      aria-label={english ? "Select photograph" : "Selecionar fotografia"}
      hidden={!open}
    >
      {items.map((item, index) => (
        <button
          type="button"
          key={item.preview.id}
          className={index === active ? 'is-active' : ''}
          aria-label={label?.(index) ?? `${english ? "Select photo" : "Selecionar foto"} ${index + 1}`}
          aria-pressed={index === active}
          onClick={() => onSelect(index)}
        >
          <img src={item.preview.src} alt="" loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
  );
}
