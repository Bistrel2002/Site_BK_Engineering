import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

/* ── Data ─────────────────────────────────────────────────── */

const nav = [
  { label: "Accueil",          href: "/" },
  { label: "Services",         href: "/services" },
  { label: "Portage Salarial", href: "/portage" },
  { label: "À Propos",         href: "/a-propos" },
  { label: "Contact",          href: "/contact" },
];

// const services = [
//   { label: "Conseil SI",             href: "/services" },
//   { label: "Développement Logiciel", href: "/services" },
//   { label: "Cloud & Infrastructure", href: "/services" },
//   { label: "Intégration & APIs",     href: "/services" },
//   { label: "Tests & QA",             href: "/services" },
// ];

const legal = [
  { label: "Mentions Légales",            href: "/mentions-legales" },
  { label: "Politique de Confidentialité",href: "/politique-confidentialite" },
  { label: "CGU",                         href: "/cgu" },
];

const socials = [
  {
    label: "LinkedIn", href: "#",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "GitHub", href: "#",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X", href: "#",
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

/* ── Column heading ───────────────────────────────────────── */

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-display font-semibold text-[11px] uppercase tracking-[0.15em] text-text-secondary mb-4">
      {children}
    </h4>
  );
}

/* ── Footer ───────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer className="bg-bg-darker border-t border-border/30">
      <div
        className="max-w-[1200px] mx-auto py-14"
        style={{ paddingInline: "clamp(1rem, 5vw, 2rem)" }}
      >

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 w-fit">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center font-display font-bold text-white text-base shadow-lg shadow-accent/25">
                BK
              </div>
              <span className="font-display font-bold text-lg text-text-primary">
                BK <span className="text-accent-light">Engineering</span>
              </span>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-[260px]">
              ESN française spécialisée en Conseil SI, Développement logiciel et Portage Salarial.
            </p>

            <div className="flex gap-2">
              {socials.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-accent-light hover:border-accent/30 transition-colors duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* 2 — Navigation */}
          <div>
            <ColHead>Navigation</ColHead>
            <ul className="flex flex-col gap-3">
              {nav.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Légal */}
          <div>
            <ColHead>Légal</ColHead>
            <ul className="flex flex-col gap-3">
              {legal.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* 4 — Contact */}
          <div>
            <ColHead>Contact</ColHead>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:bikel.keumeka@bkengineering.fr"
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent-light transition-colors duration-200 group"
                >
                  <Mail size={13} className="text-accent shrink-0 group-hover:text-accent-light transition-colors" />
                  bikel.keumeka@bkengineering.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33100000000"
                  className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent-light transition-colors duration-200 group"
                >
                  <Phone size={13} className="text-accent shrink-0 group-hover:text-accent-light transition-colors" />
                  +33 1 00 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-text-secondary">
                <MapPin size={13} className="text-accent shrink-0 mt-[3px]" />
                <span>63 Rue du 19 Mars 1962<br />35700 Rennes, France</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} BK Engineering. Tous droits réservés.
          </p>
          <p className="text-xs text-text-secondary">
            SASU · SIREN 951 685 031 · Rennes, France 🇫🇷
          </p>
        </div>

      </div>
    </footer>
  );
}