import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { Facebook, Instagram } from './BrandIcons';
import { NAV_LINKS, venue } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#080808] pb-28 pt-14 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative block h-12 w-12 overflow-hidden rounded-full bg-black ring-1 ring-white/15">
                <Image src="/images/brand/logo.png" alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span>
                <span className="block font-display text-[1.25rem] text-chalk">Crayon</span>
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold/80">
                  food & melody
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/50">
              {venue.tagline}. Ζωντανή μουσική, ελληνική κουζίνα και cocktails στην καρδιά του Ευόσμου.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={`https://instagram.com/${venue.social.instagram}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Crayon-Food-Melody/61554238747657/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/70 transition hover:border-gold/40 hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gold/80">Πλοήγηση</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[0.92rem] text-white/60 transition hover:text-chalk">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gold/80">Επικοινωνία</h3>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                <span>{venue.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                <span>
                  <a href={`tel:${venue.phoneLinks.landline}`} className="transition hover:text-chalk">
                    {venue.phones.landline}
                  </a>
                  <br />
                  <a href={`tel:${venue.phoneLinks.mobile}`} className="transition hover:text-chalk">
                    {venue.phones.mobile}
                  </a>
                </span>
              </li>
              <li className="text-white/45">{venue.operatingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[0.78rem] text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Crayon Food & Melody · Όλα τα δικαιώματα διατηρούνται.</p>
          <p>Demo landing page — σχεδιασμός &amp; υλοποίηση concept.</p>
        </div>
      </div>
    </footer>
  );
}
