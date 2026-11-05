export const basePath = import.meta.env.BASE_URL;
export const siteOrigin = import.meta.env.VITE_SITE_ORIGIN || '';
const configuredBackendOrigin = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(
  /\/$/,
  '',
);
export const expectedProject = configuredBackendOrigin
  ? new URL(configuredBackendOrigin).hostname.split('.')[0]
  : 'qwyrnomhazssofombhem';
const expectedBackendOrigin =
  configuredBackendOrigin || `https://${expectedProject}.supabase.co`;

export function validateBackend(url: string | undefined, key: string | undefined) {
  if (!url || !key)
    return 'O acesso institucional ainda não está disponível. Tente novamente mais tarde.';
  try {
    if (new URL(url).origin !== expectedBackendOrigin) {
      return 'A configuração do acesso institucional precisa ser revisada pela equipe responsável.';
    }
    if (key.startsWith('sb_secret_')) return 'Configuração de chave não permitida no navegador.';
    const payload = key.split('.')[1];
    if (payload) {
      const parsed = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      if (parsed.role !== 'anon') return 'Configuração de chave não permitida no navegador.';
    } else if (!key.startsWith('sb_publishable_')) {
      return 'Configuração de chave pública inválida.';
    }
    return null;
  } catch {
    return 'A configuração do acesso institucional precisa ser revisada pela equipe responsável.';
  }
}

export function safeReturnTo(value: string | null): string {
  if (!value || !/^\/admin(?:\/(?:marketing|diretoria))?$/.test(value)) return '/admin';
  return value;
}

export function safeExternalUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function dateLabel(value: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? ''
    : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
