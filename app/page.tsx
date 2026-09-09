"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useScroll, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";

// Dynamic import of BookIntro with SSR disabled to keep server bundle minimal
const BookIntro = dynamic(() => import("@/components/intro/BookIntro"), {
  ssr: false,
});

// Dynamic import with SSR disabled for optimal performance
const PetalField = dynamic(() => import("@/components/effects/PetalField"), {
  ssr: false,
});

// Dynamic import of MusicPlayer with SSR disabled for optimal Lighthouse performance
const MusicPlayer = dynamic(() => import("@/components/ui/MusicPlayer"), {
  ssr: false,
});

// Code-split below-the-fold sections to drastically reduce initial JS payload on mobile
const Characters = dynamic(() => import("@/components/sections/Characters"));
const DeepDive = dynamic(() => import("@/components/sections/DeepDive"));
const Gameplay = dynamic(() => import("@/components/sections/Gameplay"));
const News = dynamic(() => import("@/components/sections/News"));
const PlayNow = dynamic(() => import("@/components/sections/PlayNow"));

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [introState, setIntroState] = useState<"closed" | "opening" | "diving" | "done">(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "done";
      }
    }
    return "closed";
  });

  // Accessibility: listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIntroState("done");
      }
    }
  }, []);

  // Lock body scroll while intro is actively playing; restore when finished
  useEffect(() => {
    if (introState !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introState]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-main flex flex-col relative selection:bg-brand-primary selection:text-bg-primary">
      {/* 0. Fullscreen Interactive Book Intro Overlay (Unmounts completely when done) */}
      <AnimatePresence mode="wait">
        {introState !== "done" && (
          <BookIntro
            state={introState}
            onStartOpen={() => setIntroState("opening")}
            onDiving={() => setIntroState("diving")}
            onComplete={() => setIntroState("done")}
            onSkip={() => setIntroState("done")}
          />
        )}
      </AnimatePresence>

      {/* Global floating memory petal particles */}
      <PetalField scrollYProgress={scrollYProgress} />
      {/* Persistent floating OST music player widget */}
      <MusicPlayer />
      <Navbar />
      <Hero />
      <Characters />
      <DeepDive />
      <Gameplay />
      <News />
      <PlayNow />
      <Footer />
    </main>
  );
}
