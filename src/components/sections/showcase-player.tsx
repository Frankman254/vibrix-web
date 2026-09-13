'use client';

import { Pause, Play } from 'lucide-react';
import { m, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type ShowcaseItem = {
  id: string;
  name: string;
  family: string;
  description: string;
  src: string;
  alt: string;
};

type ShowcasePlayerProps = {
  items: ShowcaseItem[];
  listLabel: string;
  pauseLabel: string;
  playLabel: string;
};

const INTERVAL = 4800;

/** Pantalla que cambia de variante como quien cambia de canal. */
export function ShowcasePlayer({
  items,
  listLabel,
  pauseLabel,
  playLabel,
}: ShowcasePlayerProps) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const playing = !userPaused && !hovering && inView && !reducedMotion;
  const current = items[active];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % items.length),
      INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [playing, active, items.length]);

  return (
    <div
      ref={rootRef}
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10"
      onPointerEnter={(event) =>
        event.pointerType === 'mouse' && setHovering(true)
      }
      onPointerLeave={() => setHovering(false)}
    >
      <figure className="relative">
        <div className="relative aspect-video overflow-hidden rounded-card border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgb(33_221_232/0.35)]">
          {items.map((item, index) => (
            <m.div
              key={item.id}
              aria-hidden={index !== active}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: index === active ? 1 : 0,
                scale: index === active ? 1 : 1.06,
              }}
              transition={{ duration: 0.9, ease }}
            >
              <Image
                src={item.src}
                alt={index === active ? item.alt : ''}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </m.div>
          ))}
          {/* Barrido al cambiar de variante. */}
          <m.div
            key={`sweep-${active}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/12 to-transparent mix-blend-screen"
            initial={{ x: '-120%', opacity: 1 }}
            animate={{ x: '360%', opacity: 0 }}
            transition={{ duration: 0.9, ease }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.14)_0px,rgb(0_0_0/0.14)_1px,transparent_1px,transparent_3px)] opacity-40" />
          <figcaption className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-4 bg-linear-to-t from-bg/85 via-bg/40 to-transparent p-4 sm:p-6">
            <m.div
              key={`caption-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                {current.family}
              </p>
              <p className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                {current.name}
              </p>
            </m.div>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-label={userPaused ? playLabel : pauseLabel}
                aria-pressed={userPaused}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-bg/60 text-fg-mute backdrop-blur transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {userPaused ? (
                  <Play size={16} aria-hidden="true" />
                ) : (
                  <Pause size={16} aria-hidden="true" />
                )}
              </button>
            )}
          </figcaption>
        </div>
      </figure>

      <div role="group" aria-label={listLabel}>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1 lg:gap-1">
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={cn(
                    'group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    selected
                      ? 'border-line-strong bg-surface-2'
                      : 'border-transparent hover:bg-surface',
                  )}
                >
                  <span
                    className={cn(
                      'block font-display text-[15px] font-medium transition-colors',
                      selected ? 'text-fg' : 'text-fg-mute group-hover:text-fg',
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      'hidden text-[13px] leading-5 text-fg-mute lg:block',
                      !selected && 'lg:hidden',
                    )}
                  >
                    {item.description}
                  </span>
                  {selected && (
                    <m.span
                      key={`progress-${active}-${playing}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-linear-to-r from-cyan to-magenta"
                      initial={{ scaleX: playing ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: playing ? INTERVAL / 1000 : 0,
                        ease: 'linear',
                      }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
