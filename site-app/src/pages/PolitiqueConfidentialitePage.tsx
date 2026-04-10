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

export default function PolitiqueConfidentialitePage() {
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
              Politique de Confidentialité
            </h1>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              BK-ENGINEERING s'engage à protéger la vie privée des utilisateurs
              de son site conformément au RGPD (Règlement UE 2016/679).
            </p>
          </motion.div>
        </div>
      </section>

      <Section dark={false}>
        <div className="max-w-[800px] mx-auto space-y-5">

          <Block number="01" title="Responsable du traitement">
            <p>
              <strong className="text-text-primary">Société :</strong> BK-ENGINEERING
            </p>
            <p>
              <strong className="text-text-primary">SIRET :</strong> 951 685 031 00019
            </p>
            <p>
              <strong className="text-text-primary">Adresse :</strong> 63 Rue du 19 Mars 1962, 35700 Rennes, France
            </p>
            <p>
              <strong className="text-text-primary">Contact DPO :</strong>{" "}
              <a href="mailto:contact@bk-engineering.fr" className="text-accent-light hover:underline">
                contact@bk-engineering.fr
              </a>
            </p>
          </Block>

          <Block number="02" title="Données collectées">
            <p>Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Données d'identification : nom, prénom, adresse e-mail, téléphone</li>
              <li>Données professionnelles : nom de l'entreprise, poste occupé</li>
              <li>Données de navigation : adresse IP, cookies, pages visitées, durée de visite</li>
              <li>Données de contact : contenu des messages envoyés via le formulaire de contact</li>
            </ul>
          </Block>

          <Block number="03" title="Finalités et bases légales du traitement">
            <p>Vos données sont traitées pour les finalités suivantes :</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong className="text-text-primary">Traitement des demandes de contact</strong> — base légale : exécution de mesures précontractuelles (art. 6.1.b RGPD)
              </li>
              <li>
                <strong className="text-text-primary">Envoi de communications commerciales</strong> — base légale : intérêt légitime ou consentement (art. 6.1.a / 6.1.f RGPD)
              </li>
              <li>
                <strong className="text-text-primary">Amélioration du site et statistiques</strong> — base légale : intérêt légitime (art. 6.1.f RGPD)
              </li>
              <li>
                <strong className="text-text-primary">Respect des obligations légales</strong> — base légale : obligation légale (art. 6.1.c RGPD)
              </li>
            </ul>
          </Block>

          <Block number="04" title="Durée de conservation">
            <ul className="list-disc pl-5 space-y-1">
              <li>Données de contact : 3 ans à compter du dernier contact</li>
              <li>Données de prospection commerciale : 3 ans à compter de la collecte</li>
              <li>Données de navigation (cookies) : 13 mois maximum</li>
              <li>Données comptables et contractuelles : 10 ans (obligation légale)</li>
            </ul>
          </Block>

          <Block number="05" title="Destinataires des données">
            <p>
              Vos données peuvent être transmises aux catégories de destinataires suivantes :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Le personnel habilité de BK-ENGINEERING (équipe commerciale, technique)</li>
              <li>Les prestataires techniques (hébergement, outils CRM, messagerie)</li>
              <li>Les autorités compétentes sur réquisition légale</li>
            </ul>
            <p className="mt-2">
              Aucune donnée n'est vendue ni cédée à des tiers à des fins commerciales.
            </p>
          </Block>

          <Block number="06" title="Transferts hors UE">
            <p>
              Les données sont traitées en priorité au sein de l'Union Européenne. En cas de
              transfert vers un pays tiers, BK-ENGINEERING s'assure que ce transfert est encadré
              par des garanties appropriées (clauses contractuelles types, décision d'adéquation).
            </p>
          </Block>

          <Block number="07" title="Vos droits">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-text-primary">Droit d'accès</strong> — obtenir une copie de vos données</li>
              <li><strong className="text-text-primary">Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong className="text-text-primary">Droit à l'effacement</strong> — demander la suppression de vos données</li>
              <li><strong className="text-text-primary">Droit à la limitation</strong> — restreindre le traitement</li>
              <li><strong className="text-text-primary">Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong className="text-text-primary">Droit d'opposition</strong> — vous opposer à certains traitements</li>
              <li><strong className="text-text-primary">Droit de retrait du consentement</strong> — à tout moment, sans effet rétroactif</li>
            </ul>
            <p className="mt-3">
              Pour exercer vos droits, contactez-nous à{" "}
              <a href="mailto:contact@bk-engineering.fr" className="text-accent-light hover:underline">
                contact@bk-engineering.fr
              </a>. En cas de réponse insatisfaisante, vous pouvez saisir la{" "}
              <strong className="text-text-primary">CNIL</strong> : 3 Place de Fontenoy, 75007 Paris —{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">
                www.cnil.fr
              </a>.
            </p>
          </Block>

          <Block number="08" title="Cookies">
            <p>
              Le site utilise des cookies techniques nécessaires à son fonctionnement, ainsi que
              des cookies analytiques pour mesurer l'audience (avec votre consentement).
              Vous pouvez paramétrer ou refuser les cookies via les paramètres de votre navigateur
              ou via la bannière de consentement affichée lors de votre première visite.
            </p>
          </Block>

          <Block number="09" title="Sécurité">
            <p>
              BK-ENGINEERING met en œuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, perte, destruction ou
              altération : chiffrement des données en transit (HTTPS), contrôles d'accès stricts,
              journalisation des accès.
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