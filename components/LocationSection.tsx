'use client';

import { Clock3, MapPin, Navigation, Phone, Smartphone } from 'lucide-react';
import { Instagram } from './BrandIcons';
import { venue } from '@/lib/site';
import SectionHeading from './SectionHeading';
import { useBooking } from './BookingProvider';

export default function LocationSection() {
  const { open } = useBooking();

  return (
    <section id="topothesia" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Τοποθεσία & Επικοινωνία"
          title={<>Σας περιμένουμε στον Εύοσμο</>}
          description="Δύο βήματα από την Αντώνη Τρίτση, με εύκολη στάθμευση στον περιβάλλοντα χώρο."
        />

        <div className="mt-11 grid gap-5 lg:grid-cols-[minmax(0,1fr)_1.25fr]">
          <div className="flex flex-col gap-4">
            <InfoRow
              icon={<MapPin className="h-4.5 w-4.5" />}
              label="Διεύθυνση"
              value={venue.address}
              hint={venue.city}
            />
            <InfoRow
              icon={<Phone className="h-4.5 w-4.5" />}
              label="Τηλέφωνα κρατήσεων"
              value={venue.phones.landline}
              hint={venue.phones.mobile}
              href={`tel:${venue.phoneLinks.landline}`}
            />
            <InfoRow
              icon={<Clock3 className="h-4.5 w-4.5" />}
              label="Ώρες λειτουργίας"
              value={venue.operatingHours}
              hint="Έναρξη ζωντανής μουσικής 21:30"
            />
            <InfoRow
              icon={<Instagram className="h-4.5 w-4.5" />}
              label="Social"
              value={`@${venue.social.instagram}`}
              hint={venue.social.facebook}
              href={`https://instagram.com/${venue.social.instagram}`}
              external
            />

            <div className="mt-1 grid gap-3 sm:grid-cols-2">
              <button onClick={() => open()} className="btn-gold w-full">
                Κράτηση Τραπεζιού
              </button>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost w-full text-center leading-tight"
              >
                <Navigation className="h-4 w-4 shrink-0 text-gold" /> Άνοιγμα στο Google Maps
              </a>
            </div>
          </div>

          <MockMap />
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  hint,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/[0.10] text-gold ring-1 ring-gold/20">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted">{label}</span>
        <span className="mt-1 block truncate text-[1.02rem] font-semibold text-chalk">{value}</span>
        {hint && <span className="block truncate text-[0.82rem] text-white/45">{hint}</span>}
      </span>
    </>
  );

  const className =
    'flex items-center gap-4 rounded-2xl card-surface px-4 py-4 transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.03]';

  return href ? (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function MockMap() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0f1216] sm:min-h-[460px]">
      {/* stylised street grid */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="blocks" width="90" height="90" patternUnits="userSpaceOnUse">
            <rect width="90" height="90" fill="#0f1216" />
            <rect x="6" y="6" width="78" height="78" fill="#161b21" rx="3" />
          </pattern>
          <linearGradient id="avenue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1f2630" />
            <stop offset="50%" stopColor="#2a323d" />
            <stop offset="100%" stopColor="#1f2630" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#blocks)" />
        <rect y="46%" width="100%" height="34" fill="url(#avenue)" />
        <rect x="58%" width="26" height="100%" fill="#1c222a" />
        <rect x="22%" width="14" height="100%" fill="#181d24" />
      </svg>

      {/* avenue centre line */}
      <div
        className="absolute inset-x-0 top-[46%] mt-4 h-[2px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(245,158,11,0.38) 0 14px, transparent 14px 28px)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_45%_48%,rgba(245,158,11,0.16),transparent_70%)]" />

      <span className="absolute left-[42%] top-[46%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-xl border border-gold/40 bg-black/85 px-3 py-2 text-center backdrop-blur-md">
          <span className="block font-display text-[0.95rem] leading-tight text-chalk">Crayon</span>
          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">food & melody</span>
        </span>
        <span className="relative mt-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-gold ring-4 ring-gold/25" />
        </span>
      </span>

      <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50 backdrop-blur-md">
        Αντώνη Τρίτση
      </span>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
        <div className="min-w-0">
          <p className="truncate text-[0.9rem] font-semibold text-chalk">{venue.address}</p>
          <p className="flex items-center gap-1.5 text-[0.76rem] text-muted">
            <Smartphone className="h-3 w-3" /> Κρατήσεις: {venue.phones.mobile}
          </p>
        </div>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full bg-gold px-4 py-2 text-[0.8rem] font-bold text-black transition hover:brightness-110"
        >
          Οδηγίες
        </a>
      </div>
    </div>
  );
}
