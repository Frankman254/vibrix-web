"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HeaderBackdrop() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 64], [0, 1]);
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 border-b border-line bg-bg/90 backdrop-blur-xl"
      style={{ opacity: reducedMotion ? 1 : opacity }}
    />
  );
}
