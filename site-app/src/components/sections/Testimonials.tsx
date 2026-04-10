import { motion } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Quote, Star } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "DSI",
    company: "LogiTech Solutions",
    initial: "MD",
    color: "from-accent to-accent-light",
    text: "BK Engineering a transformé notre infrastructure SI en 6 mois. Leur expertise cloud et leur réactivité nous ont permis de réduire nos coûts de 40% tout en améliorant nos performances.",
  },
  {
    id: 2,
    name: "Sophie Bernard",
    role: "Directrice Innovation",
    company: "RetailPrime",
    initial: "SB",
    color: "from-secondary to-secondary-light",
    text: "Leur accompagnement en transformation digitale a été un véritable catalyseur. Vision stratégique et exécution impeccable — exactement ce que nous cherchions.",
  },
  {
    id: 3, // Featured center
    name: "Thomas Martin",
    role: "CTO",
    company: "FinanceFlow",
    initial: "TM",
    color: "from-accent to-accent-glow",
    text: "L'équipe de développement a livré une application métier complexe dans les délais et avec une qualité irréprochable. BK Engineering est un vrai partenaire technologique — pas un simple prestataire. Je les recommande sans la moindre réserve.",
  },
  {
    id: 4,
    name: "Lucas Moreau",
    role: "Développeur Freelance",
    company: "BK Portage",
    initial: "LM",
    color: "from-accent to-primary-light",
    text: "Le portage salarial chez BK Engineering, c'est la sérénité : RC Pro couvrante, simulateur transparent, et une équipe aux petits soins. Je recommande sans hésiter.",
  },
  {
    id: 5,
    name: "Camille Roux",
    role: "CEO",
    company: "TechStartup SAS",
    initial: "CR",
    color: "from-secondary to-accent",
    text: "Une équipe réactive, compétente et à l'écoute. Ils ont su s'adapter à nos contraintes et livrer un MVP de qualité en un temps record.",
  },
];

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className="fill-secondary text-secondary" />
      ))}
    </div>
  );
}

// ─── Small card (text-forward) ────────────────────────────────────────────────
function SmallTextCard({
  t,
  delay,
  direction,
}: {
  t: (typeof testimonials)[0];
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group p-6 rounded-2xl border border-border/40 bg-bg-card/50 hover:bg-bg-card hover:border-accent/20 transition-all duration-300 cursor-default"
    >
      <Quote size={20} className="text-accent/30 mb-3" />
      <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}
          >
            {t.initial}
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary leading-tight">
              {t.name}
            </div>
            <div className="text-xs text-text-secondary/70 leading-tight mt-0.5">
              {t.role}
            </div>
          </div>
        </div>
        <Stars />
      </div>
    </motion.div>
  );
}

// ─── Profile-forward small card ───────────────────────────────────────────────
function SmallProfileCard({
  t,
  delay,
  direction,
}: {
  t: (typeof testimonials)[0];
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group p-6 rounded-2xl border border-border/40 bg-bg-card/50 hover:bg-bg-card hover:border-accent/20 transition-all duration-300 cursor-default"
    >
      {/* Profile top */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg`}
        >
          {t.initial}
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary leading-tight">
            {t.name}
          </div>
          <div className="text-xs text-text-secondary/70 leading-tight mt-0.5">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
      <Stars />
      <p className="text-text-secondary text-sm leading-relaxed mt-4 italic">
        &ldquo;{t.text}&rdquo;
      </p>
    </motion.div>
  );
}

// ─── Featured center card ─────────────────────────────────────────────────────
function FeaturedCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden h-full cursor-default"
      style={{ minHeight: "420px" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-primary-light" />
      {/* Decorative blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent-glow/20 rounded-full blur-2xl pointer-events-none" />
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-between gap-6">
        {/* Top: quote icon + stars */}
        <div className="flex items-start justify-between">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Quote size={48} className="text-white/30" />
          </motion.div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-secondary text-secondary" />
            ))}
          </div>
        </div>

        {/* Quote text */}
        <p className="text-white/90 text-base md:text-lg leading-relaxed italic font-light flex-1">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Mission badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20 w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
          Mission réussie — résultats mesurables
        </motion.div>

        {/* Profile bottom */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/20">
          <div
            className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base shadow-xl flex-shrink-0 border-2 border-white/30`}
          >
            {t.initial}
          </div>
          <div>
            <div className="font-semibold text-white leading-tight">{t.name}</div>
            <div className="text-white/70 text-sm mt-0.5">
              {t.role} · {t.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [left1, left2, featured, right1, right2] = testimonials;

  return (
    <Section dark>
      <SectionTitle
        title="Ce que nos clients et consultants disent"
        subtitle="La satisfaction de nos partenaires est notre meilleure carte de visite."
      />

      {/* Desktop: 3-column masonry */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5 items-stretch">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          <SmallTextCard t={left1} delay={0.1} direction="left" />
          <SmallProfileCard t={left2} delay={0.25} direction="left" />
        </div>

        {/* Center — featured */}
        <FeaturedCard t={featured} />

        {/* Right column */}
        <div className="flex flex-col gap-5">
          <SmallTextCard t={right1} delay={0.1} direction="right" />
          <SmallProfileCard t={right2} delay={0.25} direction="right" />
        </div>
      </div>

      {/* Mobile / Tablet: stacked cards */}
      <div className="lg:hidden space-y-5">
        <FeaturedCard t={featured} />
        {[left1, left2, right1, right2].map((t, i) => (
          <SmallProfileCard key={t.id} t={t} delay={i * 0.1} direction="left" />
        ))}
      </div>
    </Section>
  );
}