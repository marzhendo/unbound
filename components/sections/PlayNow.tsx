"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Gamepad, Gamepad2, Smartphone, ExternalLink } from "lucide-react";
import JournalPageIndicator from "@/components/ui/JournalPageIndicator";

interface Platform {
  name: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const platforms: Platform[] = [
  {
    name: "Steam (PC)",
    label: "PC / Windows",
    icon: Monitor,
    href: "https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/",
  },
  {
    name: "PlayStation",
    label: "PS4 & PS5",
    icon: Gamepad,
    href: "https://www.playstation.com/en-us/games/a-space-for-the-unbound/",
  },
  {
    name: "Xbox",
    label: "One & Series X/S",
    icon: Gamepad,
    href: "https://www.xbox.com/en-US/games/store/a-space-for-the-unbound/9pg2rz8gvzcj",
  },
  {
    name: "Nintendo Switch",
    label: "Nintendo eShop",
    icon: Gamepad2,
    href: "https://www.nintendo.com/us/store/products/a-space-for-the-unbound-switch/",
  },
  {
    name: "iOS",
    label: "Apple App Store",
    icon: Smartphone,
    href: "https://apps.apple.com/us/app/a-space-for-the-unbound/id6544796348",
  },
];

export default function PlayNow() {
  return (
    <section
      id="play"
      className="relative py-28 sm:py-36 md:py-40 bg-transparent overflow-hidden scroll-mt-16 text-text-main border-b border-text-muted/15"
    >
      {/* Background Twilight Gradient Layer (Behind Petals) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-bg-primary via-[#111736] to-[#161B33]" />
      {/* Narrative Journal Folio Header (Pojok Atas) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 lg:left-14 z-20 pointer-events-none">
        <JournalPageIndicator
          number="06"
          title="Panggilan untuk Menyelam"
          accentColor="primary"
        />
      </div>

      {/* Warm Twilight Ambient Glows (Gentle & Calming book-closing atmosphere) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,201,93,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-primary/10 via-brand-secondary/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-text-main tracking-wider uppercase drop-shadow-[0_0_20px_rgba(244,201,93,0.25)]"
          >
            Dapatkan &amp; Mainkan Sekarang
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-sm sm:text-base text-text-muted leading-relaxed font-body max-w-xl mx-auto"
          >
            Tersedia di PC (Steam), PlayStation 4/5, Xbox One/Series, Nintendo Switch, dan iOS. Klik salah satu platform di bawah untuk melihat halaman resmi &amp; harga terbaru.
          </motion.p>

          {/* Quick Specifications Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-text-muted/80"
          >
            <span className="px-2.5 py-1 bg-bg-secondary/70 border border-text-muted/15 rounded-none">
              Genre: Slice-of-Life Adventure
            </span>
            <span className="px-2.5 py-1 bg-bg-secondary/70 border border-text-muted/15 rounded-none">
              Engine: Unity
            </span>
            <span className="px-2.5 py-1 bg-bg-secondary/70 border border-text-muted/15 rounded-none">
              Developer: Mojiken Studio
            </span>
          </motion.div>
        </div>

        {/* Video Trailer (Official Launch Trailer YouTube Iframe) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto aspect-video rounded-none border-2 border-brand-primary/30 overflow-hidden shadow-[0_0_40px_rgba(244,201,93,0.12)] bg-bg-secondary/90 mb-14 sm:mb-18"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/L08ZBQswnus"
            title="A Space for the Unbound Official Trailer"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* Platform Buttons Grid (5 Platforms) */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {platforms.map((platform, idx) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex flex-col items-center justify-center p-4 sm:p-5 bg-bg-secondary/80 border border-text-muted/20 rounded-none transition-all duration-300 hover:bg-brand-primary hover:border-brand-primary hover:shadow-[0_0_25px_rgba(244,201,93,0.35)] text-center select-none cursor-pointer"
                >
                  {/* Platform Icon */}
                  <div className="w-9 h-9 mb-2.5 flex items-center justify-center text-brand-primary group-hover:text-bg-primary transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Subtitle / Store */}
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-text-muted group-hover:text-bg-primary/80 transition-colors uppercase">
                    {platform.label}
                  </span>

                  {/* Platform Name */}
                  <span className="text-xs sm:text-sm font-display font-bold text-text-main group-hover:text-bg-primary transition-colors mt-0.5">
                    {platform.name}
                  </span>

                  {/* Subtle External Arrow */}
                  <div className="mt-2 text-text-muted/40 group-hover:text-bg-primary/60 transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Poetic Journal Closing Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 sm:mt-20 text-center max-w-xl mx-auto space-y-2.5"
        >
          <div className="w-12 h-0.5 bg-brand-primary/40 mx-auto mb-3" />
          <p className="font-body italic text-sm sm:text-base text-text-muted leading-relaxed">
            &ldquo;Buku kenangan ini mungkin telah selesai dibaca, namun kehangatan kota Loka akan selalu tersimpan di dalam hati.&rdquo;
          </p>
          <span className="font-mono text-[11px] text-brand-primary/70 tracking-widest uppercase block pt-1">
            &bull; Akhir dari Lembaran Jurnal &bull;
          </span>
        </motion.div>

      </div>
    </section>
  );
}
