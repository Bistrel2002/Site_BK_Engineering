import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  align = "center",
  children,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent-light border border-accent/20">
          {badge}
        </span>
      )}
      <h2 className="font-display font-bold text-text-primary leading-tight" style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
