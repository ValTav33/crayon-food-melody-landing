'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Download, UtensilsCrossed } from 'lucide-react';
import { menuCategories } from '@/lib/site';
import SectionHeading from './SectionHeading';

export default function MenuTeaser() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <section id="menu" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-gold/[0.07] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Γεύσεις & Cocktails"
          title={<>Η κουζίνα μας, με άποψη</>}
          description="Ελληνικές πρώτες ύλες, σύγχρονες τεχνικές και μια λίστα ποτών φτιαγμένη για μεγάλες βραδιές."
        />

        <div className="no-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1">
          {menuCategories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.88rem] font-semibold transition-all duration-300 ${
                  isActive
                    ? 'border-gold/50 bg-gold/[0.12] text-gold shadow-glow-sm'
                    : 'border-white/[0.08] bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-chalk'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        <div key={category.id} className="mt-8 grid animate-fade-in gap-3.5 sm:grid-cols-2">
          {category.items.map((item, i) => (
            <article
              key={item.name}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group flex animate-fade-up items-start gap-4 rounded-2xl card-surface p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-white/[0.03] sm:p-5"
            >
              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] sm:h-20 sm:w-20">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-white/20">
                    <UtensilsCrossed className="h-6 w-6" />
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.02rem] leading-snug text-chalk">{item.name}</h3>
                  <span className="shrink-0 font-display text-[1.05rem] text-gold">{item.price}</span>
                </div>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/50">{item.description}</p>
                {item.tag && (
                  <span className="mt-2.5 inline-block rounded-full border border-coral/30 bg-coral/[0.10] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-coral">
                    {item.tag}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="#" onClick={(e) => e.preventDefault()} className="btn-ghost w-full sm:w-auto">
            <Download className="h-4 w-4 text-gold" /> Κατεβάστε τον πλήρη κατάλογο (PDF)
          </a>
          <p className="text-center text-xs text-white/30">Ενδεικτικές τιμές — demo κατάλογος.</p>
        </div>
      </div>
    </section>
  );
}
