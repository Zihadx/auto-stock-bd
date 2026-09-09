import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

// A tween (not a spring) so the card lift matches the same easing curve as
// the image zoom / badge scale / arrow rotate — one consistent feel instead
// of a spring fighting several different CSS transition durations.
export const cardHover = { y: -6, transition: { duration: 0.45, ease: EASE } };