'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { BookOpen, UtensilsCrossed } from 'lucide-react';
import { menuCategories } from '@/lib/site';
import FullMenuModal from './FullMenuModal';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

/** How many dishes the section shows per category; the rest live in the full-menu popup. */
const TEASER_COUNT = 4;

export default function MenuTeaser() {
  const [active, setActive] = useState(menuCategories[0].id);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const closeFullMenu = useCallback(() => setFullMenuOpen(false), []);
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <section id="menu" aria-label="Μενού" className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0">
      <div className="page-container relative grid min-h-0 flex-1 gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14 snap:items-center snap:py-[4.5vh]">
        <div className="flex flex-col">
          <SectionHeading
            eyebrow="Γεύσεις & Cocktails"
            title={<>Η κουζίνα μας, με άποψη</>}
            description="Ελληνικές πρώτες ύλες, σύγχρονες τεχνικές και μια λίστα ποτών φτιαγμένη για μεγάλες βραδιές."
          />

          <Reveal
            delay={80}
            className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 snap:mt-[4vh]"
            role="tablist"
            aria-label="Κατηγορίες μενού"
          >
            {menuCategories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat.id)}
                  className={`group flex shrink-0 items-center justify-between gap-6 border px-5 py-3 text-left text-[0.78rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 lg:py-3.5 ${
                    isActive
                      ? 'border-accent bg-accent/[0.12] text-chalk'
                      : 'border-white/[0.1] bg-white/[0.02] text-white/55 hover:border-white/30 hover:text-chalk'
                  }`}
                >
                  {cat.title}
                  <span className={`hidden text-[0.7rem] tabular-nums lg:inline ${isActive ? 'text-accent-soft' : 'text-white/30'}`}>
                    {String(cat.items.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={140} className="mt-6 hidden lg:block snap:mt-[3.5vh]">
            <button onClick={() => setFullMenuOpen(true)} className="btn-ghost">
              <BookOpen className="h-4 w-4 text-accent-soft" /> Δείτε όλο το μενού
            </button>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <div key={category.id} className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {category.items.slice(0, TEASER_COUNT).map((item, i) => (
              <Reveal
                as="article"
                key={item.name}
                delay={i * 60}
                className="group flex items-stretch gap-4 card-surface p-4 transition-colors duration-300 hover:border-accent/35 sm:p-5"
              >
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-white/[0.04] ring-1 ring-white/[0.07] sm:h-24 sm:w-24">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-white/20">
                      <UtensilsCrossed className="h-6 w-6" />
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[1.08rem] leading-snug text-chalk">{item.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[0.84rem] leading-relaxed text-white/50">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    {item.tag ? (
                      <span className="border border-accent/35 bg-accent/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-accent-soft">
                        {item.tag}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="font-display text-[1.15rem] text-accent-soft">{item.price}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <button onClick={() => setFullMenuOpen(true)} className="btn-ghost w-full sm:w-auto lg:hidden">
              <BookOpen className="h-4 w-4 text-accent-soft" /> Δείτε όλο το μενού
            </button>
            <p className="text-center text-xs text-white/30 lg:ml-auto">
              {category.items.length > TEASER_COUNT && `+${category.items.length - TEASER_COUNT} ακόμη στον κατάλογο · `}
              Ενδεικτικές τιμές — demo κατάλογος.
            </p>
          </div>
        </div>
      </div>

      <FullMenuModal isOpen={fullMenuOpen} onClose={closeFullMenu} />
    </section>
  );
}
