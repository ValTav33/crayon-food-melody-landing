'use client';

import { useSyncExternalStore } from 'react';
import { SECTIONS, type SectionId } from './site';

// One tracker shared by every nav (header + rail): a single IntersectionObserver on a
// thin band around the vertical centre of the screen. While a nav click's smooth scroll
// runs, the observer is ignored, so the clicked section lights up at once instead of the
// highlight crawling through every section on the way there.
let active: SectionId = 'top';
let navigating = false;
let settleTimer = 0;
let observer: IntersectionObserver | null = null;
const listeners = new Set<() => void>();

function setActive(id: SectionId) {
  if (id === active) return;
  active = id;
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        if (navigating) return;
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  }
  return () => {
    listeners.delete(notify);
    if (!listeners.size) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/** The section crossing the middle of the viewport. */
export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribe, () => active, () => 'top');
}

/** The section under the observer's band right now. */
function sectionAtCentre(): SectionId | null {
  const y = window.innerHeight * 0.455;
  for (const { id } of SECTIONS) {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (rect && rect.top <= y && rect.bottom > y) return id;
  }
  return null;
}

function endNavigation() {
  navigating = false;
  window.removeEventListener('scroll', waitForScrollToSettle);
  const id = sectionAtCentre();
  if (id) setActive(id);
}

// `scrollend` isn't everywhere yet; "no scroll event for 150ms" works in every browser
// and also covers a click that doesn't scroll at all.
function waitForScrollToSettle() {
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(endNavigation, 150);
}

/** Call from a nav link's onClick: highlights the target now; the scroll catches up. */
export function markNavigation(id: SectionId) {
  setActive(id);
  navigating = true;
  window.addEventListener('scroll', waitForScrollToSettle, { passive: true });
  waitForScrollToSettle();
}
