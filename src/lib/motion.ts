export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const stagger = (delay = 0.06) => ({
  show: { transition: { staggerChildren: delay } },
});

/** Palabra que sube desde detrás de una máscara (ver <WordReveal>). */
export const wordRise = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease } },
};
