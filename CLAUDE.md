# CLAUDE.md — Rifdan Portfolio Project

> **AI assistant context file.** Read this before touching any file in this repo.

---

## Project Overview

Personal portfolio website for **Muhammad Rifdan Dermawan** — Full Stack Engineer at Saung Angklung Udjo.
Built to premium quality (Apple / Vercel / Linear aesthetic). Dark mode is the default, light mode is togglable.
Supports **two languages**: English (EN) and Bahasa Indonesia (ID) via a custom `LanguageContext`.

**Live deployment:** Vercel (auto-deploys from main branch via `vercel --prod`)

---

## Tech Stack

| Category        | Technology                                    |
|-----------------|-----------------------------------------------|
| Framework       | Next.js 16 (App Router)                       |
| Language        | TypeScript — **ALL files must be `.tsx/.ts`** |
| Styling         | Tailwind CSS v3 — **no raw CSS files**        |
| Animations      | Framer Motion + GSAP                          |
| 3D Graphics     | Three.js (vanilla — no React Three Fiber)     |
| UI Primitives   | shadcn/ui components in `components/ui/`      |
| Icons           | Lucide React                                  |
| Theming         | next-themes (`dark` default, `light` toggle)  |
| i18n            | Custom `LanguageContext` in `lib/i18n.tsx`    |
| Email           | Resend (`/api/contact` route)                 |
| Deployment      | Vercel                                        |

---

## Repository Structure

```
PORTFOLIO/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Home page — assembles all sections
│   ├── globals.css             # Tailwind directives + CSS variables (dark/light)
│   ├── providers.tsx           # ThemeProvider + LanguageProvider wrapper
│   ├── robots.ts               # SEO robots.txt
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── api/contact/route.ts    # POST endpoint → sends email via Resend
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/page.tsx     # Blog post detail (SSG)
│   └── projects/
│       └── [slug]/page.tsx     # Project detail (SSG)
│
├── components/
│   ├── navbar.tsx              # Sticky navbar with active section tracking, theme & lang toggles
│   ├── navbar-wrapper.tsx      # Client wrapper for Navbar (used in Server Components)
│   ├── hero.tsx                # Hero section with 3D canvas
│   ├── about.tsx               # About section
│   ├── experience.tsx          # Timeline-based experience section
│   ├── projects-section.tsx    # Projects grid cards
│   ├── skills.tsx              # Skills with category tabs + progress bars
│   ├── tech-stack.tsx          # Tech stack cards grid
│   ├── achievements.tsx        # Metric highlights
│   ├── blog-section.tsx        # Blog cards with search
│   ├── contact-section.tsx     # Contact form + social links
│   ├── footer.tsx              # Footer with social icons
│   ├── command-palette.tsx     # ⌘K command palette (cmdk)
│   ├── theme-toggle.tsx        # Sun/Moon icon button (next-themes)
│   ├── language-toggle.tsx     # EN / ID switcher button
│   ├── loading-screen.tsx      # Initial splash animation
│   ├── music-toggle.tsx        # Background music toggle
│   ├── scroll-progress.tsx     # Top scroll progress bar
│   ├── custom-cursor.tsx       # Custom mouse cursor
│   ├── page-transition.tsx     # Route transition animation
│   ├── theme-transition-overlay.tsx # Theme switch animation overlay
│   ├── three/
│   │   └── hero-canvas.tsx     # Vanilla Three.js interactive 3D scene
│   └── ui/                     # shadcn/ui primitives (Button, Card, Badge…)
│
├── lib/
│   ├── i18n.tsx                # EN/ID translations + LanguageContext + useLanguage()
│   ├── projects-data.ts        # All project entries (type-safe)
│   ├── experience-data.ts      # Career timeline data
│   ├── skills-data.ts          # Skills categories + proficiency levels
│   ├── blog-data.ts            # Blog posts with MDX content strings
│   ├── sound-effects.ts        # Sound utility for UI interactions
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
│
├── hooks/
│   └── use-active-section.ts   # IntersectionObserver hook for navbar highlighting
│
├── types/
│   └── three-jsx.d.ts          # Reserved for future Three.js type augmentations
│
├── public/                     # Static assets (favicons, sounds, images)
├── tailwind.config.ts          # Tailwind config with custom fonts & animations
├── next.config.mjs             # Next.js config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## Development Commands

```bash
# Start local dev server (hot reload)
npm run dev          # → http://localhost:3000

# Type-check + build for production
npm run build

# Start production server (after build)
npm start

# Lint code
npm run lint

