import { NextRequest, NextResponse } from 'next/server';
import { appUrl } from '@/config/links';
import { routing, type Locale } from '@/i18n/routing';

function preferredLocale(header: string | null): Locale {
  const ranked = (header ?? '')
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const match = routing.locales.find((locale) => tag.startsWith(locale));
    if (match) return match;
  }
  return routing.defaultLocale;
}

export function GET(request: NextRequest) {
  if (appUrl) return NextResponse.redirect(appUrl, 307);

  // No inventar un destino público: volver a la sección real de la suite.
  const locale = preferredLocale(request.headers.get('accept-language'));
  return NextResponse.redirect(new URL(`/${locale}#suite`, request.url), 307);
}
