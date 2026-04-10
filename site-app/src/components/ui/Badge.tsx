import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "accent";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-border-light/30 text-text-secondary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  accent: "bg-accent/15 text-accent-light",
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
