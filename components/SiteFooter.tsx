import Image from 'next/image';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Facebook, Instagram, TikTok } from './BrandIcons';
import { SECTIONS, venue } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer relative border-t border-white/[0.07] bg-[#080808] pb-28 pt-14 lg:pb-12">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/brand/logo-stacked.webp"
              alt={venue.name}
              width={900}
              height={918}
              sizes="110px"
              className="h-[110px] w-auto"
            />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/50">
              {venue.tagline}. Υψηλή γαστρονομία και live σκηνή στην καρδιά της περιοχής {venue.areaShort}.
            </p>
            {/* demo: the profiles are shown, not linked */}
            <div className="mt-6 flex gap-2">
              {[
                { icon: Instagram, label: `Instagram @${venue.social.instagram}` },
                { icon: TikTok, label: `TikTok @${venue.social.tiktok}` },
                { icon: Facebook, label: `Facebook ${venue.social.facebook}` },
              ].map(({ icon: Icon, label }) => (
                <span key={label} role="img" aria-label={label} title={label} className="icon-btn">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
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
                <span>
                  {venue.address}, {venue.postcode} {venue.city}
                </span>
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
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                <a href={`mailto:${venue.emails.reservations}`} className="transition hover:text-chalk">
                  {venue.emails.reservations}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
                <span className="text-white/45">
                  {venue.hours.schedule.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[0.78rem] text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} {venue.name} · Όλα τα δικαιώματα διατηρούνται.</p>
          <p>Demo landing page — σχεδιασμός &amp; υλοποίηση concept.</p>
        </div>
      </div>
    </footer>
  );
}
