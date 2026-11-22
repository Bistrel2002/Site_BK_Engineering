import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  // Masqué : { label: "Portage Salarial", href: "/portage" },
  { label: "À Propos", href: "/a-propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);

  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-dark/85 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-border/30"
            : "bg-transparent"
        )}
      >
        <div
          className="max-w-[1200px] mx-auto flex items-center justify-between h-20"
          style={{ paddingInline: "clamp(1rem, 5vw, 2rem)" }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-shadow duration-300">
              BK
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              BK <span className="text-accent-light">Engineering</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-accent-light underline-offset-4 hover:underline",
                  location.pathname === link.href ||
                    (link.href !== "/" && location.pathname.startsWith(link.href))
                    ? "text-accent-light"
                    : "text-text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" icon={<ChevronRight size={16} />}>
                Démarrer un projet
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-dark pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-xl font-display font-semibold py-5 px-6 rounded-2xl transition-all duration-200 border border-transparent",
                    location.pathname === link.href
                      ? "text-accent-light bg-accent/10 border-accent/20"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-card hover:border-border/30"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <Link to="/contact">
                  <Button size="lg" className="w-full" icon={<ChevronRight size={18} />}>
                    Démarrer un projet
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
