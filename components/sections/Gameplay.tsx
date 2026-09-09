"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

export default function Gameplay() {
  const containerRef = useRef<HTMLElement>(null);

  // Smooth scroll-driven background color transition: #0B1026 -> #050914 -> #0B1026
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    ["#0B1026", "#050914", "#050914", "#0B1026"]
  );

  const diveAmbientOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.65, 0.9],
    [0, 0.5, 0.5, 0]
  );

  return (
    <motion.section
      ref={containerRef}
      id="gameplay"
      className="relative py-24 sm:py-32 overflow-hidden border-b border-text-muted/10 scroll-mt-16 bg-transparent"
    >
      {/* Dynamic Dive Mind Background Layer (Behind Petals) */}
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 -z-10 pointer-events-none transition-colors duration-700"
      />
      {/* Narrative Journal Folio Header (Pojok Atas) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:left-14 z-20 pointer-events-none">
        <JournalPageIndicator
          number="04"
          title="Kekuatan yang Tersimpan"
          accentColor="dive"
        />
      </div>

      {/* Ambient "Dive Mind" Glowing Orbs (Poetic Cyan & Violet Glow) */}
      <motion.div
        style={{ opacity: diveAmbientOpacity }}
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-dive-accent/15 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ opacity: diveAmbientOpacity }}
        className="absolute bottom-1/4 left-5 w-[450px] h-[450px] bg-dive-secondary/15 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-text-main tracking-wider uppercase">
            Fitur Permainan
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
            Kombinasi eksplorasi dunia nyata yang hangat dan penjelajahan batin lewat sentuhan realisme magis.
          </p>
        </div>

        {/* Organic Staggered Flow (Zigzag: Kiri - Kanan - Kiri - Kanan dengan Jarak Bernapas) */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">

          {/* ===================================================================
              1. JELAJAHI KOTA LOKA (Rata Kiri, Lebar ~62%)
              =================================================================== */}
          <div className="w-full lg:w-[62%] lg:mr-auto">
            <motion.article
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px", amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group relative bg-bg-secondary/80 backdrop-blur-sm border border-text-muted/20 p-6 sm:p-8 rounded-none transition-all duration-300 hover:border-brand-primary hover:shadow-[0_0_25px_rgba(244,201,93,0.15)] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                {/* In-Game Thumbnail */}
                <div className="relative w-full sm:w-40 md:w-44 h-36 sm:h-36 md:h-40 rounded overflow-hidden border border-brand-primary/40 bg-bg-primary/50 shrink-0 group-hover:border-brand-primary group-hover:shadow-[0_0_20px_rgba(244,201,93,0.2)] transition-all duration-300">
                  <Image
                    src="/images/58e93c102de0b2f0326c77bf7c011fb6.jpg"
                    alt="Eksplorasi Kota Loka - Pos ronda dan suasana pedesaan 90-an"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-bg-secondary/60 pointer-events-none" />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-primary">
                    Pilar 01 &bull; Eksplorasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display text-text-main tracking-wide">
                    1. Jelajahi Kota Loka
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                    Telusuri suasana pedesaan Indonesia era 90-an yang detail dan penuh cerita di setiap sudutnya.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

          {/* ===================================================================
              2. DIVE MECHANIC (Rata Kanan, LEBIH BESAR & DOMINAN ~82%, SENTRAL CERITA)
              =================================================================== */}
          <div className="w-full lg:w-[82%] lg:ml-auto">
            <motion.article
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px", amount: 0.15 }}
              transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="group relative bg-dive-bg/90 backdrop-blur-md border-2 border-dive-accent/50 p-6 sm:p-8 lg:p-10 rounded-none transition-all duration-500 hover:border-dive-accent hover:shadow-[0_0_40px_rgba(0,229,199,0.22)] overflow-hidden"
            >
              {/* Subtle Decorative Petal Glow Lines */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-dive-accent/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-dive-secondary/15 rounded-full blur-2xl pointer-events-none" />

              {/* Tag Header Khusus Fitur Sentral */}
              <div className="flex flex-wrap items-center justify-between border-b border-text-muted/20 pb-4 mb-6 gap-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-wider font-semibold text-dive-accent bg-dive-accent/10 border border-dive-accent/30 rounded-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  FITUR SENTRAL CERITA &bull; DIVE MECHANIC
                </span>
                <span className="text-xs font-mono text-dive-accent/80 italic flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-dive-accent animate-ping" />
                  Transisi Batin: Kelopak Bunga Melayang
                </span>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center relative z-10">
                <div className="space-y-3 flex-1 order-2 lg:order-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-dive-accent">
                    Pilar 02 &bull; Realisme Magis Puitis
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-text-main tracking-wide">
                    2. Dive Mechanic
                  </h3>
                  <p className="text-base sm:text-lg text-text-main/90 leading-relaxed font-body">
                    Gunakan kekuatan Raya untuk menyelam ke dalam pikiran warga kota, mengungkap ingatan dan rahasia tersembunyi.
                  </p>
                  
                  {/* Poetic Context Footnote */}
                  <div className="pt-2 text-xs sm:text-sm text-text-muted/90 italic font-body flex items-center gap-2">
                    <span className="text-dive-accent">&bull;</span>
                    Penyelaman batin penuh empati ke dalam kenangan seseorang — divisualisasikan lembut bagai kelopak bunga putih yang pecah di udara.
                  </div>
                </div>

                {/* Large In-Game Showcase (Paling Dominan di Tengah) */}
                <div className="relative w-full lg:w-80 xl:w-96 h-52 sm:h-64 lg:h-60 rounded overflow-hidden border-2 border-dive-accent/60 shrink-0 bg-dive-bg shadow-[0_0_25px_rgba(0,229,199,0.22)] group-hover:border-dive-accent group-hover:shadow-[0_0_35px_rgba(0,229,199,0.32)] transition-all duration-300 order-1 lg:order-2">
                  <Image
                    src="/images/29447338.jpg"
                    alt="Dive Mechanic - Kekuatan Spacedive menyelami ingatan dengan buku merah dan kelopak bunga"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 384px"
                  />
                  {/* Soft gradient edge transition towards text */}
                  <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-l from-transparent via-transparent to-dive-bg/70 pointer-events-none" />
                </div>
              </div>
            </motion.article>
          </div>

          {/* ===================================================================
              3. CERITA YANG MENYENTUH (Rata Kiri, Lebar ~62%)
              =================================================================== */}
          <div className="w-full lg:w-[62%] lg:mr-auto lg:pl-2">
            <motion.article
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px", amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group relative bg-bg-secondary/80 backdrop-blur-sm border border-text-muted/20 p-6 sm:p-8 rounded-none transition-all duration-300 hover:border-brand-accent hover:shadow-[0_0_25px_rgba(127,231,216,0.15)] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                {/* In-Game Thumbnail */}
                <div className="relative w-full sm:w-40 md:w-44 h-36 sm:h-36 md:h-40 rounded overflow-hidden border border-brand-accent/40 bg-bg-primary/50 shrink-0 group-hover:border-brand-accent group-hover:shadow-[0_0_20px_rgba(127,231,216,0.2)] transition-all duration-300">
                  <Image
                    src="/images/29447335.jpg"
                    alt="Cerita yang Menyentuh - Hubungan hangat dan intim antara Atma dan Raya"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-bg-secondary/60 pointer-events-none" />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
                    Pilar 03 &bull; Narasi Emosional
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display text-text-main tracking-wide">
                    3. Cerita yang Menyentuh
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                    Sebuah kisah slice-of-life yang mengangkat tema kecemasan, depresi, dan pertumbuhan diri dengan cara yang jujur dan hangat.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

          {/* ===================================================================
              4. SENI PIXEL YANG MEMUKAU (Rata Kanan, Lebar ~66%)
              =================================================================== */}
          <div className="w-full lg:w-[66%] lg:ml-auto">
            <motion.article
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px", amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group relative bg-bg-secondary/80 backdrop-blur-sm border border-text-muted/20 p-6 sm:p-8 rounded-none transition-all duration-300 hover:border-brand-secondary hover:shadow-[0_0_25px_rgba(91,110,225,0.2)] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                {/* In-Game Thumbnail */}
                <div className="relative w-full sm:w-40 md:w-44 h-36 sm:h-36 md:h-40 rounded overflow-hidden border border-brand-secondary/40 bg-bg-primary/50 shrink-0 group-hover:border-brand-secondary group-hover:shadow-[0_0_20px_rgba(91,110,225,0.25)] transition-all duration-300">
                  <Image
                    src="/images/dimas-novan-2016-05-21-a-space-santai-work.jpg"
                    alt="Seni Pixel yang Memukau - Estetika visual lukisan cat air penuh nostalgia"
                    fill
                    className="object-cover [object-position:50%_52%] group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-bg-secondary/60 pointer-events-none" />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-secondary">
                    Pilar 04 &bull; Estetika Visual
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display text-text-main tracking-wide">
                    4. Seni Pixel yang Memukau
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                    Visual pixel art bergaya lukisan yang membangun suasana nostalgia di setiap frame.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

        </div>

      </div>
    </motion.section>
  );
}
