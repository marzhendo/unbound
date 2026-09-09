"use client";

import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { initParticles } from "./particlesInit";
import { motion, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

interface PetalFieldProps {
  scrollYProgress: MotionValue<number>;
}

type DensityTier = "hero" | "characters" | "gameplay" | "closing";

export default function PetalField({ scrollYProgress }: PetalFieldProps) {
  const containerRef = useRef<Container | null>(null);
  const [, setCurrentTier] = useState<DensityTier>("hero");
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opt?: { timeout: number }) => number }).requestIdleCallback(
          () => setIsReady(true),
          { timeout: 1500 }
        );
        return () => {
          window.removeEventListener("resize", checkMobile);
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        };
      } else {
        const timer = setTimeout(() => setIsReady(true), 300);
        return () => {
          window.removeEventListener("resize", checkMobile);
          clearTimeout(timer);
        };
      }
    }
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Opacity driven smoothly by scroll depth (GPU-composited)
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.52, 0.72, 1],
    [0.65, 0.82, 1, 0.75, 0.7]
  );

  // Synchronize particle count based on section scroll depth
  const syncParticles = useCallback((progress: number) => {
    const container = containerRef.current;
    if (!container || !container.particles) return;

    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;

    let targetTier: DensityTier = "hero";
    let targetCount = isSmallScreen ? 8 : 16;
    let isGameplay = false;

    if (progress < 0.2) {
      targetTier = "hero";
      targetCount = isSmallScreen ? 8 : 16;
    } else if (progress < 0.44) {
      targetTier = "characters";
      targetCount = isSmallScreen ? 12 : 28;
    } else if (progress < 0.72) {
      targetTier = "gameplay";
      targetCount = isSmallScreen ? 18 : 48; // Max 18 on mobile (vs 48 on desktop)
      isGameplay = true;
    } else {
      targetTier = "closing";
      targetCount = isSmallScreen ? 10 : 22;
    }

    setCurrentTier(targetTier);

    const currentCount = container.particles.count;
    if (currentCount < targetCount) {
      const diff = targetCount - currentCount;
      if (isGameplay) {
        container.particles.push(diff, undefined, {
          color: { value: ["#00E5C7", "#7FE7D8", "#8C6BFF"] },
        });
      } else {
        container.particles.push(diff, undefined, {
          color: { value: ["#7FE7D8", "#A8F5EA", "#FFEBB2"] },
        });
      }
    } else if (currentCount > targetCount) {
      container.particles.removeQuantity(currentCount - targetCount);
    }
  }, []);

  // Listen to scroll progress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    syncParticles(latest);
  });

  const handleParticlesLoaded = useCallback(
    async (container?: Container) => {
      if (container) {
        containerRef.current = container;
        // Initial sync based on current scroll position
        const initialProgress = scrollYProgress.get();
        syncParticles(initialProgress);
      }
    },
    [scrollYProgress, syncParticles]
  );

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: isMobile ? 30 : 60,
      particles: {
        color: {
          value: ["#7FE7D8", "#00E5C7", "#A8F5EA", "#8C6BFF", "#F4C95D"],
        },
        move: {
          direction: "bottom" as const,
          enable: true,
          outModes: {
            default: "out" as const,
            bottom: "out" as const,
            top: "out" as const,
          },
          random: true,
          speed: { min: 0.35, max: 0.85 }, // Slow gentle floating
          straight: false, // Organic floating with sideways drift
        },
        number: {
          value: isMobile ? 8 : 16, // Initial sparse density for Hero
        },
        opacity: {
          animation: {
            enable: !isMobile, // Disable on mobile to conserve CPU cycles
            speed: 0.5,
            minimumValue: 0.2,
            sync: false,
          },
          value: { min: 0.25, max: 0.85 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1.5, max: 3.5 }, // Soft petal/luminescent orbs
        },
      },
      detectRetina: !isMobile,
    }),
    [isMobile]
  );

  if (!isReady) {
    return <div className="fixed inset-0 w-full h-full pointer-events-none z-[1]" aria-hidden="true" />;
  }

  return (
    <motion.div
      style={{
        opacity: containerOpacity,
      }}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] [filter:drop-shadow(0_0_8px_rgba(0,229,199,0.35))]"
      aria-hidden="true"
    >
      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles-petals"
          className="w-full h-full"
          options={options}
          particlesLoaded={handleParticlesLoaded}
        />
      </ParticlesProvider>
    </motion.div>
  );
}
