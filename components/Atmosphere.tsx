'use client';

import Image from 'next/image';
import { gallery, venue } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const SPAN: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  normal: '',
};

export default function Atmosphere() {
  return (
    <section id="atmosfaira" aria-label="Ατμόσφαιρα" className="screen relative py-16 sm:py-24 snap:py-0">
      <div className="page-container flex min-h-0 flex-1 flex-col snap:py-[4.5vh]">
        <SectionHeading
          className="shrink-0"
          eyebrow="Ατμόσφαιρα"
          title={<>Μια βραδιά στο {venue.shortName}</>}
          description={`Βελούδινα booths, χρυσός φωτισμός, προσεγμένο δείπνο και μια live σκηνή που δεν σβήνει πριν τις ${venue.hours.close}.`}
        />

        {/* 8 photos pack exactly into 4×3; on desktop the rows stretch to fill the screen */}
        <div className="mt-10 grid auto-rows-[150px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4 snap:mt-[3.5vh] snap:min-h-0 snap:flex-1 snap:auto-rows-auto snap:grid-rows-3">
          {gallery.map((item, i) => (
            <Reveal
              as="figure"
              key={item.image + i}
              delay={i * 60}
              className={`group relative overflow-hidden bg-ink-card ring-1 ring-white/[0.07] transition-shadow duration-500 hover:ring-accent/50 ${SPAN[item.span]}`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition group-hover:opacity-95" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-[0.78rem] font-semibold tracking-wide text-white/90 sm:text-[0.85rem]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-accent-soft" />
                  {item.label}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
