import { useEffect } from "react";
import ServicesBentoGrid from "@/components/sections/ServicesBentoGrid";
import TechStack from "@/components/sections/TechStack";

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Nos Services - BK Engineering";
  }, []);

  return (
    <main>
      {/* Bento Grid Services Layout */}
      <ServicesBentoGrid />

      {/* Tech Arsenal Section moved from Home */}
      <TechStack />
    </main>
  );
}
