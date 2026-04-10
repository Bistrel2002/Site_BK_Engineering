import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function Section({
  children,
  className,
  id,
  dark = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        dark ? "bg-bg-dark" : "bg-bg-darker",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto" style={{ paddingInline: "clamp(1rem, 5vw, 2rem)" }}>
        {children}
      </div>
    </section>
  );
}
