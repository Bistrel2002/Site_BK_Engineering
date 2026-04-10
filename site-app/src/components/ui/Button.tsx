import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20",
  secondary:
    "bg-secondary text-bg-dark hover:bg-secondary-light shadow-lg shadow-secondary/20",
  ghost:
    "bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent",
  destructive:
    "bg-error text-white hover:bg-red-600 shadow-lg shadow-error/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  icon,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
