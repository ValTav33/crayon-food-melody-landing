'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated crimson bubbles behind every section, fixed to the viewport. The drift is
 * plain CSS keyframes on `transform` (see `.bubble` in globals.css), so it runs on the
 * compositor: no per-frame JS, repaint or filter work. On devices with a mouse, a soft
 * glow eases after the pointer.
 */
export default function SiteBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const mq = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX - window.innerWidth / 2;
      y = e.clientY - window.innerHeight / 2;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // the CSS transition on .bubble-glow does the easing, on the compositor
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const update = () => {
      glow.classList.toggle('is-on', mq.matches);
      if (mq.matches) window.addEventListener('pointermove', onMove, { passive: true });
      else window.removeEventListener('pointermove', onMove);
    };
    update();
    mq.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="bubbles absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute inset-0 isolate">
          <div className="bubble bubble-1" />
          <div className="bubble-orbit bubble-orbit-2">
            <div className="bubble bubble-2" />
          </div>
          <div className="bubble-orbit bubble-orbit-3">
            <div className="bubble bubble-3" />
          </div>
          <div className="bubble bubble-4" />
          <div className="bubble-orbit bubble-orbit-5">
            <div className="bubble bubble-5" />
          </div>
          <div ref={glowRef} className="bubble bubble-glow" />
        </div>
      </div>
      {/* keeps text readable: darker edges and a light overall veil over the bubbles */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(10,10,10,0.25)_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
}
