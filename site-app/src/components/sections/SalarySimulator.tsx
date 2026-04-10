import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Calculator, Send, Info, TrendingUp, Euro, Minus } from "lucide-react";

const FRAIS_GESTION_PERCENT = 5;
const CHARGES_PATRONALES_PERCENT = 45;
const CHARGES_SALARIALES_PERCENT = 22;

export default function SalarySimulator() {
  const [tjm, setTjm] = useState(500);
  const [joursParMois, setJoursParMois] = useState(18);
  const [showCallback, setShowCallback] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  const results = useMemo(() => {
    const caMensuel = tjm * joursParMois;
    const caAnnuel = caMensuel * 12;
    const fraisGestion = caMensuel * (FRAIS_GESTION_PERCENT / 100);
    const baseApresGestion = caMensuel - fraisGestion;
    const chargesPatronales = baseApresGestion * (CHARGES_PATRONALES_PERCENT / 100);
    const salaireBrut = baseApresGestion - chargesPatronales;
    const chargesSalariales = salaireBrut * (CHARGES_SALARIALES_PERCENT / 100);
    const salaireNet = salaireBrut - chargesSalariales;

    return {
      caMensuel: Math.round(caMensuel),
      caAnnuel: Math.round(caAnnuel),
      fraisGestion: Math.round(fraisGestion),
      chargesPatronales: Math.round(chargesPatronales),
      salaireBrut: Math.round(salaireBrut),
      chargesSalariales: Math.round(chargesSalariales),
      salaireNet: Math.round(salaireNet),
      salaireNetAnnuel: Math.round(salaireNet * 12),
    };
  }, [tjm, joursParMois]);

  const handleCallback = () => {
    setCallbackSent(true);
    setTimeout(() => {
      setShowCallback(false);
      setCallbackSent(false);
    }, 3000);
  };

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <Section id="simulateur" dark={false}>
      <SectionTitle
        title="Estimez votre revenu net en portage"
        subtitle="Saisissez votre TJM et visualisez instantanément le détail de votre rémunération. Simulation indicative."
      />

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Left — Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="font-display font-semibold text-lg text-text-primary mb-6 flex items-center gap-2">
            <Calculator size={20} className="text-secondary" />
            Paramètres de simulation
          </h3>

          {/* TJM input */}
          <div className="mb-8">
            <label htmlFor="tjm-slider" className="block text-sm font-medium text-text-secondary mb-2">
              Taux Journalier Moyen (TJM)
            </label>
            <div className="flex items-center gap-4 mb-3">
              <input
                id="tjm-input"
                type="number"
                value={tjm}
                onChange={(e) => setTjm(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-bg-card border border-border rounded-xl px-4 py-3 text-xl font-bold text-accent-light focus:outline-none focus:border-accent transition-colors"
              />
              <span className="text-text-secondary">€ / jour</span>
            </div>
            <input
              id="tjm-slider"
              type="range"
              min={200}
              max={1200}
              step={10}
              value={tjm}
              onChange={(e) => setTjm(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>200 €</span>
              <span>1 200 €</span>
            </div>
          </div>

          {/* Jours par mois */}
          <div className="mb-8">
            <label htmlFor="jours-slider" className="block text-sm font-medium text-text-secondary mb-2">
              Jours travaillés par mois
            </label>
            <div className="flex items-center gap-4 mb-3">
              <input
                id="jours-input"
                type="number"
                value={joursParMois}
                onChange={(e) => setJoursParMois(Math.min(23, Math.max(1, Number(e.target.value))))}
                className="w-20 bg-bg-card border border-border rounded-xl px-4 py-3 text-xl font-bold text-accent-light focus:outline-none focus:border-accent transition-colors"
              />
              <span className="text-text-secondary">jours</span>
            </div>
            <input
              id="jours-slider"
              type="range"
              min={10}
              max={23}
              step={1}
              value={joursParMois}
              onChange={(e) => setJoursParMois(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>10 jours</span>
              <span>23 jours</span>
            </div>
          </div>

          {/* Info notice */}
          <div className="flex gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/15">
            <Info size={18} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Cette simulation est donnée <strong className="text-text-primary">à titre indicatif</strong>.
              Les montants réels peuvent varier selon votre situation personnelle.
              Frais de gestion BK Engineering : {FRAIS_GESTION_PERCENT}%.
            </p>
          </div>
        </motion.div>

        {/* Right — Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8"
        >
          <h3 className="font-display font-semibold text-lg text-text-primary mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-success" />
            Votre estimation
          </h3>

          {/* Net highlight */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-accent/10 to-secondary/5 border border-accent/20">
            <div className="text-sm text-text-secondary mb-1">Salaire net estimé / mois</div>
            <motion.div
              key={results.salaireNet}
              initial={{ scale: 1.05, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-4xl md:text-5xl font-display font-bold gradient-text"
            >
              {formatEuro(results.salaireNet)}
            </motion.div>
            <div className="text-sm text-text-secondary mt-2">
              Soit <span className="text-secondary font-semibold">{formatEuro(results.salaireNetAnnuel)}</span> / an
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-8">
            <DetailRow icon={<Euro size={14} />} label="CA mensuel brut" value={formatEuro(results.caMensuel)} color="text-text-primary" />
            <DetailRow icon={<Minus size={14} />} label={`Frais de gestion (${FRAIS_GESTION_PERCENT}%)`} value={`- ${formatEuro(results.fraisGestion)}`} color="text-error" />
            <DetailRow icon={<Minus size={14} />} label={`Charges patronales (≈${CHARGES_PATRONALES_PERCENT}%)`} value={`- ${formatEuro(results.chargesPatronales)}`} color="text-error" />
            <DetailRow icon={<Euro size={14} />} label="Salaire brut" value={formatEuro(results.salaireBrut)} color="text-accent-light" bold />
            <DetailRow icon={<Minus size={14} />} label={`Charges salariales (≈${CHARGES_SALARIALES_PERCENT}%)`} value={`- ${formatEuro(results.chargesSalariales)}`} color="text-error" />
            <div className="border-t border-border pt-3">
              <DetailRow icon={<TrendingUp size={14} />} label="Salaire net estimé" value={formatEuro(results.salaireNet)} color="text-success" bold />
            </div>
          </div>

          {/* CTA */}
          {!showCallback ? (
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              icon={<Send size={18} />}
              onClick={() => setShowCallback(true)}
            >
              Être rappelé par un conseiller
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {!callbackSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
                  />
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    icon={<Send size={18} />}
                    onClick={handleCallback}
                  >
                    Envoyer — TJM: {tjm}€ → Net: {formatEuro(results.salaireNet)}
                  </Button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-success font-semibold">Demande envoyée !</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Un conseiller vous rappellera sous 24h.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function DetailRow({
  icon,
  label,
  value,
  color,
  bold,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span className={color}>{icon}</span>
        {label}
      </div>
      <span className={`text-sm ${bold ? "font-bold" : "font-medium"} ${color}`}>
        {value}
      </span>
    </div>
  );
}
