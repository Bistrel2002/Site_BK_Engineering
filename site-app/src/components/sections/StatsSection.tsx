import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Section from "@/components/layout/Section";

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix = "", label, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.floor(value * progress));

        if (frame === totalFrames) {
          clearInterval(timer);
        }
      }, frameRate);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-white/[0.05] transition-colors"
    >
      {/* Background glow behind numbers */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-5xl md:text-6xl font-display font-black text-white mb-2 flex items-baseline gap-1">
          <span className="bg-gradient-to-r from-accent to-accent-glow text-transparent bg-clip-text">
            {count}
          </span>
          <span className="text-3xl text-accent-glow font-bold">{suffix}</span>
        </div>
        <div className="text-sm md:text-base font-medium text-text-secondary uppercase tracking-widest">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  const stats = [
    { value: 15, suffix: "+", label: "Experts Tech", delay: 0 },
    { value: 100, suffix: "%", label: "Projets Livrés", delay: 0.1 },
    { value: 45, suffix: "+", label: "Technologies", delay: 0.2 },
    { value: 24, suffix: "/7", label: "Support & Maintenance", delay: 0.3 },
  ];

  return (
    <Section className="relative py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
