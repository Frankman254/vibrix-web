'use client';

import { m } from 'motion/react';
import { stagger, wordRise } from '@/lib/motion';

type WordRevealProps = {
  /** Líneas; cada palabra entra por separado. */
  lines: { text: string; chroma?: string }[];
  className?: string;
  delay?: number;
};

/**
 * Titular con revelado por palabra. La palabra marcada como `chroma` recibe la
 * separación cian/magenta del logo.
 */
export function WordReveal({ lines, className, delay = 0.1 }: WordRevealProps) {
  return (
    <m.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            ...stagger(0.08).show.transition,
            delayChildren: delay,
          },
        },
      }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.text.split(' ').map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <m.span
                variants={wordRise}
                className="inline-block will-change-transform"
              >
                {word}
              </m.span>
              {' '}
            </span>
          ))}
          {line.chroma && (
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <m.span variants={wordRise} className="inline-block">
                <span className="chroma" data-text={line.chroma}>
                  {line.chroma}
                </span>
              </m.span>
            </span>
          )}
        </span>
      ))}
    </m.span>
  );
}
