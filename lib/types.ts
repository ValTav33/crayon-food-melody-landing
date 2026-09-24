export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  artists: string[];
  dateDisplay: string;
  dateShort: string;
  time: string;
  genre: string;
  badge: string;
  image: string;
  seats: string;
};

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag: string | null;
  image: string | null;
};

export type MenuCategory = { id: string; title: string; items: MenuItem[] };

export type Story = { id: string; image: string; caption: string; time: string };

export type GalleryItem = { image: string; label: string; span: 'tall' | 'wide' | 'normal' };

export type Review = { author: string; rating: number; text: string };
