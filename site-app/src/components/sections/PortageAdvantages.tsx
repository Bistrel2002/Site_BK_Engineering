import { motion } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { Shield, Heart, Wallet, FileCheck, Users, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

/* ── Palette ─────────────────────────────────────────────── */

const A = {
  blue: {
    icon:    "#3B82F6",
    text:    "#60A5FA",
    bg:      "rgba(37,99,235,0.09)",
    bgH:     "rgba(37,99,235,0.15)",
    border:  "rgba(37,99,235,0.22)",
    borderH: "rgba(59,130,246,0.55)",
    shadow:  "rgba(37,99,235,0.18)",
    glow:    "#2563EB",
  },
  amber: {
    icon:    "#F59E0B",
    text:    "#FBBF24",
    bg:      "rgba(245,158,11,0.08)",
    bgH:     "rgba(245,158,11,0.14)",
    border:  "rgba(245,158,11,0.20)",
    borderH: "rgba(251,191,36,0.50)",
    shadow:  "rgba(245,158,11,0.16)",
    glow:    "#F59E0B",
  },
} as const;

type AccentKey = keyof typeof A;

/* ── Data ────────────────────────────────────────────────── */

interface Item {
  Icon: LucideIcon;
  title: string;
  description: string;
  num: string;
  accent: AccentKey;
  stat?: string;
}

const items: Item[] = [
  { Icon: Shield,     num: "01", accent: "blue",  title: "RC Pro Couvrante",      description: "Bénéficiez de la RC Professionnelle de l'ESN BK Engineering pour toutes vos missions, sans frais supplémentaires." },
  { Icon: Heart,      num: "02", accent: "amber", title: "Mutuelle & Prévoyance",  description: "Protection sociale complète incluant mutuelle, prévoyance et maintien de salaire en cas d'arrêt." },
  { Icon: Wallet,     num: "03", accent: "amber", title: "Frais de gestion",       description: "Transparents et compétitifs, sans aucune surprise en fin de mois. Pas de frais cachés.", stat: "7%" },
  { Icon: FileCheck,  num: "04", accent: "blue",  title: "Gestion Administrative", description: "Facturation, déclarations, bulletins de paie — BK Engineering s'occupe de toute votre paperasse." },
  { Icon: Users,      num: "05", accent: "blue",  title: "Réseau de Missions",     description: "Accédez aux missions internes de l'ESN et à l'ensemble du réseau de clients BK Engineering." },
  { Icon: Headphones, num: "06", accent: "amber", title: "Accompagnement Dédié",   description: "Un conseiller personnel pour vous guider à chaque étape de votre parcours en portage salarial." },
];

const left  = items.slice(0, 3);
const right = items.slice(3, 6);

/* ── Single item ─────────────────────────────────────────── */

function FeatureItem({ item, side }: { item: Item; side: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);
  const c = A[item.accent];
  const delay = (parseInt(item.num) - 1) * 0.08;
  const fromX = side === "left" ? -32 : 32;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? c.bg : "transparent",
          borderColor:     hovered ? c.borderH : "transparent",
          boxShadow:       hovered ? `inset 0 0 0 1px ${c.borderH}` : "none",
        }}
        transition={{ duration: 0.22 }}
        className="flex gap-4 p-5 rounded-2xl border border-transparent"
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
          animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.22 }}
          style={{
            background: `linear-gradient(180deg, transparent, ${c.icon}, transparent)`,
            transformOrigin: "center",
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            backgroundColor: hovered ? c.bgH : c.bg,
            boxShadow: hovered
              ? `0 0 0 1px ${c.borderH}, 0 8px 20px ${c.shadow}`
              : `0 0 0 1px ${c.border}`,
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.22 }}
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center self-start"
        >
          <item.Icon size={21} color={c.icon} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <h3 className="font-display font-semibold text-[0.9375rem] leading-snug text-text-primary">
              {item.title}
            </h3>
            {item.stat && (
              <motion.span
                animate={{
                  background: hovered ? c.bgH : c.bg,
                  borderColor: hovered ? c.borderH : c.border,
                }}
                transition={{ duration: 0.22 }}
                className="shrink-0 font-display font-black text-[12px] px-2 py-0.5 rounded-lg border"
                style={{ color: c.text }}
              >
                {item.stat}
              </motion.span>
            )}
          </div>

          <p className="text-text-secondary text-[0.8125rem] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Number — top right */}
        <motion.span
          animate={{ opacity: hovered ? 0.55 : 0.14, color: hovered ? c.icon : "#94A3B8" }}
          transition={{ duration: 0.2 }}
          className="shrink-0 self-start font-display font-black text-[11px] tabular-nums pt-1"
        >
          {item.num}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ── Animated center divider ─────────────────────────────── */

function CenterDivider() {
  return (
    <div className="hidden md:flex flex-col items-center self-stretch px-4">
      {/* Top fade */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="flex-1 w-px origin-top"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.45) 30%, rgba(59,130,246,0.6) 50%, rgba(245,158,11,0.45) 70%, transparent 100%)",
        }}
      />

      {/* Center pulsing node */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="shrink-0 w-2.5 h-2.5 rounded-full my-1"
        style={{ background: "linear-gradient(135deg, #3B82F6, #F59E0B)" }}
      />

      {/* Bottom fade */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="flex-1 w-px origin-bottom"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,158,11,0.45) 0%, rgba(59,130,246,0.45) 30%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */

export default function PortageAdvantages() {
  return (
    <Section dark>
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[520px] h-[300px] rounded-full blur-[100px] opacity-[0.15]"
          style={{ background: "radial-gradient(ellipse,#2563EB,transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[240px] rounded-full blur-[100px] opacity-[0.11]"
          style={{ background: "radial-gradient(ellipse,#F59E0B,transparent 70%)" }}
        />
      </div>

      <SectionTitle
        title="Pourquoi choisir le portage chez BK ?"
        subtitle="Tous les avantages du salariat, toute la liberté du freelancing."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-0">
        {/* Left column */}
        <div className="flex flex-col gap-1">
          {left.map(item => (
            <FeatureItem key={item.num} item={item} side="left" />
          ))}
        </div>

        {/* Divider */}
        <CenterDivider />

        {/* Right column */}
        <div className="flex flex-col gap-1">
          {right.map(item => (
            <FeatureItem key={item.num} item={item} side="right" />
          ))}
        </div>
      </div>
    </Section>
  );
}