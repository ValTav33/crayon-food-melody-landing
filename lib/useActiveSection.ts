'use client';

import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from './site';

/** The section crossing the middle of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('top');

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // a thin band around the vertical centre of the screen
      { rootMargin: '-45% 0px -54% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
