'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, Clock3, MapPin, MessageCircle } from 'lucide-react';
import { bookingMessage, venue, whatsappHref } from '@/lib/site';
import { useBooking } from './BookingProvider';

const SLIDES = [
  { image: '/images/food/steak.webp', label: 'Tagliata Black Angus, δίπλα στη σκηνή' },
  { image: '/images/food/cocktail.webp', label: 'Signature cocktails στο bar' },
  { image: '/images/atmosphere/lounge.webp', label: 'Το Velvet lounge' },
];
const SLIDE_MS = 5500;
// Same `sizes` on the phone backdrop and the desktop panel, so both resolve to one URL
// (one download) instead of two copies of the first slide.
const HERO_SIZES = '(min-width: 1024px) 42vw, 100vw';

export default function Hero() {
  const { open } = useBooking();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      aria-label="Αρχή"
      className="screen grain relative isolate overflow-hidden pt-[var(--header-h)]"
    >
      {/* phones get a photo behind the headline; desktop shows the site-wide bubbles */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={SLIDES[0].image}
          alt=""
          fill
          priority
          sizes={HERO_SIZES}
          className="object-cover opacity-30 lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink lg:hidden" />
      </div>

      <div className="page-container grid min-h-[calc(100svh-var(--header-h))] flex-1 items-center gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] snap:min-h-0 snap:py-[4.5vh]">
        <div className="max-w-2xl">
          <div className="inline-flex animate-fade-up items-center gap-2.5 border border-accent/35 bg-accent/[0.08] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 bg-accent-soft" />
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-accent-soft sm:text-[0.72rem] sm:tracking-[0.24em]">
              {venue.tagline}
            </span>
          </div>

          <h1 className="mt-7 animate-fade-up text-[2.15rem] font-normal leading-[1.08] tracking-tight text-chalk [animation-delay:.08s] sm:text-5xl snap:mt-[3.2vh] snap:text-[length:clamp(2.1rem,min(6.6vh,3.8vw),3.9rem)]">
            Εκεί που η υψηλή γαστρονομία συναντά τη μεγαλύτερη{' '}
            <span className="accent-word">live σκηνή</span> της πόλης.
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-[1.02rem] leading-relaxed text-white/65 [animation-delay:.16s] sm:text-lg snap:mt-[2.8vh]">
            Fine dining, signature cocktails και headliners στη live σκηνή, κάθε Πέμπτη έως Κυριακή
            στην καρδιά της περιοχής FIX.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:.24s] sm:flex-row sm:items-center snap:mt-[4vh]">
            <button onClick={() => open()} className="btn-primary w-full sm:w-auto">
              Κράτηση Τραπεζιού
            </button>
            <a href="#programma" className="btn-ghost w-full sm:w-auto">
              Δείτε το Πρόγραμμα <ArrowDown className="h-4 w-4 text-accent-soft" />
            </a>
          </div>

          <div className="mt-12 flex animate-fade-up flex-col gap-5 border-t border-white/10 pt-6 [animation-delay:.32s] sm:flex-row sm:divide-x sm:divide-white/10 snap:mt-[5vh] snap:pt-[3vh]">
            <TrustItem
              icon={<MapPin className="h-4 w-4" />}
              label={venue.address}
              sub={`${venue.areaShort}, ${venue.city}`}
            />
            <TrustItem
              icon={<Clock3 className="h-4 w-4" />}
              label={`${venue.hours.openDaysShort} · Live ${venue.hours.liveStart}`}
              sub={`Ανοιχτά έως ${venue.hours.close}`}
            />
            <TrustItem
              icon={<MessageCircle className="h-4 w-4" />}
              label={venue.phones.mobile}
              sub="Κρατήσεις & WhatsApp"
              href={whatsappHref(bookingMessage())}
            />
          </div>
        </div>

        {/* photo panel, desktop only */}
        <div className="relative hidden h-full min-h-0 animate-fade-in [animation-delay:.2s] lg:block lg:aspect-[4/5] lg:h-auto snap:aspect-auto snap:h-full">
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-accent/40" />
          <div className="absolute inset-0 overflow-hidden bg-ink-card">
            {SLIDES.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt={s.label}
                fill
                priority={i === 0}
                sizes={HERO_SIZES}
                className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${
                  i === slide ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />

            <div className="absolute bottom-5 right-5 flex max-w-[60%] flex-col items-end gap-2.5 text-right">
              <p key={slide} className="animate-fade-in font-display text-[1.15rem] italic leading-snug text-white/90">
                {SLIDES[slide].label}
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                {SLIDES.map((s, i) => (
                  <span
                    key={s.image}
                    className={`h-[3px] transition-all duration-500 ${i === slide ? 'w-7 bg-white' : 'w-3 bg-white/35'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* the logo's V-and-clef mark as a stamp over the frame corner */}
          <div className="pointer-events-none absolute -bottom-6 -left-8 aspect-square w-[clamp(96px,24%,150px)] border border-white/10 bg-ink p-3 shadow-card">
            <Image src="/images/brand/logo-mark.webp" alt="" fill sizes="150px" className="object-contain p-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  label,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-accent-soft">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.9rem] font-semibold text-chalk">{label}</p>
        <p className="truncate text-[0.76rem] text-muted">{sub}</p>
      </div>
    </>
  );
  const cls = 'flex min-w-0 items-center gap-2.5 sm:px-4 sm:first:pl-0 sm:last:pr-0';
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={`${cls} transition hover:opacity-80`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
