import type { CSSProperties } from 'react';

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
  let wordCount = 0;
  const timing = (): CSSProperties => ({
    animationDelay: `${delay + wordCount++ * 0.08}s`,
  });

  return (
    <span className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.text.split(' ').map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="-mb-[0.12em] inline-block pb-[0.12em] align-bottom"
            >
              <span className="word-settle inline-block" style={timing()}>
                {word}
              </span>
              {' '}
            </span>
          ))}
          {line.chroma && (
            <span className="-mb-[0.12em] inline-block pb-[0.12em] align-bottom">
              <span className="word-settle inline-block" style={timing()}>
                <span className="chroma" data-text={line.chroma}>
                  {line.chroma}
                </span>
              </span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
