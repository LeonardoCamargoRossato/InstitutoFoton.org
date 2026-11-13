import { assetUrl } from '../lib/siteAssets';
import logoFilenames from '../../assets/partner-logo-names.json';

// O slug é um identificador estável; os arquivos físicos seguem PascalCase LCR.
export type PartnerLogo = { png: string; webp: string };
export function partnerLogoAssets(slug: string | null): PartnerLogo | null {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const name = logoFilenames[slug as keyof typeof logoFilenames];
  if (!name || !/^Logo[A-Za-z0-9]+$/.test(name)) return null;
  return {
    png: assetUrl('assets/PNG/parceiros/' + name + '.png'),
    webp: assetUrl('assets/WebP/parceiros/' + name + '.webp'),
  };
}
