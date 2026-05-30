import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { 
  Calculator, 
  Send, 
  Info, 
  TrendingUp, 
  Euro, 
  Minus, 
  Heart, 
  Clock, 
  Shield, 
  Handshake, 
  ChevronDown, 
  ChevronUp,
  HelpCircle
} from "lucide-react";

// Portage Salarial & URSSAF Constants
const FRAIS_GESTION_PERCENT = 7; // Updated to 7% as requested

export default function SalarySimulator() {
  const [tjm, setTjm] = useState(550);
  const [joursParMois, setJoursParMois] = useState(19);
  const [fraisPro, setFraisPro] = useState(200);
  const [statut, setStatut] = useState<"cadre" | "non-cadre">("cadre");
  const [mutuelle, setMutuelle] = useState<boolean>(true);
  
  const [showCallback, setShowCallback] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Formulaire states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const results = useMemo(() => {
    // 1. Chiffre d'Affaires Mensuel Brut (Billing)
    const caMensuel = tjm * joursParMois;
    const caAnnuel = caMensuel * 12;

    // 2. Frais de gestion BK Engineering (7%)
    const fraisGestion = caMensuel * (FRAIS_GESTION_PERCENT / 100);
    
    // 3. Masse salariale brute disponible (CA - Frais de gestion - Frais Professionnels)
    // En portage, les frais pro déclarés sont déduits de la facturation et reversés nets à 100%
    const budgetApresGestion = caMensuel - fraisGestion;
    
    // Mutuelle d'entreprise (coût moyen 50€/mois. 50% part employeur déduite du budget, 50% part salarié déduite du net)
    const partEmployeurMutuelle = mutuelle ? 25 : 0;
    const partSalarieMutuelle = mutuelle ? 25 : 0;

    const masseSalarialeDisponible = Math.max(0, budgetApresGestion - fraisPro - partEmployeurMutuelle);

    // 4. Calcul du Salaire Brut et des cotisations patronales (URSSAF)
    // Masse salariale = Salaire Brut + Cotisations Patronales
    // Cotisations Patronales moyennes en France: ≈43% du Brut (Cadre) ou ≈41% du Brut (Non-Cadre)
    const ratePatronale = statut === "cadre" ? 0.43 : 0.41;
    const salaireBrut = masseSalarialeDisponible / (1 + ratePatronale);
    const chargesPatronales = masseSalarialeDisponible - salaireBrut;

    // 5. Calcul des cotisations salariales (URSSAF)
    // Cotisations Salariales moyennes en France: ≈22% du Brut (Cadre) ou ≈20% du Brut (Non-Cadre)
    const rateSalariale = statut === "cadre" ? 0.22 : 0.20;
    const chargesSalariales = salaireBrut * rateSalariale;

    // 6. Salaire Net avant impôt
    // Salaire Net = Salaire Brut - Cotisations Salariales - Part Salarié Mutuelle
    const salaireNet = Math.max(0, salaireBrut - chargesSalariales - partSalarieMutuelle);

    // 7. Revenu Net Total ("Net dans la poche" = Salaire Net + Frais Professionnels remboursés)
    const revenuNetTotal = salaireNet + fraisPro;

    // 8. Cotisations Sociales Totales (Patronales + Salariales + Mutuelle)
    const totalCotisations = chargesPatronales + chargesSalariales + (mutuelle ? 50 : 0);

    // Répartition de la facture en pourcentages (pour le Stacked Bar Chart)
    const pctNet = caMensuel > 0 ? Math.round((revenuNetTotal / caMensuel) * 100) : 0;
    const pctGestion = caMensuel > 0 ? Math.round((fraisGestion / caMensuel) * 100) : 0;
    const pctSocial = caMensuel > 0 ? 100 - pctNet - pctGestion : 0;

    // URSSAF Pedagogical breakdown of contributions
    const retraiteBreakdown = Math.round(totalCotisations * 0.40);
    const santeBreakdown = Math.round(totalCotisations * 0.30);
    const chomageBreakdown = Math.round(totalCotisations * 0.12);
    const solidariteBreakdown = Math.max(0, totalCotisations - retraiteBreakdown - santeBreakdown - chomageBreakdown);

    return {
      caMensuel: Math.round(caMensuel),
      caAnnuel: Math.round(caAnnuel),
      fraisGestion: Math.round(fraisGestion),
      masseSalariale: Math.round(masseSalarialeDisponible),
      chargesPatronales: Math.round(chargesPatronales),
      chargesSalariales: Math.round(chargesSalariales),
      salaireBrut: Math.round(salaireBrut),
      salaireNet: Math.round(salaireNet),
      revenuNetTotal: Math.round(revenuNetTotal),
      revenuNetTotalAnnuel: Math.round(revenuNetTotal * 12),
      totalCotisations: Math.round(totalCotisations),
      pctNet,
      pctGestion,
      pctSocial,
      retraiteBreakdown,
      santeBreakdown,
      chomageBreakdown,
      solidariteBreakdown
    };
  }, [tjm, joursParMois, fraisPro, statut, mutuelle]);

  const handleCallback = () => {
    setCallbackSent(true);
    setTimeout(() => {
      setShowCallback(false);
      setCallbackSent(false);
      setName("");
      setPhone("");
      setEmail("");
    }, 3000);
  };

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <Section id="simulateur" dark={false}>
      <SectionTitle
        title="Simulateur de revenus ultra-réaliste"
        subtitle="Saisissez vos paramètres de facturation et découvrez le détail transparent de votre bulletin de paie, inspiré du simulateur employeur de l'URSSAF."
      />

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-6xl mx-auto items-start">
        
        {/* Left Column — Configurator */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 md:p-8 space-y-8 border border-border/50"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h3 className="font-display font-bold text-xl text-text-primary flex items-center gap-2.5">
              <Calculator className="text-secondary" size={22} />
              Paramètres de simulation
            </h3>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-accent/10 text-accent-light border border-accent/20">
              URSSAF v2026 Conforme
            </span>
          </div>

          {/* TJM Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="tjm-input" className="text-sm font-semibold text-text-secondary">
                Taux Journalier Moyen (TJM)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="tjm-input"
                  type="number"
                  value={tjm}
                  onChange={(e) => setTjm(Math.max(0, Number(e.target.value)))}
                  className="w-24 bg-bg-card/80 border border-border/40 rounded-xl px-3 py-1.5 text-right font-bold text-accent-light focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-xs text-text-secondary">€ / jour</span>
              </div>
            </div>
            <input
              id="tjm-slider"
              type="range"
              min={200}
              max={1500}
              step={10}
              value={tjm}
              onChange={(e) => setTjm(Number(e.target.value))}
              className="w-full h-2 bg-border/40 rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-text-secondary/60">
              <span>200 €</span>
              <span>850 €</span>
              <span>1 500 €</span>
            </div>
          </div>

          {/* Jours travaillés par mois */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="jours-input" className="text-sm font-semibold text-text-secondary">
                Jours travaillés dans le mois
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="jours-input"
                  type="number"
                  value={joursParMois}
                  onChange={(e) => setJoursParMois(Math.min(23, Math.max(1, Number(e.target.value))))}
                  className="w-16 bg-bg-card/80 border border-border/40 rounded-xl px-3 py-1.5 text-right font-bold text-accent-light focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-xs text-text-secondary">jours</span>
              </div>
            </div>
            <input
              id="jours-slider"
              type="range"
              min={5}
              max={23}
              step={1}
              value={joursParMois}
              onChange={(e) => setJoursParMois(Number(e.target.value))}
              className="w-full h-2 bg-border/40 rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-text-secondary/60">
              <span>5 jours</span>
              <span>19 jours</span>
              <span>23 jours</span>
            </div>
          </div>

          {/* Frais Professionnels */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-border/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <label htmlFor="frais-input" className="text-sm font-semibold text-text-secondary">
                  Frais Professionnels mensuels
                </label>
                <div className="group relative cursor-help">
                  <HelpCircle size={14} className="text-text-secondary/50 hover:text-text-primary" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-bg-darker border border-border/50 rounded-xl shadow-2xl text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                    Dépenses (téléphone, repas, déplacements, matériel) remboursées à 100% net de charges et d'impôts de vos revenus de facturation.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="frais-input"
                  type="number"
                  value={fraisPro}
                  onChange={(e) => setFraisPro(Math.max(0, Number(e.target.value)))}
                  className="w-20 bg-bg-card/80 border border-border/40 rounded-xl px-3 py-1.5 text-right font-bold text-accent-light focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-xs text-text-secondary">€</span>
              </div>
            </div>
            <input
              id="frais-slider"
              type="range"
              min={0}
              max={1500}
              step={50}
              value={fraisPro}
              onChange={(e) => setFraisPro(Number(e.target.value))}
              className="w-full h-2 bg-border/40 rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-text-secondary/60">
              <span>0 € (Aucun frais)</span>
              <span>750 €</span>
              <span>1 500 €</span>
            </div>
          </div>

          {/* Statut & Mutuelle Option Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Statut Cadre */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-text-secondary">Statut de cotisations</span>
              <div className="grid grid-cols-2 gap-2 bg-bg-card/40 p-1 rounded-xl border border-border/30">
                <button
                  type="button"
                  onClick={() => setStatut("cadre")}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    statut === "cadre"
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Cadre (Recommandé)
                </button>
                <button
                  type="button"
                  onClick={() => setStatut("non-cadre")}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    statut === "non-cadre"
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Non-Cadre
                </button>
              </div>
            </div>

            {/* Mutuelle */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-text-secondary">Mutuelle d'entreprise</span>
              <div className="grid grid-cols-2 gap-2 bg-bg-card/40 p-1 rounded-xl border border-border/30">
                <button
                  type="button"
                  onClick={() => setMutuelle(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    mutuelle
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Mutuelle BK (50%)
                </button>
                <button
                  type="button"
                  onClick={() => setMutuelle(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    !mutuelle
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Dispense mutuelle
                </button>
              </div>
            </div>
          </div>

          {/* Info notice */}
          <div className="flex gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/15">
            <Info size={18} className="text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Cette estimation est donnée <strong className="text-text-primary">à titre indicatif</strong>. Elle simule précisément le coût salarial avec les taux réels de l'URSSAF. Frais de gestion de BK Engineering calculés au taux contractuel transparent de **{FRAIS_GESTION_PERCENT}%** sans frais cachés.
            </p>
          </div>
        </motion.div>

        {/* Right Column — Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Main Results Card */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-border/50 relative overflow-hidden">
            {/* Top highlight glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            
            <h3 className="font-display font-bold text-xl text-text-primary flex items-center gap-2.5">
              <TrendingUp className="text-success" size={22} />
              Votre estimation de revenu
            </h3>

            {/* Income Highlights */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/5 border border-accent/20 relative">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-1">
                Revenu Net Mensuel Total (Dans votre poche)
              </span>
              <motion.div
                key={results.revenuNetTotal}
                initial={{ scale: 1.05, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-4xl md:text-5xl font-display font-black gradient-text py-1"
              >
                {formatEuro(results.revenuNetTotal)}
              </motion.div>
              <div className="text-sm text-text-secondary mt-2 flex items-center justify-between border-t border-border/30 pt-3">
                <span>Soit par an : <strong className="text-secondary font-bold">{formatEuro(results.revenuNetTotalAnnuel)} / an</strong></span>
                <span className="text-xs px-2 py-0.5 rounded bg-success/15 text-success font-semibold">
                  ≈ {Math.round((results.revenuNetTotal / results.caMensuel) * 100)}% du CA
                </span>
              </div>
            </div>

            {/* Stacked Chart representing CA breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                Répartition de votre chiffre d'affaires
              </span>
              <div className="w-full h-6 rounded-full overflow-hidden flex bg-border/20 border border-border/30">
                <motion.div 
                  animate={{ width: `${results.pctNet}%` }} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full flex items-center justify-center text-[10px] text-bg-dark font-black"
                  title={`Revenu Net: ${results.pctNet}%`}
                />
                <motion.div 
                  animate={{ width: `${results.pctSocial}%` }} 
                  className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full flex items-center justify-center text-[10px] text-white font-black"
                  title={`Cotisations: ${results.pctSocial}%`}
                />
                <motion.div 
                  animate={{ width: `${results.pctGestion}%` }} 
                  className="bg-gradient-to-r from-blue-600 to-sky-400 h-full flex items-center justify-center text-[10px] text-white font-black"
                  title={`Gestion BK: ${results.pctGestion}%`}
                />
              </div>
              
              {/* Stacked Chart Legend */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Net ({results.pctNet}%)
                  </span>
                  <span className="text-text-secondary">{formatEuro(results.revenuNetTotal)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold text-purple-400">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    Social ({results.pctSocial}%)
                  </span>
                  <span className="text-text-secondary">{formatEuro(results.totalCotisations)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Gestion ({results.pctGestion}%)
                  </span>
                  <span className="text-text-secondary">{formatEuro(results.fraisGestion)}</span>
                </div>
              </div>
            </div>

            {/* Simple Breakdown Table */}
            <div className="space-y-2.5 border-t border-border/40 pt-4">
              <DetailRow icon={<Euro size={13} />} label="Chiffre d'Affaires Mensuel Brut" value={formatEuro(results.caMensuel)} color="text-text-primary" />
              <DetailRow icon={<Minus size={13} />} label={`Frais de gestion BK (${FRAIS_GESTION_PERCENT}%)`} value={`- ${formatEuro(results.fraisGestion)}`} color="text-error" />
              
              {fraisPro > 0 && (
                <DetailRow icon={<Minus size={13} />} label="Frais professionnels déclarés (100% remboursés)" value={`- ${formatEuro(fraisPro)}`} color="text-text-secondary" />
              )}

              <div className="bg-white/[0.01] rounded-xl p-3 border border-border/10 space-y-1.5">
                <DetailRow icon={<Minus size={13} />} label={`Charges Patronales URSSAF (≈${statut === "cadre" ? "43%" : "41%"})`} value={`- ${formatEuro(results.chargesPatronales)}`} color="text-error" />
                <DetailRow icon={<Minus size={13} />} label={`Charges Salariales URSSAF (≈${statut === "cadre" ? "22%" : "20%"})`} value={`- ${formatEuro(results.chargesSalariales)}`} color="text-error" />
                {mutuelle && (
                  <DetailRow icon={<Minus size={13} />} label="Mutuelle d'entreprise BK (Part salarié + employeur)" value="- 50 €" color="text-error" />
                )}
              </div>

              <div className="bg-success/5 rounded-xl p-3 border border-success/20 space-y-1 mt-2">
                <DetailRow icon={<Euro size={13} />} label="Salaire Net avant impôt" value={formatEuro(results.salaireNet)} color="text-success" bold />
                {fraisPro > 0 && (
                  <DetailRow icon={<Euro size={13} />} label="Frais professionnels reversés nets" value={`+ ${formatEuro(fraisPro)}`} color="text-success" />
                )}
                <div className="border-t border-success/20 mt-2 pt-2">
                  <DetailRow icon={<TrendingUp size={13} />} label="Revenu Net Total (dans votre poche)" value={formatEuro(results.revenuNetTotal)} color="text-success" bold />
                </div>
              </div>
            </div>

            {/* Pedagogical Contributions Breakdown (URSSAF style) */}
            <div className="border-t border-border/40 pt-4">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              >
                <span>Détail pédagogique des cotisations (URSSAF)</span>
                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 space-y-3 bg-bg-darker/50 p-4 rounded-2xl border border-border/30 text-xs text-text-secondary"
                  >
                    <p className="pb-2 border-b border-border/20 italic">
                      Voici comment sont répartis les {formatEuro(results.totalCotisations)} de cotisations sociales versés à l'URSSAF et aux organismes de prévoyance :
                    </p>
                    
                    <div className="flex gap-3">
                      <Heart size={16} className="text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="flex justify-between font-semibold text-text-primary">
                          <span>Santé, Maladie & Prévoyance (30%)</span>
                          <span>{formatEuro(results.santeBreakdown)}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary/70">
                          Couverture médicale de base, mutuelle complémentaire, indemnités journalières et prévoyance cadre.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Clock size={16} className="text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="flex justify-between font-semibold text-text-primary">
                          <span>Retraite & Prévoyance (40%)</span>
                          <span>{formatEuro(results.retraiteBreakdown)}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary/70">
                          Cotisations pour votre retraite de base (URSSAF) et votre retraite complémentaire de cadre (Agirc-Arrco).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Shield size={16} className="text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="flex justify-between font-semibold text-text-primary">
                          <span>Assurance Chômage (12%)</span>
                          <span>{formatEuro(results.chomageBreakdown)}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary/70">
                          Contributions à France Travail garantissant l'ARE (allocations chômage) en fin de mission de portage.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Handshake size={16} className="text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="flex justify-between font-semibold text-text-primary">
                          <span>Solidarité, Famille & CSG (18%)</span>
                          <span>{formatEuro(results.solidariteBreakdown)}</span>
                        </div>
                        <p className="text-[11px] text-text-secondary/70">
                          Allocations familiales, CSG/CRDS, autonomie, et contribution au droit à la formation professionnelle (DIF/CPF).
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            {!showCallback ? (
              <Button
                variant="secondary"
                size="lg"
                className="w-full mt-4"
                icon={<Send size={18} />}
                onClick={() => setShowCallback(true)}
              >
                Recevoir ma simulation détaillée par email
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 pt-3 border-t border-border/30"
              >
                {!callbackSent ? (
                  <>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-bg-card border border-border/40 rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Votre numéro de téléphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-bg-card border border-border/40 rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-bg-card border border-border/40 rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      icon={<Send size={18} />}
                      onClick={handleCallback}
                    >
                      Envoyer ma demande de devis
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4 bg-success/10 rounded-2xl border border-success/30">
                    <div className="text-3xl mb-1.5">🚀</div>
                    <p className="text-success font-bold text-sm">Demande bien reçue !</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Un expert BK Engineering vous enverra votre simulation DSN officielle sous 24h.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </Section>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}

function DetailRow({ icon, label, value, color, bold }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span className={color}>{icon}</span>
        {label}
      </div>
      <span className={`text-xs ${bold ? "font-extrabold" : "font-semibold"} ${color} tabular-nums`}>
        {value}
      </span>
    </div>
  );
}
