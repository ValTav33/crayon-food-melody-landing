'use client';

import { SECTIONS } from '@/lib/site';
import { markNavigation, useActiveSection } from '@/lib/useActiveSection';

/**
 * Fixed rail on the left edge. Labels are always visible from 1280px (the page
 * container makes room via --rail-w); between 1024–1279px only the markers show and
 * a label appears on hover. Hidden on phones, where the header menu takes over.
 */
export default function SectionNav() {
  const active = useActiveSection();
  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === active),
  );
  const progress = activeIndex / (SECTIONS.length - 1);

  return (
    <nav aria-label="Ενότητες σελίδας" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-8">
      <ol className="relative">
        {/* track + progress, running between the first and last marker centres */}
        <span className="absolute bottom-5 left-[4.5px] top-5 w-px bg-white/15" aria-hidden="true">
          {/* scaleY, not height: animates on the compositor, no layout per frame */}
          <span
            data-rail-progress
            className="absolute inset-0 origin-top bg-accent transition-transform duration-300 ease-out"
            style={{ transform: `scaleY(${progress})` }}
          />
        </span>

        {SECTIONS.map((section, i) => {
          const isActive = section.id === active;
          const isPast = i < activeIndex;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => markNavigation(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className="group relative flex h-10 items-center gap-3.5 outline-none"
              >
                <span className="relative flex h-[10px] w-[10px] shrink-0 items-center justify-center">
                  <span
                    className={`block transition-[width,height,background-color,border-color,box-shadow] duration-200 ${
                      isActive
                        ? 'h-[10px] w-[10px] bg-accent shadow-[0_0_14px_2px_rgba(196,28,71,0.6)]'
                        : isPast
                          ? 'h-[6px] w-[6px] bg-accent'
                          : 'h-[6px] w-[6px] border border-white/40 bg-ink group-hover:border-white'
                    }`}
                  />
                </span>
                <span
                  className={`whitespace-nowrap text-[0.8rem] font-medium tracking-wide transition-[opacity,transform,color] duration-200
                    pointer-events-none -translate-x-1 border border-white/10 bg-ink/90 px-2 py-1 opacity-0 backdrop-blur-md
                    group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100
                    xl:pointer-events-auto xl:translate-x-0 xl:border-transparent xl:bg-transparent xl:p-0 xl:opacity-100 xl:backdrop-blur-none
                    ${isActive ? 'text-chalk' : 'text-white/40 group-hover:text-white/85'}`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
