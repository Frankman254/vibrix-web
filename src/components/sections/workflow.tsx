import { AudioLines, Captions, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { ScrollLine } from '@/components/motion/scroll-line';
import { Spotlight } from '@/components/motion/spotlight';
import { SectionHeading } from './section-heading';

const STEPS = [
  { id: 'audio', Icon: AudioLines },
  { id: 'lyrics', Icon: Captions },
  { id: 'visual', Icon: Sparkles },
] as const;

export async function Workflow() {
  const t = await getTranslations('Workflow');

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="workflow-title"
            eyebrow={t('eyebrow')}
            title={t('title')}
          />
        </div>
        <ol className="relative grid gap-5 pl-10 sm:pl-14">
          <ScrollLine className="absolute top-2 bottom-2 left-3 w-px sm:left-5" />
          {STEPS.map(({ id, Icon }, index) => (
            <li key={id} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-8 -left-[2.1rem] flex size-3 items-center justify-center rounded-full border border-accent bg-bg sm:-left-[2.6rem]"
              />
              <Reveal delay={index * 0.08}>
                <Spotlight className="rounded-card border border-line bg-surface/60 p-7 transition-colors hover:border-line-strong sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono text-sm text-fg-faint">
                      {t(`steps.${id}.number`)}
                    </span>
                    <Icon
                      aria-hidden="true"
                      size={22}
                      className="text-accent"
                    />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {t(`steps.${id}.title`)}
                  </h3>
                  <p className="mt-3 max-w-md leading-7 text-fg-mute">
                    {t(`steps.${id}.description`)}
                  </p>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
