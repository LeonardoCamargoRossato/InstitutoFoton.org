import { useState, type ReactNode } from 'react';

type FotonImage = {
  file: string;
  width: number;
  height: number;
  alt: string;
  page: string;
  section: string;
  position: string;
  crop: string;
  mobile?: string;
};

// Acervo provisório de cenas fictícias, construído a partir das composições
// conceituais aprovadas. Trocar o caminho, não a estrutura das páginas.
// Nenhum personagem representa membro ou atividade documentada do Instituto.
export const PHOTO_LIBRARY = {
  'home-hero-community': {
    file: 'home-hero-community.avif', mobile: 'home-hero-community-mobile.avif',
    width: 1480, height: 343, page: 'Home', section: 'hero', position: 'center',
    crop: 'wide / mobile 4:3', alt: 'Composição fictícia de cinco pessoas de gerações diferentes conversando sobre ciência.',
  },
  'home-science-network': {
    file: 'home-science-network.avif', width: 1050, height: 457,
    page: 'Home', section: 'conhecimento compartilhado', position: 'center',
    crop: 'horizontal', alt: 'Ilustração fotográfica de pesquisadores fictícios colaborando em uma bancada científica.',
  },
  'home-generational-legacy': {
    file: 'home-generational-legacy.avif', width: 1050, height: 363,
    page: 'Home', section: 'legado geracional', position: 'center',
    crop: 'horizontal', alt: 'Cena fictícia de pesquisadora sênior conversando com pesquisadores mais jovens.',
  },
  'apoie-hero-scientists': {
    file: 'apoie-hero-scientists.avif', mobile: 'apoie-hero-scientists-mobile.avif',
    width: 1480, height: 401, page: 'Apoie', section: 'hero', position: 'center',
    crop: 'wide / mobile 4:3', alt: 'Composição fictícia de jovem pesquisadora, engenheiro e pesquisadora sênior.',
  },
  'apoie-researcher-support': {
    file: 'apoie-researcher-support.avif', width: 1030, height: 435,
    page: 'Apoie', section: 'incentivo ao pesquisador', position: 'center',
    crop: 'horizontal', alt: 'Cena ilustrativa de uma pesquisadora fictícia usando um microscópio.',
  },
  'jornada-hero-pathways': {
    file: 'jornada-hero-pathways.avif', mobile: 'jornada-hero-pathways-mobile.avif',
    width: 1400, height: 396, page: 'Jornada', section: 'hero', position: 'center',
    crop: 'wide / mobile 4:3', alt: 'Cena fictícia de jovem cientista examinando uma amostra vegetal no laboratório.',
  },
  'pesquisa-collaboration': {
    file: 'pesquisa-collaboration.avif', width: 1060, height: 377,
    page: 'Pesquisa', section: 'ciência em rede', position: 'center',
    crop: 'horizontal', alt: 'Composição ilustrativa de pesquisadores fictícios trabalhando juntos em laboratório.',
  },
  'instituto-community': {
    file: 'instituto-community.avif', mobile: 'instituto-community-mobile.avif',
    width: 1400, height: 313, page: 'Instituto', section: 'comunidade', position: 'center',
    crop: 'wide / mobile 4:3', alt: 'Cena ilustrativa intergeracional de pessoas fictícias reunidas para conversar sobre ciência.',
  },
  'mosaic-collaborators': {
    file: 'mosaic-collaborators.avif', width: 720, height: 283,
    page: 'Home', section: 'colaboradores', position: 'center', crop: 'horizontal',
    alt: 'Dois profissionais fictícios trocando ideias em um laboratório.',
  },
  'mosaic-society': {
    file: 'mosaic-society.avif', width: 720, height: 284,
    page: 'Home', section: 'sociedade', position: 'center', crop: 'horizontal',
    alt: 'Cena ilustrativa de conversa entre uma jovem e uma senhora em atividade comunitária.',
  },
  'mosaic-students': {
    file: 'mosaic-students.avif', width: 720, height: 291,
    page: 'Home', section: 'estudantes', position: 'center', crop: 'horizontal',
    alt: 'Grupo fictício de estudantes sorrindo durante uma atividade de aprendizado.',
  },
  'mosaic-community': {
    file: 'mosaic-community.avif', width: 720, height: 304,
    page: 'Home', section: 'comunidade', position: 'center', crop: 'horizontal',
    alt: 'Cena ilustrativa de uma pessoa conversando com crianças em atividade educativa.',
  },
  'mosaic-partners': {
    file: 'mosaic-partners.avif', width: 720, height: 357,
    page: 'Home', section: 'parceiros', position: 'center', crop: 'horizontal',
    alt: 'Cena fictícia de dois profissionais cumprimentando-se.',
  },
  'mosaic-training': {
    file: 'mosaic-training.avif', width: 720, height: 344,
    page: 'Home', section: 'formação', position: 'center', crop: 'horizontal',
    alt: 'Cena ilustrativa de pesquisadora fictícia observando uma amostra ao microscópio.',
  },
} as const satisfies Record<string, FotonImage>;

export type PhotoId = keyof typeof PHOTO_LIBRARY;

const imagePath = (file: string) =>
  import.meta.env.BASE_URL + 'images/illustrative/' + file;
const previewPath = (file: string) =>
  import.meta.env.BASE_URL + 'images/webp/illustrative/' + file.replace(/\.avif$/, '.webp');

export function FotonPhoto({
  id, priority = false, className = '', caption, showCaption = true, fallback,
}: {
  id: PhotoId;
  priority?: boolean;
  className?: string;
  caption?: string;
  showCaption?: boolean;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const [useOriginal, setUseOriginal] = useState(false);
  const image = PHOTO_LIBRARY[id];
  const notice = caption || 'Imagem ilustrativa gerada por IA · pessoas fictícias';

  return (
    <figure
      className={'foton-photo ' + className}
      role={className.includes('human-mosaic') ? undefined : 'button'}
      tabIndex={className.includes('human-mosaic') ? undefined : 0}
      aria-label={className.includes('human-mosaic') ? undefined : 'Ampliar imagem: ' + image.alt}
      data-asset-id={id}
      data-media-kind="ai-illustration"
      data-photo-status={failed ? 'unavailable' : 'illustrative'}
    >
      {failed ? (fallback || (
        <div className="foton-photo-placeholder" role="status">
          <strong>Ciência. Pessoas. Possibilidades.</strong>
          <small>Imagem ilustrativa indisponível.</small>
        </div>
      )) : (
        <picture>
          {'mobile' in image && image.mobile && (
            <source media="(max-width: 700px)" srcSet={useOriginal ? imagePath(image.mobile) : previewPath(image.mobile)}
              type={useOriginal ? 'image/avif' : 'image/webp'} />
          )}
          <img
            src={useOriginal ? imagePath(image.file) : previewPath(image.file)}
            data-full-image={imagePath(image.file)}
            alt={'Imagem fictícia gerada por IA. ' + image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'low'}
            onError={() => { if (!useOriginal) setUseOriginal(true); else setFailed(true); }}
          />
        </picture>
      )}
      {showCaption && !failed && (
        <figcaption><span className="photo-caption-mark" aria-hidden="true" />{notice}</figcaption>
      )}
    </figure>
  );
}
