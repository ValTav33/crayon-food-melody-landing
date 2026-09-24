'use client';

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { BubbleBackground } from './ui/bubble-background';

/**
 * Animated crimson bubbles behind every section. Fixed to the viewport, so it stays
 * put while sections snap past. The pointer glow only runs on devices with a mouse.
 */
export default function SiteBackground() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <MotionConfig reducedMotion="user">
        <BubbleBackground interactive={finePointer} pointerTarget="window" className="absolute inset-0 opacity-60" />
      </MotionConfig>
      {/* keeps text readable: darker edges and a light overall veil over the bubbles */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(10,10,10,0.25)_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
}
