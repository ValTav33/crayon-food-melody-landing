'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { NAV_LINKS, SECTIONS, venue } from '@/lib/site';
import { markNavigation, useActiveSection } from '@/lib/useActiveSection';
import { useBooking } from './BookingProvider';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-white/[0.07] bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="flex h-[var(--header-h)] items-center justify-between gap-4 px-4 sm:px-6 lg:px-5 xl:px-8">
        <a href="#top" aria-label={`${venue.name} — αρχή`} className="-my-1 block shrink-0 py-1 transition hover:opacity-85">
          <Image
            src="/images/brand/logo-lockup.webp"
            alt={venue.name}
            width={1200}
            height={424}
            priority
            sizes="140px"
            className="h-[40px] w-auto sm:h-[46px]"
          />
        </a>

        {/* only where the rail has no labels; from xl the rail itself is the navigation */}
        <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-1 lg:flex xl:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => markNavigation(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={`relative px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition ${
                active === link.id ? 'text-chalk' : 'text-white/55 hover:text-chalk'
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-accent transition-transform duration-300 ${
                  active === link.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${venue.phoneLinks.landline}`}
            className="hidden items-center gap-2 border border-white/20 px-4 py-2.5 text-[0.8rem] font-semibold tracking-wide text-chalk transition hover:border-white/70 sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-accent-soft" />
            {venue.phones.landline}
          </a>
          <button onClick={() => open()} className="btn-primary hidden px-5 py-2.5 lg:inline-flex">
            Κράτηση
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="icon-btn h-11 w-11 p-0 text-chalk active:scale-95 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Phones: covers the whole screen below the header (no page peeking through under
          it), links up top and the two actions pinned where the thumb rests. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="h-[calc(100svh-var(--header-h))] animate-fade-in overflow-y-auto overscroll-contain border-t border-white/[0.07] bg-ink/[0.97] backdrop-blur-xl lg:hidden"
        >
          <nav
            aria-label="Ενότητες σελίδας"
            className="flex min-h-full flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-6"
          >
            {SECTIONS.filter((s) => s.id !== 'top').map((section, i) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => {
                    setMenuOpen(false);
                    markNavigation(section.id);
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className={`flex min-h-[3.25rem] animate-fade-up items-center gap-3.5 border-b border-white/[0.06] text-[1.1rem] font-medium transition active:text-chalk ${
                    isActive ? 'text-chalk' : 'text-white/65 hover:text-chalk'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 ${isActive ? 'bg-accent' : 'bg-white/20'}`} />
                  {section.label}
                </a>
              );
            })}

            <div className="mt-auto pt-8">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="btn-primary w-full py-4"
              >
                Κράτηση τραπεζιού
              </button>
              <a href={`tel:${venue.phoneLinks.landline}`} className="btn-ghost mt-3 w-full py-4">
                <Phone className="h-4 w-4 text-accent-soft" /> {venue.phones.landline}
              </a>
              <p className="mt-5 text-center text-[0.8rem] leading-relaxed text-white/40">
                {venue.address}, {venue.areaShort}
                <br />
                {venue.hours.openDaysShort} · Live {venue.hours.liveStart} · έως {venue.hours.close}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
