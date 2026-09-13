import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from './section-heading';
import { ShowcasePlayer } from './showcase-player';

const IDS = [
  'radial',
  'scope',
  'tunnel',
  'liquid',
  'orbital',
  'spiral',
  'linear',
  'pixel',
] as const;

export async function Showcase() {
  const t = await getTranslations('Showcase');
  const items = IDS.map((id) => {
    const name = t(`items.${id}.name`);
    return {
      id,
      name,
      family: t(`items.${id}.family`),
      description: t(`items.${id}.description`),
      src: `/media/screens/${id}.jpg`,
      alt: t('alt', { name }),
    };
  });

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="showcase-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <Reveal className="mt-14" delay={0.1}>
          <ShowcasePlayer
            items={items}
            listLabel={t('listLabel')}
            pauseLabel={t('pause')}
            playLabel={t('play')}
          />
        </Reveal>
      </div>
    </section>
  );
}
