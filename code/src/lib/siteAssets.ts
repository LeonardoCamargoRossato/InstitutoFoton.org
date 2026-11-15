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
  'apoie-hero-scientists': {
    file: 'apoie-hero-scientists.avif',
    mobile: 'apoie-hero-scientists-mobile.avif',
    width: 1480,
    height: 401,
    page: 'Apoie',
    section: 'hero',
    position: 'center',
    crop: 'wide / mobile 4:3',
    alt: 'Composição fictícia de jovem pesquisadora, engenheiro e pesquisadora sênior.',
  },
  'apoie-researcher-support': {
    file: 'apoie-researcher-support.avif',
    width: 1030,
    height: 435,
    page: 'Apoie',
    section: 'incentivo ao pesquisador',
    position: 'center',
    crop: 'horizontal',
    alt: 'Cena ilustrativa de uma pesquisadora fictícia usando um microscópio.',
  },
} as const satisfies Record<string, FotonImage>;

export type PhotoId = keyof typeof PHOTO_LIBRARY;

export type SiteAsset = {
  id: string;
  page: string;
  section: string;
  category: string;
  sourceType: 'ai-illustration' | 'documentary' | 'brand';
  pngPath: string;
  webpPath: string;
  alt: string;
  width: number;
  height: number;
  mobileId?: string;
};
const categoryOf = (id: string) =>
  id.startsWith('home-') || id.startsWith('mosaic-')
    ? 'home'
    : id.startsWith('apoie-')
      ? 'apoie'
      : id.startsWith('instituto-')
        ? 'instituto'
        : id.startsWith('jornada-')
          ? 'jornada'
          : id.startsWith('pesquisa-')
            ? 'pesquisa'
            : 'institucional';

const illustrativeEntries = Object.entries(PHOTO_LIBRARY).map(([id, entry]) => {
  const category = categoryOf(id);
  const mobileId =
    'mobile' in entry && typeof entry.mobile === 'string'
      ? entry.mobile.replace(/\.avif$/, '')
      : undefined;
  const asset: SiteAsset = {
    id,
    page: entry.page,
    section: entry.section,
    category,
    sourceType: 'ai-illustration',
    pngPath: 'assets/PNG/' + category + '/' + id + '.png',
    webpPath: 'assets/WebP/' + category + '/' + id + '.webp',
    alt: entry.alt,
    width: entry.width,
    height: entry.height,
    mobileId,
  };
  return [id, asset] as const;
});
const visits = Array.from({ length: 20 }, (_, i) => {
  const id = 'visita-' + String(i + 1).padStart(2, '0');
  return [
    id,
    {
      id,
      page: 'Manifesto',
      section: 'Visitas técnicas',
      category: 'visitas-tecnicas',
      sourceType: 'documentary' as const,
      pngPath: 'assets/02 - O Instituto/02A - Conheça o Instituto/Visitas Técnicas/PNG/' + id + '.png',
      webpPath: 'assets/02 - O Instituto/02A - Conheça o Instituto/Visitas Técnicas/WebP/' + id + '.webp',
      alt: 'Visita técnica ' + String(i + 1).padStart(2, '0') + ' do acervo do Instituto Foton.',
      width: 1920,
      height: 1080,
    },
  ] as const;
});
const manifesto = [
  ['Thumb_CartaSudeste', 1080, 603],
  ['Thumb_CartaNorte', 1600, 1200],
  ['Carta_Nordeste', 1280, 720],
  ['Carta_CentroOeste', 1440, 1920],
  ['Carta_Sul', 1920, 1440],
  ['thumb_PorqueIssoEImportante', 1600, 1080],
  ['OqueeoManifestoQuanticoNacional', 535, 288],
  ['ComoFaremosIsso', 1920, 1440],
] as const;
const manifestoEntries = manifesto.map(
  ([id, width, height]) =>
    [
      id,
      {
        id,
        page: 'Manifesto',
        section: 'Cartas e metodologia',
        category: 'manifesto-quantico',
        sourceType: 'documentary' as const,
        pngPath: 'assets/05 - Manifesto/Imagens da Página/PNG/' + id + '.png',
        webpPath: 'assets/05 - Manifesto/Imagens da Página/WebP/' + id + '.webp',
        alt: id.replace(/_/g, ' '),
        width,
        height,
      },
    ] as const,
);
const brands = [
  ['favicon', 437, 492],
  ['foton-logo', 1924, 595],
  ['foton-logo-light', 329, 146],
] as const;
const branding = brands.map(
  ([id, width, height]) =>
    [
      id,
      {
        id,
        page: 'Site',
        section: 'Identidade visual',
        category: 'branding',
        sourceType: 'brand' as const,
        pngPath: 'assets/PNG/branding/' + id + '.png',
        webpPath: 'assets/WebP/branding/' + id + '.webp',
        alt: 'Marca Instituto Foton',
        width,
        height,
      },
    ] as const,
);

export const SITE_ASSETS: Record<string, SiteAsset> = Object.fromEntries([
  ...illustrativeEntries,
  ...['apoie-hero-scientists-mobile'].map((id) => {
    const category = categoryOf(id);
    const parent = id.replace(/-mobile$/, '');
    const entry = PHOTO_LIBRARY[parent as PhotoId];
    return [
      id,
      {
        id,
        page: entry.page,
        section: entry.section,
        category,
        sourceType: 'ai-illustration' as const,
        pngPath: 'assets/PNG/' + category + '/' + id + '.png',
        webpPath: 'assets/WebP/' + category + '/' + id + '.webp',
        alt: entry.alt,
        width: entry.width,
        height: entry.height,
      },
    ] as const;
  }),
  ...visits,
  ...manifestoEntries,
  ...branding,
]);

export function imageAsset(id: string): SiteAsset {
  const asset = SITE_ASSETS[id];
  if (!asset) throw new Error('Imagem não catalogada: ' + id);
  return asset;
}
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path;
}
