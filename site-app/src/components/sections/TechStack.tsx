import { useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import Section from "@/components/layout/Section";
import { 
  MonitorSmartphone, 
  DatabaseZap, 
  CloudFog, 
  Cpu,
  ChevronRight
} from "lucide-react";

type TabKey = "frontend" | "backend" | "cloud" | "data";

const categories: Record<TabKey, {
  label: string;
  subtitle: string;
  icon: ReactNode;
  color: "accent" | "secondary";
  items: Array<{ name: string; tag: string }>;
}> = {
  frontend: {
    label: "Frontend & Interfaces",
    subtitle: "Création d'expériences fluides et réactives.",
    icon: <MonitorSmartphone size={24} />,
    color: "accent",
    items: [
      { name: "React", tag: "UI Library" },
      { name: "Next.js", tag: "Framework" },
      { name: "TypeScript", tag: "Type System" },
      { name: "Tailwind CSS", tag: "Styling" },
      { name: "Motion", tag: "Animations" },
      { name: "React Native", tag: "Mobile Apps" }
    ]
  },
  backend: {
    label: "Backend & Core",
    subtitle: "Logiques métiers complexes et scalables.",
    icon: <Cpu size={24} />,
    color: "secondary",
    items: [
      { name: "Node.js", tag: "Runtime" },
      { name: "Python", tag: "Data & API" },
      { name: "Java Spring", tag: "Enterprise" },
      { name: "NestJS", tag: "Architecture" },
      { name: "C# .NET", tag: "Ecosystem" },
      { name: "Go", tag: "Performance" }
    ]
  },
  cloud: {
    label: "Cloud & DevOps",
    subtitle: "Déploiement continu et haute disponibilité.",
    icon: <CloudFog size={24} />,
    color: "accent",
    items: [
      { name: "AWS", tag: "Cloud Provider" },
      { name: "Docker", tag: "Containers" },
      { name: "Kubernetes", tag: "Orchestration" },
      { name: "Terraform", tag: "IaC" },
      { name: "GitLab CI", tag: "Pipelines" },
      { name: "Azure", tag: "Enterprise" }
    ]
  },
  data: {
    label: "Data & Architecture",
    subtitle: "Stockage, sécurité et performance.",
    icon: <DatabaseZap size={24} />,
    color: "secondary",
    items: [
      { name: "PostgreSQL", tag: "Relational DB" },
      { name: "MongoDB", tag: "NoSQL DB" },
      { name: "Redis", tag: "In-memory" },
      { name: "GraphQL", tag: "API Layer" },
      { name: "Kafka", tag: "Streaming" },
      { name: "Elasticsearch", tag: "Search" }
    ]
  }
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<TabKey>("frontend");

  return (
    <Section dark className="relative overflow-hidden py-32" id="tech-stack-interactive">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />
      
      {/* Ambient glowing */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none transition-transform duration-1000" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none transition-transform duration-1000" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter mb-6"
          >
            Notre arsenal <br className="hidden md:block"/> 
            <span className="text-accent italic pr-4">technologique.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-text-secondary border-l-4 border-accent pl-6 py-2"
          >
            Découvrez les technologies de pointe que nous déployons pour garantir l'excellence, la sécurité et la scalabilité de vos projets.
          </motion.p>
        </div>

        {/* Interactive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[500px]">
          
          {/* Left Column: Tabs */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {(Object.keys(categories) as TabKey[]).map((key) => {
              const tab = categories[key];
              const isActive = activeTab === key;
              const isAccent = tab.color === "accent";

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative w-full text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden group ${
                    isActive 
                      ? 'bg-white/10 border-white/20 shadow-2xl scale-[1.02] z-10' 
                      : 'bg-transparent border-white/5 hover:bg-white/5 saturate-50 hover:saturate-100 z-0'
                  } border backdrop-blur-md`}
                >
                  {/* Active background glow */}
                  {isActive && (
                     <motion.div 
                       layoutId="activeTabGlow"
                       className={`absolute inset-0 opacity-20 ${isAccent ? 'bg-accent' : 'bg-secondary'}`}
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                        isActive 
                          ? (isAccent ? 'bg-accent text-white shadow-[0_0_20px_rgba(var(--color-accent),0.5)]' : 'bg-secondary text-white shadow-[0_0_20px_rgba(var(--color-secondary),0.5)]')
                          : 'bg-white/5 text-text-secondary group-hover:text-white'
                      }`}>
                        {tab.icon}
                      </div>
                      <div>
                        <div className={`font-display font-bold text-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-secondary group-hover:text-white'}`}>
                          {tab.label}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`transition-transform duration-300 ${isActive ? 'text-white translate-x-1' : 'text-text-secondary/30 group-hover:text-white/50'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Content Panel */}
          <div className="lg:w-2/3 glass border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col backdrop-blur-xl shadow-2xl">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                 transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                 className="flex-1 flex flex-col h-full bg-transparent"
               >
                 <div className="mb-12 relative z-20">
                   <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                     {categories[activeTab].label}
                   </h3>
                   <p className="text-lg text-text-secondary max-w-lg">
                     {categories[activeTab].subtitle}
                   </p>
                 </div>

                 {/* Tech Items Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-auto relative z-20">
                   {categories[activeTab].items.map((item, i) => {
                     const isAccent = categories[activeTab].color === "accent";
                     return (
                       <motion.div 
                         key={item.name}
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                         className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-colors group cursor-default"
                       >
                         <span className="font-display font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                           {item.name}
                         </span>
                         <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/5 ${isAccent ? 'text-accent-light' : 'text-secondary-light'}`}>
                           {item.tag}
                         </span>
                       </motion.div>
                     );
                   })}
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Background watermark icon */}
             <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none transform scale-[4] text-white z-0">
                {categories[activeTab].icon}
             </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
