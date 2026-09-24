import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = EB_Garamond({
  subsets: ['latin', 'greek'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin', 'greek'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Crayon Food & Melody · Live μουσική & γεύση στον Εύοσμο',
  description:
    'Ζωντανή ελληνική μουσική, προσεγμένες γεύσεις και μοναδική ατμόσφαιρα κάθε Παρασκευή & Σάββατο στην Αντώνη Τρίτση 94, Εύοσμος Θεσσαλονίκης. Κρατήσεις: 231 070 5900.',
  keywords: ['Crayon Food & Melody', 'live Θεσσαλονίκη', 'Εύοσμος', 'μεζεδοπωλείο', 'ζωντανή μουσική'],
  openGraph: {
    title: 'Crayon Food & Melody',
    description: 'Εκεί που η γεύση συναντά τη μελωδία · Live κάθε Παρασκευή & Σάββατο στον Εύοσμο.',
    locale: 'el_GR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
