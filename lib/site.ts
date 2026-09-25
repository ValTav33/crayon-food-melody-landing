import data from '@/data/siteData.json';
import type { EventItem, GalleryItem, MenuCategory, Review, Story } from './types';

export const venue = data.venue;
export const events = data.upcomingEvents as EventItem[];
export const menuCategories = data.menuCategories as MenuCategory[];
export const stories = data.stories as Story[];
export const gallery = data.gallery as GalleryItem[];
export const reviews = data.reviews as Review[];

/** Every full-screen section, in page order. Drives the left rail and active-section tracking. */
export const SECTIONS = [
  { id: 'top', label: 'Αρχή' },
  { id: 'programma', label: 'Πρόγραμμα' },
  { id: 'menu', label: 'Μενού' },
  { id: 'stories', label: 'Stories' },
  { id: 'atmosfaira', label: 'Ατμόσφαιρα' },
  { id: 'kritikes', label: 'Κριτικές' },
  { id: 'kratisi', label: 'Κράτηση' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** Header links on screens where the rail has no labels (1024–1279px). */
export const NAV_LINKS = [
  { id: 'programma', label: 'Πρόγραμμα' },
  { id: 'menu', label: 'Μενού' },
  { id: 'atmosfaira', label: 'Ατμόσφαιρα' },
  { id: 'kratisi', label: 'Τοποθεσία' },
] as const;

export const whatsappHref = (message: string) =>
  `https://wa.me/${venue.phoneLinks.mobile.replace('+', '')}?text=${encodeURIComponent(message)}`;

/** The default WhatsApp opener, optionally naming the night the guest is booking for. */
export const bookingMessage = (occasion?: string) =>
  `Γεια σας! Θα ήθελα κράτηση στο ${venue.name}${occasion ? ` για «${occasion}»` : ''}.`;
