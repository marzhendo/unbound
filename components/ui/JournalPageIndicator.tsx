"use client";

import React from "react";
import { motion } from "framer-motion";

interface JournalPageIndicatorProps {
  number: string;
  title: string;
  accentColor?: "primary" | "accent" | "dive";
  className?: string;
}

export default function JournalPageIndicator({
  number,
  title,
  accentColor = "accent",
  className = "",
}: JournalPageIndicatorProps) {
  const accentBorder =
    accentColor === "primary"
      ? "border-brand-primary/50 text-brand-primary/90"
      : accentColor === "dive"
      ? "border-dive-accent/50 text-dive-accent/90"
      : "border-brand-accent/50 text-brand-accent/90";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`inline-flex items-center gap-2 border-l-2 ${accentBorder} pl-2.5 py-0.5 font-mono text-[11px] sm:text-xs tracking-widest select-none backdrop-blur-xs ${className}`}
    >
      <span className="font-bold tracking-wider uppercase">
        Kenangan {number}
      </span>
      <span className="text-text-muted/40 font-sans">&mdash;</span>
      <span className="text-text-muted/80 italic font-body font-normal tracking-wide">
        {title}
      </span>
    </motion.div>
  );
}
