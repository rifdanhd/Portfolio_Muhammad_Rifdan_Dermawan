"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";

export interface GlobeMarker {
  location: [number, number]; // [lat, lng]
  size: number;
  color?: [number, number, number];
}

// ⬅️ Default values sebagai konstanta modul — reference stabil, bukan dibikin ulang tiap kali
// fungsi Globe() jalan (default parameter literal di JS itu re-created tiap call).
const DEFAULT_MARKERS: GlobeMarker[] = [
  { location: [-6.9175, 107.6191], size: 0.09, color: [0.98, 0.45, 0.08] },
];
const DEFAULT_BASE_COLOR: [number, number, number] = [0.6, 0.6, 0.65];
const DEFAULT_GLOW_COLOR: [number, number, number] = [0.25, 0.25, 0.3];
const DEFAULT_MARKER_COLOR: [number, number, number] = [0.98, 0.45, 0.08];

interface GlobeProps {
  className?: string;
  markers?: GlobeMarker[];
  baseColor?: [number, number, number];
  glowColor?: [number, number, number];
  markerColor?: [number, number, number];
  scale?: number;
  autoRotateSpeed?: number;
  initialPhi?: number;
  initialTheta?: number;
}

export default function Globe({
  className = "",
  markers = DEFAULT_MARKERS,
  baseColor = DEFAULT_BASE_COLOR,
  glowColor = DEFAULT_GLOW_COLOR,
  markerColor = DEFAULT_MARKER_COLOR,
  scale = 1.1,
  autoRotateSpeed = 0.003,
  initialPhi = 1.5,
  initialTheta = 0.3,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const isVisibleRef = useRef(true);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const phiRef = useRef(initialPhi);
  const thetaRef = useRef(initialTheta);
  const velocityPhiRef = useRef(0);
  const velocityThetaRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⬅️ Safety net kedua: bandingkan ISI props (bukan reference) via string key.
  // Kalau reference berubah tapi isinya sama persis, effect di bawah nggak akan reinit globe.
  const configKey = JSON.stringify({ markers, baseColor, glowColor, markerColor, scale, autoRotateSpeed });

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cap devicePixelRatio; render resolution is width * dpr ONLY (not doubled again)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = canvas.offsetWidth || 340;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth || 340;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Pause the render loop when the globe scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId: number | null = null;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 2.2, // Bright diffuse lighting so continents & island dots are clearly visible everywhere
        mapSamples: 9000, // Reduced density — same visual read, much lighter to render
        mapBrightness: 8,
        baseColor: baseColor,
        markerColor: markerColor,
        glowColor: glowColor,
        markers: markers as any,
        scale: scale,
      });

      const render = () => {
        if (isVisibleRef.current) {
          if (!isDraggingRef.current) {
            phiRef.current += autoRotateSpeed + velocityPhiRef.current;
            thetaRef.current = Math.max(-0.8, Math.min(0.8, thetaRef.current + velocityThetaRef.current));

            // Inertia decay
            velocityPhiRef.current *= 0.94;
            velocityThetaRef.current *= 0.94;
          }

          if (globe) {
            globe.update({
              phi: phiRef.current,
              theta: thetaRef.current,
              width: width * dpr,
              height: width * dpr,
            });
          }
        }

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);

      if (canvas) canvas.style.opacity = "1";
    } catch (err) {
      console.error("Globe WebGL init error:", err);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
      if (globe) {
        globe.destroy();
      }
    };
  }, [mounted, configKey]);

  return (
    <motion.div
      className={`relative w-full aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          isDraggingRef.current = true;
          startXRef.current = e.clientX;
          startYRef.current = e.clientY;
          velocityPhiRef.current = 0;
          velocityThetaRef.current = 0;
          try {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          } catch { }
        }}
        onPointerMove={(e) => {
          if (!isDraggingRef.current) return;
          const deltaX = e.clientX - startXRef.current;
          const deltaY = e.clientY - startYRef.current;
          startXRef.current = e.clientX;
          startYRef.current = e.clientY;

          const movementX = deltaX * 0.006;
          const movementY = deltaY * 0.004;

          phiRef.current += movementX;
          thetaRef.current = Math.max(-0.8, Math.min(0.8, thetaRef.current + movementY));

          velocityPhiRef.current = movementX;
          velocityThetaRef.current = movementY;
        }}
        onPointerUp={(e) => {
          isDraggingRef.current = false;
          try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          } catch { }
        }}
        onPointerCancel={() => {
          isDraggingRef.current = false;
        }}
        className="w-full h-full opacity-0 transition-opacity duration-700 ease-out object-contain touch-none"
        style={{
          contain: "layout paint size",
        }}
      />
    </motion.div>
  );
}