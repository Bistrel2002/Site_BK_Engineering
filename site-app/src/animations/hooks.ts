import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { noAnimation } from "./variants";

export function useSafeVariants(normal: Variants): Variants {
  const reduce = useReducedMotion();
  return reduce ? noAnimation : normal;
}
