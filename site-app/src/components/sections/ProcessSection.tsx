import { motion } from "motion/react";
import { Search, PenTool, Code2, ShieldCheck } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/ui/SectionTitle";


const steps = [
  {
    icon: <Search className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Audit & Conseil",
    description: "Analyse approfondie de vos besoins, cadrage fonctionnel et stratégie technique.",
    color: "bg-accent/20 text-accent-light",
  },
  {
    icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Conception & UX",
    description: "Design d'interfaces centrées utilisateur et architecture SI optimisée.",
    color: "bg-secondary/20 text-secondary-light",
  },
  {
    icon: <Code2 className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Développement Agile",
    description: "Réalisation itérative avec les meilleures technologies du marché.",
    color: "bg-accent/20 text-accent-light",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />,
    title: "Support & Évolution",
    description: "Accompagnement continu, maintenance préventive et mise à l'échelle.",
    color: "bg-secondary/20 text-secondary-light",
  },
];

export default function ProcessSection() {
  return (
    <Section id="methodologie" className="relative py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Un accompagnement de bout en bout"
          subtitle="De l'idée à la mise en production, nous suivons un processus rigoureux pour garantir le succès de votre projet."
          align="center"
        />

        <div className="relative mt-8">
          {/* Connecting line (Desktop only) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: [0, 0, 0.33, 0.33, 0.66, 0.66, 1, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 3.5, 
              ease: "easeInOut", 
              times: [0, 0.1428, 0.2857, 0.4285, 0.5714, 0.7142, 0.8571, 1] 
            }}
            className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-accent/50 via-secondary/50 to-bg-dark z-0 origin-left" 
          />
          {/* Animated glow on the line */}
          <motion.div 
            initial={{ left: "10%", opacity: 0 }}
            whileInView={{ 
              left: ["10%", "10%", "36.4%", "36.4%", "62.8%", "62.8%", "90%", "90%"],
              opacity: [0, 1, 1, 1, 1, 1, 1, 0]
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 3.5, 
              ease: "easeInOut", 
              times: [0, 0.1428, 0.2857, 0.4285, 0.5714, 0.7142, 0.8571, 1] 
            }}
            className="hidden lg:block absolute top-[44px] w-8 h-[4px] bg-white rounded-full blur-[2px] z-0" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 1.0, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative flex flex-col items-center text-center p-6"
              >
                {/* Icon container */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl ${step.color} border border-white/10 backdrop-blur-sm flex items-center justify-center mb-8 relative group transition-transform hover:scale-110 duration-500 shadow-xl`}>
                  <div className="absolute -inset-2 bg-inherit rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                  {step.icon}
                  
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-bg-dark border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
