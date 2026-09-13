import type { Locale } from '@/i18n/routing';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function Footer({ locale }: { locale: Locale }) {
  const [common, footer, navigation] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Footer'),
    getTranslations('Navigation'),
  ]);
  const links = [
    { href: `/${locale}#showcase`, label: navigation('showcase') },
    { href: `/${locale}#workflow`, label: navigation('workflow') },
    { href: `/${locale}#suite`, label: navigation('suite') },
    { href: `/${locale}#faq`, label: navigation('faq') },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-7 lg:px-10">
        <div className="flex flex-col justify-between gap-9 pb-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <a
              href={`/${locale}`}
              aria-label={common('home')}
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src="/brand/vibrix-logo.svg"
                alt=""
                width={32}
                height={32}
              />
              <span className="font-display text-[1.4rem] font-semibold tracking-[-0.06em] text-fg">
                {common('brand')}
              </span>
            </a>
            <p className="mt-4 text-sm leading-6 text-fg-mute">
              {footer('description')}
            </p>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <nav aria-label={footer('navigation')}>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-sm text-sm text-fg-mute transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] text-fg-mute">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              {footer('status')}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fg-mute sm:flex-row sm:items-center">
          <p>{footer('copyright', { year: new Date().getFullYear() })}</p>
          <p>{footer('madeBy')}</p>
        </div>
      </div>
    </footer>
  );
}
