"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles, HelpCircle, BookOpen, Heart, Eye, Bookmark } from "lucide-react";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

type CharacterTab = "atma" | "raya" | "mystery";

interface TabData {
  id: CharacterTab;
  tabLabel: string;
  tabSub?: string;
  characterTitle: string;
  vibeTag: string;
  vibeIcon: React.ElementType;
  traits: string[];
  imageSrc: string;
  imageAlt: string;
  polaroidRotation: number;
  tabRotation: string;
  polaroidCaption: string;
  isMysterious?: boolean;
  mysteryNote?: string;
  accentColor: string;
  tabActiveColor: string;
  tabBorderColor: string;
  tabBg: string;
}

const tabsContent: Record<CharacterTab, TabData> = {
  atma: {
    id: "atma",
    tabLabel: "Atma",
    characterTitle: "Atma",
    vibeTag: "Tenang & Observatif",
    vibeIcon: BookOpen,
    traits: [
      "Pendiam namun penuh perhatian",
      "Penulis diary",
      "Peka terhadap detail kecil di sekitarnya",
    ],
    imageSrc: "/images/652d50ac3110e4752f1f46c958450531.jpg",
    imageAlt: "Foto polaroid Atma yang tertempel di buku diary",
    polaroidRotation: -3,
    tabRotation: "-rotate-2",
    polaroidCaption: "Atma — Lembaran Jurnal 1999",
    accentColor: "text-brand-primary",
    tabActiveColor: "text-brand-primary border-brand-primary bg-[#1A2142]",
    tabBorderColor: "border-brand-primary/40",
    tabBg: "bg-[#141B38]",
  },
  raya: {
    id: "raya",
    tabLabel: "Raya",
    characterTitle: "Raya",
    vibeTag: "Hangat namun Menyimpan Beban",
    vibeIcon: Heart,
    traits: [
      "Ceria di permukaan",
      "Protektif pada orang terdekat",
      "Berani menghadapi risiko besar demi orang lain",
    ],
    imageSrc: "/images/29447348.jpg",
    imageAlt: "Foto polaroid Raya yang tertempel di buku diary",
    polaroidRotation: 2,
    tabRotation: "rotate-2",
    polaroidCaption: "Raya — Senja di Kota Loka",
    accentColor: "text-brand-accent",
    tabActiveColor: "text-brand-accent border-brand-accent bg-[#152B3E]",
    tabBorderColor: "border-brand-accent/40",
    tabBg: "bg-[#102033]",
  },
  mystery: {
    id: "mystery",
    tabLabel: "???",
    tabSub: "Sosok Misterius",
    characterTitle: "Sosok Misterius",
    vibeTag: "Sosok dalam Ingatan",
    vibeIcon: HelpCircle,
    traits: [
      "Muncul di antara mimpi dan kenyataan",
      "Terhubung dengan masa lalu yang belum terungkap",
      "Kunci dari sebuah rahasia yang lebih besar",
    ],
    imageSrc: "/images/The Book_ - A Space For The Unbound.jpg",
    imageAlt: "Foto terselubung sosok misterius",
    polaroidRotation: -2,
    tabRotation: "-rotate-1",
    polaroidCaption: "??? // Memori Terfragmentasi",
    isMysterious: true,
    mysteryNote: "Detail lengkap akan terungkap saat kamu memainkan game-nya langsung.",
    accentColor: "text-brand-secondary",
    tabActiveColor: "text-brand-secondary border-brand-secondary bg-[#211A3E]",
    tabBorderColor: "border-brand-secondary/40",
    tabBg: "bg-[#191430]",
  },
};

