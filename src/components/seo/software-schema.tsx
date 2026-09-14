import { getTranslations } from 'next-intl/server';
import { appUrl } from '@/config/links';
import { site } from '@/config/site';
import type { Locale } from '@/i18n/routing';

export async function SoftwareSchema({ locale }: { locale: Locale }) {
  const [common, metadata] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Metadata'),
  ]);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': new URL(`/${locale}#software`, site.url).href,
    name: common('brand'),
    description: metadata('description'),
    url: new URL(`/${locale}`, site.url).href,
    image: new URL(`/${locale}/opengraph-image`, site.url).href,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    downloadUrl: appUrl,
    sameAs: [appUrl],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
