import type { CardGraphicStyle } from './card.types';

/** Presets nomeados pelo uso; a página mantém sua identidade e seu conteúdo. */
export const cardPresets = {
  informativo: {
    tema: 'claro',
    borda: 'suave',
    raio: 'lg',
    sombra: 'leve',
    hover: 'none',
    espacamento: 'padrao',
  },
  institucionalInformativo: {
    tema: 'institucional',
    borda: 'suave',
    raio: 'md',
    sombra: 'leve',
    hover: 'none',
    espacamento: 'amplo',
  },
  pesquisa: {
    tema: 'institucional',
    borda: 'suave',
    raio: 'xl',
    sombra: 'leve',
    hover: 'lift',
    espacamento: 'padrao',
  },
  fotografia: {
    tema: 'claro',
    borda: 'suave',
    raio: 'lg',
    sombra: 'leve',
    hover: 'image-zoom',
    espacamento: 'compacto',
  },
  perfil: {
    tema: 'claro',
    borda: 'suave',
    raio: 'lg',
    sombra: 'leve',
    hover: 'lift',
    espacamento: 'compacto',
  },
  parceiroInformativo: {
    tema: 'claro',
    borda: 'suave',
    raio: 'md',
    sombra: 'nenhuma',
    hover: 'none',
    espacamento: 'compacto',
  },
} satisfies Record<string, CardGraphicStyle>;
