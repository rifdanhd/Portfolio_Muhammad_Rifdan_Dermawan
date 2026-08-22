"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeTransitionProvider } from "@/components/theme-transition-overlay";
import { ReactLenis } from "lenis/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <ThemeTransitionProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeTransitionProvider>
      </ReactLenis>
    </ThemeProvider>
  );
}
