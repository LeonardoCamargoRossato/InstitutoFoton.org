import { assetUrl } from '../lib/siteAssets';

// O slug estável relaciona os arquivos PNG e WebP aprovados da mesma marca.
export type PartnerLogo = { png: string; webp: string };
export function partnerLogoAssets(slug: string | null): PartnerLogo | null {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return {
    png: assetUrl('assets/PNG/parceiros/' + slug + '.png'),
    webp: assetUrl('assets/WebP/parceiros/' + slug + '.webp'),
  };
}
