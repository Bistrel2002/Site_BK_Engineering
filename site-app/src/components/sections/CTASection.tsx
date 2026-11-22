import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-accent to-primary-light" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-glow/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1200px] mx-auto text-center" style={{ paddingInline: "clamp(1rem, 5vw, 2rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Prêt à accélérer votre{" "}
            <span className="text-secondary-light">transformation ?</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discutons de votre projet. Notre équipe vous répond sous 24h avec une proposition d&apos;accompagnement personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight size={18} />}
              >
                Demander un devis gratuit
              </Button>
            </Link>
            {/* Masqué : bouton "Découvrir le portage" (page /portage désactivée)
            <Link to="/portage">
              <Button
                variant="ghost"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                Découvrir le portage
              </Button>
            </Link>
            */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
