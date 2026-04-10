import PortageHero from "@/components/sections/PortageHero";
import SalarySimulator from "@/components/sections/SalarySimulator";
import PortageAdvantages from "@/components/sections/PortageAdvantages";
import PortageFAQ from "@/components/sections/PortageFAQ";

export default function PortagePage() {
  return (
    <main>
      <PortageHero />
      <SalarySimulator />
      <PortageAdvantages />
      <PortageFAQ />
    </main>
  );
}