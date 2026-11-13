import { assetUrl } from '../lib/siteAssets';
import logoFilenames from '../../assets/partner-logo-names.json';

// Nomes PascalCase aprovados e mídia SVG original do Drive.
export type PartnerLogo = { svg: string };
export function partnerLogoAssets(slug: string | null): PartnerLogo | null {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const name = logoFilenames[slug as keyof typeof logoFilenames];
  if (!name || !/^Logo[A-Za-z0-9]+$/.test(name) || name === 'LogoRede40') return null;
  return {
    svg: assetUrl('assets/img-logos-parceiros-foton/assets-svg/' + name + '.svg'),
  };
}
