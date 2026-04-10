import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, Calculator, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { gsap } from "gsap";

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Create scroll-driven animation values
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, -250]); // Move up to 250px
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]); // Fade out

  useEffect(() => {
    if (!particlesRef.current) return;
    const particles = particlesRef.current.querySelectorAll(".particle");

    const ctx = gsap.context(() => {
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: -30 + Math.random() * 60,
          x: -20 + Math.random() * 40,
          opacity: 0.15 + Math.random() * 0.35,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, particlesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-darker">
      {/* Backgrounds - We also fade the background subtly with scroll */}
      <motion.div style={{ opacity: opacityFade }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-darker via-primary-light/5 to-transparent" />
        
        {/* Floating particles background layer */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 rounded-full bg-accent-light/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Background large shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-[100px] rotate-45 blur-[80px] pointer-events-none" />
      </motion.div>

      {/* Main Content - Wrapped in motion block with scroll-driven values */}
      <motion.div 
        style={{ y: yOffset, opacity: opacityFade, paddingInline: "clamp(1rem, 5vw, 2rem)" }}
        className="relative z-10 max-w-[1200px] mx-auto w-full pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Side: Typography and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* Bold Stacked Headline with bi-color effect mimicking the reference */}
            <h1
              className="font-display font-bold leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: "clamp(3rem, 5.5vw, 4.5rem)" }}
            >
              <span className="text-white block">Votre partenaire</span>
              <span className="text-white block">tech</span>
              <span className="text-text-secondary/50 block font-medium mt-1">de confiance</span>
            </h1>

            {/* Subtext */}
            <p className="text-[1.1rem] text-text-secondary leading-relaxed font-medium mb-10 max-w-md">
              BK Engineering accompagne les entreprises dans leur transformation
              numérique : Conseil SI, Développement, Cloud, Intégration, Tests et
              Digitalisation en un seul endroit.
            </p>

            {/* Call to Actions & Trust snippet side-by-side */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <Link to="/contact">
                {/* Purple-ish button mimicking the reference "Book a demo" */}
                <Button 
                  className="rounded-xl px-7 py-4 text-[14px] font-semibold bg-[#5c4b8b] hover:bg-[#4a3c70] text-white border-none shadow-lg gap-3"
                >
                  Découvrir nos services
                  <span className="flex">
                    <ChevronRight size={14} className="-mr-1 opacity-70" />
                    <ChevronRight size={14} />
                  </span>
                </Button>
              </Link>
              <Link to="/portage">
                {/* Outline button mimicking "Take a platform tour" */}
                <Button 
                  variant="ghost"
                  className="rounded-xl px-6 py-4 text-[14px] font-semibold border-text-secondary/30 text-text-secondary hover:text-white hover:border-text-secondary gap-2"
                >
                  <Calculator size={16} />
                  Simuler mon revenu
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Reorganized Floating UI over the image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* The main abstract image acting as the "blob/background" element */}
            <div className="relative w-[90%] ml-auto z-0 drop-shadow-2xl">
              <img
                src="/images/hero-abstract.png"
                alt="Architecture and Tech"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </div>

            {/* Floating UI Widget 1: Mimics the dark upper card */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute top-4 left-0 glass bg-bg-card/90 border border-border/50 rounded-2xl p-5 shadow-2xl w-64 z-10 backdrop-blur-md"
            >
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Expertise
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-accent/20 text-accent-light text-[11px] rounded-full font-medium">
                  Cloud
                </span>
                <span className="px-3 py-1 bg-secondary/20 text-secondary-light text-[11px] rounded-full font-medium">
                  DevOps
                </span>
                <span className="px-3 py-1 bg-white/5 text-text-secondary text-[11px] rounded-full font-medium">
                  Architecture
                </span>
              </div>
              <div className="mt-4 text-[11px] text-text-secondary/60">
                Accompagnement sur-mesure complet
              </div>
            </motion.div>

            {/* Floating UI Widget 2: Mimics the dark pill with icon ("Automatically booked") */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-1/4 right-0 glass bg-bg-card border border-border/50 rounded-lg px-4 py-3 shadow-xl flex items-center gap-3 z-10"
            >
              <CheckCircle2 size={16} className="text-success" />
              <span className="text-sm font-medium text-white">98% Taux de réussite</span>
            </motion.div>

            {/* Floating UI Widget 3: Mimics the profile white card ("See you at athenahealth") */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-12 glass bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl w-56 z-10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold text-[16px]">
                  +
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight mt-1">+30 Consultants</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">Disponibles pour mission</div>
                </div>
              </div>
              <button className="w-full mt-2 py-2 bg-[#e2a87a] hover:bg-[#d69666] text-bg-dark text-[11px] font-bold rounded-lg transition-colors">
                En savoir plus
              </button>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
