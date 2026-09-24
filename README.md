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
  globals.css         # design tokens, glass/btn/eyebrow components, grain
components/
  SiteHeader.tsx      # sticky nav + mobile menu + quick call CTA
  Hero.tsx            # badge, headline, dual CTA, trust bar
  Events.tsx          # «Το Πρόγραμμα» — snap rail σε mobile, grid σε desktop
  MenuTeaser.tsx      # tabs (useState) με τις κατηγορίες καταλόγου
  StoryGallery.tsx    # Instagram-style stories + full-screen viewer
  Atmosphere.tsx      # masonry gallery + Google reviews
  CtaBand.tsx         # scarcity CTA
  LocationSection.tsx # info panel + stylised map mockup
  BookingProvider.tsx # context: άνοιγμα modal από οπουδήποτε
  BookingModal.tsx    # φόρμα κράτησης + άμεση κλήση / WhatsApp
  MobileActionBar.tsx # floating bar: Κλήση · WhatsApp · Κράτηση
  BrandIcons.tsx      # Instagram/Facebook glyphs (η lucide έκοψε τα brand icons)
data/siteData.json    # ΟΛΟ το περιεχόμενο: venue, events, menu, stories, gallery, reviews
lib/site.ts           # typed exports του siteData
lib/types.ts
```

Για αλλαγές περιεχομένου αρκεί το `data/siteData.json` — δεν χρειάζεται να
πειραχτεί component.

## Εικόνες

Όλα τα assets βγήκαν από τα δημόσια προφίλ του μαγαζιού (Instagram/Facebook):

- `public/images/brand/` — `logo.png` (κυκλικό λογότυπο με διαφανές φόντο) και
  `cover.jpg` (ambient hero background)
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
- Το PDF του καταλόγου είναι dummy link.
- Ο χάρτης είναι στυλιζαρισμένο mockup· το κουμπί «Άνοιγμα στο Google Maps»
  οδηγεί στην πραγματική καταχώρηση.
- Rating: χρησιμοποιείται το πραγματικό **3,9 / 157 κριτικές** του Google.
- Οι καλλιτέχνες του 2ου event είναι Σαγκούρης & Ευθυμιάδου (υπάρχει διαθέσιμη
  αφίσα), αντί για την «Άσπα» του αρχικού mock data.
