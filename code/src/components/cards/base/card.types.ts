import type { ReactNode } from 'react';

export type CardHover = 'none' | 'lift' | 'image-zoom' | 'border-highlight' | 'image-swap';
export type CardTheme = 'claro' | 'escuro' | 'institucional';
export type CardBorder = 'nenhuma' | 'suave' | 'destacada' | 'organica';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl';
export type CardShadow = 'nenhuma' | 'leve' | 'media';
export type CardSpacing = 'compacto' | 'padrao' | 'amplo';

export type CardGraphicStyle = {
  tema?: CardTheme;
  borda?: CardBorder;
  raio?: CardRadius;
  sombra?: CardShadow;
  hover?: CardHover;
  espacamento?: CardSpacing;
};

export type CardVisualProps = {
  children: ReactNode;
  className?: string;
  estiloGrafico?: CardGraphicStyle;
  /** Código único documentado no mapa do menu, invisível na interface. */
  catalogId?: string;
  /** Preserva todos os acabamentos CSS já aprovados sem reaplicar tokens. */
  inheritVisuals?: boolean;
};
