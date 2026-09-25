import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = EB_Garamond({
  subsets: ['latin', 'greek'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
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
  title: 'Velvet Stage & Dine · Fine dining & live σκηνή στη Θεσσαλονίκη',
  description:
    'Υψηλή γαστρονομία, premium bottle service και headliners στη live σκηνή, Πέμπτη έως Κυριακή στην 26ης Οκτωβρίου 48, περιοχή FIX, Θεσσαλονίκη. Κρατήσεις: 2310 000 000.',
  keywords: ['Velvet Stage & Dine', 'live Θεσσαλονίκη', 'FIX', 'Σφαγεία', 'fine dining', 'live σκηνή', 'dinner show'],
  openGraph: {
    title: 'Velvet Stage & Dine',
    description: 'Εκεί που η υψηλή γαστρονομία συναντά τη μεγαλύτερη live σκηνή της πόλης.',
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
    // `js` is added before first paint so scroll-reveal content only hides when JS runs
    <html lang="el" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
