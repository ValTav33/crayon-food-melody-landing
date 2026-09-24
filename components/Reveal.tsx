'use client';

import { useEffect, useRef, useState } from 'react';

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  /** stagger, in ms */
  delay?: number;
};

/** Fades its content up the first time it scrolls into view (see `.reveal` in globals.css). */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { ...style, animationDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
