'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { Instagram } from './BrandIcons';
import { stories, venue } from '@/lib/site';
import type { Story } from '@/lib/types';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useBooking } from './BookingProvider';

const STORY_DURATION = 6000;

export default function StoryGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="stories" aria-label="Stories" className="screen relative overflow-hidden py-16 sm:py-24 snap:py-0">
      <div className="page-container relative flex min-h-0 flex-1 flex-col snap:py-[4.5vh]">
        <div className="flex shrink-0 flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Stories"
            title={<>Η βραδιά σας, πιάτο πιάτο</>}
            description="Ό,τι βγαίνει από την κουζίνα και το bar μας, όπως ακριβώς το ανεβάζουμε κάθε βράδυ. Πατήστε ένα story για να το δείτε ολόκληρο."
          />
          <div className="flex items-center gap-2">
            <a
              href={`https://instagram.com/${venue.social.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-4 py-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white/75 transition hover:border-white/60 hover:text-white"
            >
              <Instagram className="h-4 w-4" /> @{venue.social.instagram}
            </a>
            <div className="hidden gap-2 lg:flex">
              <button
                onClick={() => scrollRail(-1)}
                aria-label="Προηγούμενα stories"
                className="icon-btn"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollRail(1)}
                aria-label="Επόμενα stories"
                className="icon-btn"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-2 sm:-mx-6 sm:px-6 lg:-mx-1 lg:px-1 snap:mt-[3vh] snap:min-h-0 snap:flex-1"
        >
          {stories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} onOpen={() => setActiveIndex(i)} />
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <StoryViewer
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}

function StoryCard({ story, index, onOpen }: { story: Story; index: number; onOpen: () => void }) {
  return (
    <Reveal
      as="button"
      delay={Math.min(index, 5) * 70}
      onClick={onOpen}
      aria-label={`Story ${index + 1} από ${stories.length}${story.caption ? `: ${story.caption}` : ''}`}
      className="group relative aspect-[9/16] w-[62vw] shrink-0 snap-start overflow-hidden bg-ink-card text-left ring-1 ring-white/[0.08] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:ring-accent/60 sm:w-[38vw] md:w-[30vw] lg:w-[calc((100%-4rem)/5)] snap:h-full snap:w-auto"
    >
      <Image
        src={story.image}
        alt={story.caption || 'Story από το Crayon'}
        fill
        sizes="(max-width: 640px) 62vw, (max-width: 1024px) 30vw, 18vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />

      {/* story chrome: one segment per story, this card's position highlighted */}
      <div className="absolute inset-x-3 top-3 flex gap-[3px]" aria-hidden="true">
        {stories.map((s, seg) => (
          <span key={s.id} className="h-[2.5px] flex-1 overflow-hidden bg-white/25">
            {seg <= index && (
              <span
                className={`block h-full bg-white/95 transition-[width] duration-700 ease-out ${
                  seg < index ? 'w-full' : 'w-1/2 group-hover:w-full'
                }`}
              />
            )}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-3 top-7 flex items-center gap-2">
        <StoryAvatar size="h-7 w-7" />
        <span className="truncate text-[0.7rem] font-semibold text-white/95 drop-shadow">crayonfoodmelody</span>
        <span className="shrink-0 text-[0.68rem] text-white/60">{story.time}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        {story.caption && (
          <p className="line-clamp-2 text-[0.82rem] font-medium leading-snug text-white/90 drop-shadow-lg">
            {story.caption}
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 border border-white/25 bg-white/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <Play className="h-2.5 w-2.5 fill-current" /> Προβολή
        </span>
      </div>
    </Reveal>
  );
}

function StoryAvatar({ size }: { size: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-black ring-[1.5px] ring-accent ${size}`}>
      <Image src="/images/brand/logo-mark.png" alt="" fill sizes="36px" className="object-contain p-[2px]" />
    </span>
  );
}

