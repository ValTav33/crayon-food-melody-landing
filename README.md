# Velvet Stage & Dine — Landing Page Demo

Single-page landing demo για το **Velvet Stage & Dine**, live stage bar · dinner
(26ης Οκτωβρίου 48, περιοχή FIX / Σφαγεία, Θεσσαλονίκη).

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
  globals.css         # design tokens, full-screen snap sections, btn/eyebrow, reveal, grain, bubbles
  icon.png, apple-icon.png, opengraph-image.jpg   # favicon + social card (από scripts/process-media.mjs)
components/
  SiteHeader.tsx      # sticky header + mobile menu (active section) + quick call CTA
  SectionNav.tsx      # σταθερή αριστερή μπάρα ενοτήτων με active highlight
  Hero.tsx            # headline, dual CTA, trust bar, crossfade φωτογραφιών
  Events.tsx          # «Live Stage Lineup» — εβδομαδιαίες βραδιές με τιμές, snap rail σε mobile
  MenuTeaser.tsx      # tabs ανά κατηγορία + «Όλο το μενού»
  FullMenuModal.tsx   # popup με ολόκληρο τον κατάλογο
  StoryGallery.tsx    # Instagram-style stories + full-screen viewer
  Atmosphere.tsx      # gallery 4×3
  Reviews.tsx         # βαθμολογία + 6 κριτικές (3×2 σε desktop, rail σε mobile)
  LocationSection.tsx # κράτηση + τοποθεσία: CTA, info, stylised map mockup
  Reveal.tsx          # fade-up όταν ένα στοιχείο μπαίνει στην οθόνη
  BookingProvider.tsx # context: άνοιγμα modal από οπουδήποτε (προαιρετικά για συγκεκριμένο event)
  BookingModal.tsx    # φόρμα κράτησης + άμεση κλήση / WhatsApp· από event δείχνει περιγραφή & τιμές
  MobileActionBar.tsx # floating bar: Κλήση · WhatsApp · Κράτηση
  BrandIcons.tsx      # Instagram/Facebook/TikTok glyphs (η lucide έκοψε τα brand icons)
data/siteData.json    # ΟΛΟ το περιεχόμενο: venue, events, menu, stories, gallery, reviews
lib/site.ts           # typed exports του siteData + λίστα ενοτήτων (SECTIONS) + WhatsApp helpers
lib/types.ts
lib/useActiveSection.ts # ποια ενότητα είναι στο κέντρο της οθόνης
lib/useModal.ts       # Escape + scroll lock για popups
scripts/process-media.mjs # ../Media → public/images (WebP), favicon, social card
```

Όνομα, διεύθυνση, τηλέφωνα, email, ωράριο, social, βαθμολογία, events, μενού και
κριτικές ζουν στο `data/siteData.json`· για αλλαγές περιεχομένου δεν χρειάζεται να
πειραχτεί component.

## Layout

Σε desktop (≥1024px πλάτος και ≥640px ύψος) κάθε ενότητα πιάνει ακριβώς μία
οθόνη και το scroll «κουμπώνει» σε κάθε ενότητα (`.screen` + `snap:` variant).
Σε κινητά και πολύ χαμηλά παράθυρα το scroll είναι κανονικό, ώστε τίποτα να μην
κόβεται. Η αριστερή μπάρα δείχνει ονόματα από 1280px, μόνο δείκτες (όνομα στο
hover) στα 1024–1279px, και κρύβεται στα κινητά.

## Παλέτα

- **Χρυσό** (`accent`, από το λογότυπο): κουμπιά, τονισμένες λέξεις, τιμές, αστέρια,
  εικονίδια. Κείμενο πάνω σε χρυσό γέμισμα είναι πάντα `text-ink` (το λευκό δεν
  περνά contrast).
- **Velvet crimson** (`velvet`): η ατμόσφαιρα — οι φυσαλίδες του φόντου και το
  badge «Τελευταία τραπέζια».

## Εικόνες

Όλες οι εικόνες του site είναι WebP και βγαίνουν από τα αρχεία του φακέλου
`../Media` με:

```bash
node scripts/process-media.mjs          # ή: node scripts/process-media.mjs /path/to/Media
```

- `public/images/brand/` — `logo-lockup.webp` (οριζόντιο), `logo-stacked.webp`
  (κάθετο), `logo-mark.webp` (V + κλειδί του σολ): το χρυσό λογότυπο με διάφανο
  φόντο (το μαύρο/texture αφαιρείται με chroma key)· `banner.webp`
- `public/images/events/` — οι αφίσες κομμένες ώστε να μένουν μόνο οι καλλιτέχνες
  (χωρίς ημερομηνίες, λογότυπα άλλων χώρων και χορηγούς)
- `public/images/stories/` — 9:16· οι αφίσες πάνω σε θολό φόντο του εαυτού τους
- `public/images/food/`, `public/images/atmosphere/` — φωτογραφίες για hero και gallery
- Εξαιρέσεις από το WebP: `app/icon.png` / `app/apple-icon.png` (favicon) και
  `app/opengraph-image.jpg` (social card), για συμβατότητα με όλες τις πλατφόρμες.

Αν προστεθούν στο `Media/` αρχεία `AI - Stage…` και `AI - Booth…`, το script
τα βγάζει ως `atmosphere/live-stage.webp` / `atmosphere/velvet-booth.webp` για
τη gallery.

## Σημειώσεις demo

- Όλα τα στοιχεία επικοινωνίας, οι τιμές και οι κριτικές είναι demo.
- Τα social handles εμφανίζονται αλλά δεν είναι links.
- Η φόρμα κράτησης δεν στέλνει δεδομένα — δείχνει success state.
- Ο πλήρης κατάλογος ανοίγει σε popup (αντί για PDF).
- Ο χάρτης είναι στυλιζαρισμένο mockup· το κουμπί «Οδηγίες στο Maps» ψάχνει τη
  διεύθυνση στο Google Maps.
- Οι αφίσες και τα ονόματα των καλλιτεχνών ανήκουν σε τρίτους — μόνο για ιδιωτικό demo.
