import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';

const SECTIONS = [
  'waitlist',
  'unsubscribe',
  'audio',
  'cookies',
  'hosting',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/legal/privacy'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const path = `/${locale}/legal/privacy`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: path,
      languages: {
        es: '/es/legal/privacy',
        en: '/en/legal/privacy',
        'x-default': '/en/legal/privacy',
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
      locale,
      url: path,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t('metaTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [{ url: `/${locale}/opengraph-image`, alt: t('metaTitle') }],
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<'/[locale]/legal/privacy'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <article
      aria-labelledby="privacy-title"
      className="mx-auto max-w-3xl px-6 pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {t('eyebrow')}
      </p>
      <h1
        id="privacy-title"
        className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1] font-semibold tracking-[-0.045em] text-balance"
      >
        {t('title')}
      </h1>
      <p className="mt-4 font-mono text-xs text-fg-mute">{t('updated')}</p>
      <p className="mt-8 text-lg leading-8 text-fg-mute">{t('intro')}</p>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {SECTIONS.map((id) => (
          <section key={id} aria-labelledby={`privacy-${id}`} className="py-8">
            <h2
              id={`privacy-${id}`}
              className="font-display text-xl font-medium tracking-tight"
            >
              {t(`sections.${id}.title`)}
            </h2>
            <p className="mt-3 leading-7 text-fg-mute">
              {t(`sections.${id}.body`)}
            </p>
          </section>
        ))}
      </div>
      <a
        href={`/${locale}`}
        className="mt-12 inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        {t('back')}
      </a>
    </article>
  );
}
