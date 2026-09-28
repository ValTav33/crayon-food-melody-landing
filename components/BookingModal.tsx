'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, Phone, StickyNote, User, Users, X } from 'lucide-react';
import { events, venue } from '@/lib/site';
import { useModal } from '@/lib/useModal';

type Props = { isOpen: boolean; occasion?: string; eventId?: string; onClose: () => void };

const PARTY_SIZES = ['2', '3', '4', '5', '6', '7', '8+'];

// 16px: iOS zooms the whole page into any field set smaller than that
const INPUT = 'w-full bg-transparent text-base text-chalk outline-none placeholder:text-white/25';

/** Today in the guest's own timezone as yyyy-mm-dd: the earliest night the picker offers. */
function today() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function BookingModal({ isOpen, occasion, eventId, onClose }: Props) {
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState('4');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useModal(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    // With a mouse, start typing straight away. On touch screens focus the sheet itself:
    // focusing a field there throws the keyboard up over the form before it's been read.
    const t = window.setTimeout(() => {
      const target = window.matchMedia('(pointer: fine)').matches ? firstFieldRef.current : dialogRef.current;
      target?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setSent(false), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const event = events.find((e) => e.id === eventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    dialogRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Φόρμα κράτησης"
    >
      <button
        aria-label="Κλείσιμο"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-sm animate-fade-in"
      />

      {/* phones: a bottom sheet rising from the edge; sm+: a centred card */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 max-h-[92svh] w-full scroll-pb-28 overflow-y-auto overscroll-contain border border-white/10 bg-ink-card shadow-card outline-none animate-sheet-up sm:max-h-[90svh] sm:w-[min(560px,92vw)] sm:animate-scale-in"
      >
        {/* pinned to the sheet's corner, so closing never means scrolling back up */}
        <div className="sticky top-0 z-20 flex h-0 justify-end">
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="mr-3 mt-3 flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 bg-black/60 text-white/85 backdrop-blur-md transition hover:bg-black/80 active:scale-95"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* the brand banner at its native proportions: wordmark and both gold swirls stay in frame */}
        <div className="relative aspect-[1600/679] w-full overflow-hidden">
          <Image
            src="/images/brand/banner.webp"
            alt={venue.name}
            fill
            sizes="(max-width: 640px) 100vw, 560px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-card to-transparent" />
        </div>

        <div className="border-b border-white/[0.07] px-6 pb-5 pt-3 sm:px-8">
          <p className="eyebrow">Κράτηση τραπεζιού</p>
          <h3 className="mt-2 text-2xl font-medium text-chalk sm:text-[1.75rem]">
            {event?.title ?? occasion ?? 'Κλείστε το τραπέζι σας'}
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            {event
              ? `${event.schedule} · Προσέλευση ${event.arrival}${event.liveStart ? ` · Live ${event.liveStart}` : ''}`
              : `${venue.hours.openDays} · Live stage από ${venue.hours.liveStart}`}
          </p>
          {event && (
            <>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-white/60">{event.description}</p>
              <dl className="mt-4 grid grid-cols-3 border border-white/[0.08]">
                {event.pricing.map((tier) => (
                  <div key={tier.label} className="flex flex-col justify-between gap-1 border-l border-white/[0.08] px-3 py-2.5 first:border-l-0">
                    <dt className="text-[0.58rem] font-bold uppercase leading-tight tracking-[0.1em] text-muted">{tier.label}</dt>
                    <dd className="font-display text-[1.15rem] leading-none text-accent-soft">{tier.price}</dd>
                  </div>
                ))}
              </dl>
              {event.pricingNote && <p className="mt-2 text-[0.74rem] text-white/40">{event.pricingNote}</p>}
            </>
          )}
        </div>

        {sent ? (
          <div className="px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-12 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent/40 bg-accent/15 text-accent-soft">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="mt-6 text-2xl font-medium text-chalk">Το αίτημά σας καταχωρήθηκε</h4>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Θα επικοινωνήσουμε τηλεφωνικά για επιβεβαίωση. Για άμεση κράτηση καλέστε στο{' '}
              <span className="whitespace-nowrap text-chalk">{venue.phones.landline}</span> ή γράψτε μας στο{' '}
              <a href={`mailto:${venue.emails.reservations}`} className="text-chalk underline-offset-4 hover:underline">
                {venue.emails.reservations}
              </a>
              .
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href={`tel:${venue.phoneLinks.landline}`} className="btn-primary">
                <Phone className="h-4 w-4" /> Κλήση τώρα
              </a>
              <button onClick={onClose} className="btn-ghost">
                Κλείσιμο
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative px-6 pt-6 sm:px-8">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Όνομα" icon={<User className="h-4 w-4" />}>
                <input
                  ref={firstFieldRef}
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Το όνομά σας"
                  className={INPUT}
                />
              </Field>
              <Field label="Τηλέφωνο" icon={<Phone className="h-4 w-4" />}>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="69XX XXX XXX"
                  className={INPUT}
                />
              </Field>
              <Field label="Ημερομηνία" icon={<CalendarDays className="h-4 w-4" />} className="sm:col-span-2">
                <input
                  required
                  type="date"
                  min={today()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${INPUT} min-h-6 [color-scheme:dark]`}
                />
              </Field>

              <div
                role="group"
                aria-labelledby="party-size-label"
                className="border border-white/[0.1] bg-white/[0.03] px-4 py-3 sm:col-span-2"
              >
                <span
                  id="party-size-label"
                  className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted"
                >
                  <Users className="h-4 w-4" /> Άτομα
                </span>
                {/* seven equal cells: one row at every width, «8+» never wraps on its own */}
                <div className="mt-2.5 grid grid-cols-7 gap-1">
                  {PARTY_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setParty(size)}
                      aria-pressed={party === size}
                      aria-label={`${size} άτομα`}
                      className={`h-11 text-[0.95rem] font-semibold tabular-nums transition active:scale-95 ${
                        party === size
                          ? 'bg-accent text-ink'
                          : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-chalk'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Σημειώσεις" icon={<StickyNote className="h-4 w-4" />} className="sm:col-span-2">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Γενέθλια, τραπέζι κοντά στη σκηνή, αλλεργίες…"
                  className={`${INPUT} resize-none`}
                />
              </Field>
            </div>

            {/* stays within thumb reach at the foot of the sheet while the fields scroll under it */}
            <div className="sticky bottom-0 z-10 -mx-6 mt-1 bg-gradient-to-t from-ink-card from-75% to-ink-card/0 px-6 pb-4 pt-5 sm:-mx-8 sm:px-8">
              <button type="submit" className="btn-primary w-full">
                Αποστολή αιτήματος
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-white/25">
              <span className="h-px flex-1 bg-white/10" /> ή άμεσα <span className="h-px flex-1 bg-white/10" />
            </div>

            <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost w-full">
              <Phone className="h-4 w-4 text-accent-soft" /> {venue.phones.landline}
            </a>
            <p className="pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4 text-center text-xs text-white/30">
              Demo φόρμα — δεν αποστέλλονται πραγματικά δεδομένα.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  className = '',
  children,
}: {
  label: string;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`block border border-white/[0.1] bg-white/[0.03] px-4 py-3 transition focus-within:border-accent/60 focus-within:bg-white/[0.05] ${className}`}
    >
      <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {icon} {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
