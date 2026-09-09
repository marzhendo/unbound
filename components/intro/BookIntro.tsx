"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, ChevronLeft, ChevronRight } from "lucide-react";

export type IntroState = "closed" | "opening" | "diving" | "done";

interface BookIntroProps {
  state: IntroState;
  onStartOpen: () => void;
  onDiving: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

// 18 lightweight burst petals for the Spacedive transition (strictly <= 20)
interface BurstPetal {
  id: number;
  angle: number; // in radians
  distance: number; // in px
  size: number;
  rotation: number;
  delay: number;
  color: string;
}

// Detailed Victorian/Antique filigree gold corner ornament
function AntiqueCornerOrnament({
  className = "w-9 h-9 sm:w-11 sm:h-11",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Outer corner shield bracket with scroll finial */}
      <path
        d="M2 42V12C2 6.47715 6.47715 2 12 2H42"
        stroke="#F4C95D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Outer decorative flourish notch */}
      <path
        d="M2 22C6 22 10 18 10 14"
        stroke="#E5C158"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M22 2C22 6 18 10 14 10"
        stroke="#E5C158"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Inner ornamental filigree arc */}
      <path
        d="M7 36V15C7 10.5817 10.5817 7 15 7H36"
        stroke="#C99726"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      {/* Foliate / Fleur-de-lis corner motif */}
      <path
        d="M14 14C17 9 24 9 24 16C24 23 16 24 14 14Z"
        fill="#F4C95D"
        fillOpacity="0.85"
      />
      <path
        d="M14 14C9 17 9 24 16 24C23 24 24 16 14 14Z"
        fill="#E5C158"
        fillOpacity="0.75"
      />
      {/* Center embossed gem/bead */}
      <circle cx="14" cy="14" r="3.2" fill="#FAF6EC" stroke="#B88928" strokeWidth="1" />
      <circle cx="14" cy="14" r="1.5" fill="#F4C95D" />
      {/* Small corner bead accents */}
      <circle cx="5" cy="5" r="1.8" fill="#F4C95D" />
      <circle cx="28" cy="4" r="1.4" fill="#E5C158" />
      <circle cx="4" cy="28" r="1.4" fill="#E5C158" />
    </svg>
  );
}

