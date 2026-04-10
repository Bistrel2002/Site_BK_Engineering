import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import WhyBK from "@/components/sections/WhyBK";
import ProcessSection from "@/components/sections/ProcessSection";
import Testimonials from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <WhyBK />
      <ProcessSection />
      <Testimonials />
    </main>
  );
}
