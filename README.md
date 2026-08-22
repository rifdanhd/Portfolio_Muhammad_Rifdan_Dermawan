<div align="center">

  # ⚡ Muhammad Rifdan Dermawan — Engineering Portfolio

  <p align="center">
    <strong>Senior Full-Stack Engineer & Infrastructure Developer</strong>
  </p>

  <p align="center">
    <a href="https://rifdan-portfolio.vercel.app">
      <img src="https://img.shields.io/badge/Live_Demo-rifdan--portfolio.vercel.app-FF5500?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/rifdanhd">
      <img src="https://img.shields.io/badge/GitHub-rifdanhd-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile" />
    </a>
    <a href="https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388">
      <img src="https://img.shields.io/badge/LinkedIn-Rifdan_Dermawan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
  </p>

  <p align="center">
    A world-class luxury engineering portfolio built with Next.js 15 App Router, React 19, Three.js, COBE WebGL 3D Globe, GSAP, Tailwind CSS, Framer Motion, and Prisma ORM.
  </p>

</div>

---

## 🌟 Highlights & Key Features

- **🎨 Minimal Luxury Aesthetic**: Inspired by the design systems of Apple, Linear, and Vercel with high-contrast typography, frosted glassmorphism, and dynamic ambient lighting.
- **🌍 Interactive 3D WebGL Globe**: Powered by [COBE](https://github.com/shuding/cobe) with smooth inertia drag physics, live rotation, and city pinpoints.
- **⚡ Next.js 15 App Router & React 19**: Full Server-Side Rendering (SSR) & Static Site Generation (SSG) with optimized Core Web Vitals.
- **⌨️ Command Palette (`Cmd + K` / `Ctrl + K`)**: Instant keyboard navigation, project quick-search, theme switcher, and direct action triggers via `cmdk`.
- **🛠️ Production Case Studies**: Detailed engineering breakdowns and technical deep dives for real-world enterprise platforms (e.g., *Saung Angklung Udjo*, *Enterprise Warranty QR System*, *Ticket Reservation Engine*).
- **🔐 Admin Management Dashboard (`/admin`)**: Complete CMS powered by Prisma ORM for managing projects, metrics, gallery media, and work experience.
- **🌐 Multilingual Support**: Seamless English (`EN`) and Bahasa Indonesia (`ID`) dynamic localization toggle.
- **🎵 Interactive Soundscapes**: Web Audio API synthesized subtle micro-sound interactions and ambient background sound toggle.
- **🌗 Dark / Light Mode**: Smooth theme transitions using `next-themes` and full Tailwind CSS token hierarchy.
- **📬 Dynamic Contact Form**: Integrated with Resend API for instant direct messaging and delivery notifications.

---

## 🛠️ Technology Stack

### **Frontend & Creative Engineering**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **UI Library**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- **3D & WebGL**: [Three.js](https://threejs.org/) & [COBE](https://github.com/shuding/cobe)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://greensock.com/gsap/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Backend, Database & Tooling**
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) (SQLite / PostgreSQL compatible)
- **API Engine**: Next.js Server Components & Route Handlers
- **Email Service**: [Resend](https://resend.com/)
- **Deployment**: [Vercel Edge Network](https://vercel.com/)

---

## 📂 Project Structure

```bash
PORTFOLIO/
├── app/                        # Next.js 15 App Router
│   ├── (dashboard)/            # Protected Admin Dashboard routes
│   │   ├── experience/         # Experience CRUD manager
│   │   └── projects/           # Project CRUD & gallery manager
│   ├── admin/                  # Admin authentication & login
│   ├── api/                    # Backend API routes (contact form, etc.)
│   ├── blog/                   # Technical blog posts & articles
│   ├── projects/[slug]/        # Deep-dive interactive case study pages
│   ├── globals.css             # Design tokens & Tailwind utility classes
│   ├── layout.tsx              # Root layout & JSON-LD Schema metadata
│   ├── page.tsx                # Main single-page portfolio experience
│   ├── robots.ts               # Automated SEO robots configuration
│   └── sitemap.ts              # Dynamic sitemap generator
├── components/                 # Reusable UI & Interactive Components
│   ├── admin/                  # Admin form modals and management tables
│   ├── three/                  # WebGL canvases and 3D scenes
│   ├── Globe.tsx               # COBE 3D WebGL Globe component
│   ├── command-palette.tsx     # Cmd+K fuzzy finder palette
│   ├── contact-section.tsx     # Animated contact form
│   ├── footer.tsx              # Luxury branding footer
│   ├── hero.tsx                # Hero section with headline & live status
│   ├── navbar.tsx              # Floating glassmorphic navigation bar
│   ├── projects-section.tsx    # Featured works grid & interactive cards
│   └── tech-stack.tsx          # Animated technologies marquee
├── hooks/                      # Custom React hooks (cursor, sound, motion)
├── lib/                        # Data sources, Prisma client & utilities
│   ├── actions/                # Server Actions (Auth, Projects, Experience)
│   ├── projects-data.ts        # Seed project records and metadata
│   ├── experience-data.ts      # Career journey and achievements
│   ├── i18n.tsx                # Internationalization provider
│   └── prisma.ts               # Singleton Prisma client instance
├── prisma/                     # Database schema & seeding scripts
│   ├── schema.prisma           # Prisma data models
│   └── seed.ts                 # Database seed script
└── public/                     # Static media, showcases, and icons
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rifdanhd/Portfolio_Muhammad_Rifdan_Dermawan.git
cd Portfolio_Muhammad_Rifdan_Dermawan
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the project root:
```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="your-secure-admin-password"
JWT_SECRET="your-jwt-secret-key"
RESEND_API_KEY="your-resend-api-key"
CONTACT_EMAIL="rifdandermawan252@gmail.com"
```

### 4. Initialize and Seed Database
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

This project is optimized for zero-config deployment on [Vercel](https://vercel.com/):

```bash
npm run build
vercel --prod
```

---

## 👨‍💻 Author

**Muhammad Rifdan Dermawan**
- **Website**: [rifdan-portfolio.vercel.app](https://rifdan-portfolio.vercel.app)
- **GitHub**: [@rifdanhd](https://github.com/rifdanhd)
- **LinkedIn**: [Muhammad Rifdan Dermawan](https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388)
- **Email**: [rifdandermawan252@gmail.com](mailto:rifdandermawan252@gmail.com)

---

## 📄 License

This project is licensed under the MIT License — feel free to explore the codebase for personal inspiration.
