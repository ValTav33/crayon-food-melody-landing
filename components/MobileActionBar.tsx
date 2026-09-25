'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { bookingMessage, venue, whatsappHref } from '@/lib/site';
import { useBooking } from './BookingProvider';

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
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-500 lg:hidden safe-bottom ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-2 border border-white/10 bg-ink/90 p-2 shadow-card backdrop-blur-xl">
        <a
          href={`tel:${venue.phoneLinks.landline}`}
          className="flex flex-1 items-center justify-center gap-2 border border-white/15 bg-white/[0.05] py-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-chalk transition active:scale-[0.97]"
        >
          <Phone className="h-4 w-4 text-accent-soft" /> Κλήση
        </a>
        <a
          href={whatsappHref(bookingMessage())}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 border border-emerald-400/30 bg-emerald-400/[0.10] py-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-emerald-300 transition active:scale-[0.97]"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <button
          onClick={() => open()}
          className="flex flex-[1.2] items-center justify-center gap-2 bg-accent py-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink shadow-glow-sm transition active:scale-[0.97]"
        >
          <CalendarCheck className="h-4 w-4" /> Κράτηση
        </button>
      </div>
    </div>
  );
}
