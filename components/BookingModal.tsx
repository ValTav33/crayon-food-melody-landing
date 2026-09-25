'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  CalendarDays,
  Check,
  MessageCircle,
  Phone,
  StickyNote,
  User,
  Users,
  X,
} from 'lucide-react';
import { bookingMessage, events, venue, whatsappHref } from '@/lib/site';
import { useModal } from '@/lib/useModal';

type Props = { isOpen: boolean; occasion?: string; eventId?: string; onClose: () => void };

const PARTY_SIZES = ['2', '3', '4', '5', '6', '7', '8+'];

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
    const t = window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setSent(false), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const waMessage = bookingMessage(occasion);
  const event = events.find((e) => e.id === eventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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

      <div
        ref={dialogRef}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto border border-white/10 bg-ink-card shadow-card animate-scale-in sm:max-h-[90vh] sm:w-[min(560px,92vw)]"
      >
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
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="absolute right-3 top-3 border border-white/25 bg-black/55 p-2 text-white/85 backdrop-blur-md transition hover:bg-black/75"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-white/[0.07] px-6 pb-5 pt-3 sm:px-8">
          <div>
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
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent/40 bg-accent/15 text-accent-soft">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="mt-6 text-2xl font-medium text-chalk">Το αίτημά σας καταχωρήθηκε</h4>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Θα επικοινωνήσουμε τηλεφωνικά για επιβεβαίωση. Για άμεση κράτηση καλέστε στο{' '}
              <span className="text-chalk">{venue.phones.landline}</span> ή γράψτε μας στο{' '}
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
          <form onSubmit={handleSubmit} className="relative px-6 pb-8 pt-6 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Όνομα" icon={<User className="h-4 w-4" />}>
                <input
                  ref={firstFieldRef}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Το όνομά σας"
                  className="w-full bg-transparent text-[0.95rem] text-chalk outline-none placeholder:text-white/25"
                />
              </Field>
              <Field label="Τηλέφωνο" icon={<Phone className="h-4 w-4" />}>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="69XX XXX XXX"
                  className="w-full bg-transparent text-[0.95rem] text-chalk outline-none placeholder:text-white/25"
                />
              </Field>
              <Field label="Ημερομηνία" icon={<CalendarDays className="h-4 w-4" />}>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-[0.95rem] text-chalk outline-none [color-scheme:dark]"
                />
              </Field>
              <div className="border border-white/[0.1] bg-white/[0.03] px-4 py-3">
                <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  <Users className="h-4 w-4" /> Άτομα
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PARTY_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setParty(size)}
                      className={`h-8 min-w-8 px-2 text-sm font-semibold transition ${
                        party === size
                          ? 'bg-accent text-ink'
                          : 'bg-white/[0.06] text-muted hover:bg-white/[0.12] hover:text-chalk'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Field label="Σημειώσεις" icon={<StickyNote className="h-4 w-4" />}>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Γενέθλια, τραπέζι κοντά στη σκηνή, αλλεργίες…"
                  className="w-full resize-none bg-transparent text-[0.95rem] text-chalk outline-none placeholder:text-white/25"
                />
              </Field>
            </div>

            <button type="submit" className="btn-primary mt-5 w-full">
              Αποστολή αιτήματος κράτησης
            </button>

            <div className="my-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-white/25">
              <span className="h-px flex-1 bg-white/10" /> ή άμεσα <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost w-full">
                <Phone className="h-4 w-4 text-accent-soft" /> {venue.phones.landline}
              </a>
              <a
                href={whatsappHref(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost w-full"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-white/30">
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
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block border border-white/[0.1] bg-white/[0.03] px-4 py-3 transition focus-within:border-accent/60 focus-within:bg-white/[0.05]">
      <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {icon} {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
