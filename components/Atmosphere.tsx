'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { gallery, reviews, venue } from '@/lib/site';
import SectionHeading from './SectionHeading';

const SPAN: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  normal: '',
};

export default function Atmosphere() {
  return (
    <section id="atmosfaira" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Ατμόσφαιρα"
          title={<>Μια βραδιά στο Crayon</>}
          description="Χαμηλός φωτισμός, ζεστά τραπέζια, μια σκηνή που δεν σταματά και παρέες που μένουν μέχρι αργά."
        />

        <div className="mt-11 grid auto-rows-[150px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
          {gallery.map((item, i) => (
            <figure
              key={item.image + i}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`group relative animate-fade-up overflow-hidden rounded-2xl bg-ink-card ring-1 ring-white/[0.07] transition-all duration-500 hover:ring-gold/35 ${SPAN[item.span]}`}
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
                  <span className="h-1 w-1 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(245,158,11,0.7)]" />
                  {item.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl glass px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-gold text-gold' : 'fill-gold/35 text-gold/35'}`} />
              ))}
            </div>
            <p className="text-[0.9rem] text-white/75">
              <span className="font-bold text-chalk">{venue.rating.score}</span> από {venue.rating.count}{' '}
              αξιολογήσεις στο {venue.rating.source}
            </p>
          </div>
          <p className="text-[0.82rem] text-muted">Αληθινά σχόλια επισκεπτών μας</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {reviews.map((review, i) => (
            <blockquote
              key={review.author}
              style={{ animationDelay: `${i * 90}ms` }}
              className="group relative animate-fade-up overflow-hidden rounded-[22px] card-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25"
            >
              <Quote className="absolute -right-2 -top-1 h-16 w-16 text-white/[0.035]" />
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="relative mt-4 font-display text-[1.05rem] leading-relaxed text-white/80">
                «{review.text}»
              </p>
              <footer className="mt-5 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-coral/25 text-[0.8rem] font-bold uppercase text-chalk">
                  {review.author.trim().charAt(0)}
                </span>
                <div>
                  <p className="text-[0.88rem] font-semibold capitalize text-chalk">{review.author}</p>
                  <p className="text-[0.72rem] text-muted">Κριτική Google</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
