# Web Standards Skill — Website Generation

```yaml
---
name: web-standards
description: >
  Load this skill before generating ANY website or web UI.
  Enforces the default technology stack, versioned dependencies,
  UI architecture, animation standards, hover effects, scroll behavior,
  and performance rules. All rules apply unless the user explicitly overrides them.
---
```

---

## 0. Quick Reference — Pinned Dependency Versions

These are the **exact versions** to use in every `package.json`. They are
chosen for maximum cross-compatibility and production stability as of 2026.

```json
{
  "dependencies": {
    "react":          "^19.2.0",
    "react-dom":      "^19.2.0",
    "motion":         "^12.0.0",
    "gsap":           "^3.12.5",
    "lucide-react":   "^0.460.0",
    "next":           "^15.3.0"
  },
  "devDependencies": {
    "typescript":             "^5.7.0",
    "@types/react":           "^19.0.0",
    "@types/react-dom":       "^19.0.0",
    "tailwindcss":            "^4.1.0",
    "@tailwindcss/vite":      "^4.1.0",
    "vite":                   "^6.2.0",
    "@vitejs/plugin-react":   "^4.3.4",
    "postcss":                "^8.5.0",
    "autoprefixer":           "^10.4.20"
  }
}
```

> **Version selection rationale — read before changing anything:**
>
> | Package | Pinned version | Why this version |
> |---|---|---|
> | `react` / `react-dom` | `^19.2.0` | Latest stable. Concurrent features, Actions API, no breaking changes from 19.0 |
> | `motion` | `^12.0.0` | Framer Motion was renamed to `motion`. Import from `motion/react`. v12 is the stable production line |
> | `gsap` | `^3.12.5` | GSAP v3 is the mature, fully stable branch. ScrollTrigger is included. GSAP v4 is still early-access |
> | `lucide-react` | `^0.460.0` | Pin to the 0.x range. The 1.x jump introduced icon naming changes that break existing code |
> | `tailwindcss` | `^4.1.0` | v4 rewrites the engine (no `tailwind.config.js`, Vite plugin replaces PostCSS config). Use `^3.4.17` only for legacy projects |
> | `typescript` | `^5.7.0` | Latest 5.x stable. Full React 19 type support |
> | `vite` | `^6.2.0` | Stable v6, pairs with `@tailwindcss/vite` plugin |
> | `next` | `^15.3.0` | Latest Next.js. Turbopack is default dev bundler. App Router is the standard |

---

## 1. Technology Stack

### Frontend Framework
- **React `^19.2.0`**
- Use functional components exclusively — no class components
- Use `useTransition`, `use()`, and Actions for async patterns (React 19 native)

### Language
- **TypeScript `^5.7.0`** — strict mode enabled
- No `any` types. Use `unknown` + type narrowing
- Config: `"strict": true` in `tsconfig.json`

### Styling
- **TailwindCSS `^4.1.0`**
  - **Vite projects:** use the `@tailwindcss/vite` plugin (no `tailwind.config.js` needed)
  - **Next.js projects:** use `@tailwindcss/postcss` plugin
  - No separate config file in v4 — configuration lives in `index.css` via `@theme`

```css
/* src/index.css — Tailwind v4 setup */
@import "tailwindcss";

@theme {
  --color-primary: #6366F1;
  --color-secondary: #22C55E;
  --color-bg-dark: #0F172A;
  --color-bg-light: #F8FAFC;
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Poppins', sans-serif;
}
```

### Animation Libraries
- **`motion` `^12.0.0`** — primary, for all React-native animations
  - Import: `import { motion, AnimatePresence } from "motion/react"` (not `framer-motion`)
  - Use for: fade-ins, slide-ups, layout transitions, hover effects, scroll reveals
- **`gsap` `^3.12.5`** — for advanced scroll-driven or timeline effects only
  - Import: `import { gsap } from "gsap"` + `import { ScrollTrigger } from "gsap/ScrollTrigger"`
  - Always `gsap.registerPlugin(ScrollTrigger)` at module level
  - Always kill ScrollTrigger instances in the `useEffect` cleanup function

### Icons
- **`lucide-react` `^0.460.0`**
  - Tree-shakeable. Import only what you use: `import { ArrowRight, Menu } from "lucide-react"`