export default function BookIntro({
  state,
  onStartOpen,
  onDiving,
  onComplete,
  onSkip,
}: BookIntroProps) {
  // If user prefers reduced motion, return null immediately on first client paint
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
    }
  }, [prefersReduced, onComplete]);

  // Generate 18 petal burst particles once
  const burstPetals: BurstPetal[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const distance = 160 + Math.random() * 260;
      const size = 12 + Math.random() * 10;
      const rotation = -60 + Math.random() * 120;
      const delay = Math.random() * 0.15;
      const isCyan = i % 3 === 0;
      const color = isCyan ? "#00E5C7" : i % 2 === 0 ? "#F4EFE6" : "#F4C95D";
      return { id: i, angle, distance, size, rotation, delay, color };
    });
  }, []);

  // Ambient twinkling starlight background dots (16 tiny static nodes)
  const stars = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 7) % 94}%`,
      top: `${(i * 23 + 11) % 92}%`,
      size: (i % 3) + 1.5,
      delay: (i % 5) * 0.6,
      duration: 2 + (i % 4) * 0.8,
    }));
  }, []);

  // Progression timer: Only triggers completion when state === "diving"
  useEffect(() => {
    if (state === "diving") {
      // Dive duration ~0.85s then complete & unmount
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 850);
      return () => clearTimeout(completeTimer);
    }
  }, [state, onComplete]);

  const [isSkipping, setIsSkipping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3-Page Spread state (0: Halaman 1, 1: Halaman 2, 2: Halaman 3)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageDirection, setPageDirection] = useState<number>(1);

  // Dynamic precise dive origin refs
  const portalRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const [diveOrigin, setDiveOrigin] = useState<{
    x: string;
    y: string;
    screenX: number;
    screenY: number;
  }>({
    x: "62%",
    y: "62%",
    screenX: 0,
    screenY: 0,
  });

  const goToNextPage = () => {
    if (currentPage < 2) {
      setPageDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setPageDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setPage = (index: number) => {
    if (index !== currentPage) {
      setPageDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    }
  };

  // Handle book click (State 1: closed -> opening)
  const handleBookClick = () => {
    if (state === "closed" && !isSkipping) {
      onStartOpen();
    }
  };

  // Handle portal click (State 2: opening -> diving) with precise coordinate origin
  const handlePortalClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (state === "opening" && !isSkipping) {
      let centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
      let centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
      let relX = 62;
      let relY = 62;

      if (portalRef.current && bookContainerRef.current) {
        const portalRect = portalRef.current.getBoundingClientRect();
        const bookRect = bookContainerRef.current.getBoundingClientRect();

        // Exact center of the interactive portal in viewport pixels
        centerX = portalRect.left + portalRect.width / 2;
        centerY = portalRect.top + portalRect.height / 2;

        // Relative percentage inside book container for CSS transform-origin
        relX = ((centerX - bookRect.left) / bookRect.width) * 100;
        relY = ((centerY - bookRect.top) / bookRect.height) * 100;
      }

      setDiveOrigin({
        x: `${relX.toFixed(1)}%`,
        y: `${relY.toFixed(1)}%`,
        screenX: Math.round(centerX),
        screenY: Math.round(centerY),
      });

      onDiving();
    }
  };

  const handleSkipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSkipping(true);
    onSkip();
  };

  return (
    <motion.aside
      key="book-intro-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: state === "diving" ? 0.95 : 1 }}
      exit={{
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0.25, ease: "easeInOut" },
      }}
      className={`fixed inset-0 z-[100] bg-[#0B1026] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden text-text-main ${
        isSkipping ? "pointer-events-none opacity-0 transition-opacity duration-200" : ""
      }`}
      style={{
        pointerEvents: isSkipping ? "none" : "auto",
        backgroundImage: `
          radial-gradient(ellipse at 50% 50%, rgba(244, 201, 93, 0.12) 0%, rgba(0, 229, 199, 0.08) 35%, rgba(11, 16, 38, 0.95) 75%),
          radial-gradient(ellipse at 50% 90%, rgba(91, 110, 225, 0.1) 0%, transparent 60%)
        `,
      }}
      aria-label="Pengantar Interaktif Buku Kenangan"
    >
      {/* 1. Subtle Twinkling Stars in Background */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-brand-primary"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              boxShadow: "0 0 6px rgba(244, 201, 93, 0.6)",
            }}
          />
        ))}
      </div>

      {/* 2. Top Bar: Header Tag + "Lewati Intro" Button */}
      <div className="w-full max-w-5xl flex items-center justify-between z-20 pt-2">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-brand-primary/80 uppercase">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span>Jurnal Kenangan Kota Loka &bull; 1999</span>
        </div>

        {/* Skip button is ALWAYS visible & clickable */}
        <button
          onClick={handleSkipClick}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-bg-secondary/80 hover:bg-brand-primary hover:text-bg-primary border border-brand-primary/30 hover:border-brand-primary text-[#D1DCE8] hover:text-bg-primary text-xs font-mono tracking-wider transition-all duration-300 rounded shadow-md cursor-pointer active:scale-95"
          aria-label="Lewati intro langsung ke halaman utama"
        >
          <span>Lewati Intro</span>
          <SkipForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 3. Center Interactive Section: Title + 3D Book + Prompt */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-lg my-auto py-4">
        
        {/* Title above book */}
        <motion.div
          animate={
            state === "diving"
              ? { opacity: 0, y: -20, scale: 0.95 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8 space-y-1"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-brand-accent/90 block">
            Kisah Kenangan Masa Lalu
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-brand-primary tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] drop-shadow-[0_0_25px_rgba(244,201,93,0.4)] leading-tight">
            A SPACE FOR THE UNBOUND
          </h1>
        </motion.div>

        {/* 3D BOOK STAGE */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* AMBIENT LIVING AURA GLOW (Subtle breathing multi-color glow around book) */}
          <motion.div
            animate={{
              opacity: state === "opening" ? [0.45, 0.8, 0.45] : [0.35, 0.65, 0.35],
              scale: state === "opening" ? [1.02, 1.15, 1.02] : [0.97, 1.05, 0.97],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-10 sm:-inset-14 rounded-full pointer-events-none blur-3xl"
            style={{
              background: `
                radial-gradient(ellipse at center, rgba(0, 229, 199, 0.28) 0%, rgba(244, 201, 93, 0.18) 42%, transparent 70%)
              `,
            }}
          />

          {/* SUCKING DIVE CONTAINER (Scales down into portal center on state === "diving") */}
          <motion.div
            animate={
              state === "diving"
                ? {
                    scale: 0.04,
                    rotate: 22,
                    filter: "blur(16px) brightness(3.0)",
                    opacity: 0,
                  }
                : state === "opening"
                ? {
                    scale: 1.04,
                    filter: "blur(0px) brightness(1.1)",
                  }
                : {
                    scale: 1,
                  }
            }
            transition={
              state === "diving"
                ? { duration: 0.8, ease: [0.32, 0, 0.67, 0] }
                : state === "opening"
                ? { duration: 0.7, ease: "easeOut" }
                : { scale: { duration: 0.3 } }
            }
            style={{
              transformOrigin:
                state === "diving"
                  ? `${diveOrigin.x} ${diveOrigin.y}`
                  : "center center",
            }}
            onClick={state === "closed" ? handleBookClick : undefined}
            className={`relative ${
              state === "closed" ? "cursor-pointer group hover:scale-[1.03]" : ""
            } select-none transition-transform duration-300`}
            role={state === "closed" ? "button" : undefined}
            tabIndex={state === "closed" ? 0 : undefined}
            onKeyDown={(e) => {
              if (state === "closed" && (e.key === "Enter" || e.key === " ")) {
                handleBookClick();
              }
            }}
            aria-label={
              state === "closed"
                ? "Buku diary kenangan Atma dan Raya. Klik untuk membuka."
                : undefined
            }
          >
            {/* 3D BOOK COMPONENT (Spread width: 240px on mobile, 325px on desktop) */}
            <motion.div
              ref={bookContainerRef}
              data-book-container="true"
              animate={state === "closed" ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-[240px] sm:w-[325px] h-[330px] sm:h-[430px] rounded-r-lg"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `
                  0 22px 55px rgba(0,0,0,0.88),
                  0 0 35px rgba(0, 229, 199, 0.22),
                  0 0 75px rgba(244, 201, 93, 0.15)
                `,
              }}
            >
              {/* PITA PEMBATAS BUKU (A1 Fix: Posisi di celah tengah lipatan punggung buku, z-index 10 di balik teks) */}
              <motion.div
                animate={{
                  rotate: [-2, 3, -1, -2],
                  x: [-0.5, 1.2, -0.5, -0.5],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transformOrigin: "top center",
                }}
                className="absolute -top-4 sm:-top-5 left-0 sm:left-0 z-10 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]"
                aria-hidden="true"
              >
                {/* Top spine fold over */}
                <div className="w-4 sm:w-5 h-2 rounded-t-sm bg-[#B88928] border-t border-[#FFE28A]" />
                {/* Dangling satin ribbon body with swallowtail chevron cut */}
                <div
                  className="w-4 sm:w-5 h-20 sm:h-24"
                  style={{
                    background: "linear-gradient(to right, #B88928 0%, #F4C95D 35%, #FFE28A 65%, #C99726 100%)",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)",
                    borderLeft: "1px solid rgba(255,255,255,0.25)",
                    borderRight: "1px solid rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Subtle center crease sheen */}
                  <div className="w-0.5 h-full mx-auto bg-white/25" />
                </div>
              </motion.div>

              {/* BACK COVER & PAGE SIDES (Depth illusion) */}
              <div
                className="absolute inset-0 bg-[#5E121B] rounded-r-lg border border-[#3D0A10] shadow-2xl"
                style={{
                  transform: "translateZ(-16px)",
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(130, 20, 35, 0.4) 0%, transparent 80%),
                    linear-gradient(135deg, #5E121B 0%, #3D0A10 100%)
                  `,
                }}
              />
              {/* Right Paper Edge (Gold/Cream lined pages) */}
              <div
                className="absolute right-0 top-1 bottom-1 w-4 bg-[#EDE5D5] border-l border-r border-[#C7BBA3] shadow-inner"
                style={{
                  transform: "rotateY(90deg) translateZ(-2px)",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #EDE5D5, #EDE5D5 2px, #D6CCA4 3px)",
                }}
              />

              {/* INSIDE SPREAD PAGES (Revealed when front cover swings open) */}
              <div
                className="absolute inset-0 z-20 bg-[#F5EEDD] rounded-r-lg p-4 sm:p-6 overflow-hidden border border-[#D1C4A8] shadow-inner text-[#30281F]"
                style={{
                  // Reusing exact pattern from <DeepDive />: ruled lines (31px/32px) + aged spots
                  backgroundImage: `
                    radial-gradient(ellipse at 50% 25%, rgba(255, 255, 255, 0.75) 0%, rgba(245, 238, 221, 0.92) 65%, rgba(235, 225, 200, 0.98) 100%),
                    repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(160, 130, 80, 0.22) 32px),
                    radial-gradient(circle at 94% 8%, rgba(175, 125, 60, 0.18) 0%, rgba(175, 125, 60, 0.06) 26px, transparent 60px),
                    radial-gradient(circle at 96% 92%, rgba(160, 110, 50, 0.20) 0%, rgba(160, 110, 50, 0.06) 32px, transparent 70px),
                    radial-gradient(circle at 8% 90%, rgba(175, 130, 70, 0.14) 0%, transparent 40px)
                  `,
                }}
              >
                {/* Physical Age Spots (Noda Usang) di Pojok */}
                <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-[#B88928]/15 blur-sm pointer-events-none" />
                <div className="absolute top-8 right-6 w-5 h-4 rounded-full bg-[#8A5A20]/10 blur-xs pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-14 h-12 rounded-full bg-[#7A4818]/15 blur-md pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-[#B88928]/10 blur-sm pointer-events-none" />

                {/* Stitched spine seam on left */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#5E121B] border-r border-[#3D0A10]" />
                <div className="absolute left-3.5 top-0 bottom-0 border-l border-dashed border-[#8B222E]/40" />

                {/* Inside Right Page Content with Framer Motion 3D Page Flip */}
                <div className="pl-3 h-full relative z-20 overflow-hidden">
                  <AnimatePresence mode="wait" custom={pageDirection}>
                    <motion.div
                      key={`right-spread-${currentPage}`}
                      custom={pageDirection}
                      variants={{
                        initial: (dir: number) => ({
                          opacity: 0,
                          x: dir > 0 ? 18 : -18,
                        }),
                        animate: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.35,
                            ease: "easeOut",
                          },
                        },
                        exit: (dir: number) => ({
                          opacity: 0,
                          x: dir > 0 ? -18 : 18,
                          transition: {
                            duration: 0.25,
                            ease: "easeIn",
                          },
                        }),
                      }}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="h-full flex flex-col justify-between"
                    >
                      {/* --- HALAMAN 1 (Spread 1) KANAN: SINOPSIS RESMI GAME --- */}
                      {currentPage === 0 && (
                        <>
                          <div className="space-y-2 pt-0.5">
                            <div className="flex items-center justify-between border-b border-[#A08C64]/30 pb-1">
                              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#5C4728] font-bold">
                                Halaman 01 &bull; Jejak Cerita
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B222E]" />
                            </div>

                            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#7A1622] block font-bold">
                              Kota Loka, 1999 &bull; Sinopsis
                            </span>

                            <h3 className="text-sm sm:text-base font-display text-[#8B222E] tracking-wider leading-tight">
                              Kisah di Ambang Dewasa
                            </h3>

                            <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#3D3222]">
                              Di kota kecil bernama Loka, penghujung era 90-an, Atma menjalani hari-hari terakhirnya sebagai siswa SMA. Namun kedamaian itu retak ketika ia mulai memahami rahasia yang disimpan Raya, kekasihnya &mdash; kemampuan untuk menyelam ke dalam pikiran dan ingatan orang lain. Sebuah kekuatan yang indah, sekaligus berbahaya.
                            </p>

                            <div className="pt-0.5 text-[9px] sm:text-[10px] font-mono text-[#3B2D1A] bg-[#EAE0CD]/85 p-2 rounded border border-[#C9B68A]/60 italic font-medium">
                              &ldquo;Dua remaja, satu kota kecil, dan kekuatan yang bisa menembus ingatan.&rdquo;
                            </div>
                          </div>

                          {/* Bottom Navigation on Page 1: 3 Dots + Tombol Lanjut */}
                          <div className="pt-2 flex items-center justify-between border-t border-[#A08C64]/25">
                            {/* Page indicator dots */}
                            <div className="flex items-center gap-1.5">
                              {[0, 1, 2].map((idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setPage(idx); }}
                                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentPage === idx
                                      ? "w-5 bg-brand-primary shadow-xs"
                                      : "w-2 bg-[#A08C64]/40 hover:bg-[#A08C64]/70"
                                  }`}
                                  aria-label={`Buka Halaman ${idx + 1}`}
                                />
                              ))}
                            </div>

                            {/* Tombol Lanjut */}
                            <button
                              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary hover:bg-[#FFE28A] text-bg-primary font-mono font-bold text-[10px] sm:text-xs tracking-wider rounded shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
                              aria-label="Lanjut ke halaman kedua"
                            >
                              <span>Lanjut</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* --- HALAMAN 2 (Spread 2) KANAN: RAHASIA SPACEDIVE RAYA --- */}
                      {currentPage === 1 && (
                        <>
                          <div className="space-y-2 pt-0.5">
                            <div className="flex items-center justify-between border-b border-[#A08C64]/30 pb-1">
                              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#5C4728] font-bold">
                                Halaman 02 &bull; Rahasia Spacedive
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#005C51]" />
                            </div>

                            <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#7A1622] block font-bold">
                              Mekanisme Ingatan &bull; Kitab Merah
                            </span>

                            <h3 className="text-sm sm:text-base font-display text-[#005247] tracking-wider leading-tight">
                              Kekuatan Spacedive Raya
                            </h3>

                            <p className="font-body text-[11px] sm:text-xs leading-relaxed text-[#3D3222]">
                              Dengan Kitab Merah Ajaib, Atma dan Raya dapat melakukan Spacedive &mdash; menyelam menembus lapisan kesadaran orang lain untuk mengurai simpul trauma, kecemasan, dan ingatan yang terkunci. Namun, setiap penyelaman meninggalkan retakan yang mengancam batas kenyataan.
                            </p>

                            <div className="pt-0.5 text-[9px] sm:text-[10px] font-mono text-[#3B2D1A] bg-[#EAE0CD]/85 p-2 rounded border border-[#C9B68A]/60 space-y-1">
                              <p className="font-bold text-[#7A1622]">&bull; Kitab Merah Ajaib:</p>
                              <p className="italic">Kunci membuka alam bawah sadar dan memori terdalam manusia.</p>
                            </div>
                          </div>

                          {/* Bottom Navigation on Page 2: Tombol Kembali + 3 Dots + Tombol Lanjut */}
                          <div className="pt-2 flex items-center justify-between border-t border-[#A08C64]/25">
                            {/* Tombol Kembali */}
                            <button
                              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
                              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-[#EAE0CD] hover:bg-[#DDD2BE] text-[#382C1E] font-mono font-semibold text-[10px] sm:text-xs tracking-wider rounded border border-[#C9B68A]/60 shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
                              aria-label="Kembali ke halaman pertama"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Kembali</span>
                            </button>

                            {/* Page indicator dots */}
                            <div className="flex items-center gap-1.5">
                              {[0, 1, 2].map((idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setPage(idx); }}
                                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentPage === idx
                                      ? "w-5 bg-brand-primary shadow-xs"
                                      : "w-2 bg-[#A08C64]/40 hover:bg-[#A08C64]/70"
                                  }`}
                                  aria-label={`Buka Halaman ${idx + 1}`}
                                />
                              ))}
                            </div>

                            {/* Tombol Lanjut */}
                            <button
                              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-brand-primary hover:bg-[#FFE28A] text-bg-primary font-mono font-bold text-[10px] sm:text-xs tracking-wider rounded shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
                              aria-label="Lanjut ke halaman ketiga"
                            >
                              <span>Lanjut</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* --- HALAMAN 3 (Spread 3) KANAN: REDESIGNED ETHEREAL PORTAL --- */}
                      {currentPage === 2 && (
                        <>
                          <div className="space-y-1 pt-0.5">
                            <div className="flex items-center justify-between border-b border-[#A08C64]/30 pb-0.5">
                              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#5C4728] font-bold">
                                Halaman 03 &bull; Pintu Ingatan
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#005C51]" />
                            </div>

                            <p className="font-body italic text-[10px] sm:text-[11px] leading-snug text-[#3B2D1A]">
                              &ldquo;Pusaran memori Spacedive telah terbuka. Sentuh untuk menyelam ke dalam kisah.&rdquo;
                            </p>
                          </div>

                          {/* INTERACTIVE ETHEREAL SWIRL VORTEX PORTAL (A2 Fix: Ethereal mist, dark void center, 3D funnel, no CD lines) */}
                          <div
                            className={`my-auto pt-0.5 pb-0.5 flex flex-col items-center justify-center relative transition-opacity duration-300 ${
                              state === "closed" ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto z-20"
                            }`}
                          >
                            <motion.div
                              ref={portalRef}
                              role="button"
                              tabIndex={0}
                              aria-label="Portal ingatan Spacedive. Sentuh untuk menyelam ke dalam cerita."
                              onClick={handlePortalClick}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handlePortalClick(e as unknown as React.MouseEvent);
                                }
                              }}
                              animate={{
                                scale: [0.98, 1.03, 0.98],
                              }}
                              transition={{
                                scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                              }}
                              whileHover={{ scale: 1.07 }}
                              whileTap={{ scale: 0.94 }}
                              className="relative w-[135px] h-[135px] sm:w-[155px] sm:h-[155px] rounded-full cursor-pointer group flex items-center justify-center select-none"
                              style={{
                                perspective: "500px",
                                boxShadow: `
                                  0 0 50px rgba(0, 229, 199, 0.65),
                                  0 0 90px rgba(140, 107, 255, 0.45),
                                  inset 0 4px 22px rgba(0, 0, 0, 0.95),
                                  inset 0 -2px 14px rgba(0, 229, 199, 0.45)
                                `,
                              }}
                            >
                              {/* Ambient Ethereal Backlight Glow (Pulsing cyan & lavender aura) */}
                              <div
                                className="absolute -inset-7 sm:-inset-9 rounded-full blur-2xl sm:blur-3xl pointer-events-none animate-pulse"
                                style={{
                                  background:
                                    "radial-gradient(circle, rgba(0,229,199,0.5) 0%, rgba(140,107,255,0.4) 50%, transparent 75%)",
                                }}
                              />

                              {/* Ethereal Swirling Vortex Layer 1 (Clockwise, 8s, misty cyan-lavender energy with blur) */}
                              <div
                                className="absolute inset-0 rounded-full border border-[#00E5C7]/70 overflow-hidden"
                                style={{
                                  animation: "portalSpinClockwise 8s linear infinite",
                                  background: `
                                    conic-gradient(
                                      from 0deg,
                                      #00E5C7 0deg,
                                      rgba(140, 107, 255, 0.85) 60deg,
                                      rgba(5, 8, 22, 0.95) 130deg,
                                      #00E5C7 200deg,
                                      rgba(140, 107, 255, 0.9) 270deg,
                                      #00E5C7 360deg
                                    )
                                  `,
                                  filter: "blur(5px)",
                                  opacity: 0.88,
                                }}
                              />

                              {/* Ethereal Swirling Vortex Layer 2 (Counter-Clockwise, 12s, counter misty lavender-cyan swirl) */}
                              <div
                                className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden"
                                style={{
                                  animation: "portalSpinCounterClockwise 12s linear infinite",
                                  background: `
                                    conic-gradient(
                                      from 180deg,
                                      rgba(140, 107, 255, 0.92) 0deg,
                                      rgba(0, 229, 199, 0.55) 75deg,
                                      rgba(3, 6, 18, 0.98) 160deg,
                                      rgba(140, 107, 255, 0.85) 250deg,
                                      rgba(0, 229, 199, 0.9) 360deg
                                    )
                                  `,
                                  filter: "blur(4px)",
                                  opacity: 0.85,
                                }}
                              />

                              {/* Sunken 3D Vortex Funnel Depth Overlay (Creates depth illusion of looking into a bottomless cosmic funnel) */}
                              <div
                                className="absolute inset-0 rounded-full pointer-events-none z-10"
                                style={{
                                  background: `
                                    radial-gradient(circle at 50% 50%, transparent 22%, rgba(5, 8, 22, 0.6) 55%, rgba(3, 5, 16, 0.92) 88%, #00E5C7 100%)
                                  `,
                                  boxShadow: "inset 0 0 24px rgba(0, 0, 0, 0.95)",
                                }}
                              />

                              {/* 4 Orbiting Particles with Smooth CSS Circular Orbits */}
                              <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                style={{ animation: "portalSpinClockwise 6.5s linear infinite" }}
                              >
                                <div
                                  className="w-2.5 h-2.5 rounded-full bg-[#00E5C7] shadow-[0_0_12px_#00E5C7]"
                                  style={{ transform: "translateY(-74px)" }}
                                />
                              </div>

                              <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                style={{ animation: "portalSpinCounterClockwise 9.5s linear infinite" }}
                              >
                                <div
                                  className="w-2 h-2 rounded-full bg-[#8C6BFF] shadow-[0_0_10px_#8C6BFF]"
                                  style={{ transform: "translateY(-66px)" }}
                                />
                              </div>

                              <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                style={{ animation: "portalSpinClockwise 13s linear infinite" }}
                              >
                                <div
                                  className="w-2 h-2 rounded-full bg-[#00E5C7] shadow-[0_0_10px_#00E5C7]"
                                  style={{ transform: "translateY(-80px)" }}
                                />
                              </div>

                              <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                style={{ animation: "portalSpinCounterClockwise 8s linear infinite" }}
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]"
                                  style={{ transform: "translateY(-58px)" }}
                                />
                              </div>

                              {/* Center Deep Void Singularity Core (Dark black hole fading to cyan/lavender mist, NOT solid white) */}
                              <div
                                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center z-20"
                                style={{
                                  background: `
                                    radial-gradient(circle, #02040B 0%, #060A1A 45%, rgba(140, 107, 255, 0.45) 75%, transparent 100%)
                                  `,
                                  boxShadow: "inset 0 0 16px #000000, 0 0 18px rgba(0, 229, 199, 0.45)",
                                }}
                              >
                                <motion.div
                                  animate={{ scale: [0.75, 1.15, 0.75], opacity: [0.65, 0.95, 0.65] }}
                                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#070B1E] border border-[#00E5C7]/80 shadow-[0_0_12px_#00E5C7]"
                                />
                              </div>

                              {/* Interactive Expanding Ripple Ring */}
                              <motion.div
                                animate={{
                                  scale: [0.75, 1.45],
                                  opacity: [0.75, 0],
                                }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border border-[#00E5C7] pointer-events-none z-10"
                              />
                            </motion.div>

                            {/* Portal Instruction Text */}
                            <motion.p
                              animate={{ opacity: [0.9, 1, 0.9] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                              className="mt-2 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold text-[#004D43] hover:text-[#00332C] cursor-pointer transition-colors flex items-center gap-1.5 pointer-events-auto bg-[#EDE5D5]/90 px-2.5 py-0.5 rounded border border-[#C9B68A]/60 shadow-xs"
                              onClick={handlePortalClick}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#007A6C] animate-ping" />
                              <span>Sentuh untuk menyelam</span>
                            </motion.p>
                          </div>

                          {/* Bottom Navigation on Page 3: Tombol Kembali + 3 Dots */}
                          <div className="pt-2 flex items-center justify-between border-t border-[#A08C64]/25">
                            {/* Tombol Kembali */}
                            <button
                              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
                              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#EAE0CD] hover:bg-[#DDD2BE] text-[#382C1E] font-mono font-semibold text-[10px] sm:text-xs tracking-wider rounded border border-[#C9B68A]/60 shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
                              aria-label="Kembali ke halaman kedua"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Kembali</span>
                            </button>

                            {/* Page indicator dots */}
                            <div className="flex items-center gap-1.5">
                              {[0, 1, 2].map((idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setPage(idx); }}
                                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentPage === idx
                                      ? "w-5 bg-brand-primary shadow-xs"
                                      : "w-2 bg-[#A08C64]/40 hover:bg-[#A08C64]/70"
                                  }`}
                                  aria-label={`Buka Halaman ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* FRONT COVER (Swings open on Y-axis from left hinge on State === "opening" / "diving") */}
              <motion.div
                initial={false}
                animate={
                  state === "opening" || state === "diving"
                    ? { rotateY: -160 }
                    : { rotateY: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  pointerEvents: state === "closed" ? "auto" : "none",
                  zIndex: state === "closed" ? 30 : 10,
                }}
                className="absolute inset-0"
              >
                {/* FRONT COVER (Visible when book is closed) - Rich Antique Leather Surface */}
                <div
                  className="absolute inset-0 rounded-r-lg border border-[#69111C] p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    backgroundColor: "#7A1622",
                    backgroundImage: `
                      radial-gradient(ellipse at 30% 25%, rgba(220, 80, 95, 0.28) 0%, transparent 50%),
                      radial-gradient(ellipse at 75% 75%, rgba(30, 4, 8, 0.65) 0%, transparent 60%),
                      repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 4px),
                      repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 0px, rgba(0, 0, 0, 0.05) 1px, transparent 1px, transparent 4px),
                      linear-gradient(135deg, #881A27 0%, #6E121E 50%, #4D0912 100%)
                    `,
                    boxShadow: `
                      inset 0 0 28px rgba(0,0,0,0.72),
                      inset 2px 2px 5px rgba(255,255,255,0.18),
                      inset -2px -2px 6px rgba(0,0,0,0.8),
                      0 18px 40px rgba(0,0,0,0.8)
                    `,
                  }}
                >
                  {/* Book Spine Texture (Left side) */}
                  <div className="absolute left-0 top-0 bottom-0 w-5 bg-[#66121D] border-r border-[#4A0A12] shadow-md flex flex-col justify-around py-3 items-center">
                    <div className="w-2.5 h-0.5 bg-[#B98A3C]/50 rounded-full" />
                    <div className="w-2.5 h-0.5 bg-[#B98A3C]/50 rounded-full" />
                    <div className="w-2.5 h-0.5 bg-[#B98A3C]/50 rounded-full" />
                    <div className="w-2.5 h-0.5 bg-[#B98A3C]/50 rounded-full" />
                  </div>

                  {/* Detailed Antique Filigree Gold Corner Ornaments */}
                  <div className="absolute top-1 right-1 pointer-events-none">
                    <AntiqueCornerOrnament />
                  </div>
                  <div className="absolute bottom-1 right-1 pointer-events-none transform scale-y-[-1]">
                    <AntiqueCornerOrnament />
                  </div>

                  {/* Top Folio on Cover */}
                  <div className="pl-4 pt-1 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFE28A] font-semibold">
                      1999 &bull; DIARY
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFE28A]" />
                  </div>

                  {/* Center Fabric Title Badge: "ATMA & RAYA" */}
                  <div className="pl-4 my-auto">
                    <div className="bg-[#FAF6EC] border-2 border-[#C9B68A] p-3 sm:p-4 rounded-sm shadow-lg text-center transform -rotate-1 group-hover:rotate-0 transition-transform duration-300">
                      <span className="font-mono text-[8px] uppercase tracking-widest text-[#7A1622] block font-bold">
                        JURNAL RAHASIA
                      </span>
                      <h2 className="text-base sm:text-lg font-display font-bold text-[#8B222E] tracking-wider mt-0.5 leading-tight">
                        ATMA &bull; RAYA
                      </h2>
                      <div className="w-8 h-0.5 bg-[#C9B68A] mx-auto my-1.5" />
                      <p className="font-mono text-[8px] sm:text-[9px] text-[#4A3828] italic font-medium">
                        Kota Loka &bull; Akhir SMA
                      </p>
                    </div>
                  </div>

                  {/* Bottom Cover Subtle Accent */}
                  <div className="pl-4 pb-1 text-center">
                    <span className="font-mono text-[9px] text-[#FFE28A]/90 tracking-widest uppercase font-medium">
                      &bull; Sentuh untuk Membuka &bull;
                    </span>
                  </div>
                </div>

                {/* INSIDE FRONT COVER LINING (Revealed on left when book swings open) - Rich Maroon Leather Texture */}
                <div
                  className="absolute inset-0 bg-[#751520] rounded-l-lg border border-[#4A0A12] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl pointer-events-auto"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundImage: `
                      radial-gradient(ellipse at 50% 35%, rgba(220, 80, 95, 0.22) 0%, transparent 60%),
                      radial-gradient(ellipse at 75% 85%, rgba(30, 4, 8, 0.75) 0%, transparent 70%),
                      repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 4px),
                      repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 4px),
                      linear-gradient(135deg, #7A1622 0%, #5E121B 50%, #3D0A10 100%)
                    `,
                    boxShadow: `
                      inset 0 0 30px rgba(0,0,0,0.85),
                      inset 1px 1px 3px rgba(255,255,255,0.15),
                      inset -1px -1px 4px rgba(0,0,0,0.85),
                      0 18px 40px rgba(0,0,0,0.8)
                    `,
                  }}
                >
                  {/* Embossed Inner Border Panel with Dashed Accent & 4 Mini Corner Ornaments */}
                  <div className="relative h-full w-full rounded border border-[#B88928]/40 shadow-[inset_0_1px_3px_rgba(255,255,255,0.18),inset_0_-1px_3px_rgba(0,0,0,0.7)] p-3 sm:p-4 flex flex-col justify-between items-center text-center overflow-hidden">
                    {/* Inner gold dashed border */}
                    <div className="absolute inset-2 border border-dashed border-[#F4C95D]/25 pointer-events-none rounded-sm" />

                    {/* 4 Mini Antique Filigree Corner Ornaments (Reused from cover) */}
                    <div className="absolute top-1 left-1 pointer-events-none opacity-80">
                      <AntiqueCornerOrnament className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="absolute top-1 right-1 pointer-events-none opacity-80 transform scale-x-[-1]">
                      <AntiqueCornerOrnament className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="absolute bottom-1 left-1 pointer-events-none opacity-80 transform scale-y-[-1]">
                      <AntiqueCornerOrnament className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="absolute bottom-1 right-1 pointer-events-none opacity-80 transform scale-[-1]">
                      <AntiqueCornerOrnament className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* AnimatePresence for Left Page Content matching currentPage */}
                    <AnimatePresence mode="wait" custom={pageDirection}>
                      {currentPage === 0 && (
                        <motion.div
                          key="left-spread-0"
                          custom={pageDirection}
                          variants={{
                            initial: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? -15 : 15,
                            }),
                            animate: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.45, ease: "easeOut" },
                            },
                            exit: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? 15 : -15,
                              transition: { duration: 0.35, ease: "easeIn" },
                            }),
                          }}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="h-full w-full flex flex-col justify-between items-center text-center z-10"
                        >
                          {/* Top Folio Header */}
                          <div className="pt-1 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-widest text-[#FFE28A] uppercase font-medium">
                            <span className="w-1 h-1 rounded-full bg-[#FFE28A]" />
                            <span>Catatan Pemilik</span>
                            <span className="w-1 h-1 rounded-full bg-[#FFE28A]" />
                          </div>

                          {/* Center Bookplate Cartouche */}
                          <div className="my-auto w-full max-w-[200px] sm:max-w-[230px] bg-[#FAF6EC]/95 border border-[#C9B68A] p-3 sm:p-4 rounded shadow-md text-center transform -rotate-1">
                            <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-[#7A1622] block font-bold">
                              MEMORI KOTA LOKA
                            </span>
                            <h3 className="text-sm sm:text-base font-display font-bold text-[#8B222E] tracking-wider mt-0.5">
                              ATMA &amp; RAYA
                            </h3>
                            <div className="w-8 sm:w-10 h-0.5 bg-[#C9B68A] mx-auto my-1.5" />
                            <p className="font-mono text-[8px] sm:text-[9px] text-[#4A3828] italic font-medium">
                              SMA Negeri 1 Kota Loka
                            </p>
                            <p className="font-mono text-[7px] sm:text-[8px] text-[#5C4728] mt-1 font-semibold">
                              1999 &bull; Rahasia Berdua
                            </p>
                          </div>

                          {/* Bottom Footer Folio */}
                          <div className="pb-1 font-mono text-[8px] sm:text-[9px] text-[#FFE28A]/80 tracking-widest uppercase flex items-center gap-1.5 font-medium">
                            <span>&bull;</span>
                            <span>Halaman Pribadi</span>
                            <span>&bull;</span>
                          </div>
                        </motion.div>
                      )}

                      {currentPage === 1 && (
                        <motion.div
                          key="left-spread-1"
                          custom={pageDirection}
                          variants={{
                            initial: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? -15 : 15,
                            }),
                            animate: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.45, ease: "easeOut" },
                            },
                            exit: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? 15 : -15,
                              transition: { duration: 0.35, ease: "easeIn" },
                            }),
                          }}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="h-full w-full flex flex-col justify-between items-center text-center z-10"
                        >
                          {/* Top Folio Header */}
                          <div className="pt-1 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-widest text-[#FFE28A] uppercase font-medium">
                            <span className="w-1 h-1 rounded-full bg-[#00E5C7]" />
                            <span>Resonansi Rasa</span>
                            <span className="w-1 h-1 rounded-full bg-[#00E5C7]" />
                          </div>

                          {/* Center Narrative Themes & Emotional Quote */}
                          <div className="my-auto w-full max-w-[210px] sm:max-w-[245px] space-y-2 text-left bg-[#1A0508]/70 border border-[#B88928]/35 p-2.5 sm:p-3 rounded shadow-inner">
                            <p className="font-body italic text-[9.5px] sm:text-[11px] leading-relaxed text-[#F5EEDD]/95 text-center border-b border-[#B88928]/30 pb-1.5">
                              &ldquo;Sebuah kisah tentang mengatasi kecemasan, persahabatan erat, dan belajar melepaskan.&rdquo;
                            </p>
                            <div className="space-y-1 pt-0.5 text-[8.5px] sm:text-[9.5px] font-mono text-[#E8DCC4]">
                              <div className="flex items-start gap-1.5">
                                <span className="text-dive-accent font-bold mt-0.5">&bull;</span>
                                <div>
                                   <strong className="text-[#FFE28A]">Pertumbuhan Diri:</strong>
                                  <p className="text-[7.5px] sm:text-[8.5px] text-[#C9B68A]/90 leading-tight">Menghadapi luka batin &amp; kecemasan masa depan.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <span className="text-dive-accent font-bold mt-0.5">&bull;</span>
                                <div>
                                  <strong className="text-[#FFE28A]">Persahabatan Erat:</strong>
                                  <p className="text-[7.5px] sm:text-[8.5px] text-[#C9B68A]/90 leading-tight">Kesetiaan menembus badai memori yang runtuh.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <span className="text-dive-accent font-bold mt-0.5">&bull;</span>
                                <div>
                                  <strong className="text-[#FFE28A]">Nostalgia 90-an:</strong>
                                  <p className="text-[7.5px] sm:text-[8.5px] text-[#C9B68A]/90 leading-tight">Kehangatan kota kecil Indonesia tempo dulu.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Footer Folio */}
                          <div className="pb-1 font-mono text-[8px] sm:text-[9px] text-[#FFE28A]/80 tracking-widest uppercase flex items-center gap-1.5 font-medium">
                            <span>&bull;</span>
                            <span>Jejak Emosi &bull; Hal 02</span>
                            <span>&bull;</span>
                          </div>
                        </motion.div>
                      )}

                      {currentPage === 2 && (
                        <motion.div
                          key="left-spread-2"
                          custom={pageDirection}
                          variants={{
                            initial: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? -15 : 15,
                            }),
                            animate: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.45, ease: "easeOut" },
                            },
                            exit: (dir: number) => ({
                              opacity: 0,
                              x: dir > 0 ? 15 : -15,
                              transition: { duration: 0.35, ease: "easeIn" },
                            }),
                          }}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="h-full w-full flex flex-col justify-between items-center text-center z-10"
                        >
                          {/* Top Folio Header */}
                          <div className="pt-1 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-widest text-dive-accent uppercase font-medium">
                            <span className="w-1 h-1 rounded-full bg-dive-accent animate-ping" />
                            <span>Ambang Kenyataan</span>
                            <span className="w-1 h-1 rounded-full bg-dive-accent" />
                          </div>

                          {/* Center Narrative Closing Quote */}
                          <div className="my-auto w-full max-w-[210px] sm:max-w-[245px] text-center space-y-2.5 bg-[#160407]/75 border border-dive-accent/40 p-3 sm:p-4 rounded shadow-lg">
                            <div className="w-7 h-7 mx-auto rounded-full bg-dive-accent/15 border border-dive-accent/50 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-dive-accent animate-pulse" />
                            </div>
                            <blockquote className="font-body italic text-[10.5px] sm:text-xs leading-relaxed text-[#F5EEDD]">
                              &ldquo;Ketika batas antara mimpi dan kenyataan memudar, satu-satunya jalan keluar adalah masuk lebih dalam...&rdquo;
                            </blockquote>
                            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-dive-accent/70 to-transparent mx-auto" />
                            <p className="font-mono text-[8px] sm:text-[9px] text-dive-accent tracking-wide uppercase font-semibold">
                              Pintu Spacedive Siap &bull; Loka Menanti
                            </p>
                          </div>

                          {/* Bottom Footer Folio */}
                          <div className="pb-1 font-mono text-[8px] sm:text-[9px] text-[#FFE28A]/80 tracking-widest uppercase flex items-center gap-1.5 font-medium">
                            <span>&bull;</span>
                            <span className="text-dive-accent">Ambang Kenyataan &bull; Hal 03</span>
                            <span>&bull;</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

        {/* Prompt Instruction below book */}
        <motion.div
          animate={
            state === "diving"
              ? { opacity: 0, y: 15 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          {state === "closed" && (
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs sm:text-sm font-mono text-[#B8C8DA] hover:text-brand-primary transition-colors cursor-pointer flex items-center justify-center gap-2"
              onClick={handleBookClick}
            >
              {/* Minimalist dot bullet instead of generic sparkle */}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/80 inline-block" />
              <span>Ketuk untuk membuka kenangan...</span>
            </motion.p>
          )}

          {state === "opening" && (
            <p className="text-xs sm:text-sm font-mono text-dive-accent font-semibold tracking-wide flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-dive-accent animate-pulse" />
              <span>Pintu kenangan terbuka. Sentuh portal untuk menyelam...</span>
            </p>
          )}

          {state === "diving" && (
            <p className="text-xs sm:text-sm font-mono text-dive-accent font-bold tracking-widest uppercase">
              Menyelam ke dalam ingatan...
            </p>
          )}
        </motion.div>

      </div>

      {/* 4. Bottom Footer note */}
      <div className="w-full text-center z-10 pb-1">
        <span className="text-[10px] font-mono text-text-muted/50 tracking-wider">
          Sentuh buku atau lewati kapan saja &bull; Lomba Web Development IT FEST UNW 2026
        </span>
      </div>

      {/* 5. DIVE EFFECT: Shockwave Ring + 18 Bursting Petals rendered directly to document.body via createPortal */}
      {mounted &&
        state === "diving" &&
        diveOrigin.screenX > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            data-testid="dive-shockwave-container"
            className="fixed pointer-events-none z-[99999] flex items-center justify-center"
            style={{
              left: `${diveOrigin.screenX}px`,
              top: `${diveOrigin.screenY}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Expanding Shockwave Ring originating from Portal */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 4.2, opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="absolute w-44 h-44 rounded-full border-2 border-dive-accent shadow-[0_0_60px_rgba(0,229,199,0.9)]"
            />
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="absolute w-36 h-36 rounded-full border border-brand-primary shadow-[0_0_45px_rgba(244,201,93,0.8)]"
            />

            {/* Radiating Petal Burst Particles (Originating from Portal) */}
            {burstPetals.map((petal) => {
              const targetX = Math.cos(petal.angle) * petal.distance;
              const targetY = Math.sin(petal.angle) * petal.distance;

              return (
                <motion.div
                  key={petal.id}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.3,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: [0.3, 1.2, 0.4],
                    opacity: [1, 1, 0],
                    rotate: petal.rotation,
                  }}
                  transition={{
                    duration: 0.75,
                    delay: petal.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    width: petal.size,
                    height: petal.size * 1.5,
                    backgroundColor: petal.color,
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    boxShadow: `0 0 10px ${petal.color}`,
                  }}
                />
              );
            })}
          </div>,
          document.body
        )}
    </motion.aside>
  );
}