// Framer Motion variants for physical photo lift-and-settle transition
const photoVariants: Variants = {
  initial: (rotation: number) => ({
    opacity: 0,
    y: 36,
    rotate: -rotation * 2.5,
    scale: 0.92,
  }),
  animate: (rotation: number) => ({
    opacity: 1,
    y: 0,
    rotate: rotation,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: (rotation: number) => ({
    opacity: 0,
    y: -30,
    rotate: rotation - 8,
    scale: 0.94,
    transition: {
      duration: 0.28,
      ease: "easeInOut" as const,
    },
  }),
};

export default function DeepDive() {
  const [activeTab, setActiveTab] = useState<CharacterTab>("atma");
  const current = tabsContent[activeTab];

  return (
    <section
      id="deep-dive"
      className="relative py-24 sm:py-32 md:py-36 bg-bg-primary overflow-hidden border-b border-text-muted/10 scroll-mt-16 text-text-main"
    >
      {/* Folio Header (Pojok Atas) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:left-14 z-20 pointer-events-none">
        <JournalPageIndicator
          number="03"
          title="Sisi Lain yang Tersembunyi"
          accentColor="accent"
        />
      </div>

      {/* Ambient Starlight & Soft Memory Glows */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-secondary/7 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-text-main tracking-wider uppercase drop-shadow-[0_0_20px_rgba(127,231,216,0.2)]"
          >
            Sisi Lain yang Tersembunyi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base text-text-muted italic font-body max-w-xl mx-auto"
          >
            &ldquo;Setiap orang punya lapisan yang tak terlihat dari luar.&rdquo;
          </motion.p>
        </div>

        {/* DIARY CARD CONTAINER WITH PHYSICAL BOOKMARKS & WORN PAPER TEXTURE */}
        <div className="relative mx-auto max-w-4xl pr-0 md:pr-10 lg:pr-12">
          
          {/* PHYSICAL BOOKMARK INDEX TABS (Protruding from RIGHT EDGE of diary page) */}
          <div
            role="tablist"
            aria-label="Pilih Halaman Rahasia Diary"
            className="flex md:flex-col justify-center md:justify-start gap-2 sm:gap-3 mb-4 md:mb-0 md:absolute md:-right-4 lg:-right-6 md:top-14 md:z-30"
          >
            {(["atma", "raya", "mystery"] as CharacterTab[]).map((tabKey) => {
              const tab = tabsContent[tabKey];
              const isActive = activeTab === tabKey;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tabKey)}
                  className={`group relative px-4 sm:px-5 py-2.5 sm:py-3 text-left border font-display text-xs sm:text-sm tracking-wider uppercase select-none cursor-pointer transition-all duration-300 shadow-md ${
                    tab.tabRotation
                  } ${
                    isActive
                      ? `${tab.tabActiveColor} md:translate-x-3.5 z-20 shadow-[0_6px_20px_rgba(0,0,0,0.5)]`
                      : `${tab.tabBg} border-text-muted/25 text-text-muted hover:text-text-main hover:border-text-muted/40 z-10 opacity-80 hover:opacity-100 hover:md:translate-x-1`
                  }`}
                  style={{
                    borderTopRightRadius: "6px",
                    borderBottomRightRadius: "6px",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Bookmark className={`w-3.5 h-3.5 shrink-0 ${isActive ? "fill-current" : ""}`} />
                    <span className="font-bold">{tab.tabLabel}</span>
                  </div>

                  {tab.tabSub && (
                    <span className="hidden sm:block text-[9px] font-mono lowercase opacity-70 mt-0.5">
                      {tab.tabSub}
                    </span>
                  )}

                  {/* Physical bookmark ribbon tip effect */}
                  {isActive && (
                    <motion.span
                      layoutId="activeBookmarkPip"
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-3.5 bg-brand-accent rounded-sm shadow-[0_0_8px_rgba(127,231,216,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* MAIN DIARY PAGE CONTAINER */}
          <div
            className="relative bg-[#131936] border border-[#3E4A70]/50 shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden"
            style={{
              // Aged paper texture: soft sepia/cream radial tint + subtle ruled diary lines
              backgroundImage: `
                radial-gradient(ellipse at 50% 25%, rgba(245, 230, 200, 0.12) 0%, rgba(210, 180, 140, 0.05) 55%, transparent 100%),
                repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(244, 201, 93, 0.035) 32px)
              `,
            }}
          >
            {/* Left Binding Spine & Stitch Line */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-[#0E132B] border-r border-[#3E4A70]/50 pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 left-5 border-l border-dashed border-brand-primary/20 pointer-events-none z-10" />

            {/* Secret Diary Watermark Stamp in corner */}
            <div className="absolute top-3 right-4 pointer-events-none select-none z-10 opacity-35 hidden sm:flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-brand-primary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/80" />
              <span>LEMBARAN RAHASIA DIARY</span>
            </div>

            {/* Tab Panel Content Area */}
            <div className="relative min-h-[460px] sm:min-h-[440px] p-6 sm:p-9 md:p-10 pl-8 sm:pl-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`panel-${current.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${current.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
                    
                    {/* POLAROID / TAPED PHOTO COLUMN */}
                    <div className="md:col-span-5 flex justify-center py-3">
                      <AnimatePresence mode="wait" custom={current.polaroidRotation}>
                        <motion.div
                          key={current.id}
                          custom={current.polaroidRotation}
                          variants={photoVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="relative w-full max-w-[260px] sm:max-w-[290px] bg-[#F4EFE6] p-3 pb-7 sm:p-3.5 sm:pb-8 shadow-[0_16px_36px_rgba(0,0,0,0.65),0_3px_10px_rgba(0,0,0,0.35)] border border-white/40 cursor-default select-none group"
                        >
                          {/* Translucent Washi Tape on top edge */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E8D9BE]/80 border border-white/40 backdrop-blur-xs rotate-[1.5deg] shadow-sm z-20 pointer-events-none" />

                          {/* Image Snapshot Container */}
                          <div className="relative w-full aspect-[3/4] bg-[#0E132B] overflow-hidden border border-[#2B231A]/20 shadow-inner">
                            <Image
                              src={current.imageSrc}
                              alt={current.imageAlt}
                              fill
                              sizes="(max-width: 768px) 260px, 290px"
                              className={`object-cover object-center transition-all duration-700 ${
                                current.isMysterious
                                  ? "filter blur-[8px] grayscale opacity-40 brightness-75 group-hover:blur-[6px] group-hover:opacity-50"
                                  : "group-hover:scale-105"
                              }`}
                            />

                            {/* Vintage vignette over photo */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                            {/* Mystery Tab Overlay */}
                            {current.isMysterious && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                                <div className="w-14 h-14 rounded-full bg-brand-secondary/25 border border-brand-secondary/60 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(91,110,225,0.4)]">
                                  <Eye className="w-7 h-7 text-brand-secondary animate-pulse" />
                                </div>
                                <span className="font-display text-[11px] tracking-widest uppercase text-brand-secondary bg-bg-primary/90 px-2.5 py-0.5 border border-brand-secondary/40">
                                  Identitas Terkunci
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Polaroid Bottom Chin: Handwritten Pencil Caption */}
                          <p className="font-mono text-[11px] sm:text-xs text-[#443C32] tracking-wider mt-3 text-center font-semibold italic truncate">
                            {current.polaroidCaption}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* DIARY NOTES & TRAITS COLUMN */}
                    <div className="md:col-span-7 space-y-5">
                      {/* Character Title & Vibe Tag */}
                      <div className="border-b border-[#3E4A70]/50 pb-4 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono border border-text-muted/30 rounded-none tracking-wide uppercase bg-[#0E132B]/60 text-text-muted">
                          <current.vibeIcon className="w-3.5 h-3.5 shrink-0 text-brand-accent" />
                          <span>{current.vibeTag}</span>
                        </div>

                        <h3 className={`text-2xl sm:text-3xl font-display tracking-wider ${current.accentColor}`}>
                          {current.characterTitle}
                        </h3>
                      </div>

                      {/* Traits List styled as Diary Bullet Points */}
                      <div className="space-y-3 pt-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-primary/80 block">
                          Catatan Karakteristik &amp; Sisi Terdalam:
                        </span>
                        <ul className="space-y-3.5">
                          {current.traits.map((trait, idx) => (
                            <motion.li
                              key={trait}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.08 * (idx + 1) }}
                              className="flex items-start gap-3 text-sm sm:text-base text-text-main font-body"
                            >
                              <span className="mt-1.5 w-2 h-2 bg-brand-accent shrink-0 rotate-45 shadow-[0_0_8px_rgba(127,231,216,0.7)]" />
                              <span className="leading-relaxed">{trait}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Mystery Spoiler Note */}
                      {current.mysteryNote && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="mt-6 pt-3.5 border-t border-brand-secondary/30 flex items-start gap-2.5 text-xs text-brand-secondary italic font-body bg-brand-secondary/10 p-3 border-l-2 border-brand-secondary"
                        >
                          <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-brand-secondary animate-pulse" />
                          <span>{current.mysteryNote}</span>
                        </motion.div>
                      )}
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
