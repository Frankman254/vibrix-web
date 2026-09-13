import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from './section-heading';

const ITEMS = ['install', 'privacy', 'export', 'rights'] as const;

export async function Faq() {
  const t = await getTranslations('Faq');

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <SectionHeading
          id="faq-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
        />
        <Reveal>
          <div className="divide-y divide-line border-y border-line">
            {ITEMS.map((id) => (
              <details key={id} name="faq" className="group">
                <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium tracking-tight transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-xl [&::-webkit-details-marker]:hidden">
                  {t(`items.${id}.question`)}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-mute transition-transform duration-300 group-open:rotate-45 group-open:text-accent">
                    <Plus aria-hidden="true" size={16} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-7 text-fg-mute">
                  {t(`items.${id}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
