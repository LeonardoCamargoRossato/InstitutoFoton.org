export const basePath = import.meta.env.BASE_URL;
export const siteOrigin = import.meta.env.VITE_SITE_ORIGIN || '';

export function safeExternalUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}
export function dateLabel(value: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? ''
    : new Intl.DateTimeFormat('pt-BR', { dateStyle:'long', timeZone:'UTC' }).format(date);
}
