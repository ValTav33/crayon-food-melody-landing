'use client';

import Image from 'next/image';
import { ArrowDown, Clock3, MapPin, Sparkles, Star } from 'lucide-react';
import { venue } from '@/lib/site';
import { useBooking } from './BookingProvider';

export default function Hero() {
  const { open } = useBooking();

  return (
    <section id="top" className="grain relative isolate overflow-hidden pt-[68px] sm:pt-[76px]">
      {/* ambient venue backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/brand/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover opacity-[0.22] blur-[6px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(10,10,10,0.35),rgba(10,10,10,0.92)_62%,#0a0a0a_100%)]" />
        <div className="absolute -left-24 top-24 h-[28rem] w-[28rem] animate-pulse-glow rounded-full bg-gold/15 blur-[130px]" />
        <div className="absolute -right-20 top-52 h-[24rem] w-[24rem] animate-pulse-glow rounded-full bg-coral/15 blur-[130px] [animation-delay:2s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.08] px-4 py-2 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold sm:text-[0.72rem] sm:tracking-[0.26em]">
              Νέα σεζόν · Live κάθε Παρασκευή & Σάββατο
            </span>
          </div>

          <h1 className="mt-7 animate-fade-up text-[2.6rem] font-normal leading-[1.06] tracking-tight text-chalk [animation-delay:.08s] sm:text-6xl lg:text-[4.6rem]">
            Εκεί που η γεύση
            <br />
            συναντά τη <span className="text-gradient-gold">μελωδία</span>.
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-[1.02rem] leading-relaxed text-white/65 [animation-delay:.16s] sm:text-lg">
            Ζωντανή ελληνική μουσική, προσεγμένες γεύσεις και μοναδική ατμόσφαιρα κάθε Παρασκευή &
            Σάββατο στον Εύοσμο.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:.24s] sm:flex-row sm:items-center">
            <button onClick={() => open()} className="btn-gold w-full sm:w-auto">
              Κράτηση Τραπεζιού
            </button>
            <a href="#programma" className="btn-ghost w-full sm:w-auto">
              Δείτε το Πρόγραμμα <ArrowDown className="h-4 w-4 text-gold" />
            </a>
          </div>

          <dl className="mt-12 grid animate-fade-up grid-cols-1 gap-3 [animation-delay:.32s] sm:mt-14 sm:max-w-2xl sm:grid-cols-3">
            <TrustItem icon={<MapPin className="h-4 w-4" />} label="Αντώνη Τρίτση 94" sub="Εύοσμος, Θεσσαλονίκη" />
            <TrustItem icon={<Clock3 className="h-4 w-4" />} label="Έναρξη 21:30" sub="Πόρτες 21:00" />
            <TrustItem
              icon={<Star className="h-4 w-4 fill-gold text-gold" />}
              label={`${venue.rating.score} στο Google`}
              sub={`${venue.rating.count} αξιολογήσεις`}
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/20">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="truncate text-[0.92rem] font-semibold text-chalk">{label}</dt>
        <dd className="truncate text-[0.78rem] text-muted">{sub}</dd>
      </div>
    </div>
  );
}
