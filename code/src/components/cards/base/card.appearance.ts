import type { CardGraphicStyle } from './card.types';

export function cardAppearance(
  className: string | undefined,
  estiloGrafico: CardGraphicStyle,
  interactive: boolean,
) {
  // Um card puramente informativo nunca recebe hover com aparência de clique.
  const hover = interactive ? (estiloGrafico.hover ?? 'lift') : 'none';
  return {
    className: [
      'foton-card',
      interactive ? 'foton-card--interactive' : 'foton-card--informative',
      className,
    ]
      .filter(Boolean)
      .join(' '),
    'data-card-hover': hover,
    'data-card-theme': estiloGrafico.tema ?? 'claro',
    'data-card-border': estiloGrafico.borda ?? 'suave',
    'data-card-radius': estiloGrafico.raio ?? 'lg',
    'data-card-shadow': estiloGrafico.sombra ?? 'leve',
    'data-card-spacing': estiloGrafico.espacamento ?? 'padrao',
  };
}

/** Identidade e semântica unificadas sem substituir CSS editorial validado. */
export function legacyCardAppearance(
  className: string | undefined,
  interactive: boolean,
  catalogId?: string,
) {
  return {
    className: [
      'foton-card',
      'foton-card--legacy',
      interactive ? 'foton-card--legacy-interactive' : 'foton-card--informative',
      className,
    ]
      .filter(Boolean)
      .join(' '),
    'data-card-kind': interactive ? 'link' : 'informativo',
    'data-card-hover': interactive ? 'legacy' : 'none',
    'data-lcr-card-id': catalogId,
  };
}
