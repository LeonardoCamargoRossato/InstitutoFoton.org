export type PeopleGalleryItem = {
  id: string | number;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt?: string;
  thematicLine?: string;
  catalogId?: string;
  onOpen?: () => void;
};

export type PeopleGalleryCardProps = {
  item: PeopleGalleryItem;
};

export type PeopleGalleryProps = {
  items: readonly PeopleGalleryItem[];
  className?: string;
};
