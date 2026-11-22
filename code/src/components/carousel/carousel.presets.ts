import type { CarouselGraphicStyle } from './carousel.types';

/** Presets editoriais: mesmo motor, sem duplicar navegação ou lógica de zoom. */
export const carouselPresets = {
  institucional: {
    tema: 'institucional',
    imagem: {
      apresentacao: 'peek',
      proporcao: '16:9',
      proximaImagemVisivel: true,
      enquadramento: 'cover',
    },
    borda: { estilo: 'suave', raio: 'lg', espessura: 'fina' },
    hover: { habilitado: true, escala: 1.04, duracaoMs: 280 },
    animacao: { tipo: 'deslizamento-suave', duracaoMs: 350, ambosSentidos: true },
    navegacao: { circular: true, contador: true, miniaturas: 'recolhiveis' },
    visualizador: {
      abertura: 'intermediaria',
      fullscreenDisponivel: true,
      percentualEditavel: true,
    },
  },
  noticias: {
    tema: 'claro',
    imagem: {
      apresentacao: 'peek',
      proporcao: '16:9',
      proximaImagemVisivel: true,
      enquadramento: 'cover',
    },
    navegacao: { circular: true, contador: true, miniaturas: 'recolhiveis' },
  },
  fundacao: {
    tema: 'claro',
    imagem: {
      apresentacao: 'peek',
      proporcao: '4:5',
      proximaImagemVisivel: true,
      enquadramento: 'contain',
    },
    navegacao: { circular: true, contador: true, miniaturas: 'recolhiveis' },
  },
  haquantum: {
    tema: 'institucional',
    imagem: {
      apresentacao: 'peek',
      proporcao: 'original',
      proximaImagemVisivel: true,
      enquadramento: 'contain',
    },
    navegacao: { circular: true, contador: true, miniaturas: 'recolhiveis' },
  },
  visitas: {
    tema: 'escuro',
    imagem: {
      apresentacao: 'peek',
      proporcao: 'original',
      proximaImagemVisivel: true,
      enquadramento: 'cover',
    },
    navegacao: { circular: true, contador: true, miniaturas: 'recolhiveis' },
  },
} satisfies Record<string, CarouselGraphicStyle>;
