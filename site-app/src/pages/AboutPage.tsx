import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { staggerContainer, slideUp } from "@/animations/variants";
import {
  Target,
  Eye,
  Gem,
  Handshake,
  Rocket,
  Code2,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
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
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-black text-4xl md:text-5xl text-text-primary leading-none">
        {count}
        <span className="text-accent-light">{suffix}</span>
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-text-secondary mt-2">
        {label}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: <Target size={26} />,
    title: "Excellence",
    description:
      "Chaque ligne de code, chaque recommandation, chaque livrable reflète notre exigence de qualité absolue.",
    color: "accent",
  },
  {
    icon: <Eye size={26} />,
    title: "Transparence",
    description:
      "Communication claire, tarification honnête et visibilité totale sur l'avancement de vos projets.",
    color: "accent",
  },
  {
    icon: <Gem size={26} />,
    title: "Innovation",
    description:
      "Nous restons à la pointe des technologies pour vous offrir les solutions les plus performantes.",
    color: "secondary",
  },
  {
    icon: <Handshake size={26} />,
    title: "Partenariat",
    description:
      "Plus qu'un prestataire, nous sommes votre partenaire technologique engagé dans votre réussite.",
    color: "secondary",
  },
];

const hubFeatures = [
  {
    icon: <Code2 size={20} />,
    title: "Expertise Technique Pointue",
    description:
      "Des ingénieurs seniors maîtrisant les dernières technologies de l'écosystème.",
    side: "left",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Approche Transparente",
    description:
      "Tarification claire, reporting continu, zéro mauvaise surprise.",
    side: "right",
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Innovation Continue",
    description:
      "Veille technologique active et R&D intégrée dans chacune de nos missions.",
    side: "left",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Engagement Durable",
    description:
      "Des relations long-terme fondées sur la confiance et les résultats mesurables.",
    side: "right",
  },
];

