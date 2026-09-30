'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, Phone, StickyNote, User, Users, X } from 'lucide-react';
import { events, toWeekdays, venue, viberHref } from '@/lib/site';
import { useModal } from '@/lib/useModal';
import { Viber } from './BrandIcons';

type Props = { isOpen: boolean; occasion?: string; eventId?: string; onClose: () => void };

// eight options: a 4×2 grid of thumb-sized targets at every width
const PARTY_SIZES = ['2', '3', '4', '5', '6', '7', '8', '9+'];
/** Upcoming nights offered as one-tap chips; «Άλλη ημερομηνία» covers anything later. */
const NIGHT_CHIPS = 8;

// 16px: iOS zooms the whole page into any field set smaller than that
const INPUT = 'w-full bg-transparent text-base text-chalk outline-none placeholder:text-white/25';
const LABEL = 'flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted';

const WEEKDAY = new Intl.DateTimeFormat('el-GR', { weekday: 'short' });
const WEEKDAY_LONG = new Intl.DateTimeFormat('el-GR', { weekday: 'long' });

/** yyyy-mm-dd of a local calendar date (toISOString would give the UTC one). */
function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Local midnight of a yyyy-mm-dd string; `new Date('yyyy-mm-dd')` would read it as UTC. */
function parseISODate(value: string) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** The next `count` nights, today included, that fall on one of `weekdays` (0 = Sunday). */
function upcomingNights(weekdays: number[], count: number) {
  const nights: Date[] = [];
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  for (let i = 0; i < 366 && nights.length < count; i++) {
    if (weekdays.includes(day.getDay())) nights.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return nights;
}

export default function BookingModal({ isOpen, occasion, eventId, onClose }: Props) {
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState('4');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [otherDate, setOtherDate] = useState(false);
  const [notes, setNotes] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useModal(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;
    // Focus the sheet, not a field: on touch screens a focused field throws the keyboard up
    // over the form before it's been read (and the first control is a tap, not typing).
    const t = window.setTimeout(() => dialogRef.current?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => {
        setSent(false);
        setOtherDate(false);
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const event = events.find((e) => e.id === eventId);
  // an event books only its own nights; otherwise any night the venue is open
  const weekdays = toWeekdays(event?.days ?? venue.hours.bookingDays);
  const nights = upcomingNights(weekdays, NIGHT_CHIPS);
  const todayISO = toISODate(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = toISODate(tomorrow);
  // 1 Jan 2023 was a Sunday, so +n lands on weekday n
  const nightNames = weekdays.map((n) => WEEKDAY.format(new Date(2023, 0, 1 + n))).join(', ');

  /** Why `value` can't be booked in this sheet, or '' when it can. */
  const dateError = (value: string) => {
    if (!value) return '';
    if (value < todayISO) return 'Η ημερομηνία έχει περάσει';
    return weekdays.includes(parseISODate(value).getDay()) ? '' : `Διαθέσιμες βραδιές: ${nightNames}`;
  };
  // Stale picks (another event's night) match no chip and fail the date field's check, so
  // they're never sent; only a valid date reaches the success summary.
  const chosen = date && !dateError(date) ? parseISODate(date) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    bodyRef.current?.scrollTo({ top: 0 });
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

      {/* phones: a bottom sheet rising from the edge; sm+: a centred card. Only the body
          scrolls: the send button lives in the footer, on screen from the moment it opens. */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 flex max-h-[92svh] w-full flex-col border border-white/10 bg-ink-card shadow-card outline-none animate-sheet-up sm:max-h-[90svh] sm:w-[min(560px,92vw)] sm:animate-scale-in"
      >
        <button
          onClick={onClose}
          aria-label="Κλείσιμο"
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/60 text-white/85 backdrop-blur-md transition hover:bg-black/80 active:scale-95"
        >
          <X className="h-[18px] w-[18px]" />
        </button>

        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* the brand banner at its native proportions, only where there's height to spare */}
          <div className="relative hidden aspect-[1600/679] w-full overflow-hidden tall:block">
            <Image
              src="/images/brand/banner.webp"
              alt={venue.name}
              fill
              sizes="560px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-card to-transparent" />
          </div>

          {/* pr-12 keeps the title clear of the close button when there's no banner above it */}
          <div className="border-b border-white/[0.07] px-4 pb-4 pt-5 sm:px-8 tall:pt-3">
            <p className="eyebrow">Κράτηση τραπεζιού</p>
            <h3 className="mt-2 pr-12 text-2xl font-medium text-chalk sm:text-[1.75rem] tall:pr-0">
              {event?.title ?? occasion ?? 'Κλείστε το τραπέζι σας'}
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              {event
                ? `${event.schedule} · Προσέλευση ${event.arrival}${event.liveStart ? ` · Live ${event.liveStart}` : ''}`
                : `${venue.hours.openDays} · Live stage από ${venue.hours.liveStart}`}
            </p>
            {event && (
              <>
                {/* the card already shows the start of it; phones go straight to the prices */}
                <p className="mt-3 hidden text-[0.88rem] leading-relaxed text-white/60 tall:block">{event.description}</p>
                <dl className="mt-3 grid grid-cols-3 border border-white/[0.08]">
                  {event.pricing.map((tier) => (
                    <div key={tier.label} className="flex flex-col justify-between gap-1 border-l border-white/[0.08] px-3 py-2.5 first:border-l-0">
                      <dt className="text-[0.64rem] font-bold uppercase leading-tight tracking-[0.08em] text-muted">{tier.label}</dt>
                      <dd className="font-display text-[1.15rem] leading-none text-accent-soft">{tier.price}</dd>
                    </div>
                  ))}
                </dl>
                {event.pricingNote && <p className="mt-2 text-[0.74rem] text-white/45">{event.pricingNote}</p>}
              </>
            )}
          </div>

          {sent ? (
            <div className="px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-12 text-center sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent/40 bg-accent/15 text-accent-soft">
                <Check className="h-8 w-8" />
              </div>
              <h4 className="mt-6 text-2xl font-medium text-chalk">Το αίτημά σας καταχωρήθηκε</h4>
              {chosen && (
                <p className="mt-2 text-[0.95rem] font-semibold text-accent-soft">
                  {WEEKDAY_LONG.format(chosen)} {chosen.getDate()}/{chosen.getMonth() + 1} · {party} άτομα
                </p>
              )}
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
            <form id="booking-form" onSubmit={handleSubmit} className="px-4 pt-5 sm:px-8">
              {/* the two taps first, then the typing */}
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="border border-white/[0.1] bg-white/[0.03] px-3 py-3 sm:col-span-2 sm:px-4">
                  <span id="booking-night-label" className={LABEL}>
                    <CalendarDays className="h-4 w-4" /> Ημερομηνία
                  </span>
                  {/* only nights with a show: Mon–Wed, or another event's night, can't be picked */}
                  <div role="radiogroup" aria-labelledby="booking-night-label" className="mt-2.5 grid grid-cols-4 gap-1.5">
                    {nights.map((night) => {
                      const iso = toISODate(night);
                      const day = iso === todayISO ? 'Απόψε' : iso === tomorrowISO ? 'Αύριο' : WEEKDAY.format(night);
                      return (
                        <label key={iso} className="relative">
                          <input
                            type="radio"
                            name="night"
                            value={iso}
                            required={!otherDate}
                            checked={date === iso}
                            onChange={() => {
                              setDate(iso);
                              setOtherDate(false);
                            }}
                            aria-label={`${WEEKDAY_LONG.format(night)} ${night.getDate()}/${night.getMonth() + 1}`}
                            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
                          />
                          <span className="flex h-14 flex-col items-center justify-center bg-white/[0.06] leading-tight text-white/75 transition peer-hover:bg-white/[0.12] peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-soft peer-active:scale-95">
                            <span className="text-[0.82rem] font-semibold">{day}</span>
                            <span className="mt-0.5 text-[0.72rem] tabular-nums opacity-70">
                              {night.getDate()}/{night.getMonth() + 1}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {otherDate ? (
                    <label className="mt-2 flex min-h-12 items-center gap-3 border border-white/[0.1] px-3 focus-within:border-accent/60">
                      <span className="shrink-0 text-[0.8rem] text-muted">Άλλη:</span>
                      <input
                        required
                        type="date"
                        min={todayISO}
                        value={date}
                        // re-checked on every render, so switching events can't leave a stale pass
                        ref={(el) => el?.setCustomValidity(dateError(date))}
                        onChange={(e) => {
                          setDate(e.target.value);
                          e.target.setCustomValidity(dateError(e.target.value));
                          if (dateError(e.target.value)) e.target.reportValidity();
                        }}
                        className={`${INPUT} min-h-6 [color-scheme:dark]`}
                      />
                    </label>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOtherDate(true)}
                      className="mt-1 flex min-h-11 items-center text-[0.82rem] font-semibold text-accent-soft underline-offset-4 hover:underline active:underline"
                    >
                      Άλλη ημερομηνία…
                    </button>
                  )}
                </div>

                <div
                  role="group"
                  aria-labelledby="party-size-label"
                  className="border border-white/[0.1] bg-white/[0.03] px-3 py-3 sm:col-span-2 sm:px-4"
                >
                  <span id="party-size-label" className={LABEL}>
                    <Users className="h-4 w-4" /> Άτομα
                  </span>
                  <div className="mt-2.5 grid grid-cols-4 gap-1.5">
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

                <Field label="Όνομα" icon={<User className="h-4 w-4" />}>
                  <input
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

              <div className="my-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-white/25">
                <span className="h-px flex-1 bg-white/10" /> ή άμεσα <span className="h-px flex-1 bg-white/10" />
              </div>

              {/* Viber on phones and tablets only: it has no web version, so on a desktop
                  without the app the button would do nothing */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <a
                  href={`tel:${venue.phoneLinks.landline}`}
                  aria-label={`Κλήση ${venue.phones.landline}`}
                  className="btn-ghost w-full px-3"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-soft" />
                  <span className="sm:hidden">Κλήση</span>
                  <span className="hidden sm:inline">{venue.phones.landline}</span>
                </a>
                <a href={viberHref} aria-label={`Viber ${venue.phones.mobile}`} className="btn-viber w-full px-3 lg:hidden">
                  <Viber className="h-[18px] w-[18px] shrink-0" /> Viber
                </a>
              </div>
              <p className="pb-5 pt-4 text-center text-xs text-white/30">
                Demo φόρμα — δεν αποστέλλονται πραγματικά δεδομένα.
              </p>
            </form>
          )}
        </div>

        {!sent && (
          <div className="shrink-0 border-t border-white/[0.07] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-5 sm:pt-4">
            <button type="submit" form="booking-form" className="btn-primary w-full">
              Αποστολή αιτήματος
            </button>
          </div>
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
      <span className={LABEL}>
        {icon} {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
