import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { slideUp, staggerContainer } from "@/animations/variants";
import { Link } from "react-router-dom";

type EffectType = "slideUp" | "flipX";

const bentoItems = [
  {
    id: 1,
    title: "Architecture Cloud",
    subtitle: "Infrastructures hautement disponibles & scalables sur mesure.",
    details: "Expertise approfondie sur AWS, Azure et GCP. Nous concevons, déployons et infogérons des architectures complexes : conteneurisation (Kubernetes), solutions serverless, plans de reprise d'activité (PRA), et stratégies FinOps pour optimiser drastiquement vos coûts d'infrastructure tout en maximisant la sécurité.",
    image: "/expertises/architecture_cloud.png",
    className: "col-span-12 lg:col-span-8 lg:row-span-2 min-h-[350px] lg:min-h-full",
    gradient: "from-accent/80 via-bg-dark/80 to-transparent",
    effectType: "slideUp" as EffectType,
  },
  {
    id: 2,
    title: "Conseil SI",
    subtitle: "Audit et stratégie IT alignés avec votre vision métier.",
    details: "Analyse stratégique de votre parc applicatif, alignement avec vos objectifs métiers, et pilotage de la gouvernance IT pour préparer vos équipes aux défis technologiques de demain.",
    image: "/expertises/conseil_si.png",
    className: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[280px]",
    gradient: "from-secondary/80 via-bg-dark/80 to-transparent",
    effectType: "flipX" as EffectType,
  },
  {
    id: 3,
    title: "Dev Logiciel",
    subtitle: "Applications front/back robustes et innovantes.",
    details: "Nos experts façonnent des solutions sur mesure avec les dernières stacks technologiques. Du front-end ultra-réactif (React, Vue) au back-end distribué et sécurisé (Node, Java, Go).",
    image: "/expertises/dev_logiciel.png",
    className: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[280px]",
    gradient: "from-accent/80 via-bg-dark/80 to-transparent",
    effectType: "flipX" as EffectType,
  },
  {
    id: 4,
    title: "Intégration & APIs",
    subtitle: "Connectivité et architecture orientée micro-services.",
    details: "Nous orchestrons l'interopérabilité fluide de vos systèmes par le biais d'architectures microservices et de passerelles API sécurisées, libérant le potentiel de vos données.",
    image: "/expertises/integration_api.png",
    className: "col-span-12 lg:col-span-4 min-h-[300px]",
    gradient: "from-secondary/80 via-bg-dark/80 to-transparent",
    effectType: "flipX" as EffectType,
  },
  {
    id: 5,
    title: "Tests & QA",
    subtitle: "Fiabilité maximale et automatisation sécurisée (CI/CD).",
    details: "Une exigence absolue sur la qualité logicielle. Nous automatisons massivement vos tests (unitaires, E2E, performance) pour garantir des déploiements fluides, rapides et sans régression.",
    image: "/expertises/test_qa.png",
    className: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[300px]",
    gradient: "from-accent/80 via-bg-dark/80 to-transparent",
    effectType: "flipX" as EffectType,
  },
  {
    id: 6,
    title: "Transformation",
    subtitle: "Accélération numérique et agilité pour votre croissance.",
    details: "Un accompagnement stratégique de bout en bout pour dématérialiser vos processus clés, adopter massivement les méthodes agiles et transformer durablement votre culture d'entreprise.",
    image: "/expertises/transformation_digitale.png",
    className: "col-span-12 md:col-span-6 lg:col-span-4 min-h-[300px]",
    gradient: "from-secondary/80 via-bg-dark/80 to-transparent",
    effectType: "flipX" as EffectType,
  },
];

