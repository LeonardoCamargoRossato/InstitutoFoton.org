import type { CarouselItem } from './carousel.types';
import { useLanguage } from '../../i18n';
import { localizedCopy } from '../../i18n/localizedCopy';

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
  const copy = localizedCopy(locale);
  return (
    <div
      id={id}
      className={'base-carousel-thumbnails ' + (className ?? '')}
      aria-label={copy('Selecionar fotografia', 'Select photograph')}
      hidden={!open}
    >
      {items.map((item, index) => (
        <button
          type="button"
          key={item.preview.id}
          className={index === active ? 'is-active' : ''}
          aria-label={label?.(index) ?? `${copy('Selecionar foto', 'Select photo')} ${index + 1}`}
          aria-pressed={index === active}
          onClick={() => onSelect(index)}
        >
          <img src={item.preview.src} alt="" loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
  );
}
