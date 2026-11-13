import publishedSnapshot from './partners.json';

export type PartnerRecord = {
  id: string;
  title: string;
  slug: string;
  partner_tier: string | null;
  display_order: number;
  partner_url: string | null;
  logo_slug: string | null;
  status: 'publicado';
  locale: 'pt-br';
  summary?: string | null;
  logo_filename?: string;
  tag?: string;
  description?: string | null;
  keywords?: string[];
  published_at?: string | null;
};

export type PartnerGroup = { tier: string; items: PartnerRecord[] };

// O snapshot só pode receber registros efetivamente publicados e revisados.
// Não montar a lista a partir de parceiros presumidos ou nomes de outras seções.
const snapshot: PartnerRecord[] = publishedSnapshot as PartnerRecord[];

export function safePartnerUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function publishedPartners(): PartnerRecord[] {
  const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' });
  return snapshot
    .filter((record) => record.status === 'publicado' && record.locale === 'pt-br')
    .sort((a, b) => a.display_order - b.display_order || collator.compare(a.title, b.title));
}

export function partnerGroups(records: PartnerRecord[] = publishedPartners()): PartnerGroup[] {
  const groups = new Map<string, PartnerRecord[]>();
  records.forEach((record) => {
    const tier = record.partner_tier?.trim() || 'Parceiros';
    const current = groups.get(tier);
    if (current) current.push(record);
    else groups.set(tier, [record]);
  });
  return Array.from(groups, ([tier, items]) => ({ tier, items }));
}
