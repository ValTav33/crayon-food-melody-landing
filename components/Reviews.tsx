import { Quote, Star } from 'lucide-react';
import { reviews, venue } from '@/lib/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Reviews() {
  return (
    <section id="kritikes" aria-label="Κριτικές" className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0">
      <div className="page-container relative flex min-h-0 flex-1 flex-col justify-center snap:py-[4.5vh]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Κριτικές"
            title={
              <>
                Τι λένε οι <span className="accent-word">καλεσμένοι</span> μας
              </>
            }
            description="Τι κρατούν οι επισκέπτες μας από το δείπνο, τη σκηνή και την εξυπηρέτηση."
          />

          <Reveal delay={80} className="flex items-center gap-4 border border-white/10 bg-white/[0.03] px-5 py-4">
            <span className="font-display text-[2.4rem] leading-none text-chalk">{venue.rating.score}</span>
            <div>
              <Stars value={venue.rating.value} size="h-4 w-4" />
              <p className="mt-1 text-[0.8rem] text-white/60">{venue.rating.count} κριτικές επισκεπτών</p>
            </div>
          </Reveal>
        </div>

        {/* phones: a swipeable rail; md+: two rows of three, compacted to fit one screen */}
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 snap:mt-[4vh]">
          {reviews.map((review, i) => (
            <Reveal
              as="blockquote"
              key={review.author}
              delay={(i % 3) * 90}
              className="group relative flex w-[84vw] shrink-0 snap-start flex-col overflow-hidden card-surface p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/40 sm:w-[62vw] md:w-auto snap:p-5"
            >
              <Quote className="absolute -right-2 -top-1 h-20 w-20 text-white/[0.04]" />
              <Stars value={review.rating} size="h-3.5 w-3.5" />
              <p className="relative mt-5 flex-1 font-display text-[1.15rem] leading-relaxed text-white/85 snap:mt-3 snap:text-[1rem] short:line-clamp-3">
                «{review.text}»
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4 snap:mt-4 snap:pt-3">
                <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/15 text-[0.8rem] font-bold uppercase text-chalk snap:h-8 snap:w-8">
                  {review.author.trim().charAt(0)}
                </span>
                <div>
                  <p className="text-[0.88rem] font-semibold capitalize text-chalk">{review.author}</p>
                  <p className="text-[0.72rem] text-muted">Επαληθευμένη επίσκεψη</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Five stars filled to `value`, fractions included (4.7 → four and most of a fifth). */
function Stars({ value, size }: { value: number; size: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${String(value).replace('.', ',')} από 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className={`relative block ${size}`}>
            <Star className={`absolute inset-0 ${size} fill-white/20 text-white/20`} />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${size} max-w-none fill-accent-soft text-accent-soft`} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
