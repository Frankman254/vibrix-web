'use client';

import { m, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

/** Línea vertical que se dibuja al recorrer la sección (scaleY). */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <div className="absolute inset-0 bg-line" />
      <m.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-linear-to-b from-cyan via-accent to-magenta"
      />
    </div>
  );
}