export default function ServicesBentoGrid() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, -150]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative w-full bg-bg-dark pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/5 via-bg-dark to-bg-dark pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            style={{ y: yOffset, opacity: opacityFade }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="max-w-2xl"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent-light border border-accent/20">
              6 Pôles d'Excellence Technologique
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
              L'Excellence Technologique <br />
              <span className="text-accent">à votre Service.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Une grille de compétences pointues, couvrant l'intégralité de vos besoins 
              en transformation numérique. Robustesse, performance et innovation garanties.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-text-primary rounded-xl border border-white/10 backdrop-blur-md transition-all group"
            >
              Évaluer mon projet
              <ArrowRight size={18} className="group-hover:translate-x-1 text-accent-light transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-fr"
        >
          {bentoItems.map((item) => (
            <motion.div
              key={item.id}
              variants={slideUp}
              onClick={() => setActiveId(activeId === item.id ? null : item.id)}
              className={`relative group rounded-[2rem] bg-bg-card/40 border border-white/5 shadow-2xl [perspective:1000px] cursor-pointer ${item.className}`}
            >
              {/* Inner wrapper for 3D flip context */}
              <div 
                className={`relative w-full h-full rounded-[2rem] transition-transform duration-700 [transform-style:preserve-3d] ${
                  item.effectType === "flipX" && (activeId === item.id) ? "[transform:rotateX(-180deg)]" : 
                  item.effectType === "flipX" ? "group-hover:[transform:rotateX(-180deg)]" : ""
                }`}
              >
                
                {/* --- FRONT FACE --- */}
                <div 
                  className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden [backface-visibility:hidden]`}
                >
                  <div className="absolute inset-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100 ${activeId === item.id ? 'scale-110 opacity-100' : ''}`}
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-80 ${activeId === item.id ? 'opacity-80' : ''}`} />
                  <div className={`absolute inset-0 bg-bg-dark/40 group-hover:bg-transparent transition-colors duration-500 ${activeId === item.id ? 'bg-transparent' : ''}`} />
                  
                  {/* Top border light injection */}
                  <div className={`absolute top-0 inset-x-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 ${activeId === item.id ? 'opacity-100' : ''}`} />

                  {/* Content Box Front */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                    <div className="transform transition-transform duration-500 relative z-30">
                      <h3 className={`font-display font-bold text-2xl md:text-3xl text-white mb-3 drop-shadow-lg transition-transform duration-500 ${item.effectType === 'slideUp' && (item.id === activeId || true) ? '' : ''} ${item.effectType === 'slideUp' ? 'group-hover:-translate-y-1' : ''} ${item.effectType === 'slideUp' && activeId === item.id ? '-translate-y-1' : ''}`}>
                        {item.title}
                      </h3>
                      <p className={`text-white/80 text-sm md:text-base leading-relaxed max-w-sm drop-shadow-md transition-transform duration-500 ${item.effectType === 'slideUp' ? 'group-hover:-translate-y-1' : ''} ${item.effectType === 'slideUp' && activeId === item.id ? '-translate-y-1' : ''}`}>
                        {item.subtitle}
                      </p>
                      
                      {/* Detailed Information sliding from bottom (Only for slideUp effect) */}
                      {item.effectType === "slideUp" && item.details && (
                        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${activeId === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'}`}>
                          <div className="overflow-hidden">
                            <p className={`text-white/90 text-[15px] leading-relaxed mt-4 pt-4 border-t border-white/20 transition-opacity duration-700 delay-100 ${activeId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              {item.details}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* --- BACK FACE (Only for flipX effect) --- */}
                {item.effectType === "flipX" && (
                  <div 
                    className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden overflow-y-auto bg-bg-dark/95 backdrop-blur-xl border border-white/10 [backface-visibility:hidden] [transform:rotateX(180deg)] p-8 md:p-10 flex flex-col items-center text-center justify-center`}
                  >
                    {/* Glowing Accent Ring on Back */}
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.gradient} pointer-events-none`} />
                    
                    <h4 className="font-display font-bold text-xl text-white mb-4 z-10 relative">
                      {item.title} : L'Approche
                    </h4>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed z-10 relative">
                      {item.details}
                    </p>
                    <div className="mt-6 w-12 h-[2px] bg-accent/50 z-10 relative rounded-full" />
                  </div>
                )}
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
