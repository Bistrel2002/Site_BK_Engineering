import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "outlined" | "glass";

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg-card border border-border",
  elevated: "bg-bg-card shadow-xl shadow-black/20",
  outlined: "bg-transparent border border-border",
  glass: "glass",
};

export default function Card({
  variant = "default",
  children,
  className,
  hover = true,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }
          : undefined
      }
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl p-6 transition-colors duration-200",
        variantStyles[variant],
        hover && "hover:bg-bg-card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
