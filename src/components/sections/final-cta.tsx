import { ArrowUp, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { appUrl } from '@/config/links';

export async function FinalCta() {
  const [t, common] = await Promise.all([
    getTranslations('FinalCta'),
    getTranslations('Common'),
  ]);

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative px-6 pb-24 lg:px-10"
    >
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-line-strong">
          <Image
            src="/media/screens/orbital.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(5_7_13/0.35),rgb(5_7_13/0.92)_70%)]" />
          <div className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
            <Image
              src="/brand/vibrix-logo.svg"
              alt=""
              width={88}
              height={88}
              className="drop-shadow-[0_0_40px_rgb(240_64_155/0.45)]"
            />
            <h2
              id="final-cta-title"
              className="mt-8 max-w-3xl font-display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1] font-semibold tracking-[-0.05em] text-balance"
            >
              {t('title')}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-fg-mute">
              {t('description')}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener"
                title={common('external')}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-accent-fg transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {common('openApp')}
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
              <a
                href="#main"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-bg/40 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {t('secondary')}
                <ArrowUp aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
