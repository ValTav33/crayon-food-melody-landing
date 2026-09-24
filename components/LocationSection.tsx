'use client';

import Image from 'next/image';
import { Clock3, MapPin, Phone, Smartphone } from 'lucide-react';
import { Instagram } from './BrandIcons';
import { venue } from '@/lib/site';
import Reveal from './Reveal';
import { useBooking } from './BookingProvider';

export default function LocationSection() {
  const { open } = useBooking();

  return (
    <section id="kratisi" aria-label="Κράτηση & Τοποθεσία" className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-accent/[0.12] blur-[120px]" />

      <div className="page-container relative grid min-h-0 flex-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 snap:py-[4.5vh]">
        <div className="flex flex-col justify-center">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-8 rule-accent" />
            <p className="eyebrow">Κράτηση & Τοποθεσία</p>
          </Reveal>
          <Reveal as="h2" delay={60} className="mt-4 max-w-xl text-[2rem] font-normal leading-[1.12] tracking-tight text-chalk sm:text-[2.6rem] snap:mt-[1.8vh] snap:text-[length:clamp(2.1rem,5.4vh,3rem)]">
            Κλείστε το τραπέζι σας πριν <span className="accent-word">εξαντληθούν</span>.
          </Reveal>
          <Reveal as="p" delay={120} className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/60 snap:mt-[1.8vh]">
            Τα τραπέζια μπροστά στη σκηνή κλείνουν από νωρίς μέσα στην εβδομάδα. Θα μας βρείτε δύο βήματα από την
            Αντώνη Τρίτση, με εύκολη στάθμευση γύρω από το μαγαζί.
          </Reveal>

          <Reveal delay={180} className="mt-7 flex flex-col gap-3 sm:flex-row snap:mt-[3.5vh]">
            <button onClick={() => open()} className="btn-primary w-full sm:w-auto">
              Κράτηση Τραπεζιού
            </button>
            <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost w-full sm:w-auto">
              <Phone className="h-4 w-4 text-accent-soft" /> {venue.phones.landline}
            </a>
          </Reveal>

          <Reveal delay={240} className="mt-8 grid gap-3 sm:grid-cols-2 snap:mt-[4vh]">
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Διεύθυνση" value={venue.address} hint={venue.city} />
            <InfoRow
              icon={<Smartphone className="h-4 w-4" />}
              label="Κινητό"
              value={venue.phones.mobile}
              hint="Κλήση ή WhatsApp"
              href={`tel:${venue.phoneLinks.mobile}`}
            />
            <InfoRow
              icon={<Clock3 className="h-4 w-4" />}
              label="Ώρες"
              value="Παρ. & Σάβ. από 21:00"
              hint="Live από τις 21:30"
            />
            <InfoRow
              icon={<Instagram className="h-4 w-4" />}
              label="Social"
              value={`@${venue.social.instagram}`}
              hint={venue.social.facebook}
              href={`https://instagram.com/${venue.social.instagram}`}
              external
            />
          </Reveal>
        </div>

        <Reveal delay={120} className="flex min-h-0 flex-col">
          <MockMap />
        </Reveal>
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-accent-soft lg:hidden xl:flex">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted">{label}</span>
        <span className="mt-0.5 block truncate text-[0.92rem] font-semibold text-chalk">{value}</span>
        {hint && <span className="block truncate text-[0.76rem] text-white/45">{hint}</span>}
      </span>
    </>
  );

  const className =
    'flex min-w-0 items-center gap-3.5 card-surface px-4 py-3.5 transition-all duration-300 hover:border-accent/35 hover:bg-white/[0.03]';

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
    <div className="relative min-h-[340px] flex-1 overflow-hidden border border-white/[0.08] bg-[#0f1216] sm:min-h-[420px] snap:min-h-0">
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
            'repeating-linear-gradient(90deg, rgba(236,74,115,0.4) 0 14px, transparent 14px 28px)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_45%_48%,rgba(196,28,71,0.18),transparent_70%)]" />

      <span className="absolute left-[42%] top-[46%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="border border-accent/50 bg-black/85 px-3 py-2 backdrop-blur-md">
          <Image src="/images/brand/logo-lockup.png" alt="Crayon food & melody" width={96} height={61} className="h-[46px] w-auto" />
        </span>
        <span className="relative mt-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-accent ring-4 ring-accent/25" />
        </span>
      </span>

      <span className="absolute left-4 top-4 border border-white/10 bg-black/60 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/50 backdrop-blur-md">
        Αντώνη Τρίτση
      </span>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
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
          className="shrink-0 bg-accent px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#d62553]"
        >
          Οδηγίες στο Maps
        </a>
      </div>
    </div>
  );
}
