import {
  AudioLines,
  Captions,
  Layers,
  Radio,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Spotlight } from '@/components/motion/spotlight';
import { SectionHeading } from './section-heading';

const items = [
  { id: 'spectrum', icon: AudioLines, image: '/media/screens/radial.jpg' },
  { id: 'lyrics', icon: Captions },
  { id: 'scenes', icon: Layers },
  { id: 'controls', icon: SlidersHorizontal },
  { id: 'privacy', icon: ShieldCheck },
  { id: 'obs', icon: Radio, image: '/media/screens/scope.jpg' },
] as const;

export async function Features() {
  const t = await getTranslations('Features');
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="border-y border-line bg-surface/20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          id="features-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <Spotlight className="group relative h-full overflow-hidden rounded-card border border-line bg-surface">
                {'image' in item && (
                  <div className="relative aspect-[2.5] overflow-hidden border-b border-line">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>
                )}
                <div className="p-7">
                  <item.icon
                    aria-hidden="true"
                    className="mb-6 text-accent"
                    size={24}
                  />
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {t(`items.${item.id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-fg-mute">
                    {t(`items.${item.id}.description`)}
                  </p>
                </div>
              </Spotlight>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
