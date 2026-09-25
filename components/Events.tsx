'use client';

import Image from 'next/image';
import { Clock3, Mic2, Ticket } from 'lucide-react';
import { events } from '@/lib/site';
import type { EventItem } from '@/lib/types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useBooking } from './BookingProvider';

export default function Events() {
  return (
    <section
      id="programma"
      aria-label="Πρόγραμμα"
      className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rule-accent" />
      <div className="page-container flex min-h-0 flex-1 flex-col snap:py-[4.5vh]">
        <SectionHeading
          className="shrink-0"
          eyebrow="Live Stage Lineup"
          title={<>Οι headliners της εβδομάδας</>}
          description="Τέσσερις βραδιές, τρία διαφορετικά shows στη σκηνή μας. Διαλέξτε βραδιά και κλείστε τραπέζι — τα τραπέζια μπροστά στη σκηνή εξαντλούνται πρώτα."
        />

        <div className="no-scrollbar -mx-4 mt-10 flex min-h-0 snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 snap:mt-[3.5vh] snap:flex-1 snap:pb-0">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const { open } = useBooking();
  const lastSeats = event.seats.startsWith('Τελευταία');

  return (
    <Reveal
      as="article"
      delay={index * 90}
      className="group relative flex w-[84vw] shrink-0 snap-start flex-col overflow-hidden card-surface shadow-card transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow sm:w-[62vw] md:w-[46vw] lg:w-auto snap:min-h-0"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden snap:aspect-auto snap:min-h-[150px] snap:flex-1">
        <Image
          src={event.image}
          alt={`${event.title} — ${event.headliners.join(' × ')}`}
          fill
          sizes="(max-width: 1024px) 84vw, 30vw"
          className="object-cover object-[center_28%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />

        <span className="absolute left-4 top-4 border border-white/25 bg-black/60 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {event.badge}
        </span>

        {/* weekly residency: the weekday(s) stand where a date would */}
        <div className="absolute right-4 top-4 flex min-h-[56px] w-[56px] flex-col items-center justify-center border border-white/20 bg-black/65 py-1.5 backdrop-blur-md">
          <span className="text-[0.52rem] font-bold uppercase tracking-[0.14em] text-accent-soft">Κάθε</span>
          {event.days.map((day) => (
            <span key={day} className="font-display text-[1rem] leading-[1.15] text-chalk">
              {day}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 pb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] backdrop-blur-md ${
              lastSeats ? 'bg-velvet text-white' : 'border border-white/25 bg-black/50 text-white/85'
            }`}
          >
            <span className={`h-1.5 w-1.5 ${lastSeats ? 'animate-pulse bg-white' : 'bg-emerald-400'}`} />
            {event.seats}
          </span>
          <p className="mt-3 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-accent-soft">
            {event.schedule}
          </p>
          <h3 className="mt-1 text-[1.45rem] leading-tight text-chalk">{event.title}</h3>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3.5 p-5 pt-3">
        <p className="flex items-start gap-2 text-[0.82rem] font-medium leading-snug text-white/80">
          <Mic2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-soft" />
          <span className="line-clamp-2">{event.headliners.join(' × ')}</span>
        </p>

        <p className="line-clamp-3 text-[0.86rem] leading-relaxed text-white/55 snap:line-clamp-2 short:hidden">
          {event.description}
        </p>

        <div>
          <dl className="grid grid-cols-3 border border-white/[0.08]">
            {event.pricing.map((tier) => (
              <div key={tier.label} className="flex flex-col justify-between gap-1 border-l border-white/[0.08] px-2.5 py-2 first:border-l-0">
                <dt className="text-[0.56rem] font-bold uppercase leading-tight tracking-[0.1em] text-muted">{tier.label}</dt>
                <dd className="font-display text-[1.05rem] leading-none text-accent-soft">{tier.price}</dd>
              </div>
            ))}
          </dl>
          {event.pricingNote && (
            <p className="mt-1.5 truncate text-[0.7rem] text-white/40 short:hidden" title={event.pricingNote}>
              {event.pricingNote}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-white/[0.07] pt-3 text-[0.76rem] text-muted">
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <Clock3 className="h-3.5 w-3.5 text-accent-soft" /> Προσέλευση {event.arrival}
            {event.liveStart && ` · Live ${event.liveStart}`}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5 shrink-0 text-accent-soft" /> <span className="truncate">{event.genre}</span>
          </span>
        </div>

        <button
          onClick={() => open(`${event.title} · ${event.schedule}`, event.id)}
          className="w-full border border-accent/50 bg-accent/[0.08] py-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-chalk transition-all duration-300 hover:border-accent hover:bg-accent hover:text-ink active:scale-[0.98]"
        >
          Κράτηση για αυτή τη βραδιά
        </button>
      </div>
    </Reveal>
  );
}
