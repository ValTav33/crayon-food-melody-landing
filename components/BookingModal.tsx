'use client';

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
import { venue } from '@/lib/site';

type Props = { isOpen: boolean; occasion?: string; onClose: () => void };

const PARTY_SIZES = ['2', '3', '4', '5', '6', '7', '8+'];

export default function BookingModal({ isOpen, occasion, onClose }: Props) {
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState('4');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 120);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      window.clearTimeout(t);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setSent(false), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const waText = encodeURIComponent(
    `Γεια σας! Θα ήθελα κράτηση στο Crayon Food & Melody${occasion ? ` για «${occasion}»` : ''}.`,
  );

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
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-ink-card/95 shadow-card backdrop-blur-xl animate-scale-in sm:max-h-[90vh] sm:w-[min(560px,92vw)] sm:rounded-[28px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(245,158,11,0.18),transparent_70%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.07] px-6 pb-5 pt-6 sm:px-8">
          <div>
            <p className="eyebrow">Κράτηση τραπεζιού</p>
            <h3 className="mt-2 text-2xl font-medium text-chalk sm:text-[1.75rem]">
              {occasion ? occasion : 'Κλείστε το τραπέζι σας'}
            </h3>
            <p className="mt-1.5 text-sm text-muted">
              {venue.operatingHours} · Έναρξη προγράμματος 21:30
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Κλείσιμο"
            className="rounded-full border border-white/10 bg-white/[0.05] p-2 text-muted transition hover:text-chalk"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="mt-6 text-2xl font-medium text-chalk">Το αίτημά σας καταχωρήθηκε</h4>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Θα επικοινωνήσουμε τηλεφωνικά για επιβεβαίωση. Για άμεση κράτηση καλέστε στο{' '}
              <span className="text-chalk">{venue.phones.landline}</span>.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href={`tel:${venue.phoneLinks.landline}`} className="btn-gold">
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
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  <Users className="h-4 w-4" /> Άτομα
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PARTY_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setParty(size)}
                      className={`h-8 min-w-8 rounded-lg px-2 text-sm font-semibold transition ${
                        party === size
                          ? 'bg-gold text-black'
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

            <button type="submit" className="btn-gold mt-5 w-full">
              Αποστολή αιτήματος κράτησης
            </button>

            <div className="my-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-white/25">
              <span className="h-px flex-1 bg-white/10" /> ή άμεσα <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost w-full">
                <Phone className="h-4 w-4 text-gold" /> {venue.phones.landline}
              </a>
              <a
                href={`https://wa.me/${venue.phoneLinks.mobile.replace('+', '')}?text=${waText}`}
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
    <label className="block rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition focus-within:border-gold/45 focus-within:bg-white/[0.05]">
      <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {icon} {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
