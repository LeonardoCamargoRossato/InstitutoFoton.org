export type LogoGalleryCardProps = {
  item: LogoGalleryItem;
  eager?: boolean;
  critical?: boolean;
  catalogSection?: '1.6' | '3.2';
};

export type LogoGalleryItem = {
  id: string;
  title: string;
  logoSrc?: string | null;
  href?: string | null;
  invertLogo?: boolean;
};

export type LogoGalleryProps = {
  groups: readonly { tier: string; items: readonly LogoGalleryItem[] }[];
  home?: boolean;
  catalogSection?: '1.6' | '3.2';
};
