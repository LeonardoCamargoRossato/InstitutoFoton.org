// Static public catalog served exclusively from approved local content.
import publicData from '../content/publications.json';
import publicDataEnglish from '../content/publications.en.json';
import publicDataSpanish from '../content/publications.es.json';
import { institutionalStatements } from '../content/institutional';
import { publicDocuments } from '../content/public-documents';
import { assetUrl } from './siteAssets';

export type Publication = {
  id: string;
  slug: string;
  type: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  author_display_name: string | null;
  source_name: string | null;
  source_url: string | null;
  main_image_path: string | null;
  published_at: string | null;
  updated_at: string;
};

type PublicationTranslation = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  source_name: string | null;
};

export type PublicDocument = {
  id: string;
  title: string;
  category: string;
  description: string;
  file_path: string;
  version_label: string;
  document_date: string | null;
  allow_page_export: boolean;
};

const approvedPublications = publicData as Publication[];
const approvedEnglishTranslations = publicDataEnglish as PublicationTranslation[];
const approvedPublicationsEnglish = approvedPublications.map((item) => {
  const translation = approvedEnglishTranslations.find(({ slug }) => slug === item.slug);
  return translation ? { ...item, ...translation } : item;
});

const approvedSpanishTranslations = publicDataSpanish as PublicationTranslation[];
const approvedPublicationsSpanish = approvedPublications.map((item) => {
  const translation = approvedSpanishTranslations.find(({ slug }) => slug === item.slug);
  return translation ? { ...item, ...translation } : item;
});

const categoryLabels = {
  pt: {
    all: 'Todas',
    blog: 'Blog',
    press: 'Na mídia',
    manifesto: 'Manifesto',
    research: 'Pesquisa',
    community: 'Comunidade',
    events: 'Eventos',
    education: 'Educação',
  },
  es: {
    all: 'Todas',
    blog: 'Blog',
    press: 'En los medios',
    manifesto: 'Manifiesto',
    research: 'Investigación',
    community: 'Comunidad',
    events: 'Eventos',
    education: 'Educación',
  },
  en: {
    all: 'All',
    blog: 'Blog',
    press: 'In the media',
    manifesto: 'Manifesto',
    research: 'Research',
    community: 'Community',
    events: 'Events',
    education: 'Education',
  },
} as const;

function isAllCategory(category: string) {
  return category === 'all' || category === 'Todas' || category === 'All';
}

function selectedCategoryLabel(category: string, locale: string) {
  const labels =
    locale === 'es-ES'
      ? categoryLabels.es
      : locale === 'en-US'
        ? categoryLabels.en
        : categoryLabels.pt;
  return labels[category as keyof typeof labels] ?? category;
}

export async function publications(
  page = 0,
  search = '',
  category = 'all',
  sort = 'recent',
  locale = 'pt-BR',
) {
  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const catalog =
    locale === 'es-ES'
      ? approvedPublicationsSpanish
      : locale === 'en-US'
        ? approvedPublicationsEnglish
        : approvedPublications;
  const categoryLabel = selectedCategoryLabel(category, locale);
  const filtered = catalog
    .filter(
      (p) =>
        (isAllCategory(category) ||
          p.category === categoryLabel ||
          p.type === category ||
          p.type === categoryLabel) &&
        (!search.trim() ||
          normalize([p.title, p.summary, p.body, p.category].join(' ')).includes(
            normalize(search.trim()),
          )),
    )
    .sort((a, b) => {
      const cmp = (a.published_at || '').localeCompare(b.published_at || '');
      return sort === 'oldest' ? cmp : -cmp;
    });
  const size = 24;
  return {
    items: filtered.slice(page * size, (page + 1) * size),
    more: filtered.length > (page + 1) * size,
    configured: true,
  };
}

export async function publication(slug: string, locale = 'pt-BR') {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const catalog =
    locale === 'es-ES'
      ? approvedPublicationsSpanish
      : locale === 'en-US'
        ? approvedPublicationsEnglish
        : approvedPublications;
  return catalog.find((p) => p.slug === slug) || null;
}

export async function officialStatements() {
  return institutionalStatements;
}

export async function documents(category?: string): Promise<PublicDocument[]> {
  return category ? publicDocuments.filter((d) => d.category === category) : [...publicDocuments];
}

export function documentUrl(doc: PublicDocument): string | undefined {
  if (
    !/^documents\/[a-zA-Z0-9._/-]+\.pdf$/.test(doc.file_path) ||
    doc.file_path.split('/').includes('..')
  )
    return undefined;
  return assetUrl(doc.file_path);
}
