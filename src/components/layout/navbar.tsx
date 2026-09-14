import type { Locale } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { appUrl } from '@/config/links';
import { HeaderBackdrop } from './header-backdrop';
import { MobileMenu } from './mobile-menu';

export async function Navbar({ locale }: { locale: Locale }) {
  const [common, navigation, spanish, english] = await Promise.all([
    getTranslations('Common'),
    getTranslations('Navigation'),
    getTranslations({ locale: 'es', namespace: 'Navigation' }),
    getTranslations({ locale: 'en', namespace: 'Navigation' }),
  ]);
  const links = [
    { href: `/${locale}#showcase`, label: navigation('showcase') },
    { href: `/${locale}#workflow`, label: navigation('workflow') },
    { href: `/${locale}#suite`, label: navigation('suite') },
    { href: `/${locale}#faq`, label: navigation('faq') },
  ];
  const languages = (['es', 'en'] as const).map((language) => {
    const label =
      language === 'es' ? spanish('localeName') : english('localeName');
    return {
      locale: language,
      label,
      href: `/${language}`,
      current: locale === language,
      accessibleLabel: navigation('switchLocale', { locale: label }),
    };
  });
  const action = {
    href: appUrl,
    label: common('openApp'),
    external: true,
    title: common('external'),
  };
  return (
    <header className="fixed inset-x-0 top-0 isolate z-40">
      <HeaderBackdrop />
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <a
          href={`/${locale}`}
          aria-label={common('home')}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src="/brand/vibrix-logo.svg"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span className="font-display text-[1.4rem] font-semibold tracking-[-0.06em] text-fg">
            {common('brand')}
          </span>
        </a>
        <nav aria-label={navigation('label')} className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-9">
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
        <div className="hidden items-center gap-5 md:flex">
          <nav aria-label={navigation('language')}>
            {languages
              .filter((language) => !language.current)
              .map((language) => (
                <a
                  key={language.locale}
                  href={language.href}
                  hrefLang={language.locale}
                  lang={language.locale}
                  aria-label={language.accessibleLabel}
                  className="inline-flex min-h-11 items-center rounded-sm text-xs text-fg-mute transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {language.label}
                </a>
              ))}
          </nav>
          <a
            href={action.href}
            target="_blank"
            rel="noopener"
            title={action.title}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent/35 bg-accent px-5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {action.label}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
        <MobileMenu
          openLabel={navigation('openMenu')}
          closeLabel={navigation('closeMenu')}
          title={navigation('menuTitle')}
          navigationLabel={navigation('label')}
          languageLabel={navigation('language')}
          links={links}
          languages={languages}
          action={action}
        />
      </div>
    </header>
  );
}
