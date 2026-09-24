# Crayon Food & Melody — Landing Page Demo

Single-page landing demo για το μουσικό μεζεδοπωλείο **Crayon Food & Melody**
(Αντώνη Τρίτση 94, Εύοσμος Θεσσαλονίκης).

Next.js 15 (App Router) · TypeScript · Tailwind CSS · lucide-react

## Εκκίνηση

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # production build
```

## Δομή

```
app/
  layout.tsx          # fonts (EB Garamond + Manrope, greek subset), metadata
  page.tsx            # σύνθεση των sections
  globals.css         # design tokens, full-screen snap sections, btn/eyebrow, reveal, grain
components/
  SiteHeader.tsx      # sticky header + mobile menu (active section) + quick call CTA
  SectionNav.tsx      # σταθερή αριστερή μπάρα ενοτήτων με active highlight
  Hero.tsx            # headline, dual CTA, trust bar, crossfade φωτογραφιών
  Events.tsx          # «Το Πρόγραμμα» — snap rail σε mobile, grid σε desktop
  MenuTeaser.tsx      # tabs με 4 πιάτα ανά κατηγορία + «Όλο το μενού»
  FullMenuModal.tsx   # popup με ολόκληρο τον κατάλογο
  StoryGallery.tsx    # Instagram-style stories + full-screen viewer
  Atmosphere.tsx      # gallery 4×3
  Reviews.tsx         # Google rating + κριτικές
  LocationSection.tsx # κράτηση + τοποθεσία: CTA, info, stylised map mockup
  Reveal.tsx          # fade-up όταν ένα στοιχείο μπαίνει στην οθόνη
  BookingProvider.tsx # context: άνοιγμα modal από οπουδήποτε
  BookingModal.tsx    # φόρμα κράτησης + άμεση κλήση / WhatsApp
  MobileActionBar.tsx # floating bar: Κλήση · WhatsApp · Κράτηση
  BrandIcons.tsx      # Instagram/Facebook glyphs (η lucide έκοψε τα brand icons)
data/siteData.json    # ΟΛΟ το περιεχόμενο: venue, events, menu, stories, gallery, reviews
lib/site.ts           # typed exports του siteData + λίστα ενοτήτων (SECTIONS)
lib/types.ts
lib/useActiveSection.ts # ποια ενότητα είναι στο κέντρο της οθόνης
lib/useModal.ts       # Escape + scroll lock για popups
```

Για αλλαγές περιεχομένου αρκεί το `data/siteData.json` — δεν χρειάζεται να
πειραχτεί component.

## Layout

Σε desktop (≥1024px πλάτος και ≥640px ύψος) κάθε ενότητα πιάνει ακριβώς μία
οθόνη και το scroll «κουμπώνει» σε κάθε ενότητα (`.screen` + `snap:` variant).
Σε κινητά και πολύ χαμηλά παράθυρα το scroll είναι κανονικό, ώστε τίποτα να μην
κόβεται. Η αριστερή μπάρα δείχνει ονόματα από 1280px, μόνο δείκτες (όνομα στο
hover) στα 1024–1279px, και κρύβεται στα κινητά.

## Εικόνες

Όλα τα assets βγήκαν από τα δημόσια προφίλ του μαγαζιού (Instagram/Facebook):

- `public/images/brand/` — `logo-lockup.png` (πλήρες λογότυπο) και `logo-mark.png`
  (μόνο το πρόσωπο), διαφανή, από το επίσημο logo· `banner.jpg` (το Facebook
  banner, στην κεφαλίδα της φόρμας κράτησης)
- `public/images/events/` — αφίσες live από το Instagram grid (χωρίς το reel badge)
- `public/images/stories/` — τα πιάτα από τα story highlights, **καθαρισμένα**:
  κομμένο το Instagram chrome (progress bars, header «Tastes», reply bar), τα
  location stickers και κάθε ένδειξη repost/username. Κάθε φωτογραφία μπαίνει σε
  καμβά 1080×1920 με blurred background, όπως ακριβώς ανεβαίνει ένα story.
- `public/images/food/` — οι ίδιες καθαρές λήψεις σε full crop, για τα thumbnails
  του καταλόγου
- `public/images/atmosphere/` — σκηνή, χώρος, bar, κόσμος

## Σημειώσεις demo

- Η φόρμα κράτησης δεν στέλνει δεδομένα — δείχνει success state.
- Ο πλήρης κατάλογος ανοίγει σε popup (αντί για PDF).
- Ο χάρτης είναι στυλιζαρισμένο mockup· το κουμπί «Άνοιγμα στο Google Maps»
  οδηγεί στην πραγματική καταχώρηση.
- Rating: χρησιμοποιείται το πραγματικό **3,9 / 157 κριτικές** του Google.
- Οι καλλιτέχνες του 2ου event είναι Σαγκούρης & Ευθυμιάδου (υπάρχει διαθέσιμη
  αφίσα), αντί για την «Άσπα» του αρχικού mock data.
