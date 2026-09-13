'use client';

import { m, useReducedMotion } from 'motion/react';
import { ease } from '@/lib/motion';

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : { y: [16, 0], opacity: [0.65, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </m.div>
  );
}