### Fonts
- **Inter** (primary body/UI font)
- **Poppins** (display/headings)
- Load via Google Fonts in `index.html` with `rel="preconnect"` and `display=swap`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
```

### Build System
- **Vite `^6.2.0`** — for standalone React apps (SPA, portfolio, landing pages)
- **Next.js `^15.3.0`** — for SSR/SSG, multi-page apps, dashboards with routing

---

## 2. Project Structure

```
src/
├── components/
│   ├── ui/            # Primitives: Button, Card, Badge, Input
│   ├── layout/        # Navbar, Footer, Container, Section
│   └── sections/      # Hero, Features, Testimonials, CTA
├── pages/             # Route-level components (or app/ for Next.js)
├── animations/        # Reusable motion variants and GSAP helpers
├── hooks/             # Custom React hooks
├── styles/            # Global CSS, Tailwind theme overrides
└── types/             # Shared TypeScript interfaces and types
```

**Rules:**
- One component per file
- No component exceeds 200 lines — extract sub-components when needed
- Animation logic lives in `animations/` — not inside component files
- Layout logic is separated from UI logic

---

## 3. UI Component System

Every component must:
- Accept typed `props` (no implicit `any`)
- Support a `variant` prop where applicable (`"primary" | "secondary" | "ghost"`)
- Use `className` prop for external style overrides (merge with `cn()` utility)
- Be accessible: semantic HTML, `aria-*` attributes, keyboard navigable

**Required base components:**

| Component | File | Variants |
|---|---|---|
| `Button` | `ui/Button.tsx` | `primary`, `secondary`, `ghost`, `destructive` |
| `Card` | `ui/Card.tsx` | `default`, `elevated`, `outlined` |
| `Badge` | `ui/Badge.tsx` | `default`, `success`, `warning` |
| `Navbar` | `layout/Navbar.tsx` | sticky, transparent-on-top |
| `Footer` | `layout/Footer.tsx` | — |
| `Section` | `layout/Section.tsx` | container width + padding wrapper |
| `Hero` | `sections/Hero.tsx` | — |
| `FeatureGrid` | `sections/FeatureGrid.tsx` | — |
| `Testimonials` | `sections/Testimonials.tsx` | — |
| `CTA` | `sections/CTA.tsx` | — |

---

## 4. Layout System

**Standard page structure (in order):**
1. `<Navbar />` — sticky after scroll
2. `<Hero />` — full viewport height
3. Value proposition — short tagline + supporting copy
4. `<FeatureGrid />` — 3-column grid on desktop, stacked on mobile
5. `<Testimonials />` — social proof
6. `<CTA />` — conversion block
7. `<Footer />` — links, legal, socials

**Container:**
```css
max-width: 1200px;
margin-inline: auto;
padding-inline: clamp(1rem, 5vw, 2rem);
```

**Spacing scale (4px base unit):**
`4` `8` `12` `16` `24` `32` `48` `64` `80` `96` `128` px

---

## 5. Animation Standards

**Library:** `motion` (formerly Framer Motion)

**Duration:** `0.2s – 0.4s`
**Easing:** `ease-in-out` or `[0.4, 0, 0.2, 1]` (Material easing)

**Centralized variants file:**

```ts
// src/animations/variants.ts
import type { Variants } from "motion/react";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
```

**Allowed animation types:**
- Fade in
- Slide up
- Scale in
- Stagger children
- Parallax (via `motion` `useScroll` + `useTransform`)
- Hover elevation (scale + shadow)

**Never use:**
- Looping autoplay animations unless user-triggered
- Delays longer than `0.6s`
- Excessive bounce (`type: "spring"` only with `stiffness > 200`)
- Animating `width`, `height`, or `margin` (causes layout thrashing)

---

## 6. Hover Effects

**Buttons:**
```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
>
```
Or with Tailwind: `hover:scale-105 transition-transform duration-200`

**Cards:**
```tsx
<motion.div
  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
  transition={{ duration: 0.2 }}
>
```
Or with Tailwind: `hover:-translate-y-1 hover:shadow-xl transition-all duration-200`

**Links:** `hover:text-primary underline-offset-4 hover:underline`

---

## 7. Scroll Behavior

**Smooth scrolling:**
```css
html { scroll-behavior: smooth; }
```

**Scroll reveal — use `motion` with `whileInView`:**
```tsx
import { motion } from "motion/react";
import { slideUp } from "@/animations/variants";

<motion.div
  variants={slideUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```
- Always set `viewport={{ once: true }}` to avoid re-triggering on scroll up

**Sticky Navbar:**
```tsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
}, []);
```
```tsx
<nav className={`fixed top-0 w-full z-50 transition-all duration-300
  ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
```

---

## 8. Scroll-Controlled Video (Optional — User Must Request)

Only implement when the user **explicitly** asks for it (e.g. *"add scroll-driven video hero"*).

**Library:** GSAP `^3.12.5` + ScrollTrigger

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// In useEffect:
const ctx = gsap.context(() => {
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      if (videoRef.current) {
        videoRef.current.currentTime =
          self.progress * videoRef.current.duration;
      }
    },
  });
}, sectionRef);

