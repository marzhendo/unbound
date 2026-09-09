"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

export default function Characters() {
  return (
    <section
      id="characters"
      className="relative z-10 py-20 sm:py-28 bg-transparent overflow-hidden border-b border-text-muted/10 scroll-mt-16"
    >
      {/* Narrative Journal Folio Header (Pojok Atas) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:left-14 z-20 pointer-events-none">
        <JournalPageIndicator
          number="02"
          title="Mereka yang Kuingat"
          accentColor="primary"
        />
      </div>

      {/* Subtle Background Glow Ambient */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-text-main tracking-wider uppercase">
            Tokoh Utama
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
            Dua insan di kota Loka yang saling terikat dalam rasa, ingatan, dan janji masa depan.
          </p>
        </div>

        {/* Intimate Overlap Layout (Atma: Base z-10 with safe right padding, Raya: Overlap z-20 without obstructing text) */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center max-w-6xl mx-auto pb-4">
          
          {/* Card 1: Atma (POV Utama / Base / z-10) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="w-full lg:w-[58%] xl:w-[57%] relative z-10 bg-bg-secondary/90 backdrop-blur-sm border border-text-muted/25 p-6 sm:p-8 lg:pr-16 xl:pr-20 transition-colors duration-300 hover:border-brand-accent hover:shadow-[0_0_25px_rgba(127,231,216,0.25)] rounded-none"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Character Image (Ratio 3:4) */}
              <div className="w-full sm:w-48 aspect-[3/4] border border-brand-secondary/40 bg-bg-primary/90 shrink-0 relative overflow-hidden group shadow-lg">
                <Image
                  src="/images/652d50ac3110e4752f1f46c958450531.jpg"
                  alt="Atma, tokoh utama A Space for the Unbound"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent pointer-events-none z-10" />
              </div>

              {/* Bio & Information */}
              <div className="space-y-3 flex-1 min-w-0">
                <div className="border-b border-text-muted/20 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-primary">
                    Tokoh Utama / POV
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-text-main tracking-wider mt-1">
                    Atma
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                  Pelajar SMA biasa di kota Loka. Tenang, sedikit pendiam, tapi diam-diam menyimpan mimpi menjadi penulis. Hidupnya berubah total ketika ia mulai memahami rahasia besar yang disimpan Raya.
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    Peran: Penulis &amp; Siswa SMA
                  </span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 2: Raya (Overlap Masuk dari Kanan / z-20 / lg:-ml-6 xl:-ml-8 lg:mt-10) */}
          <motion.article
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="w-full lg:w-[48%] xl:w-[47%] relative z-20 mt-8 lg:mt-10 lg:-ml-6 xl:-ml-8 bg-bg-secondary/95 backdrop-blur-sm border border-text-muted/30 p-6 sm:p-8 transition-colors duration-300 hover:border-brand-accent hover:shadow-[0_0_25px_rgba(127,231,216,0.25)] rounded-none"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Character Image (Ratio 3:4) */}
              <div className="w-full sm:w-48 aspect-[3/4] border border-brand-accent/40 bg-bg-primary/90 shrink-0 relative overflow-hidden group shadow-lg">
                <Image
                  src="/images/29447348.jpg"
                  alt="Raya, tokoh dengan kekuatan Spacedive"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[27%_center] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent pointer-events-none z-10" />
              </div>

              {/* Bio & Information */}
              <div className="space-y-3 flex-1">
                <div className="border-b border-text-muted/20 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-secondary">
                    Tokoh Utama
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display text-text-main tracking-wider mt-1">
                    Raya
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-text-muted leading-relaxed font-body">
                  Kekasih Atma yang ceria namun menyimpan beban besar: kemampuan supernatural untuk &quot;menyelam&quot; ke dalam pikiran dan ingatan orang lain — sebuah kekuatan yang datang dengan risiko besar bagi dirinya sendiri.
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    Peran: Pemilik Kekuatan &quot;Spacedive&quot;
                  </span>
                </div>
              </div>
            </div>
          </motion.article>

        </div>

        {/* RENCANA MASA DEPAN (SLOT OPSIONAL): Grid Warga Kota Loka • Tokoh Pendukung */}

      </div>
    </section>
  );
}
