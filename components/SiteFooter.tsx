import Image from 'next/image';
import { MapPin, Phone } from 'lucide-react';
import { Facebook, Instagram } from './BrandIcons';
import { SECTIONS, venue } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer relative border-t border-white/[0.07] bg-[#080808] pb-28 pt-14 lg:pb-12">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/brand/logo-lockup.png"
              alt="Crayon Food & Melody"
              width={448}
              height={284}
              sizes="120px"
              className="h-[76px] w-auto"
            />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/50">
              {venue.tagline}. Ζωντανή μουσική, ελληνική κουζίνα και cocktails στην καρδιά του Ευόσμου.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={`https://instagram.com/${venue.social.instagram}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="icon-btn"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Crayon-Food-Melody/61554238747657/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="icon-btn"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-accent-soft">Πλοήγηση</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {SECTIONS.filter((s) => s.id !== 'top').map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-[0.92rem] text-white/60 transition hover:text-chalk">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-accent-soft">Επικοινωνία</h3>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                <span>{venue.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
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
