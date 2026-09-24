'use client';

import { useRef } from 'react';
import { X } from 'lucide-react';
import { menuCategories } from '@/lib/site';
import { useModal } from '@/lib/useModal';
import { useBooking } from './BookingProvider';

export default function FullMenuModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { open: openBooking } = useBooking();
  const scrollRef = useRef<HTMLDivElement>(null);
  useModal(isOpen, onClose);

  if (!isOpen) return null;

  const jumpTo = (id: string) => {
    const scroller = scrollRef.current;
    const target = scroller?.querySelector<HTMLElement>(`[data-category="${id}"]`);
    if (scroller && target) scroller.scrollTo({ top: target.offsetTop - 8, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Ο κατάλογός μας"
    >
      <button
        aria-label="Κλείσιμο"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative z-10 flex max-h-[94svh] w-full flex-col border border-white/10 bg-ink-card shadow-card animate-scale-in sm:max-h-[88vh] sm:w-[min(860px,94vw)]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.08] px-6 pb-4 pt-6 sm:px-8">
          <div>
            <p className="eyebrow">Κατάλογος</p>
            <h3 className="mt-2 text-[1.9rem] leading-tight text-chalk">Όλο το μενού</h3>
          </div>
          <button onClick={onClose} aria-label="Κλείσιμο" className="icon-btn p-2.5" autoFocus>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto border-b border-white/[0.08] px-6 py-3 sm:px-8">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => jumpTo(cat.id)}
              className="shrink-0 border border-white/15 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/70 transition hover:border-accent hover:text-chalk"
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {menuCategories.map((cat) => (
            <section key={cat.id} data-category={cat.id} className="mb-9 last:mb-2">
              <h4 className="flex items-center gap-3 text-[1.35rem] text-chalk">
                {cat.title}
                <span className="h-px flex-1 bg-white/10" />
              </h4>
              <ul className="mt-4 grid gap-x-10 gap-y-5 md:grid-cols-2">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-[1.08rem] leading-snug text-chalk">{item.name}</span>
                      <span className="mb-1 h-px min-w-6 flex-1 border-b border-dotted border-white/20" />
                      <span className="shrink-0 font-display text-[1.08rem] text-accent-soft">{item.price}</span>
                    </div>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-white/50">{item.description}</p>
                    {item.tag && (
                      <span className="mt-2 inline-block border border-accent/35 bg-accent/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-accent-soft">
                        {item.tag}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 border-t border-white/[0.08] px-6 py-4 sm:flex-row sm:justify-between sm:px-8">
          <p className="text-xs text-white/35">Ενδεικτικές τιμές — demo κατάλογος.</p>
          <button
            onClick={() => {
              onClose();
              openBooking('Κράτηση τραπεζιού');
            }}
            className="btn-primary w-full py-3 sm:w-auto"
          >
            Κράτηση τραπεζιού
          </button>
        </div>
      </div>
    </div>
  );
}
