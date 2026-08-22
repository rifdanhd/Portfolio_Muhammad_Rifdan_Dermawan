"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 origin-left shadow-[0_0_10px_#3B82F6]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
