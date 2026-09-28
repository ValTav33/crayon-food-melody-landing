'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { venue } from '@/lib/site';
import { useBooking } from './BookingProvider';

/**
 * Floating bar on phones once the hero's own CTAs have scrolled away. Two 48px targets:
 * a square call button and the booking CTA taking the rest of the width, so the full
 * «Κράτηση τραπεζιού» label fits even at 320px.
 */
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="flex gap-2 border border-white/10 bg-ink/90 p-2 shadow-card backdrop-blur-xl">
        <a
          href={`tel:${venue.phoneLinks.landline}`}
          aria-label={`Κλήση ${venue.phones.landline}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-white/[0.05] text-accent-soft transition active:scale-[0.96] active:bg-white/[0.1]"
        >
          <Phone className="h-[18px] w-[18px]" />
        </a>
        <button
          onClick={() => open()}
          className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2.5 bg-accent px-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-ink shadow-glow-sm transition active:scale-[0.98] active:bg-accent-soft"
        >
          {/* the icon steps aside on 320px screens so the label never truncates. (`min-[360px]:`
              isn't available: the raw `snap`/`short` screens turn Tailwind's min-* variants off) */}
          <CalendarCheck className="hidden h-4 w-4 shrink-0 [@media(min-width:360px)]:block" />
          Κράτηση τραπεζιού
        </button>
      </div>
    </div>
  );
}
