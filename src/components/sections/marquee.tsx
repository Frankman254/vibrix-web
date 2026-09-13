import { getTranslations } from 'next-intl/server';

export async function Marquee() {
  const t = await getTranslations('Marquee');
  const items = t.raw('items') as string[];
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-7 font-display text-2xl font-medium tracking-tight whitespace-nowrap text-fg-mute sm:text-3xl">
            {item}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5 text-accent"
          >
            <path
              d="M2 4 8 12l6-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label={t('label')}
      className="relative border-y border-line bg-surface/40 py-6"
    >
      <div className="flex overflow-hidden mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
