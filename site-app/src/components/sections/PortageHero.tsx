import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PortageHero() {
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, -150]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ opacity: opacityFade }} className="absolute inset-0 bg-gradient-to-br from-bg-dark via-primary-light/20 to-secondary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-3xl" />

      <motion.div 
        style={{ y: yOffset, opacity: opacityFade, paddingInline: "clamp(1rem, 5vw, 2rem)" }}
        className="relative z-10 max-w-[1200px] mx-auto w-full pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >

            <h1
              className="font-display font-extrabold leading-tight text-text-primary mb-6"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
            >
              Freelance ET salarié ?{" "}
              <span className="bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                C&apos;est possible.
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              Gardez votre liberté d&apos;indépendant tout en bénéficiant de la sécurité du salariat.
              RC Pro couvrante, mutuelle, prévoyance, et des frais de gestion transparents.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#simulateur">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowDown size={18} />}
                >
                  Simuler mon revenu
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="ghost" size="lg">
                  Parler à un conseiller
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/15 to-accent/10 rounded-2xl blur-2xl" />
              <img
                src="/images/freelance-working.png"
                alt="Consultant freelance travaillant sereinement en portage salarial"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-2xl shadow-black/30 border border-border/30 w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
