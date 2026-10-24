import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';

// Solo rutas publicadas, sin el prefijo de idioma. Ampliar al añadir
// templates, pricing u otras páginas legales.
const PATHS = ['', '/legal/privacy'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: new URL(`/${locale}${path}`, site.url).href,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((language) => [
            language,
            new URL(`/${language}${path}`, site.url).href,
          ]),
        ),
      },
    })),
  );
}
