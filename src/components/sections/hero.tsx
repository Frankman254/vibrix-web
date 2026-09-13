import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { HeroSpectrum } from '@/components/canvas/hero-spectrum';
import { Reveal } from '@/components/motion/reveal';
import { TiltFrame } from '@/components/motion/tilt-frame';
import { WordReveal } from '@/components/motion/word-reveal';
import { appUrl } from '@/config/links';
import type { Locale } from '@/i18n/routing';

export async function Hero({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([
    getTranslations('Hero'),
    getTranslations('Common'),
  ]);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 lg:pb-32">
      {/* Atmósfera: los dos colores del logo, muy tenues. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-magenta/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[38rem] rounded-full bg-cyan/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-size-[64px_64px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-10 lg:px-10">
        <div className="relative z-10">
          <Reveal y={12}>
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-1.5 font-mono text-[11px] tracking-wide text-fg-mute backdrop-blur">
              <span className="rounded-full bg-accent/12 px-2.5 py-1 whitespace-nowrap text-accent">
                {t('status')}
              </span>
              <span className="hidden sm:inline">{t('eyebrow')}</span>
            </p>
          </Reveal>

          <h1 className="mt-7 font-display text-[clamp(3.1rem,8.4vw,6.6rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-balance">
            <WordReveal
              lines={[
                { text: t('titleStart') },
                { text: t('titleMid'), chroma: t('titleEnd') },
              ]}
            />
          </h1>

          <Reveal delay={0.45} y={16}>
            <p className="mt-7 max-w-xl text-lg leading-8 text-fg-mute">
              {t('description')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={appUrl ? '/app' : `/${locale}#suite`}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-accent-fg shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_18px_50px_-12px_rgb(103_232_249/0.55)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {common(appUrl ? 'openApp' : 'explore')}
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={`/${locale}#showcase`}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium text-fg transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {t('secondary')}
                <ArrowDown
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-mute">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  size={16}
                  className="text-accent"
                />
                {t('privacy')}
              </li>
              <li className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-magenta"
                />
                {t('exportNote')}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 w-[125%] max-w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-80">
            <HeroSpectrum
              label={t('visualLabel')}
              pauseLabel={t('pause')}
              playLabel={t('play')}
            />
          </div>
          <Reveal delay={0.25} y={40}>
            <TiltFrame className="relative">
              <figure className="relative overflow-hidden rounded-card border border-line-strong bg-surface shadow-[0_50px_140px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.04)]">
                <div className="flex items-center justify-between gap-4 border-b border-line bg-bg/80 px-4 py-2.5 font-mono text-[10.5px] text-fg-faint backdrop-blur">
                  <span className="inline-flex items-center gap-2 text-fg-mute">
                    <span className="relative flex size-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-magenta/70 motion-reduce:animate-none" />
                      <span className="relative size-2 rounded-full bg-magenta" />
                    </span>
                    {t('live')}
                  </span>
                  <span>vibrix · 1920×1080</span>
                </div>
                <div className="relative aspect-video">
                  <Image
                    src="/media/screens/hero.jpg"
                    alt={t('screenAlt')}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <div className="scanline" aria-hidden="true" />
                </div>
              </figure>
              <p className="absolute -bottom-4 left-5 [transform:translateZ(40px)] rounded-full border border-line-strong bg-surface-2/90 px-3 py-1.5 font-mono text-[10.5px] text-fg-mute shadow-lg backdrop-blur">
                {t('screenTag')}
              </p>
            </TiltFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
