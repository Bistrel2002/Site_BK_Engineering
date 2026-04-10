import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "motion/react";
import InitialLoader from "@/components/layout/InitialLoader";

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Timeout allows lazy loaded components to render first
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Standard route navigation scrolls to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const PortagePage = lazy(() => import("@/pages/PortagePage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const MentionsLegalesPage = lazy(() => import("@/pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("@/pages/PolitiqueConfidentialitePage"));
const CGUPage = lazy(() => import("@/pages/CGUPage"));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark">
      <div className="w-12 h-12 rounded-full border-4 border-border border-t-accent animate-spin" />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "#000"; // cinematic background for 3D effect
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.backgroundColor = "";
      }, 1500); // Wait for transition to fully complete
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <BrowserRouter>
      <ScrollHandler />
      
      <AnimatePresence>
        {isLoading && (
          <InitialLoader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />

      <motion.div 
        className="flex flex-col min-h-screen origin-center will-change-transform bg-bg-dark"
        style={{ transformPerspective: 1200 }}
        initial={{ 
          scale: 1.8, 
          opacity: 0, 
          rotateX: 25, 
          y: 40,
          z: 600,
          filter: "blur(30px)" 
        }}
        animate={{ 
          scale: isLoading ? 1.8 : 1, 
          opacity: isLoading ? 0 : 1, 
          rotateX: isLoading ? 25 : 0, 
          y: isLoading ? 0 : 0,
          z: isLoading ? 0 : 0,
          filter: isLoading ? "blur(30px)" : "blur(0px)" 
        }}
        transition={{ 
          type: "spring",
          stiffness: 40,
          damping: 25,
          mass: 1.8,
          delay: isLoading ? 0 : 0.4
        }}
      >
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portage" element={<PortagePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
              <Route path="/cgu" element={<CGUPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </motion.div>
    </BrowserRouter>
  );
}
