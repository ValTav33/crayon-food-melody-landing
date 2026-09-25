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
    return () => {
      document.body.style.overflow = '';
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
        <a href="#top" aria-label={`${venue.name} — αρχή`} className="block shrink-0 transition hover:opacity-85">
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
            className="icon-btn p-2.5 text-chalk lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav aria-label="Ενότητες σελίδας" className="flex flex-col px-4 py-3 sm:px-6">
            {SECTIONS.filter((s) => s.id !== 'top').map((section) => {
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
                  className={`flex items-center gap-3 border-b border-white/[0.05] py-3.5 text-[1.05rem] font-medium transition ${
                    isActive ? 'text-chalk' : 'text-white/65 hover:text-chalk'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 ${isActive ? 'bg-accent' : 'bg-white/20'}`} />
                  {section.label}
                </a>
              );
            })}
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="btn-primary mt-4 w-full"
            >
              Κράτηση τραπεζιού
            </button>
            <a
              href={`tel:${venue.phoneLinks.landline}`}
              className="mb-2 mt-3 flex items-center justify-center gap-2 py-2 text-[0.95rem] font-semibold text-chalk"
            >
              <Phone className="h-4 w-4 text-accent-soft" /> {venue.phones.landline}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
