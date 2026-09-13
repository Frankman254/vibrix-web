import { ArrowLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const [t, locale] = await Promise.all([
    getTranslations('NotFound'),
    getLocale(),
  ]);

  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p
        className="chroma font-display text-[clamp(6rem,20vw,11rem)] leading-none font-semibold tracking-[-0.06em]"
        data-text={t('code')}
      >
        {t('code')}
      </p>
      <h1 className="mt-6 font-display text-3xl font-medium tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-3 text-fg-mute">{t('description')}</p>
      <a
        href={`/${locale}`}
        className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        {t('back')}
      </a>
    </section>
  );
}
