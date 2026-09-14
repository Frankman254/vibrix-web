import { ArrowUpRight, Captions, Mic2 } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { appUrl } from '@/config/links';

import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { cn } from '@/lib/utils';
import { SectionHeading } from './section-heading';

export async function Suite() {
  const t = await getTranslations('Suite');

  return (
    <section
      id="suite"
      aria-labelledby="suite-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="suite-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2">
          <li className="lg:row-span-2">
            <Reveal className="h-full">
              <Spotlight className="group flex h-full flex-col overflow-hidden rounded-card border border-line-strong bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                  <Image
                    src="/media/screens/tunnel.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent" />
                  <Image
                    src="/brand/vibrix-logo.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="absolute bottom-6 left-7 drop-shadow-[0_0_24px_rgb(33_221_232/0.5)]"
                  />
                </div>
                <SuiteText
                  name={t('vibrix.name')}
                  role={t('vibrix.role')}
                  description={t('vibrix.description')}
                  status={t('vibrix.status')}
                  tone="live"
                  large
                  href={appUrl}
                  cta={t('vibrix.cta')}
                />
              </Spotlight>
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.08} className="h-full">
              <Spotlight className="h-full rounded-card border border-line bg-surface/60">
                <div className="px-7 pt-7">
                  <IconBadge>
                    <Captions aria-hidden="true" size={20} />
                  </IconBadge>
                </div>
                <SuiteText
                  name={t('lyrixa.name')}
                  role={t('lyrixa.role')}
                  description={t('lyrixa.description')}
                  status={t('lyrixa.status')}
                  tone="suite"
                />
              </Spotlight>
            </Reveal>
          </li>
          <li>
            <Reveal delay={0.16} className="h-full">
              <Spotlight className="relative h-full overflow-hidden rounded-card border border-dashed border-line-strong bg-bg">
                <div className="scanline opacity-60" aria-hidden="true" />
                <div className="px-7 pt-7">
                  <IconBadge>
                    <Mic2 aria-hidden="true" size={20} />
                  </IconBadge>
                </div>
                <SuiteText
                  name={t('transcriptor.name')}
                  role={t('transcriptor.role')}
                  description={t('transcriptor.description')}
                  status={t('transcriptor.status')}
                  tone="soon"
                />
              </Spotlight>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-accent">
      {children}
    </span>
  );
}

function SuiteText({
  name,
  role,
  description,
  status,
  tone,
  large,
  href,
  cta,
}: {
  name: string;
  role: string;
  description: string;
  status: string;
  tone: 'live' | 'suite' | 'soon';
  large?: boolean;
  href?: string;
  cta?: string;
}) {
  return (
    <div className={cn('flex flex-1 flex-col p-7', large && 'sm:p-9')}>
      <p className="font-mono text-[11px] tracking-[0.18em] text-fg-faint uppercase">
        {role}
      </p>
      <h3
        className={cn(
          'mt-2 font-display font-semibold tracking-[-0.04em]',
          large ? 'text-4xl' : 'text-2xl',
        )}
      >
        {name}
      </h3>
      <p className="mt-3 max-w-md leading-7 text-fg-mute">{description}</p>
      <p className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] text-fg-mute">
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 rounded-full',
            tone === 'live' && 'bg-accent shadow-glow',
            tone === 'suite' && 'bg-fg-mute',
            tone === 'soon' && 'bg-magenta',
          )}
        />
        {status}
      </p>
      {href && cta ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="group mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {cta}
          <ArrowUpRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      ) : null}
    </div>
  );
}
