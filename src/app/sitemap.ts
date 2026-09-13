import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  // Solo rutas publicadas. Ampliar al añadir templates, pricing o legal.
  return routing.locales.map((locale) => ({
    url: new URL(`/${locale}`, site.url).href,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((language) => [
          language,
          new URL(`/${language}`, site.url).href,
        ]),
      ),
    },
  }));
}
