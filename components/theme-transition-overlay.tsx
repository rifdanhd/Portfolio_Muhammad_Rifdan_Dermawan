"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

interface ThemeTransitionContextType {
  toggleThemeWithGSAP: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isAnimating: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType>({
  toggleThemeWithGSAP: () => {},
  isAnimating: false,
});

export const useThemeTransition = () => useContext(ThemeTransitionContext);

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [overlayBg, setOverlayBg] = useState<string>("#0A0A0A");

  const toggleThemeWithGSAP = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    const targetBg = nextTheme === "dark" ? "#0A0A0A" : "#FFFFFF";

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setOverlayBg(targetBg);
    setIsAnimating(true);

    if (overlayRef.current) {
      const overlay = overlayRef.current;
      overlay.style.display = "block";
      
      // Set initial small circle at click origin
      gsap.set(overlay, {
        clipPath: `circle(0px at ${x}px ${y}px)`,
        opacity: 1,
      });

      // Execute GSAP liquid circle expansion
      gsap.to(overlay, {
        clipPath: `circle(${maxDist * 1.2}px at ${x}px ${y}px)`,
        duration: 0.75,
        ease: "power3.inOut",
        onComplete: () => {
          setTheme(nextTheme);
          // Fade out overlay gently after theme state changes
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
            onComplete: () => {
              overlay.style.display = "none";
              setIsAnimating(false);
            },
          });
        },
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <ThemeTransitionContext.Provider value={{ toggleThemeWithGSAP, isAnimating }}>
      {children}
      {/* GSAP Radial Clip-Path Curtain Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] pointer-events-none hidden"
        style={{ backgroundColor: overlayBg }}
      />
    </ThemeTransitionContext.Provider>
  );
}
