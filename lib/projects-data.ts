import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "saung-angklung-udjo",
    slug: "saung-angklung-udjo",
    title: "Official Website & Booking Platform",
    subtitle: "Saung Angklung Udjo",
    role: "Full Stack Engineer & Infrastructure Owner",
    period: "Jan 2025 — Present",
    description:
      "A complete architectural overhaul of Indonesia's premier cultural venue web platform. Transitioned legacy WordPress to Laravel 12, custom Blade UI, MySQL, dynamic QRIS ticketing, WhatsApp messaging, and cPanel CDN infrastructure.",
    heroImage: "/videos/showcase.webm",
    videoSrc: "/videos/showcase.webm",
    techStack: ["Laravel 12", "MySQL", "Tailwind CSS", "Cloudflare", "Alpine.js", "Vite", "PWA"],
    githubUrl: "https://github.com/rifdanhd/saung-angklung-udjo",
    liveUrl: "https://angklung-udjo.co.id",
    featured: true,
    metrics: [
      { label: "Core Framework", value: "Laravel 12" },
      { label: "Tickets Processed", value: "50,000+" },
      { label: "Booking Speed", value: "< 800ms" },
      { label: "Uptime SLA", value: "99.95%" },
    ],
    content: {
      overview:
        "Saung Angklung Udjo (SAU) is a world-renowned cultural heritage destination in Bandung, Indonesia. The previous platform suffered from severe WordPress database bottlenecks, security vulnerabilities, slow page speed (under 30/100 Mobile Lighthouse score), and frequent booking server downtime during peak tourist seasons.",
      challenge:
        "The venue needed a rock-solid, production-grade custom web system capable of handling thousands of concurrent visitors during holiday spikes, facilitating instant QRIS dynamic payment flows, verifying ticket validation offline at gates, and standing resilient against automated malicious bots and subdomain injection attacks.",
      research:
        "Audited existing venue workflows, guest booking patterns, entrance scanner hardware, and server resource allocation. Observed that 78% of visitors book performance tickets directly via mobile devices while traveling or at venue gates.",
      planning:
        "Designed a decoupled modern monolithic architecture using Laravel 12 with SQLite/MySQL query caching, Vite asset optimization, Redis session caching, and Cloudflare Enterprise Edge WAF rules to handle DDoS threats.",
      design:
        "Crafted a modern cultural aesthetic combining traditional bamboo-inspired warm accents with a crisp dark luxury interface. Focused on a 3-step checkout funnel designed to complete transactions in under 45 seconds.",
      architecture:
        "Laravel 12 backend with clean Action/Service pattern, MySQL relational schema with indexing on event dates, Redis queue workers for instant email and WhatsApp confirmation dispatches, and Cloudflare CDN caching for static media.",
      database:
        "Normalized relational database with strict foreign keys: `users`, `events`, `ticket_types`, `reservations`, `payments`, and `gate_scans`. Added compound indexes on `(event_id, status, reservation_date)` for fast seating availability queries.",
      frontend:
        "Blade components styled with Tailwind CSS, micro-interactions powered by Alpine.js, interactive interactive seating map, live price calculation, dynamic QR code modal rendering, and progressive web app (PWA) manifest for venue staff off-grid ticket verification.",
      backend:
        "RESTful API endpoints with rate limiting (`throttle:60,1`), robust webhooks for payment gateway status callbacks, automatic invoice generation, and automated daily backup routines stored off-site.",
      deployment:
        "Hosted on optimized Linux cPanel environment with Cloudflare DNS proxy, automatic SSL certificates, HTTP/3 protocol, compressed Brotli assets, and automated deployment scripts via Git Webhooks.",
      performance:
        "Achieved a 99/100 Desktop and 96/100 Mobile Google PageSpeed score. Reduced initial page load from 4.8 seconds to 620 milliseconds.",
      seo:
        "Implemented full schema.org Event and LocalBusiness JSON-LD structured data, multi-language hreflang attributes (Indonesian/English), automated sitemap XML generation, and canonical tags.",
      lessonsLearned:
        "Building for real cultural institutions requires balancing legacy operational constraints with cutting-edge software practices. Owning both the code and the infrastructure built deep resilience in zero-downtime migrations.",
      timeline: "Jan 2025 (Discovery & Architecture) — Feb 2025 (Beta Launch) — Ongoing Production Maintenance",
      gallery: [],
    },
  },
  {
    id: "warranty-system",
    slug: "warranty-system",
    title: "Enterprise Warranty & QR Verification System",
    subtitle: "Industrial Asset Tracking",
    role: "Full Stack Engineer",
    period: "Aug 2024 — Nov 2024",
    description:
      "A high-security product warranty registration, instant QR Code validation, and administrative claim management platform for manufacturing electronics.",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    techStack: ["PHP 8.3", "MySQL", "QR Code Engine", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/rifdanhd/warranty-system",
    featured: true,
    metrics: [
      { label: "QR Validation", value: "Instant" },
      { label: "Fraud Reduction", value: "100%" },
      { label: "Claims Managed", value: "12,000+" },
      { label: "Admin Analytics", value: "Real-time" },
    ],
    content: {
      overview:
        "Manufacturing and distribution companies face fraudulent warranty claims due to counterfeit serial numbers and paper receipts. This system digitizes product authentication via encrypted QR codes printed on physical packaging.",
      challenge:
        "Constructing a tamper-proof validation system where every manufactured item receives a unique cryptographic signature encoded inside a scannable QR code. Must work effortlessly on mobile devices for end consumers and field service engineers.",
      research:
        "Analyzed serialized hardware tracking protocols, barcode scanner latency, and hash algorithms (HMAC-SHA256) to ensure QR codes cannot be spoofed or batch-generated by bad actors.",
      planning:
        "Formulated a dual-interface architecture: a lightweight fast-scanning consumer portal and a high-efficiency administrative dashboard with real-time audit logs, warranty claim approval queues, and CSV batch exports.",
      design:
        "Minimal industrial dashboard dark design with high contrast status badges (Active, Expired, Claimed, Fraud Flagged) and instant visual camera feedback during mobile web browser scanning.",
      architecture:
        "PHP 8.3 modular framework with strict type declarations, PDO prepared statements, HMAC serial signature generation, and MySQL relational indexing.",
      database:
        "Tables for `serial_batches`, `products`, `customers`, `warranties`, `claim_tickets`, and `audit_logs`. AES-256 encryption applied to sensitive customer personal data.",
      frontend:
        "HTML5 HTML5 Camera API (`html5-qrcode`) integrated with Tailwind CSS interface, dynamic validation state transitions, and responsive mobile-first UI.",
      backend:
        "Custom authentication middleware, cryptographic hash comparison engine, automated PDF warranty certificate generator, and email status notifications.",
      deployment:
        "Deployed on hardened Linux VPS environment with Nginx reverse proxy, MariaDB database cluster, and automated SSL rotation.",
      performance:
        "QR code verification responses executed in under 120ms with sub-100kb payload size.",
      seo:
        "Protected internal administrative routes behind authentication headers while public product verification pages feature lightweight OpenGraph tags for trust verification.",
      lessonsLearned:
        "Cryptographic validation at the database and application boundary eliminates physical forgery while providing invaluable supply-chain analytics.",
      timeline: "Aug 2024 — Nov 2024",
      gallery: [],
    },
  },
  {
    id: "ticket-reservation",
    slug: "ticket-reservation",
    title: "Midtrans Payment Gateway Reservation Engine",
    subtitle: "Automated Venue Ticketing",
    role: "Lead Developer (Undergraduate Thesis Project)",
    period: "Oct 2024 — Present",
    description:
      "An automated event ticketing engine integrating Midtrans payment gateway, seat allocation matrices, dynamic discount rules, and instant WhatsApp/Email ticket delivery.",
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    techStack: ["Laravel 12", "Midtrans API", "MySQL", "Tailwind CSS", "WhatsApp API"],
    githubUrl: "https://github.com/rifdanhd/ticket-reservation",
    featured: true,
    metrics: [
      { label: "Payment Gateway", value: "Midtrans Snap" },
      { label: "Tx Settlement", value: "Real-time" },
      { label: "Webhook Resilience", value: "100%" },
      { label: "Ticket Delivery", value: "< 5s" },
    ],
    content: {
      overview:
        "Developed as a core undergraduate research thesis at Universitas Teknologi Bandung to replace manual paper and WhatsApp-based booking reservations with an automated end-to-end digital transaction pipeline.",
      challenge:
        "Handling concurrent payment webhook callbacks reliably without race conditions, preventing double-booking of physical venue seats during high traffic countdown sales.",
      research:
        "Evaluated Midtrans Snap JS and Core API SDKs, atomic database locking mechanisms (`SELECT FOR UPDATE`), and Webhook signature verification strategies.",
      planning:
        "Engineered an event-driven architecture using Laravel Jobs & Queues. Reservations temporary lock seats for 15 minutes while payment is pending, automatically releasing seats if payment expires.",
      design:
        "Sleek concert/venue checkout flow with interactive seating charts, real-time timer countdowns, clear payment method selectors (Bank Transfer, E-Wallet, QRIS, Credit Card), and PDF ticket preview.",
      architecture:
        "Laravel 12 App Router backend, Guzzle HTTP client for Midtrans API communication, Redis queue driver for asynchronous email/WhatsApp dispatching, and Webhook listener endpoint.",
      database:
        "Optimized tables for `orders`, `order_items`, `payment_logs`, `seat_allocations`, and `discount_coupons` with InnoDB transactional locks.",
      frontend:
        "Tailwind CSS styling with Alpine.js reactivity, dynamic countdown timers, copyable payment virtual account numbers, and instant polling for transaction success status.",
      backend:
        "Midtrans signature verification logic (`sha512(order_id + status_code + gross_amount + ServerKey)`), idempotent webhook processing, and automatic PDF e-ticket generation with embedded barcode signatures.",
      deployment:
        "Staging and production instances deployed on Linux VPS using Docker containers for web, worker, and Redis instances.",
      performance:
        "Processes peak checkout webhooks in under 90ms with automatic retry queues for failed notification delivery attempts.",
      seo:
        "SEO-friendly event URLs, structured ticket metadata (`schema.org/Ticket`), and fast mobile rendering.",
      lessonsLearned:
        "Financial integrations demand strict idempotency and atomic database locking to eliminate edge-case double bookings and lost payment notifications.",
      timeline: "Oct 2024 — Present",
      gallery: [],
    },
  },
  {
    id: "personal-portfolio",
    slug: "personal-portfolio",
    title: "Minimal Luxury Engineering Portfolio",
    subtitle: "Apple + Vercel + Linear Design System",
    role: "Senior UI/UX & Creative Developer",
    period: "2026",
    description:
      "A world-class Next.js 15 App Router portfolio showcasing React Three Fiber 3D interactions, Framer Motion transitions, custom Command Palette, MDX technical blog, and sub-second performance.",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    techStack: ["Next.js 15", "TypeScript", "React Three Fiber", "Tailwind CSS", "Framer Motion", "MDX"],
    githubUrl: "https://github.com/rifdanhd/Portfolio_Muhammad_Rifdan_Dermawan",
    liveUrl: "https://rifdandermawan.dev",
    featured: true,
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "3D Performance", value: "60 FPS" },
      { label: "First Contentful Paint", value: "< 0.4s" },
      { label: "Type Safety", value: "100% Strict TS" },
    ],
    content: {
      overview:
        "Designed and engineered to represent top 0.1% software engineering standards. Combines dark mode luxury aesthetics, WebGL 3D graphics, command palette controls, and exhaustive technical case studies.",
      challenge:
        "Integrating rich 3D graphics, custom cursor physics, and complex Framer Motion layout animations without sacrificing sub-second initial load speeds or mobile responsiveness.",
      research:
        "Studied design systems from Vercel, Linear, Apple, Stripe, and Framer. Focused on high-contrast dark palette (`#09090B`), subtle glassmorphism, precise 4px grid spacing, and micro-interactions.",
      planning:
        "Built modular Server Components for SEO and fast initial HTML rendering, coupled with isolated Client Components for React Three Fiber 3D canvas and dynamic state management.",
      design:
        "Minimal luxury aesthetic with subtle glowing ambient lights, noise overlays, crisp typography (Space Grotesk & Inter), smooth gradient borders, and custom command palette (`Cmd+K`).",
      architecture:
        "Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS design system, Framer Motion animation orchestrator, R3F WebGL renderer, and Resend API backend route.",
      database:
        "Serverless statically generated MDX data layer for blog posts and typed structured TypeScript data models for instant compile-time validation.",
      frontend:
        "Tailwind CSS custom design system, Framer Motion scroll-linked animations, client-side command palette with fuzzy search, Web Audio API sound generator, and magnetic cursor follower.",
      backend:
        "Next.js App Router API routes, edge runtime optimization, Resend email dispatch integration for contact form submissions.",
      deployment:
        "Vercel Edge Network with global CDN deployment, automatic image optimization, and pre-rendered SSG pages.",
      performance:
        "Perfect 100/100 Lighthouse ratings across Performance, Accessibility, Best Practices, and SEO.",
      seo:
        "Complete OpenGraph images, Twitter Card meta, JSON-LD Person schema data, dynamic sitemap.xml, and canonical URLs.",
      lessonsLearned:
        "Combining WebGL with modern React Server Components creates unforgettable user experiences when performance is treated as a core design feature.",
      timeline: "2026",
      gallery: [],
    },
  },
];
