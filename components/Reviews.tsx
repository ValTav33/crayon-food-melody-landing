import { Quote, Star } from 'lucide-react';
import { reviews, venue } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Reviews() {
  return (
    <section id="kritikes" aria-label="Κριτικές" className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[150px]" />

      <div className="page-container relative flex min-h-0 flex-1 flex-col justify-center snap:py-[4.5vh]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Κριτικές"
            title={
              <>
                Τι λένε οι <span className="accent-word">καλεσμένοι</span> μας
              </>
            }
            description="Αληθινά σχόλια από επισκέπτες μας στο Google."
          />

          <Reveal delay={80} className="flex items-center gap-4 border border-white/10 bg-white/[0.03] px-5 py-4">
            <span className="font-display text-[2.4rem] leading-none text-chalk">{venue.rating.score}</span>
            <div>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-accent-soft text-accent-soft' : 'fill-white/20 text-white/20'}`} />
                ))}
              </div>
              <p className="mt-1 text-[0.8rem] text-white/60">
                {venue.rating.count} αξιολογήσεις στο {venue.rating.source}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 snap:mt-[5vh]">
          {reviews.map((review, i) => (
            <Reveal
              as="blockquote"
              key={review.author}
              delay={i * 90}
              className="group relative flex flex-col overflow-hidden card-surface p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/40"
            >
              <Quote className="absolute -right-2 -top-1 h-20 w-20 text-white/[0.04]" />
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-accent-soft text-accent-soft" />
                ))}
              </div>
              <p className="relative mt-5 flex-1 font-display text-[1.15rem] leading-relaxed text-white/85">
                «{review.text}»
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/15 text-[0.8rem] font-bold uppercase text-chalk">
                  {review.author.trim().charAt(0)}
                </span>
                <div>
                  <p className="text-[0.88rem] font-semibold capitalize text-chalk">{review.author}</p>
                  <p className="text-[0.72rem] text-muted">Κριτική Google</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
