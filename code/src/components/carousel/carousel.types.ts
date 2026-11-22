/** Contrato público da biblioteca de carrosséis do Instituto Foton. */
export type CarouselWebPImage = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
};

export type CarouselPNGImage = {
  id: string;
  src: string;
  downloadName?: string;
  attribution?: string;
};

export type CarouselGraphicStyle = {
  tema?: 'claro' | 'escuro' | 'institucional';
  imagem?: {
    apresentacao?: 'peek' | 'unica';
    proporcao?: 'original' | '16:9' | '4:5';
    proximaImagemVisivel?: boolean;
    enquadramento?: 'cover' | 'contain';
  };
  borda?: {
    estilo?: 'nenhuma' | 'suave' | 'organica' | 'destacada';
    raio?: 'sm' | 'md' | 'lg' | 'xl';
    espessura?: 'nenhuma' | 'fina' | 'media';
  };
  hover?: {
    habilitado?: boolean;
    escala?: number;
    duracaoMs?: number;
  };
  animacao?: {
    tipo?: 'deslizamento-suave' | 'deslizamento-fade';
    duracaoMs?: number;
    ambosSentidos?: boolean;
  };
  navegacao?: {
    circular?: boolean;
    contador?: boolean;
    miniaturas?: 'recolhiveis' | 'sempre' | 'desativadas';
  };
  visualizador?: {
    abertura?: 'intermediaria';
    fullscreenDisponivel?: boolean;
    percentualEditavel?: boolean;
  };
};

export type CarouselLegacyClasses = {
  root?: string;
  stage?: string;
  image?: string;
  controls?: string;
  position?: string;
  thumbnails?: string;
  caption?: string;
  credit?: string;
};

export type CarouselItem = {
  preview: CarouselWebPImage;
  original: CarouselPNGImage;
};

export type BaseCarouselProps = {
  listaWebP: readonly CarouselWebPImage[];
  listaPNG: readonly CarouselPNGImage[];
  estiloGrafico: CarouselGraphicStyle;
  label: string;
  titulo?: string;
  classNames?: CarouselLegacyClasses;
  previousLabel?: string;
  nextLabel?: string;
  imageLabel?: (index: number, total: number, image: CarouselWebPImage) => string;
  thumbnailLabel?: (index: number) => string;
  onChange?: (index: number) => void;
};
