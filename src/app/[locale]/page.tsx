import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Editor } from '@/components/sections/editor';
import { Faq } from '@/components/sections/faq';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { Showcase } from '@/components/sections/showcase';
import { Suite } from '@/components/sections/suite';
import { Workflow } from '@/components/sections/workflow';
import { routing } from '@/i18n/routing';
import { Features } from '@/components/sections/features';
import { Comparison } from '@/components/sections/comparison';
import { Waitlist } from '@/components/sections/waitlist';
import { SoftwareSchema } from '@/components/seo/software-schema';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <SoftwareSchema locale={locale} />
      <Hero locale={locale} />
      <Marquee />
      <Showcase />
      <Workflow />
      <Features />
      <Editor />
      <Suite />
      <Comparison />
      <Waitlist locale={locale} />
      <Faq />
      <FinalCta locale={locale} />
    </>
  );
}
