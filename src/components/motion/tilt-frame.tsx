'use client';

import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

/** Marco de pantalla que se inclina hacia el cursor y flota con el scroll. */
export function TiltFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-7, 7]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [6, -6]),
    spring,
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1400 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <m.div
        style={reducedMotion ? undefined : { rotateX, rotateY, y }}
        className="will-change-transform transform-3d"
      >
        {children}
      </m.div>
    </div>
  );
}
