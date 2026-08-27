import type { Transition, Variants } from "framer-motion";

/**
 * Global motion language. Every animated component in later milestones
 * should pull from here rather than inventing its own durations/eases,
 * so motion feels like one system across the app.
 */

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

export const duration = {
  instant: 0.1,
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
  cinematic: 0.9,
} as const;

export const transition = {
  fast: { duration: duration.fast, ease: ease.out } satisfies Transition,
  base: { duration: duration.base, ease: ease.out } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.out } satisfies Transition,
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 22,
  } satisfies Transition,
} as const;

/** Standard entrance: fade + gentle rise. The workhorse for reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

/** Larger rise, for hero-scale or section-scale entrances. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.base },
};

/** Wrap a list/grid with this, give each child `fadeUp`, for a staggered reveal. */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Viewport trigger defaults for scroll-based reveals (whileInView). */
export const viewport = { once: true, margin: "-10% 0px -10% 0px" } as const;
