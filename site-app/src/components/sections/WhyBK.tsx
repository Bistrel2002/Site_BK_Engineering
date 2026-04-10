import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Section from "@/components/layout/Section";
import { Users, Award, Briefcase, Clock } from "lucide-react";

function AnimatedCounter({ value, suffix, className = "" }: { value: number; suffix: string; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={`font-display font-bold text-text-primary tracking-tight leading-none ${className}`}>
      {count}
      <span className="text-[0.6em] ml-1 text-text-primary/70">{suffix}</span>
    </div>
  );
}

export default function WhyBK() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the background rings and central image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotateRing1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotateRing2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yImage = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Section dark className="relative overflow-hidden py-24 lg:py-40" id="why-bk-creative">
      {/* Abstract Ambiance Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 blur-[150px] rounded-full pointer-events-none opacity-60 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/15 blur-[150px] rounded-full pointer-events-none opacity-60 -translate-x-1/3 translate-y-1/4" />

      {/* Giant Background Word Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0">
        EXCELLENCE
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Editorial Typography & Grounded Stats */}
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-accent tracking-tighter pb-2">
              Plus qu'une ESN.
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-secondary font-light max-w-lg leading-relaxed border-l-[3px] border-accent pl-8 py-2 relative"
          >
            Chez BK Engineering, chaque mission est un engagement personnel. Notre approche boutique garantit qualité, réactivité et une proximité sans égale avec vos enjeux technologiques uniques.
          </motion.p>

          {/* Integrated Horizontal Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 pt-8"
          >
            <div className="space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500 group-hover:-translate-y-1 transform">
                <Briefcase size={28} />
              </div>
              <AnimatedCounter value={50} suffix="+" className="text-4xl md:text-5xl" />
              <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Projets livrés</div>
            </div>
            
            <div className="space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary-light group-hover:bg-secondary group-hover:text-white transition-colors duration-500 group-hover:-translate-y-1 transform">
                <Users size={28} />
              </div>
              <AnimatedCounter value={30} suffix="+" className="text-4xl md:text-5xl" />
              <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Consultants actifs</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Creative Visual Composition */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center mt-16 lg:mt-0">
          
          {/* Decorative Parallax Rings */}
          <motion.div style={{ rotate: rotateRing1 }} className="absolute inset-0 rounded-full border border-white/10" />
          <motion.div style={{ rotate: rotateRing2 }} className="absolute inset-10 rounded-full border border-white/5 border-dashed" />
          
          {/* Deep glowing center hole */}
          <div className="absolute inset-24 rounded-full bg-gradient-to-br from-accent/5 to-secondary/5 blur-2xl opacity-80" />

          {/* Central Tilted Photo Frame */}
          <motion.div 
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="relative z-10 w-[65%] aspect-[3/4] p-3 glass rounded-[3rem] shadow-2xl shadow-black/80 group cursor-pointer"
          >
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
              <img 
                src="/images/team-photo.png" 
                alt="BK Engineering Team" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-[-4deg] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Floating Stat Widget 1 - Top Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-[12%] -right-2 lg:-right-8 z-20"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="glass p-6 pr-10 rounded-3xl shadow-xl border border-white/10 flex flex-col items-start gap-2 relative overflow-hidden group hover:border-accent/30 transition-colors"
            >
              <div className="absolute right-0 top-0 w-28 h-28 bg-accent/20 rounded-full blur-[30px] translate-x-1/3 -translate-y-1/3 group-hover:bg-accent/30 transition-colors" />
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-2 relative z-10">
                <Award size={20} />
              </div>
              <AnimatedCounter value={98} suffix="%" className="text-3xl lg:text-4xl relative z-10" />
              <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary relative z-10 mt-1">Satisfaction</span>
            </motion.div>
          </motion.div>

          {/* Floating Stat Widget 2 - Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-[20%] -left-2 lg:-left-12 z-30"
          >
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
              className="glass p-5 pr-8 rounded-3xl shadow-xl border border-white/10 flex items-center gap-5 relative overflow-hidden group hover:border-secondary/30 transition-colors"
            >
              <div className="absolute left-0 bottom-0 w-28 h-28 bg-secondary/20 rounded-full blur-[30px] -translate-x-1/3 translate-y-1/3 group-hover:bg-secondary/30 transition-colors" />
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary relative z-10">
                 <Clock size={28} />
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <AnimatedCounter value={5} suffix=" ans" className="text-3xl lg:text-4xl" />
                <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">D'expérience</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