const techTags = [
  "Intelligence Artificielle",
  "Cloud Natif",
  "DevOps / GitOps",
  "Microservices",
  "Data Engineering",
  "Kubernetes",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const leftFeatures = hubFeatures.filter((f) => f.side === "left");
  const rightFeatures = hubFeatures.filter((f) => f.side === "right");

  return (
    <main className="pt-20 overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          HERO — Parallax cinématique (style Medicia)
      ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-bg-darker"
      >
        {/* Ambient background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-darker via-bg-darker/95 to-bg-dark" />

        {/* Orbs animés */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Contenu avec parallax scroll */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1200px] mx-auto px-6"
        >
          <div className="grid lg:grid-cols-[1fr_2.2fr_1fr] gap-8 items-center">

            {/* Stat gauche */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col items-center gap-3"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
              <Counter value={2023} label="Fondée en" />
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
            </motion.div>

            {/* Contenu central */}
            <div className="text-center flex flex-col items-center gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-extrabold text-text-primary leading-tight"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
              >
                Une ESN née de la{" "}
                <span className="gradient-text">passion tech</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-lg text-text-secondary max-w-xl leading-relaxed"
              >
                BK Engineering accompagne entreprises et freelances dans leur
                transformation numérique, avec une expertise technique de pointe
                et un engagement humain sans compromis.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-colors duration-200 shadow-xl shadow-accent/25 cursor-pointer"
                  >
                    Nous contacter
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link to="/services">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-border-light/40 text-text-secondary hover:text-text-primary hover:border-accent/30 transition-colors duration-200 text-sm font-medium cursor-pointer"
                  >
                    Nos services
                  </motion.span>
                </Link>
              </motion.div>

              {/* Stats mobiles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-12 mt-4 lg:hidden"
              >
                <Counter value={2023} label="Fondée en" />
                <Counter value={6} label="Pôles d'expertise" />
              </motion.div>
            </div>

            {/* Stat droite */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col items-center gap-3"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
              <Counter value={6} label="Pôles d'expertise" />
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-secondary/40 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          NOTRE HISTOIRE — Slide-in bilatéral
      ══════════════════════════════════════════════════ */}
      <Section dark={false}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/15 to-secondary/10 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-black/50 bg-bg-card aspect-[4/3]">
                <img
                  src="/images/consulting-meeting.png"
                  alt="Réunion de conseil chez BK Engineering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h2
              className="font-display font-bold text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              De la vision à l'excellence technologique
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Créée en 2023 et inscrite au RCS de Rennes, BK Engineering est née de la
                volonté de ses fondateurs de proposer une alternative humaine aux grands
                groupes de conseil IT. Notre conviction : les meilleurs projets naissent
                de la confiance et de la proximité.
              </p>
              <p>
                Aujourd'hui, nous accompagnons des PME, ETI et grands comptes dans
                leurs projets de transformation numérique, avec une équipe de
                plus de 10 consultants experts répartis sur 6 pôles de compétences.
              </p>
              <p>
                Notre modèle unique intègre également une offre de portage salarial
                pour les freelances IT — créant un écosystème vertueux où les talents
                indépendants bénéficient de la sécurité de l'ESN tout en enrichissant
                notre capacité de delivery.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          MISSION / VISION / VALEURS — Style Medicia 3-cards
      ══════════════════════════════════════════════════ */}
      <Section dark>
        <SectionTitle
          title="Mission, Vision & Valeurs"
          subtitle="Trois piliers qui définissent qui nous sommes et comment nous travaillons chaque jour."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Mission */}
          <motion.div variants={slideUp}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="h-full p-8 rounded-3xl border border-border/40 bg-bg-card/50 hover:bg-bg-card hover:border-accent/30 transition-colors duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent-light mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Rocket size={22} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3">
                01
              </p>
              <h3 className="font-display font-bold text-xl text-text-primary mb-4">
                Mission
              </h3>
              <p className="text-text-secondary leading-relaxed text-[0.9rem]">
                Fournir des solutions technologiques sur mesure qui propulsent la
                croissance de nos clients, en combinant expertise technique,
                innovation et proximité humaine.
              </p>
            </motion.div>
          </motion.div>

          {/* Vision — carte mise en avant (style Medicia centre violet) */}
          <motion.div variants={slideUp}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              className="h-full p-8 rounded-3xl bg-gradient-to-br from-accent via-accent to-primary-light relative overflow-hidden cursor-default shadow-2xl shadow-accent/30"
            >
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-glow/20 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
                  <Eye size={22} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">
                  02
                </p>
                <h3 className="font-display font-bold text-xl text-white mb-4">
                  Vision
                </h3>
                <p className="text-white/85 leading-relaxed text-[0.9rem]">
                  Devenir la référence des ESN à taille humaine en France, reconnue
                  pour l'excellence de ses livrables et l'impact mesurable qu'elle
                  génère pour ses partenaires.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Valeurs */}
          <motion.div variants={slideUp}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="h-full p-8 rounded-3xl border border-border/40 bg-bg-card/50 hover:bg-bg-card hover:border-secondary/30 transition-colors duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary-light mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Gem size={22} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-3">
                03
              </p>
              <h3 className="font-display font-bold text-xl text-text-primary mb-4">
                Nos Valeurs
              </h3>
              <p className="text-text-secondary leading-relaxed text-[0.9rem]">
                Excellence, Transparence, Innovation et Partenariat — quatre valeurs
                fondatrices qui guident chacune de nos interactions et décisions
                quotidiennes.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════
          POURQUOI NOUS — Hub diagram (style Medicia)
      ══════════════════════════════════════════════════ */}
      <Section dark={false}>
        <SectionTitle
          title="Ce qui nous distingue"
          subtitle="Une approche unique qui combine rigueur technique, agilité et engagement humain."
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

          {/* Colonne gauche */}
          <div className="flex-1 space-y-5 w-full">
            {leftFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.25 } }}
                className="group p-6 rounded-2xl border border-border/40 bg-bg-card/40 hover:bg-bg-card/80 hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-end gap-4 text-right">
                  <div>
                    <h4 className="font-display font-semibold text-text-primary mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hub central */}
          <div className="flex-shrink-0 relative flex items-center justify-center w-36 h-36 lg:mx-6">
            {/* Lignes de connexion horizontales (desktop) */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.45 }}
            >
              {/* Anneaux pulsants */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-accent/30"
              />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute inset-0 rounded-full border border-accent/15"
              />
              {/* Cercle central */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-2xl shadow-accent/40 z-10">
                <span className="font-display font-black text-white text-2xl">BK</span>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite */}
          <div className="flex-1 space-y-5 w-full">
            {rightFeatures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: -4, transition: { duration: 0.25 } }}
                className="group p-6 rounded-2xl border border-border/40 bg-bg-card/40 hover:bg-bg-card/80 hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-text-primary mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          INNOVATION & R&D — Split layout
      ══════════════════════════════════════════════════ */}
      <Section dark>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte + tags */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h2
              className="font-display font-bold text-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              L'innovation au cœur de notre ADN
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Nous investissons constamment dans la R&D et la veille technologique
                pour anticiper les besoins de demain. Intelligence artificielle, Cloud
                natif, DevOps, architectures microservices — nous maîtrisons les
                technologies qui façonnent l'avenir.
              </p>
              <p>
                Notre laboratoire interne permet à nos consultants d'expérimenter les
                nouvelles technologies avant de les déployer chez nos clients,
                garantissant des recommandations éprouvées et des implémentations
                maîtrisées.
              </p>
            </div>

            {/* Tech tags */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {techTags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={slideUp}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent/10 text-accent-light border border-accent/20 cursor-default transition-colors hover:bg-accent/20"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/15 to-accent/10 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-black/50 bg-bg-card aspect-[4/3]">
                <img
                  src="/images/digital-transform.png"
                  alt="Innovation et transformation digitale chez BK Engineering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          NOS VALEURS — Grille de 4 cards avec hover
      ══════════════════════════════════════════════════ */}
      <Section dark={false}>
        <SectionTitle
          title="Ce qui nous anime au quotidien"
          subtitle="Des principes forts qui guident chacune de nos actions et interactions."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((val) => (
            <motion.div
              key={val.title}
              variants={slideUp}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <div className="h-full p-6 rounded-2xl border border-border/40 bg-bg-card/40 hover:bg-bg-card hover:border-accent/30 transition-colors duration-300 text-center group cursor-default">
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
                    val.color === "accent"
                      ? "bg-accent/10 text-accent-light group-hover:bg-accent group-hover:text-white"
                      : "bg-secondary/10 text-secondary-light group-hover:bg-secondary group-hover:text-white"
                  }`}
                >
                  {val.icon}
                </motion.div>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {val.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </main>
  );
}