# Deploy to Vercel production
vercel --prod
```

---

## Critical Architecture Rules

### 1. Language Support (i18n)
- **ALL user-visible text** must come from `useLanguage()` hook — never hardcode English strings in components.
- Import pattern in every component:
  ```tsx
  import { useLanguage } from "@/lib/i18n";
  // inside component:
  const { t } = useLanguage();
  // usage: t.hero.title, t.nav.about, etc.
  ```
- To add new text: add the key to the `Translations` interface AND both `en` and `id` objects in `lib/i18n.tsx`.

### 2. Dark / Light Mode
- Theme is controlled by `next-themes`. Default = `dark`. Toggle via `<ThemeToggle />`.
- Use Tailwind's `dark:` / `light:` prefixes for theme-aware styles:
  ```tsx
  // ✅ Correct
  className="dark:bg-zinc-900 light:bg-white dark:text-white light:text-zinc-900"
  // ❌ Wrong — hardcoded color will break in light mode
  className="bg-[#09090B] text-white"
  ```
- CSS custom properties for surfaces are defined in `globals.css` under `:root, .dark {}` and `.light {}`.

### 3. No React Three Fiber (R3F)
- `@react-three/fiber` is **NOT installed** — it has a React 18/19 peer dependency conflict.
- All 3D graphics use **vanilla Three.js** in a `useEffect` hook with `renderer.domElement` mounted into a `ref`.
- See `components/three/hero-canvas.tsx` as the reference pattern.

### 4. Server vs. Client Components
- `app/` pages that render `<Navbar>` **must** use `<NavbarWrapper />` (not `<Navbar>`) because passing `onOpenCmdk` from a Server Component is forbidden.
- Any component that uses `useState`, `useEffect`, `useTheme`, `useLanguage`, or event handlers needs the `"use client"` directive at the top.

### 5. TypeScript — Strict Mode
- No `any` types. No `@ts-ignore`.
- All data types are defined in their respective data files (e.g., `lib/projects-data.ts` exports typed `Project[]`).

### 6. Tailwind Only — No CSS Files
- Do not add new `.css` files. `globals.css` is the only stylesheet and only contains Tailwind directives + CSS variable definitions.
- Component-level styling = Tailwind utility classes only.

---

## Data Layer — How to Edit Content

### Add / Edit a Project
Edit `lib/projects-data.ts`. Each entry must match the `Project` interface defined at the top of the file.

### Add / Edit an Experience Entry
Edit `lib/experience-data.ts`.

### Add / Edit a Blog Post
Edit `lib/blog-data.ts`. The `content` field accepts a multiline Markdown string (rendered via `dangerouslySetInnerHTML` on the detail page).

### Add / Edit Skills
Edit `lib/skills-data.ts`. Each category contains an array of `{ name, level, experience }` objects.

---

## Environment Variables

Create a `.env.local` file at the project root for local development:

```env
# Required for /api/contact email sending
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=rifdan.dermawan@gmail.com
```

On Vercel, set these in: **Project → Settings → Environment Variables**

---

## Known Issues & Resolved Bugs

| Issue | Fix Applied |
|-------|-------------|
| `ReactCurrentBatchConfig undefined` crash | Removed `@react-three/fiber` v8 (React 19 incompatible). Replaced with vanilla Three.js in `useEffect`. |
| `Event handlers cannot be passed to Client Component props` on static pages | Created `NavbarWrapper` client component. All `/blog/*` and `/projects/*` pages use it. |
| `forcedTheme` vs `forcedTheme` prop error | `providers.tsx` uses `defaultTheme="dark"` without `forcedTheme` so toggling works. |
| Build failed: missing `.next/BUILD_ID` | Run `rm -rf .next && npm run build` for a clean build. |
| Vercel deploy rejected: vulnerable Next.js version | Upgraded Next.js to `^16.2.11` in `package.json`. |

---

## Design System Tokens

| Token | Dark Value | Light Value |
|-------|-----------|-------------|
| Page background | `#09090B` | `#F8F9FA` |
| Surface / card | `#18181B` | `#FFFFFF` |
| Border | `#27272A` | `#E4E4E7` |
| Primary accent | `#3B82F6` (blue-500) | `#2563EB` (blue-600) |
| Secondary accent | `#8B5CF6` (violet-500) | `#7C3AED` (violet-600) |
| Muted text | `#71717A` (zinc-500) | `#52525B` (zinc-600) |

Gradient text: `text-gradient-primary` class applies `blue-400 → indigo-400 → violet-400`.

---

## Deployment Notes

- Auto-deploy is configured via Vercel Git integration on the `main` branch.
- Manual deploy: `vercel --prod` from the `/PORTFOLIO` directory.
- The project is **statically pre-rendered** (SSG) for all blog and project pages via `generateStaticParams()`.
- The only dynamic route is `app/api/contact/route.ts` (server function).
