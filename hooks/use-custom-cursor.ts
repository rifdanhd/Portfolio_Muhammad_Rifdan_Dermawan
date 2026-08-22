"use client";

import { useEffect, useState } from "react";

export interface CursorState {
  x: number;
  y: number;
  isHovered: boolean;
  hoverText?: string;
}

export function useCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovered: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [data-cursor-hover]");
      if (interactiveEl) {
        const hoverText = interactiveEl.getAttribute("data-cursor-text") || undefined;
        setCursor((prev) => ({
          ...prev,
          isHovered: true,
          hoverText,
        }));
      } else {
        setCursor((prev) => ({
          ...prev,
          isHovered: false,
          hoverText: undefined,
        }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return cursor;
}
