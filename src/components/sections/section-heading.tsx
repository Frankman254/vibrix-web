import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}
    >
      <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-[clamp(2.2rem,5vw,3.9rem)] leading-[1] font-semibold tracking-[-0.045em] text-balance whitespace-pre-line"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-fg-mute">
          {description}
        </p>
      )}
    </Reveal>
  );
}
