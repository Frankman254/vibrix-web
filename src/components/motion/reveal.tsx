'use client';

import { m } from 'motion/react';
import { ease } from '@/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Entrada al hacer scroll. MotionConfig reducedMotion="user" la anula. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </m.div>
  );
}