return () => ctx.revert(); // ← always clean up
```

**Performance rules for video:**
- Compress to WebM/MP4 under 5 MB
- Set `preload="auto"` and `muted` and `playsInline`
- Lazy load with `loading="lazy"` on the wrapper

---

## 9. Responsive Design

**Mobile-first. Always.** Write mobile styles first, then override with breakpoints.

| Breakpoint | Range | Tailwind prefix |
|---|---|---|
| Mobile | 0 – 767px | (default) |
| Tablet | 768px – 1023px | `md:` |
| Desktop | 1024px+ | `lg:` |
| Wide | 1280px+ | `xl:` |

**Rules:**
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Navigation: hamburger menu on mobile, full links on `lg:`
- Font sizes: use `clamp()` or responsive Tailwind variants

---

## 10. Performance Standards

**Images:**
- Use `WebP` or `AVIF` format
- Always set explicit `width` and `height` to prevent layout shift
- Lazy load below-the-fold images: `loading="lazy"`
- In Next.js: always use `<Image />` from `next/image`

**Animation performance:**
- Only animate GPU-friendly properties: `transform`, `opacity`
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change: transform` sparingly — only on actively animating elements

**Bundle:**
- Tree-shake everything — named imports only
- Code-split route-level components with `React.lazy()` + `<Suspense>`
- Avoid importing entire libraries (e.g. never `import _ from "lodash"`)

---

## 11. Accessibility (Non-Negotiable)

- Semantic HTML: use `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- All images: `alt` attribute always present (empty string `alt=""` for decorative images)
- All interactive elements reachable via `Tab` key
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Motion: respect `prefers-reduced-motion`

```tsx
// src/animations/variants.ts — add to every variant
import { useReducedMotion } from "motion/react";

export function useSafeVariants<T>(normal: T, reduced: T): T {
  const reduce = useReducedMotion();
  return reduce ? reduced : normal;
}
```

- ARIA roles and attributes on all custom interactive elements
- `<button>` for actions, `<a>` for navigation — never swap them

---

## 12. Visual Style Defaults

**Aesthetic:** Modern SaaS — clean, spacious, confident.

| Token | Value |
|---|---|
| Primary | `#6366F1` (Indigo) |
| Secondary | `#22C55E` (Green) |
| Dark background | `#0F172A` |
| Light background | `#F8FAFC` |
| Text primary (dark) | `#F1F5F9` |
| Text primary (light) | `#0F172A` |
| Border radius base | `0.75rem` (12px) |
| Shadow default | `0 4px 24px rgba(0,0,0,0.08)` |

**Typography scale:**

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / H1 | Poppins | 800 | `clamp(2.5rem, 5vw, 4.5rem)` |
| H2 | Poppins | 700 | `clamp(1.75rem, 3vw, 3rem)` |
| H3 | Inter | 600 | `1.5rem` |
| Body | Inter | 400 | `1rem` |
| Small / Caption | Inter | 400 | `0.875rem` |

**Visual traits:**
- Soft shadows, not harsh drop shadows
- Subtle gradients on hero sections (use `bg-gradient-to-br`)
- Rounded corners: `rounded-xl` (cards), `rounded-full` (pills/tags)
- Generous whitespace — minimum `py-20` on sections

---

## 13. Project Setup Commands

### Vite + React + TypeScript + TailwindCSS v4

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install motion gsap lucide-react
npm install -D tailwindcss@^4.1.0 @tailwindcss/vite@^4.1.0
```

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

`src/index.css`:
```css
@import "tailwindcss";
```

---

### Next.js + TypeScript + TailwindCSS v4

```bash
npx create-next-app@latest my-app \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
npm install motion gsap lucide-react
```

TailwindCSS v4 is auto-configured by `create-next-app` when `--tailwind` is passed.

---

## 14. Prompt Overrides

Users can override any section. Override takes full priority over defaults.

| User says | Action |
|---|---|
| `"use dark mode"` | Set `#0F172A` bg, `#F1F5F9` text globally |
| `"use GSAP for all animations"` | Replace `motion` with GSAP timelines throughout |
| `"add scroll-controlled video"` | Implement Section 8 |
| `"build a dashboard"` | Switch layout to sidebar + content shell |
| `"use Tailwind v3"` | Pin `tailwindcss@^3.4.17`, use `tailwind.config.js` setup |
| `"use Next.js"` | Switch build system to Next.js 15, use `app/` router |
| `"no animations"` | Remove all `motion` and GSAP code entirely |
| `"minimal design"` | Reduce shadow, gradients, and spacing; increase whitespace |

---

## 15. Pre-Generation Checklist

Before writing any website code, verify:

- [ ] Correct import path for motion: `from "motion/react"` (not `"framer-motion"`)
- [ ] GSAP ScrollTrigger registered AND cleaned up in `useEffect` return
- [ ] TailwindCSS v4 — no `tailwind.config.js`, Vite plugin used
- [ ] All animations use only `transform` / `opacity`
- [ ] `viewport={{ once: true }}` on all `whileInView` elements
- [ ] All images have `alt`, explicit `width`/`height`
- [ ] Navbar has sticky + blur-on-scroll behavior
- [ ] Components are split — no monolithic single-file pages
- [ ] TypeScript `strict: true` in tsconfig
- [ ] `prefers-reduced-motion` respected in animation hooks