function StoryViewer({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open } = useBooking();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Side effects stay out of the state updater: an updater runs during render,
  // and closing from there would set state on the parent mid-render.
  const goNext = useCallback(() => {
    if (index >= stories.length - 1) {
      onClose();
      return;
    }
    setProgress(0);
    setIndex(index + 1);
  }, [index, onClose]);

  const goPrev = useCallback(() => {
    if (index === 0) return;
    setProgress(0);
    setIndex(index - 1);
  }, [index]);

  // auto-advance
  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts - progress * STORY_DURATION;
      const ratio = Math.min(1, (ts - start) / STORY_DURATION);
      setProgress(ratio);
      if (ratio >= 1) {
        goNext();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [goNext, goPrev, onClose]);

  const story = stories[index];
  const next = stories[index + 1];

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/95 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Stories"
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        setPaused(false);
        const start = touchStart.current;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
        else if (dx < -50) goNext();
        else if (dx > 50) goPrev();
        touchStart.current = null;
      }}
    >
      <button
        onClick={onClose}
        aria-label="Κλείσιμο"
        className="absolute right-4 top-4 z-20 border border-white/20 bg-white/10 p-2.5 text-white/85 backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={goPrev}
        aria-label="Προηγούμενο"
        disabled={index === 0}
        className="absolute left-4 z-20 hidden border border-white/20 bg-white/10 p-3 text-white/85 backdrop-blur-md transition hover:bg-white/20 disabled:opacity-25 lg:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goNext}
        aria-label="Επόμενο"
        className="absolute right-4 z-20 hidden border border-white/20 bg-white/10 p-3 text-white/85 backdrop-blur-md transition hover:bg-white/20 lg:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative h-full w-full sm:h-[min(92vh,900px)] sm:w-auto sm:aspect-[9/16] sm:overflow-hidden sm:ring-1 sm:ring-white/10">
        <Image
          key={story.id}
          src={story.image}
          alt={story.caption || 'Story από το Crayon'}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 520px"
          className="animate-fade-in object-cover"
        />
        {/* fetch the next story now (same sizes → same URL) so advancing doesn't flash */}
        {next && (
          <Image
            key={`pre-${next.id}`}
            src={next.image}
            alt=""
            aria-hidden="true"
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, 520px"
            className="pointer-events-none -z-10 object-cover opacity-0"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 to-transparent" />

        {/* progress */}
        <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
          {stories.map((s, i) => (
            <span key={s.id} className="h-[3px] flex-1 overflow-hidden bg-white/25">
              <span
                className="block h-full bg-white"
                style={{ width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%' }}
              />
            </span>
          ))}
        </div>

        {/* header */}
        <div className="absolute inset-x-3 top-7 z-10 flex items-center gap-2.5">
          <StoryAvatar size="h-9 w-9" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.85rem] font-semibold text-white">{venue.name}</p>
            <p className="text-[0.7rem] text-white/60">{story.time}</p>
          </div>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Συνέχεια' : 'Παύση'}
            className="mr-10 p-2 text-white/80 transition hover:text-white sm:mr-12"
          >
            {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
          </button>
        </div>

        {/* tap zones */}
        <button
          aria-label="Προηγούμενο story"
          onClick={goPrev}
          className="absolute inset-y-0 left-0 z-0 w-1/3 cursor-default outline-none"
        />
        <button
          aria-label="Επόμενο story"
          onClick={goNext}
          className="absolute inset-y-0 right-0 z-0 w-2/3 cursor-default outline-none"
        />

        {/* caption + CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          {story.caption && (
            <p className="mb-4 font-display text-[1.35rem] leading-snug text-white drop-shadow-lg sm:text-[1.5rem]">
              {story.caption}
            </p>
          )}
          <div className="pointer-events-auto flex items-center gap-2.5">
            <button
              onClick={() => {
                onClose();
                open('Κράτηση τραπεζιού');
              }}
              className="btn-primary flex-1 py-3 sm:flex-none"
            >
              Κράτηση τραπεζιού
            </button>
            <a
              href={`https://instagram.com/${venue.social.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="border border-white/25 bg-white/10 p-3.5 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
