'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { venue, viberHref } from '@/lib/site';
import { Viber } from './BrandIcons';
import { useBooking } from './BookingProvider';

/**
 * Floating bar on phones once the hero's own CTAs have scrolled away. Three 48px targets:
 * square call and Viber buttons, and the booking CTA taking the rest of the width. Its label
 * follows the room it actually gets (container queries), so it never wraps or truncates:
 * «Κράτηση» on the narrowest phones, «Κράτηση τραπεζιού» from ~340px, plus the icon from ~370px.
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
      // slid away = out of reach for taps, the tab key and screen readers alike
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      {/* solid rather than frosted: at this opacity the blur didn't show, but it re-ran every frame */}
      <div className="flex gap-1.5 border border-white/10 bg-ink/95 p-2 shadow-card">
        <a
          href={`tel:${venue.phoneLinks.landline}`}
          aria-label={`Κλήση ${venue.phones.landline}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-white/[0.05] text-accent-soft transition active:scale-[0.96] active:bg-white/[0.1]"
        >
          <Phone className="h-[18px] w-[18px]" />
        </a>
        <a
          href={viberHref}
          aria-label={`Viber ${venue.phones.mobile}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-viber text-white transition active:scale-[0.96] active:bg-viber-deep"
        >
          <Viber className="h-[22px] w-[22px]" />
        </a>
        <button
          onClick={() => open()}
          className="flex h-12 min-w-0 flex-1 items-center justify-center whitespace-nowrap bg-accent px-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink shadow-glow-sm transition [container-type:inline-size] active:scale-[0.98] active:bg-accent-soft"
        >
          {/* One min-width query per span, so no two rules compete for the same width.
              Measured: the long label is 150px, 174px with the icon; the queries add ~10px of
              slack for the fallback font drawn before Manrope loads. */}
          <span className="flex items-center gap-2 [@container(min-width:10rem)]:hidden">
            <CalendarCheck className="h-4 w-4 shrink-0" />
            Κράτηση
          </span>
          <span className="hidden items-center gap-2 [@container(min-width:10rem)]:flex">
            <CalendarCheck className="hidden h-4 w-4 shrink-0 [@container(min-width:11.75rem)]:block" />
            Κράτηση τραπεζιού
          </span>
        </button>
      </div>
    </div>
  );
}
