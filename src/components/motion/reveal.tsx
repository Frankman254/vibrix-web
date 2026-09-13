'use client';

import { m, useReducedMotion } from 'motion/react';
import { ease } from '@/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** El HTML es visible incluso sin JavaScript. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [y, 0] }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </m.div>
  );
}
