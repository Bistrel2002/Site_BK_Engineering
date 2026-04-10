import type { Variants } from "motion/react";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } },
};

export const counterVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

/* Reduced motion variants */
export const fadeInReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const noAnimation: Variants = {
  hidden: {},
  visible: {},
};
