import { Bookmark, Cpu, Layers, MonitorPlay } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { TiltFrame } from '@/components/motion/tilt-frame';
import { SectionHeading } from './section-heading';

const POINTS = [
  { id: 'slots', Icon: Bookmark },
  { id: 'scenes', Icon: Layers },
  { id: 'obs', Icon: MonitorPlay },
  { id: 'local', Icon: Cpu },
] as const;

export async function Editor() {
  const t = await getTranslations('Editor');

  return (
    <section
      aria-labelledby="editor-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-cyan/8 blur-[160px]"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="editor-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          align="center"
        />
        <Reveal className="mt-16" y={60}>
          <TiltFrame>
            <figure className="relative overflow-hidden rounded-card border border-line-strong bg-surface shadow-[0_60px_160px_-40px_rgb(240_64_155/0.3)]">
              <div className="relative aspect-video">
                <Image
                  src="/media/screens/editor.jpg"
                  alt={t('alt')}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </TiltFrame>
        </Reveal>
        <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ id, Icon }, index) => (
            <li key={id} className="bg-bg">
              <Reveal delay={index * 0.06} className="h-full p-7">
                <Icon aria-hidden="true" size={20} className="text-accent" />
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                  {t(`points.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-fg-mute">
                  {t(`points.${id}.description`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
