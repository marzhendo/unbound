"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Award } from "lucide-react";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

// Dynamic import with SSR disabled to keep tsparticles out of the initial critical rendering chunk
const Starfield = dynamic(() => import("@/components/effects/Starfield"), {
  ssr: false,
});

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), {
  ssr: false,
});

export default function Hero() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Smooth scroll exit for Hero content
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Keep solid at initial scroll (0 -> 0.12), then smooth fade out (0.12 -> 0.38), strictly 0 beyond 0.38
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.38, 1], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12, 0.38, 1], [0, 0, -60, -60]);
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.38 ? "none" : "auto"));

  // Key Art Parallax: moves slightly slower than foreground content
  const keyArtY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const keyArtScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);

  const handleScrollToPlay = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const playSection = document.getElementById("play");
    if (playSection) {
      playSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "play";
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative z-0 min-h-screen w-full flex flex-col justify-between items-center bg-transparent overflow-hidden text-text-main pt-24 pb-12 px-4 sm:px-6 md:px-8"
    >
      {/* 1. LAYER PALING BELAKANG: Key Art with Subtle Parallax Depth */}
      <motion.div
        style={{ y: keyArtY, scale: keyArtScale }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <Image
          src="/images/08c488e8f1162f77a0fd54be5b6ee752.jpg"
          alt="A Space for the Unbound Key Art - Atma & Raya"
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
          quality={80}
        />
      </motion.div>

      {/* 2. LAYER OVERLAY GRADIENT: Dark top for navbar & folio, soft center for art, dark bottom for text & transition */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, #0B1026 0%, rgba(11, 16, 38, 0.2) 35%, rgba(11, 16, 38, 0.5) 65%, #0B1026 100%)",
        }}
      />
      {/* Bottom seamless transition vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent pointer-events-none z-[1]" />

      {/* Warm Ambient Starlight Glow Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-primary/10 via-brand-secondary/8 to-transparent rounded-full blur-[150px] pointer-events-none z-[1]" />

      {/* 3. STARFIELD: Blended on top of key art with screen blend mode and tuned opacity */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-70 mix-blend-screen">
        <Starfield />
      </div>

      {/* Narrative Journal Folio Header (Pojok Atas, di bawah area navbar) */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute top-20 left-6 sm:top-20 sm:left-10 lg:left-14 z-20 pointer-events-none"
      >
        <JournalPageIndicator
          number="01"
          title="Awal Cerita"
          accentColor="accent"
        />
      </motion.div>

      {/* Spacer Top */}
      <div className="hidden sm:block sm:h-4" />

      {/* 2. Main Content Container */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
        className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-6 sm:space-y-8 pt-2 sm:pt-4"
      >
        {/* Big Heading with Gentle & Warm Starlight Glow */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-wider text-brand-primary uppercase leading-tight select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] drop-shadow-[0_0_25px_rgba(244,201,93,0.35)]">
          A SPACE FOR THE UNBOUND
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-2xl font-body font-medium text-text-main italic tracking-wide max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          &ldquo;Dua remaja, satu kota kecil, dan kekuatan yang bisa menembus ingatan.&rdquo;
        </p>

        {/* Brief Narrative Copy */}
        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Ikuti kisah Atma dan Raya di kota Loka — sebuah desa kecil Indonesia di penghujung era 90-an — saat mereka menghadapi akhir masa SMA sekaligus rahasia yang bisa mengubah dunia mereka selamanya.
        </p>

        {/* CTA Buttons (Gentle Scale + Soft Golden Glow) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          {/* Button 1: Tonton Trailer */}
          <button
            onClick={() => {
              setIsTrailerOpen(true);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("asftu:pause-music"));
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-primary text-bg-primary font-display text-sm tracking-wider uppercase font-bold transition-all duration-500 hover:scale-[1.03] hover:bg-brand-primary/95 hover:shadow-[0_0_25px_rgba(244,201,93,0.32)] active:scale-98"
          >
            <Play className="w-4 h-4 fill-bg-primary stroke-bg-primary" />
            Tonton Trailer
          </button>

          {/* Button 2: Play Now */}
          <a
            href="#play"
            onClick={handleScrollToPlay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-brand-primary/80 text-brand-primary font-display text-sm tracking-wider uppercase font-bold transition-all duration-500 hover:scale-[1.03] hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_25px_rgba(244,201,93,0.28)] active:scale-98"
          >
            Play Now
          </a>
        </div>

      </motion.div>

      {/* 3. Polished Bottom-Left Corner Badge (SEA Game Awards Best Storytelling) */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full sm:w-auto sm:absolute sm:bottom-6 sm:left-6 md:left-8 z-10 flex justify-center sm:justify-start pt-4 sm:pt-0 pointer-events-none"
      >
        <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-2 bg-bg-secondary/80 border border-brand-primary/30 backdrop-blur-md rounded-full text-xs font-mono text-[#E2E8F0] tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_20px_rgba(244,201,93,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-brand-primary/60 hover:shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_28px_rgba(244,201,93,0.32)] transition-all duration-300">
          <Award className="w-4 h-4 text-brand-primary shrink-0 drop-shadow-[0_0_8px_rgba(244,201,93,0.5)]" />
          <span className="font-medium">Best Storytelling &bull; SEA Game Awards 2020</span>
        </div>
      </motion.div>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoId="L08ZBQswnus"
      />
    </section>
  );
}
