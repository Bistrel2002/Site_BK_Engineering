import { motion } from "motion/react";
import Section from "@/components/layout/Section";

interface BlockProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function Block({ number, title, children }: BlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border border-border/40 rounded-2xl p-6 md:p-8 bg-bg-card/40 hover:bg-bg-card/70 transition-colors duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 text-accent-light text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <h2 className="font-display font-bold text-lg text-text-primary leading-snug pt-0.5">
          {title}
        </h2>
      </div>
      <div className="pl-12 text-text-secondary text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </motion.div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-bg-darker">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-darker via-bg-darker/95 to-bg-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent-light border border-accent/20">
              Légal
            </span>
            <h1
              className="font-display font-extrabold text-text-primary"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Mentions Légales
            </h1>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
              pour la confiance dans l'économie numérique.
            </p>
          </motion.div>
        </div>
      </section>

      <Section dark={false}>
        <div className="max-w-[800px] mx-auto space-y-5">

          <Block number="01" title="Éditeur du site">
            <p>
              <strong className="text-text-primary">Raison sociale :</strong> BK-ENGINEERING
            </p>
            <p>
              <strong className="text-text-primary">Forme juridique :</strong> SASU — Société par Actions Simplifiée Unipersonnelle
            </p>
            <p>
              <strong className="text-text-primary">Capital social :</strong> Inscrit au RCS de Rennes
            </p>
            <p>
              <strong className="text-text-primary">SIREN :</strong> 951 685 031
            </p>
            <p>
              <strong className="text-text-primary">SIRET (siège) :</strong> 951 685 031 00019
            </p>
            <p>
              <strong className="text-text-primary">Numéro de TVA intracommunautaire :</strong> FR76951685031
            </p>
            <p>
              <strong className="text-text-primary">N° RCS :</strong> 951 685 031 R.C.S. Rennes
            </p>
            <p>
              <strong className="text-text-primary">Date d'immatriculation :</strong> 13 avril 2023
            </p>
            <p>
              <strong className="text-text-primary">Code NAF / APE :</strong> 62.02A — Conseil en systèmes et logiciels informatiques
            </p>
            <p>
              <strong className="text-text-primary">Convention collective :</strong> Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils — IDCC 1486
            </p>
          </Block>

          <Block number="02" title="Siège social">
            <p>63 Rue du 19 Mars 1962</p>
            <p>35700 Rennes, France</p>
            <p>
              <strong className="text-text-primary">Email :</strong>{" "}
              <a href="mailto:bikel.keumeka@bkengineering.fr" className="text-accent-light hover:underline">
                bikel.keumeka@bkengineering.fr
              </a>
            </p>
          </Block>

          <Block number="03" title="Directeur de la publication">
            <p>
              Le directeur de la publication est le représentant légal de la société BK-ENGINEERING.
            </p>
          </Block>

          <Block number="04" title="Hébergement">
            <p>
              Le site est hébergé par un prestataire tiers. Les coordonnées de l'hébergeur sont
              disponibles sur simple demande à l'adresse{" "}
              <a href="mailto:bikel.keumeka@bkengineering.fr" className="text-accent-light hover:underline">
                bikel.keumeka@bkengineering.fr
              </a>.
            </p>
          </Block>

          <Block number="05" title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, graphismes, logos,
              icônes, sons, logiciels) est la propriété exclusive de BK-ENGINEERING ou de ses
              partenaires, et est protégé par les lois françaises et internationales relatives
              à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou
              publication, même partielle, de ces différents éléments est strictement interdite
              sans l'accord exprès par écrit de BK-ENGINEERING.
            </p>
          </Block>

          <Block number="06" title="Limitation de responsabilité">
            <p>
              BK-ENGINEERING s'efforce d'assurer l'exactitude et la mise à jour des informations
              diffusées sur ce site. Toutefois, BK-ENGINEERING ne peut garantir l'exactitude,
              la précision ou l'exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              BK-ENGINEERING décline toute responsabilité pour toute imprécision, inexactitude
              ou omission portant sur des informations disponibles sur ce site, ainsi que pour
              tout dommage résultant d'une intrusion frauduleuse d'un tiers.
            </p>
          </Block>

          <Block number="07" title="Liens hypertextes">
            <p>
              Ce site peut contenir des liens hypertextes vers d'autres sites internet.
              BK-ENGINEERING n'est pas responsable du contenu des sites tiers vers lesquels
              des liens sont proposés.
            </p>
          </Block>

          <Block number="08" title="Droit applicable et juridiction compétente">
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              et après échec de toute tentative de résolution amiable, les tribunaux compétents
              du ressort du greffe de Rennes seront seuls compétents.
            </p>
          </Block>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-xs text-text-secondary/50 pt-4"
          >
            Dernière mise à jour : avril 2025
          </motion.p>
        </div>
      </Section>
    </main>
  );
}