import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { MotionProvider } from '@/components/motion/provider';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';
import '../globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#05070d' };

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(site.url),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en', 'x-default': '/en' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
      url: `/${locale}`,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [{ url: `/${locale}/opengraph-image`, alt: t('title') }],
    },
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '16x16 32x32 48x48',
          type: 'image/x-icon',
        },
        { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
      apple: '/brand/vibrix-logo-192.png',
    },
    robots: site.indexable ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const common = await getTranslations({ locale, namespace: 'Common' });

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="grain min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {common('skip')}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>
            <Navbar locale={locale} />
            <main id="main">{children}</main>
            <Footer locale={locale} />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
