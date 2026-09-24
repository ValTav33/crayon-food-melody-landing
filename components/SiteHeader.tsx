'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { NAV_LINKS, venue } from '@/lib/site';
import { useBooking } from './BookingProvider';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:h-[76px] sm:px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-white/15 transition group-hover:ring-gold/60 sm:h-11 sm:w-11">
            <Image src="/images/brand/logo.png" alt="Crayon Food & Melody" fill sizes="44px" className="object-cover" priority />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[1.05rem] tracking-wide text-chalk sm:text-[1.2rem]">
              Crayon
            </span>
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold/80">
              food & melody
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-[0.92rem] font-medium text-white/70 transition hover:text-chalk"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${venue.phoneLinks.landline}`}
            className="hidden items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2.5 text-[0.88rem] font-semibold text-gold transition hover:border-gold/60 hover:bg-gold/15 sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {venue.phones.landline}
          </a>
          <button
            onClick={() => open()}
            className="hidden rounded-full bg-gradient-to-br from-amber-300 via-gold to-amber-600 px-5 py-2.5 text-[0.88rem] font-bold text-black shadow-glow-sm transition hover:brightness-110 lg:inline-flex"
          >
            Κράτηση
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
            aria-expanded={menuOpen}
            className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-chalk transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/[0.05] py-3.5 text-[1.05rem] font-medium text-white/80 transition hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="btn-gold mt-4 w-full"
            >
              Κράτηση τραπεζιού
            </button>
            <a
              href={`tel:${venue.phoneLinks.landline}`}
              className="mb-2 mt-3 flex items-center justify-center gap-2 py-2 text-[0.95rem] font-semibold text-gold"
            >
              <Phone className="h-4 w-4" /> {venue.phones.landline}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
