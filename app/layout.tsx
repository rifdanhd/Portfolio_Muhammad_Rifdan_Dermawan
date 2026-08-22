import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const fontMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rifdandermawan.dev"),
  title: {
    default: "Muhammad Rifdan Dermawan — Full Stack Engineer & Systems Architect",
    template: "%s | Muhammad Rifdan Dermawan",
  },
  description:
    "Official portfolio of Muhammad Rifdan Dermawan. Full Stack Engineer at Saung Angklung Udjo and Informatics student at Universitas Teknologi Bandung specializing in Laravel, Next.js, WebGL, and Cloud Infrastructure.",
  keywords: [
    "Muhammad Rifdan Dermawan",
    "Rifdan Dermawan",
    "Full Stack Engineer",
    "Saung Angklung Udjo",
    "Universitas Teknologi Bandung",
    "Laravel 12 Developer",
    "Next.js Developer",
    "Bandung Web Developer",
    "Indonesian Software Engineer",
  ],
  authors: [{ name: "Muhammad Rifdan Dermawan", url: "https://rifdandermawan.dev" }],
  creator: "Muhammad Rifdan Dermawan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rifdandermawan.dev",
    title: "Muhammad Rifdan Dermawan — Full Stack Engineer",
    description:
      "World-class software portfolio showcasing production systems, Laravel 12 platforms, React Three Fiber graphics, and cloud deployments.",
    siteName: "Muhammad Rifdan Dermawan Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Muhammad Rifdan Dermawan Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rifdan Dermawan — Full Stack Engineer",
    description:
      "Building high-performance production web systems, ticketing engines, and cloud solutions.",
    creator: "@rifdandermawan",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Person & Profile
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Rifdan Dermawan",
    jobTitle: "Full Stack Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Saung Angklung Udjo",
    },
    almaMater: {
      "@type": "EducationalOrganization",
      name: "Universitas Teknologi Bandung",
    },
    url: "https://rifdandermawan.dev",
    sameAs: [
      "https://github.com/rifdanhd",
      "https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388",
      "https://instagram.com/idanderrrrr",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}