import data from '@/data/siteData.json';
import type { EventItem, GalleryItem, MenuCategory, Review, Story } from './types';

export const venue = data.venue;
export const events = data.upcomingEvents as EventItem[];
export const menuCategories = data.menuCategories as MenuCategory[];
export const stories = data.stories as Story[];
export const gallery = data.gallery as GalleryItem[];
export const reviews = data.reviews as Review[];

export const NAV_LINKS = [
  { href: '#programma', label: 'Πρόγραμμα' },
  { href: '#menu', label: 'Μενού' },
  { href: '#atmosfaira', label: 'Ατμόσφαιρα' },
  { href: '#topothesia', label: 'Τοποθεσία' },
];

export const whatsappHref = (message: string) =>
  `https://wa.me/${venue.phoneLinks.mobile.replace('+', '')}?text=${encodeURIComponent(message)}`;
