'use client';

import { Phone } from 'lucide-react';
import { venue } from '@/lib/site';
import { useBooking } from './BookingProvider';

export default function CtaBand() {
  const { open } = useBooking();

  return (
    <section className="relative overflow-hidden py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] border border-gold/20 bg-gradient-to-br from-[#1a1206] via-[#141414] to-[#160d10] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-gold/15 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-coral/15 blur-[110px]" />

          <p className="eyebrow">Παρασκευή & Σάββατο</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[2rem] font-normal leading-[1.14] text-chalk sm:text-[2.8rem]">
            Κλείστε το τραπέζι σας πριν <span className="text-gradient-gold">εξαντληθούν</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-white/60">
            Τα τραπέζια μπροστά στη σκηνή είναι περιορισμένα και κλείνουν από νωρίς μέσα στην εβδομάδα.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => open()} className="btn-gold w-full sm:w-auto">
              Κράτηση Τραπεζιού
            </button>
            <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost w-full sm:w-auto">
              <Phone className="h-4 w-4 text-gold" /> {venue.phones.landline}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
