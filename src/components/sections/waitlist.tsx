import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { getWaitlistConfig } from '@/lib/waitlist';
import { SectionHeading } from './section-heading';
import { WaitlistForm } from './waitlist-form';

export async function Waitlist({ locale }: { locale: Locale }) {
  const t = await getTranslations('Waitlist');
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="border-y border-line bg-surface/20 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <SectionHeading
          id="waitlist-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <WaitlistForm
          locale={locale}
          available={Boolean(getWaitlistConfig())}
        />
      </div>
    </section>
  );
}
