export type PriceTier = { label: string; price: string };

/** A weekly residency: it repeats on `days`, so it has no calendar date. */
export type EventItem = {
  id: string;
  title: string;
  headliners: string[];
  schedule: string;
  days: string[];
  arrival: string;
  /** when the stage starts, if not at arrival */
  liveStart?: string;
  genre: string;
  badge: string;
  description: string;
  image: string;
  seats: string;
  pricing: PriceTier[];
  pricingNote?: string;
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
