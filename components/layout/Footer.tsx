"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUp, Heart, ScrollText } from "lucide-react";

// Dynamically import Starfield with ssr: false for optimal performance
const Starfield = dynamic(() => import("@/components/effects/Starfield"), {
  ssr: false,
});

export default function Footer() {
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" } // Preload 400px before reaching footer
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Characters", href: "#characters" },
    { name: "Gameplay", href: "#gameplay" },
    { name: "News", href: "#news" },
    { name: "Play Now", href: "#play" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0B1026] border-t border-brand-primary/20 text-text-muted overflow-hidden z-10"
    >
      {/* 1. Subtle Fading Starfield: Closing the memory book under the same starlight night sky */}
      {isInView && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 95%)",
          }}
          aria-hidden="true"
        >
          <Starfield id="tsparticles-footer" density="minimal" speed={0.15} />
        </div>
      )}

      {/* Atmospheric deep night gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1026]/40 to-[#0B1026]/90 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Top subtle golden glow line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent relative z-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">
        {/* Row 1: Brand & Nav Links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-text-muted/15">
          {/* Brand & Narrative Note */}
          <div className="space-y-2 max-w-md">
            <span className="font-display text-base sm:text-lg text-brand-primary tracking-wider uppercase block">
              A SPACE FOR THE UNBOUND
            </span>
            <p className="font-body text-xs sm:text-sm text-[#D1DCE8] leading-relaxed">
              Sebuah persembahan visual &amp; interaktif merayakan kisah Atma dan Raya di kota Loka era 90-an.
            </p>
          </div>

          {/* Navigation Links & Scroll to Top */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-mono text-xs text-[#D1DCE8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-secondary/80 hover:bg-brand-primary hover:text-bg-primary border border-text-muted/20 hover:border-brand-primary text-[#D1DCE8] hover:text-bg-primary text-xs font-mono transition-all duration-200 cursor-pointer ml-auto sm:ml-2 rounded-xs"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Atas</span>
            </button>
          </div>
        </div>

        {/* Row 2: Vintage Document Stamp Disclaimer Box */}
        <div className="pt-8">
          <div className="relative p-1 bg-[#12182F]/70 border border-[#D1C7BD]/40 rounded-sm transform -rotate-[0.8deg] hover:rotate-0 transition-transform duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xs">
            {/* Inner frame with vintage diary cream tone */}
            <div className="border border-[#D1C7BD]/25 rounded-xs p-4 sm:p-5 space-y-2.5 bg-gradient-to-br from-[#151D38]/85 to-[#0F152C]/90">
              {/* Official Seal / Document Header */}
              <div className="flex items-center justify-between border-b border-[#D1C7BD]/15 pb-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D1C7BD]/10 border border-[#D1C7BD]/30 rounded-xs text-[10px] font-mono tracking-widest text-[#D1C7BD] uppercase">
                  <ScrollText className="w-3 h-3 text-[#D1C7BD]" />
                  <span>Stempel Arsip Resmi &bull; Dokumen Fan-Made</span>
                </div>
                <span className="font-mono text-[10px] text-[#A89F91] tracking-wider hidden sm:inline">
                  LOKA-1999/ARC
                </span>
              </div>

              {/* Preserved Exact Disclaimer Text */}
              <p className="font-mono text-xs text-[#F4EFE6] leading-relaxed font-semibold">
                Dibuat untuk Lomba Web Development IT FEST UNW 2026.
              </p>
              <p className="font-body text-xs text-[#D1C7BD]/90 leading-relaxed">
                Ini adalah proyek fan-made non-komersial untuk kepentingan kompetisi, bukan situs resmi.
              </p>
              <p className="font-body text-xs text-[#D1C7BD]/90 leading-relaxed">
                Seluruh hak cipta game &ldquo;A Space for the Unbound&rdquo; dimiliki oleh{" "}
                <span className="text-[#F4EFE6] font-semibold">Mojiken Studio</span> &amp;{" "}
                <span className="text-[#F4EFE6] font-semibold">Toge Productions</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Team Credits (Compact without individual roles) */}
        <div className="pt-6 text-center sm:text-left">
          <p className="font-mono text-xs text-[#D1DCE8] leading-relaxed">
            Dibuat oleh <span className="text-brand-primary font-semibold">Aedil</span>,{" "}
            <span className="text-brand-primary font-semibold">Galang</span>,{" "}
            <span className="text-brand-primary font-semibold">Fatir</span> &amp;{" "}
            <span className="text-brand-primary font-semibold">Raysa</span> untuk{" "}
            <span className="text-text-main font-semibold">Lomba Web Development IT FEST UNW 2026</span>.
          </p>
        </div>

        {/* Row 4: Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9AAFC4] pt-6 mt-4 border-t border-text-muted/10">
          <span>
            &copy; 2026 Fan-Made Showcase &bull; A Space for the Unbound
          </span>

          <div className="flex flex-wrap items-center gap-4">
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/itfest.unw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-secondary/70 hover:bg-brand-primary/10 border border-brand-primary/25 hover:border-brand-primary/50 text-[#D1DCE8] hover:text-brand-primary text-xs font-mono transition-all duration-200"
              aria-label="Instagram resmi IT FEST UNW (@itfest.unw)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@itfest.unw</span>
            </a>

            <span className="inline-flex items-center gap-1">
              Dibuat dengan rasa hormat &amp; kekaguman{" "}
              <Heart className="w-3 h-3 text-brand-secondary fill-brand-secondary/40 inline" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
