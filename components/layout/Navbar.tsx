"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Characters", href: "#characters", id: "characters" },
  { name: "Gameplay", href: "#gameplay", id: "gameplay" },
  { name: "News", href: "#news", id: "news" },
  { name: "Play Now", href: "#play", id: "play" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(22, 27, 51, 0.96)" // bg-secondary (#161B33) with slight transparency
          : "rgba(11, 16, 38, 0)", // fully transparent at top
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottomWidth: isScrolled ? "2px" : "1px",
        borderBottomColor: isScrolled
          ? "rgba(244, 201, 93, 0.3)" // thicker book cover trim
          : "rgba(245, 243, 237, 0)", // transparent border at top
        boxShadow: isScrolled
          ? "0 4px 20px -2px rgba(5, 9, 20, 0.75)"
          : "none",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 h-16 w-full flex items-center transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        
        {/* Wordmark Logo (Left) */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-display text-xs sm:text-sm font-bold tracking-wider text-brand-primary uppercase select-none hover:opacity-85 transition-opacity"
        >
          A Space for the Unbound
        </a>

        {/* Desktop Navigation (Right) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <NavLinkItem
              key={link.id}
              name={link.name}
              href={link.href}
              id={link.id}
              onClick={handleNavClick}
            />
          ))}

          {/* CTA Button "Mainkan" */}
          <a
            href="#play"
            onClick={(e) => handleNavClick(e, "play")}
            className="inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-bg-primary font-display text-xs tracking-wider uppercase font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(244,201,93,0.35)] active:scale-95 select-none"
          >
            Mainkan
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-text-muted hover:text-brand-primary transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-16 inset-x-0 bg-bg-secondary/98 backdrop-blur-md border-b-2 border-brand-primary/30 px-6 py-5 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-brand-primary transition-colors py-1.5 border-b border-text-muted/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#play"
                  onClick={(e) => handleNavClick(e, "play")}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-brand-primary text-bg-primary font-display text-xs tracking-wider uppercase font-bold"
                >
                  Mainkan
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLinkItem({
  name,
  href,
  id,
  onClick,
}: {
  name: string;
  href: string;
  id: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => onClick(e, id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-1 text-xs font-mono tracking-wider uppercase text-text-muted hover:text-text-main transition-colors select-none"
    >
      <span>{name}</span>

      {/* Pen-stroke / ink line animation (Framer Motion width 0% -> 100%) */}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-brand-primary rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered ? "100%" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </a>
  );
}
