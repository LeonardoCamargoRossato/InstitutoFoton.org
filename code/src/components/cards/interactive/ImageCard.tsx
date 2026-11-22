import { cardAppearance } from '../base/card.appearance';
import { cardPresets } from '../base/card.presets';
import type { CardVisualProps } from '../base/card.types';

export type ImageCardProps = Omit<CardVisualProps, 'children'> & {
  imagem: { src: string; alt: string; width?: number; height?: number };
  imagemAlternativa?: { src: string; alt: string };
  label: string;
  onOpen: () => void;
};

/** Exibe uma prévia leve. A abertura do PNG permanece no visualizador existente. */
export function ImageCard({
  imagem,
  imagemAlternativa,
  label,
  onOpen,
  className,
  estiloGrafico = cardPresets.fotografia,
}: ImageCardProps) {
  const style =
    imagemAlternativa && estiloGrafico.hover === 'image-swap'
      ? estiloGrafico
      : estiloGrafico.hover === 'image-swap'
        ? { ...estiloGrafico, hover: 'image-zoom' as const }
        : estiloGrafico;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onOpen}
      {...cardAppearance(className, style, true)}
    >
      <span className="foton-card-media">
        <img
          className="foton-card-image"
          src={imagem.src}
          alt={imagem.alt}
          width={imagem.width}
          height={imagem.height}
          loading="lazy"
          decoding="async"
        />
        {imagemAlternativa && style.hover === 'image-swap' && (
          <img
            className="foton-card-image foton-card-image--alternate"
            src={imagemAlternativa.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        )}
      </span>
    </button>
  );
}
