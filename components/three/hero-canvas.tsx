"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene & Viewport setup
    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    
    // Orthographic or low-field-of-view perspective for blueprint look
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);

    // Renderer matching monochromatic theme
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Blueprint Grid helper at the bottom
    const gridHelper = new THREE.GridHelper(6, 12, 0x0DFF72, 0x3f3f46);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Main rotating group
    const group = new THREE.Group();
    scene.add(group);

    // Material with high contrast
    const mainColor = new THREE.Color(0x000000); // changes based on dark mode logic, handled via opacity or dynamic check
    const neonGreen = 0x0DFF72;
    const lineMat = new THREE.LineBasicMaterial({ color: neonGreen, transparent: true, opacity: 0.8 });
    const whiteMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
    const mutedLineMat = new THREE.LineBasicMaterial({ color: 0x52525b, transparent: true, opacity: 0.4 });

    // 1. Layer Geometries (Frontend, Backend, DB) represented as wireframe box plates
    const boxGeo = new THREE.BoxGeometry(2.4, 0.05, 1.4);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);

    // Layer 1: Frontend
    const frontendWire = new THREE.LineSegments(boxEdges, lineMat);
    const frontendGroup = new THREE.Group();
    frontendGroup.position.set(0, 0.8, 0);
    frontendGroup.add(frontendWire);
    group.add(frontendGroup);

    // Layer 2: Backend
    const backendWire = new THREE.LineSegments(boxEdges, lineMat);
    const backendGroup = new THREE.Group();
    backendGroup.position.set(0, 0, 0);
    backendGroup.add(backendWire);
    group.add(backendGroup);

    // Layer 3: Database
    const dbWire = new THREE.LineSegments(boxEdges, lineMat);
    const dbGroup = new THREE.Group();
    dbGroup.position.set(0, -0.8, 0);
    dbGroup.add(dbWire);
    group.add(dbGroup);

    // 2. Core Octahedron inside backend represented as dense double wireframe
    const coreGeo = new THREE.OctahedronGeometry(0.3, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreWire = new THREE.LineSegments(coreEdges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    group.add(coreWire);

    // 3. Structural vertical connecting lines representing blueprint connectors
    const connectorGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Four corners connecting the 3 plates vertically
      -1.2, -0.8, -0.7,  -1.2, 0.8, -0.7,
       1.2, -0.8, -0.7,   1.2, 0.8, -0.7,
      -1.2, -0.8,  0.7,  -1.2, 0.8,  0.7,
       1.2, -0.8,  0.7,   1.2, 0.8,  0.7,
    ]);
    connectorGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const connectors = new THREE.LineSegments(connectorGeo, mutedLineMat);
    group.add(connectors);

    // Coordinate crosshair axes
    const axes = new THREE.AxesHelper(1.5);
    (axes.material as THREE.Material).transparent = true;
    (axes.material as THREE.Material).opacity = 0.5;
    scene.add(axes);

    // Mouse drag interaction
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0.002;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      group.rotation.y += dx * 0.006;
      group.rotation.x += dy * 0.006;
      velX = dy * 0.0006;
      velY = dx * 0.0006;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e: TouchEvent) => { isDragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      group.rotation.y += dx * 0.006;
      group.rotation.x += dy * 0.006;
      velX = dy * 0.0006;
      velY = dx * 0.0006;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    renderer.domElement.addEventListener("touchend", onTouchEnd);

    // Dynamic coloring based on document class
    const updateColorsForTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      lineMat.color.setHex(neonGreen);
      whiteMat.color.setHex(isDark ? 0xffffff : 0x000000);
      coreWire.material.color.setHex(isDark ? 0xffffff : 0x000000);
      gridHelper.material.opacity = isDark ? 0.2 : 0.4;
    };
    updateColorsForTheme();

    // Listen to theme mutations
    const observer = new MutationObserver(updateColorsForTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Animation loop
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        group.rotation.y += velY;
        group.rotation.x = Math.sin(elapsed * 0.2) * 0.05;
        velX *= 0.94;
        velY += (0.002 - velY) * 0.02;
      }

      // Small bounce pulse animation for plates to feel alive
      const bounce = Math.sin(elapsed * 2) * 0.04;
      frontendGroup.position.y = 0.8 + bounce;
      dbGroup.position.y = -0.8 - bounce;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      boxGeo.dispose();
      boxEdges.dispose();
      coreGeo.dispose();
      coreEdges.dispose();
      connectorGeo.dispose();
      lineMat.dispose();
      whiteMat.dispose();
      mutedLineMat.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full" style={{ cursor: "grab" }} />
  );
}