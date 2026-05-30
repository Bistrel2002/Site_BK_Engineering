import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Qu'est-ce que le portage salarial ?",
    answer:
      "Le portage salarial est un cadre légal qui permet à un professionnel indépendant de réaliser des missions pour ses clients tout en bénéficiant du statut de salarié. Vous facturez via BK Engineering, et nous vous versons un salaire avec toutes les protections sociales associées.",
  },
  {
    question: "Quels sont les frais de gestion de BK Engineering ?",
    answer:
      "Nos frais de gestion s'élèvent à 7% de votre chiffre d'affaires mensuel. Ce pourcentage couvre la gestion administrative complète : facturation clients, édition des bulletins de paie, déclarations sociales et fiscales, et l'accès à notre RC Pro.",
  },
  {
    question: "Comment fonctionne la RC Pro ?",
    answer:
      "En tant que consultant porté par BK Engineering, vous êtes couvert par la Responsabilité Civile Professionnelle de l'ESN. Cela signifie que vous n'avez pas besoin de souscrire votre propre assurance, et vous êtes protégé pour toutes vos missions.",
  },
  {
    question: "Puis-je garder mes propres clients ?",
    answer:
      "Absolument. Le portage salarial vous permet de continuer à travailler avec vos propres clients. BK Engineering se charge simplement de la relation contractuelle et administrative. Vous conservez votre liberté commerciale.",
  },
  {
    question: "Comment est calculé mon salaire net ?",
    answer:
      "Votre salaire net est calculé à partir de votre chiffre d'affaires mensuel (TJM × jours travaillés), dont on soustrait les frais de gestion (7%), les charges patronales (~45%) et les charges salariales (~22%). Utilisez notre simulateur pour une estimation personnalisée.",
  },
  {
    question: "Quels sont les délais pour commencer ?",
    answer:
      "Le processus est très rapide. Après un premier échange avec nos conseillers, nous pouvons mettre en place votre contrat de portage en 48h. Vous pouvez démarrer votre mission dès réception de votre convention signée.",
  },
];

export default function PortageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section dark={false}>
      <SectionTitle
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir sur le portage salarial chez BK Engineering."
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`glass rounded-xl overflow-hidden transition-all duration-500 ease-out ${
              openIndex === index ? "ring-1 ring-accent/30 shadow-lg" : ""
            }`}
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-400 ease-out ${
                openIndex === index ? "bg-bg-card-hover/40" : "hover:bg-bg-card-hover/20"
              }`}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-text-primary pr-4">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="flex-shrink-0 text-accent-light"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border/30 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
