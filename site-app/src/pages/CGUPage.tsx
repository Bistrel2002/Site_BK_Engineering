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

export default function CGUPage() {
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
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              En accédant au site bk-engineering.fr, vous acceptez les présentes
              conditions générales d'utilisation dans leur intégralité.
            </p>
          </motion.div>
        </div>
      </section>

      <Section dark={false}>
        <div className="max-w-[800px] mx-auto space-y-5">

          <Block number="01" title="Objet">
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de
              définir les modalités et conditions dans lesquelles BK-ENGINEERING met à
              disposition des utilisateurs le site internet accessible à l'adresse
              bk-engineering.fr, ainsi que les services qui y sont proposés.
            </p>
            <p>
              Toute connexion au site implique l'acceptation pleine et entière des
              présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas
              utiliser ce site.
            </p>
          </Block>

          <Block number="02" title="Éditeur du site">
            <p>
              <strong className="text-text-primary">Société :</strong> BK-ENGINEERING — SASU
            </p>
            <p>
              <strong className="text-text-primary">SIRET :</strong> 951 685 031 00019
            </p>
            <p>
              <strong className="text-text-primary">Siège social :</strong> 63 Rue du 19 Mars 1962, 35700 Rennes, France
            </p>
            <p>
              <strong className="text-text-primary">Email :</strong>{" "}
              <a href="mailto:contact@bk-engineering.fr" className="text-accent-light hover:underline">
                contact@bk-engineering.fr
              </a>
            </p>
          </Block>

          <Block number="03" title="Accès au site">
            <p>
              Le site est accessible 24h/24 et 7j/7, sous réserve de maintenance ou de
              force majeure. BK-ENGINEERING se réserve le droit de modifier, suspendre
              ou interrompre l'accès au site à tout moment, sans préavis ni indemnité.
            </p>
            <p>
              L'accès au site est gratuit. L'utilisateur est responsable des équipements
              informatiques et des frais de connexion internet nécessaires à l'utilisation
              du site.
            </p>
          </Block>

          <Block number="04" title="Utilisation du site">
            <p>L'utilisateur s'engage à utiliser le site conformément à sa destination et à ne pas :</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Porter atteinte aux droits de tiers ou à l'ordre public</li>
              <li>Diffuser des contenus illicites, diffamatoires, injurieux ou trompeurs</li>
              <li>Introduire des virus, codes malveillants ou tout élément susceptible de perturber le site</li>
              <li>Effectuer des tentatives d'accès non autorisé aux systèmes informatiques de BK-ENGINEERING</li>
              <li>Reproduire ou extraire des contenus du site sans autorisation écrite préalable</li>
            </ul>
          </Block>

          <Block number="05" title="Propriété intellectuelle">
            <p>
              L'ensemble des éléments du site (textes, graphismes, logos, images, vidéos,
              icônes, structure) est protégé par le droit de la propriété intellectuelle
              et est la propriété exclusive de BK-ENGINEERING ou de ses partenaires.
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation, totale ou
              partielle, à quelque titre que ce soit, sans l'autorisation préalable et
              écrite de BK-ENGINEERING est interdite et constitue une contrefaçon
              sanctionnée par les articles L.335-2 et suivants du Code de la Propriété
              Intellectuelle.
            </p>
          </Block>

          <Block number="06" title="Liens hypertextes">
            <p>
              <strong className="text-text-primary">Liens sortants :</strong> BK-ENGINEERING ne contrôle pas les sites tiers vers
              lesquels des liens sont proposés et décline toute responsabilité quant à
              leur contenu ou leur politique de confidentialité.
            </p>
            <p>
              <strong className="text-text-primary">Liens entrants :</strong> Tout lien hypertexte pointant vers ce site doit faire
              l'objet d'une autorisation préalable écrite de BK-ENGINEERING, sauf en
              cas de lien non commercial à caractère informatif.
            </p>
          </Block>

          <Block number="07" title="Limitation de responsabilité">
            <p>
              BK-ENGINEERING s'efforce d'assurer l'exactitude des informations diffusées
              sur le site. Toutefois, elle ne saurait être tenue responsable :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Des erreurs ou omissions dans les contenus publiés</li>
              <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
              <li>Des interruptions ou dysfonctionnements du site, quelle qu'en soit la cause</li>
              <li>Des pertes de données liées à l'utilisation du site</li>
            </ul>
          </Block>

          <Block number="08" title="Protection des données personnelles">
            <p>
              BK-ENGINEERING traite les données personnelles des utilisateurs conformément
              au RGPD. Pour toute information relative au traitement de vos données,
              veuillez consulter notre{" "}
              <a href="/politique-confidentialite" className="text-accent-light hover:underline">
                Politique de Confidentialité
              </a>.
            </p>
          </Block>

          <Block number="09" title="Cookies">
            <p>
              Le site utilise des cookies pour améliorer l'expérience utilisateur et
              mesurer l'audience. Vous pouvez gérer vos préférences de cookies à tout
              moment via les paramètres de votre navigateur.
            </p>
            <p>
              Pour en savoir plus, consultez notre{" "}
              <a href="/politique-confidentialite" className="text-accent-light hover:underline">
                Politique de Confidentialité
              </a>.
            </p>
          </Block>

          <Block number="10" title="Modification des CGU">
            <p>
              BK-ENGINEERING se réserve le droit de modifier les présentes CGU à tout
              moment. Les modifications prennent effet dès leur mise en ligne. Il appartient
              à l'utilisateur de consulter régulièrement les CGU.
            </p>
            <p>
              La poursuite de l'utilisation du site après modification vaut acceptation
              des nouvelles CGU.
            </p>
          </Block>

          <Block number="11" title="Droit applicable et juridiction">
            <p>
              Les présentes CGU sont régies par le droit français. Tout litige relatif
              à leur interprétation ou à leur exécution relève de la compétence exclusive
              des tribunaux du ressort du greffe de Rennes, sauf disposition légale
              contraire applicable au consommateur.
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