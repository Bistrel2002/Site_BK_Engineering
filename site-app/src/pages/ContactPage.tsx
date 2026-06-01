import { useState } from "react";
import { motion } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const projectTypes = [
  "Conseil SI",
  "Développement Logiciel",
  "Cloud & Infrastructure",
  "Intégration & APIs",
  "Tests & QA",
  "Transformation Digitale",
  "Autre",
];

const budgetRanges = [
  "< 10 000 €",
  "10 000 € – 50 000 €",
  "50 000 € – 100 000 €",
  "100 000 € – 500 000 €",
  "> 500 000 €",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-20">
      <Section dark>
        <SectionTitle
          title="Parlons de votre projet"
          subtitle="Notre équipe vous répond sous 24h avec une analyse personnalisée de vos besoins."
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Marie Dupont"
                      className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email professionnel *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="marie@entreprise.fr"
                      className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Nom de l'entreprise"
                      className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-text-secondary mb-2">
                    Type de projet *
                  </label>
                  <select
                    id="project-type"
                    required
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Sélectionnez...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-text-secondary mb-2">
                    Budget estimé
                  </label>
                  <select
                    id="budget"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Sélectionnez...</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Décrivez votre besoin *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Décrivez votre projet, vos objectifs et vos contraintes techniques..."
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  icon={<Send size={18} />}
                >
                  Envoyer ma demande
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <CheckCircle size={64} className="text-success mx-auto mb-6" />
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  Demande envoyée avec succès !
                </h3>
                <p className="text-text-secondary max-w-md mx-auto">
                  Merci pour votre intérêt. Notre équipe analysera votre demande et vous contactera sous 24h ouvrées.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-6">
                Coordonnées
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Email</div>
                    <a href="mailto:bikel.keumeka@bkengineering.fr" className="text-text-primary hover:text-accent-light transition-colors">
                      bikel.keumeka@bkengineering.fr
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Téléphone</div>
                    <a href="tel:+33755141866" className="text-text-primary hover:text-accent-light transition-colors">
                      + 33 7 55 14 18 66
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Adresse</div>
                    <p className="text-text-primary">63 Rue du 19 Mars 1962<br />35700 Rennes, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
                Temps de réponse
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-text-primary">Disponible</span>
              </div>
              <p className="text-sm text-text-secondary">
                Nous répondons en moyenne sous <strong className="text-text-primary">4 heures</strong> les jours ouvrés.
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
                Vous êtes freelance ?
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Découvrez notre offre de portage salarial avec simulateur de revenus intégré.
              </p>
              <a href="/portage" className="text-sm font-medium text-secondary hover:text-secondary-light transition-colors">
                Simuler mon revenu →
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
