'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock3, Mic2, Ticket } from 'lucide-react';
import { events } from '@/lib/site';
import type { EventItem } from '@/lib/types';
import SectionHeading from './SectionHeading';
import { useBooking } from './BookingProvider';

export default function Events() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * (rail.clientWidth * 0.82), behavior: 'smooth' });
  };

  return (
    <section id="programma" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rule-gold" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Το πρόγραμμα"
            title={<>Ζωντανές Βραδιές</>}
            description="Κάθε εβδομάδα ανεβαίνει διαφορετικό σχήμα στη σκηνή μας. Διαλέξτε βραδιά και κλείστε τραπέζι — τα τραπέζια μπροστά στη σκηνή εξαντλούνται πρώτα."
          />
          <div className="hidden gap-2 lg:flex">
            <RailButton onClick={() => scrollBy(-1)} aria-label="Προηγούμενα">
              <ChevronLeft className="h-5 w-5" />
            </RailButton>
            <RailButton onClick={() => scrollBy(1)} aria-label="Επόμενα">
              <ChevronRight className="h-5 w-5" />
            </RailButton>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
        >
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RailButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/70 transition hover:border-gold/40 hover:text-gold"
    >
      {children}
    </button>
  );
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const { open } = useBooking();

  return (
    <article
      style={{ animationDelay: `${index * 90}ms` }}
      className="group relative w-[84vw] shrink-0 snap-start animate-fade-up overflow-hidden rounded-[26px] card-surface shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-glow sm:w-[62vw] md:w-[46vw] lg:w-auto"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={event.image}
          alt={`${event.title} — ${event.artists.join(', ')}`}
          fill
          sizes="(max-width: 1024px) 84vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/25 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-md">
          {event.badge}
        </span>

        <div className="absolute right-4 top-4 flex h-[58px] w-[58px] flex-col items-center justify-center rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md">
          <span className="font-display text-[1.3rem] leading-none text-chalk">
            {event.dateShort.split('/')[0]}
          </span>
          <span className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-gold">
            {monthLabel(event.dateShort)}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold/90">
            {event.dateDisplay}
          </p>
          <h3 className="mt-1.5 text-[1.5rem] leading-tight text-chalk">{event.title}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5 pt-4">
        <p className="text-[0.9rem] leading-relaxed text-white/55">{event.subtitle}</p>

        <div className="flex flex-wrap gap-1.5">
          {event.artists.map((artist) => (
            <span
              key={artist}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[0.74rem] font-medium text-white/75"
            >
              <Mic2 className="h-3 w-3 text-coral" />
              {artist}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-white/[0.07] pt-4 text-[0.78rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-gold" /> Έναρξη {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5 text-gold" /> {event.genre}
          </span>
        </div>

        <button
          onClick={() => open(`${event.title} · ${event.dateDisplay}`)}
          className="w-full rounded-full border border-gold/30 bg-gold/[0.07] py-3 text-[0.9rem] font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-black active:scale-[0.98]"
        >
          Κράτηση για αυτή τη βραδιά
        </button>
      </div>
    </article>
  );
}

const MONTHS: Record<string, string> = {
  '01': 'ΙΑΝ', '02': 'ΦΕΒ', '03': 'ΜΑΡ', '04': 'ΑΠΡ', '05': 'ΜΑΪ', '06': 'ΙΟΥΝ',
  '07': 'ΙΟΥΛ', '08': 'ΑΥΓ', '09': 'ΣΕΠ', '10': 'ΟΚΤ', '11': 'ΝΟΕ', '12': 'ΔΕΚ',
};

function monthLabel(dateShort: string) {
  return MONTHS[dateShort.split('/')[1]] ?? '';
}
