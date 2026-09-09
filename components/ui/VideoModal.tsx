"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId = "L08ZBQswnus", // Official A Space for the Unbound launch trailer
}: VideoModalProps) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      window.dispatchEvent(new CustomEvent("asftu:pause-music"));
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-primary/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-bg-secondary border border-brand-accent/40 shadow-[0_0_50px_rgba(127,231,216,0.25)] z-10 overflow-hidden"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-primary/90 border-b border-text-muted/20">
              <span className="font-display text-xs text-brand-primary tracking-wider uppercase">
                Trailer &bull; A Space for the Unbound
              </span>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-brand-accent transition-colors p-1"
                aria-label="Tutup Video Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Trailer Resmi A Space for the Unbound"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
