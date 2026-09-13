import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];
