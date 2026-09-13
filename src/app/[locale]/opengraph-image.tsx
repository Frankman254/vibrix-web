import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const [hero, common, logo] = await Promise.all([
    getTranslations({ locale, namespace: 'Hero' }),
    getTranslations({ locale, namespace: 'Common' }),
    readFile(join(process.cwd(), 'public/brand/vibrix-logo-192.png')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 72,
        background: '#05070d',
        color: '#f2f3f5',
        fontFamily: 'sans-serif',
        backgroundImage:
          'radial-gradient(circle at 95% 5%, #173444 0%, #05070d 65%)',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 34 }}
      >
        <img
          src={`data:image/png;base64,${logo.toString('base64')}`}
          alt=""
          width={64}
          height={64}
        />
        {common('brand')}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 48,
          fontSize: 84,
          letterSpacing: -4,
          lineHeight: 1.08,
          fontWeight: 700,
        }}
      >
        <span>{hero('titleStart')}</span>
        <span style={{ color: '#67e8f9' }}>
          {hero('titleMid')} {hero('titleEnd')}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 'auto',
          justifyContent: 'space-between',
          borderTop: '1px solid #263746',
          paddingTop: 28,
          fontSize: 22,
          color: '#c1ccd4',
        }}
      >
        <span>{hero('eyebrow')}</span>
        <span>{hero('status')}</span>
      </div>
    </div>,
    size,
  );
}
