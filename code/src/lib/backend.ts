// Catálogo público estático, servido exclusivamente a partir de conteúdo local aprovado.
import publicData from '../content/publications.json';
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
// O catálogo permanece vazio até a inclusão de material editorial aprovado.
export async function publications(page = 0, search = '', category = 'Todas', sort = 'recent') {
  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const filtered = approvedPublications
    .filter(
      (p) =>
        (category === 'Todas' || p.category === category || p.type === category) &&
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
export async function publication(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return approvedPublications.find((p) => p.slug === slug) || null;
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
