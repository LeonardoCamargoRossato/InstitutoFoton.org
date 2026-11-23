import type { ReactNode } from 'react';

export type CardGalleryItemProps = {
  children: ReactNode;
};

export type CardGalleryProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
};
