"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Trophy, Gamepad2, Heart, Smartphone, Calendar } from "lucide-react";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const milestones: Milestone[] = [
  {
    year: "2020",
    badge: "SEA Game Awards",
    title: "Best Storytelling — SEA Game Awards",
    description:
      "Meraih penghargaan Best Storytelling di ajang South East Asia Game Awards 2020 saat masih berupa bab prolog, membuktikan kekuatan narasi emosional Atma dan Raya sejak awal pengembangannya.",
    icon: Award,
    image: "/images/header.jpg",
  },
  {
    year: "2022",
    badge: "Tokyo Game Show",
    title: "Future Division Award — Japan Game Award",
    description:
      "Mendapatkan penghargaan prestisius Future Division Award di ajang Japan Game Awards (Tokyo Game Show 2022), mencuri perhatian luas penikmat karya naratif di kancah internasional.",
    icon: Trophy,
    image: "/images/ss_07a0aaf3598903b39589e0484b2f87330cf72b19.1920x1080.jpg",
  },
  {
    year: "19 Jan 2023",
    badge: "Peluncuran Global",
    title: "Rilis Resmi Multi-Platform",
    description:
      "Kisah lengkap Atma dan Raya resmi dirilis serentak di PC (Steam, GOG, Epic), PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, dan Nintendo Switch.",
    icon: Gamepad2,
    image: "/images/ss_fece3cd88e9fbeadc92fd36771d8ce84e1e460e9.1920x1080.jpg",
  },
  {
    year: "2023",
    badge: "The Game Awards",
    title: "Nominee Games for Impact — The Game Awards",
    description:
      "Masuk sebagai nominasi kategori Games for Impact di The Game Awards 2023 di Los Angeles, diapresiasi atas keberaniannya mengangkat isu kesehatan mental dan empati secara mendalam.",
    icon: Heart,
    image: "/images/29447347.jpg",
  },
  {
    year: "2025",
    badge: "Ekspansi Mobile",
    title: "Ekspansi ke iOS",
    description:
      "Membawa dunia kota Loka ke genggaman para pengguna iPhone dan iPad di App Store, memperluas jangkauan kisah nostalgia era 90-an ke komunitas pemain yang semakin luas.",
    icon: Smartphone,
    image: "/images/ss_13e5138f96418a2e703238348e45a18dbdcd8a01.1920x1080.jpg",
  },
];

function MilestoneCard({ item, isLeft }: { item: Milestone; isLeft: boolean }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, x: isLeft ? -35 : 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="ml-9 md:ml-0 group/card relative bg-bg-secondary/90 backdrop-blur-md border border-text-muted/20 p-5 sm:p-6 transition-all duration-300 hover:border-brand-primary/50 hover:shadow-[0_0_25px_rgba(244,201,93,0.15)] rounded-none"
    >
      {/* Top Milestone Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5 border-b border-text-muted/15 pb-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/30">
          <Calendar className="w-3 h-3" />
          {item.year}
        </span>
        <span
          className={`text-[11px] font-mono tracking-wide uppercase ${
            isLeft ? "text-brand-accent/90" : "text-brand-secondary/90"
          }`}
        >
          {item.badge}
        </span>
      </div>

      {/* Milestone Body: 80x80px Thumbnail + Text Content */}
      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Thumbnail 80x80 */}
        <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden border border-brand-primary/30 bg-bg-primary/80 group-hover/card:border-brand-primary/60 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
            sizes="80px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          {/* Title with preserved accent icon */}
          <div className="flex items-start gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-none border border-brand-primary/40 bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary mt-0.5 shadow-sm">
              <Icon className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base font-display text-text-main tracking-wide leading-snug group-hover/card:text-brand-primary transition-colors">
              {item.title}
            </h3>
          </div>

          {/* Description text with crisp contrast */}
          <p className="text-xs sm:text-sm text-text-muted/95 leading-relaxed font-body">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function News() {
  return (
    <section
      id="news"
      className="relative py-24 sm:py-32 bg-bg-primary overflow-hidden border-b border-text-muted/10 scroll-mt-16"
    >
      {/* Narrative Journal Folio Header (Pojok Atas) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:left-14 z-20 pointer-events-none">
        <JournalPageIndicator
          number="05"
          title="Jejak Perjalanan"
          accentColor="primary"
        />
      </div>

      {/* Ambient Glow: Soft Warm Amber & Deep Indigo Return */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-brand-primary/8 rounded-full blur-[140px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/3 right-1/4 w-[420px] h-[420px] bg-brand-secondary/8 rounded-full blur-[140px] pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-text-main tracking-wider uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Jejak Perjalanan
          </h2>
          <p className="text-sm sm:text-base text-text-muted/95 leading-relaxed font-body drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Milestone dan penghargaan yang mengiringi langkah Atma dan Raya dari kota kecil Loka ke panggung apresiasi dunia.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-primary/40 via-brand-accent/30 to-brand-primary/20 pointer-events-none" />

          {/* Left Vertical Line (Mobile) */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-primary/40 via-brand-accent/30 to-brand-primary/20 pointer-events-none" />

          {/* Timeline Items */}
          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            {milestones.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.year + index}
                  className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between group"
                >
                  {/* Mobile Pixel Square Marker */}
                  <div className="md:hidden absolute left-4 top-7 -translate-x-1/2 w-4 h-4 bg-bg-primary border-2 border-brand-primary flex items-center justify-center shadow-[0_0_10px_rgba(244,201,93,0.35)] z-20">
                    <div className="w-1.5 h-1.5 bg-brand-primary" />
                  </div>

                  {/* Desktop Left Column / Card Slot */}
                  <div className="w-full md:w-[46%]">
                    {isLeft ? (
                      <MilestoneCard item={item} isLeft={isLeft} />
                    ) : (
                      <div className="hidden md:block w-full h-full" />
                    )}
                  </div>

                  {/* Desktop Central Pixel Square Marker */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-20">
                    <div className="w-4 h-4 bg-bg-primary border-2 border-brand-primary flex items-center justify-center shadow-[0_0_12px_rgba(244,201,93,0.4)] transition-transform duration-300 group-hover:scale-125">
                      <div className="w-1.5 h-1.5 bg-brand-primary" />
                    </div>
                  </div>

                  {/* Desktop Right Column / Card Slot */}
                  <div className="w-full md:w-[46%]">
                    {!isLeft ? (
                      <MilestoneCard item={item} isLeft={isLeft} />
                    ) : (
                      <div className="hidden md:block w-full h-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
