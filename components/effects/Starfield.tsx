"use client";

import React, { useMemo, useState, useEffect } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { initParticles } from "./particlesInit";

interface StarfieldProps {
  id?: string;
  density?: "normal" | "low" | "minimal";
  speed?: number;
  className?: string;
}

export default function Starfield({
  id = "tsparticles-hero",
  density = "normal",
  speed = 0.2,
  className = "absolute inset-0 w-full h-full pointer-events-none z-0",
}: StarfieldProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Defer particle initialization after initial paint / idle state
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

  const options = useMemo(
    () => {
      const isMinimal = density === "minimal";
      const isLow = density === "low";

      const particleCount = isMinimal
        ? isMobile ? 8 : 18
        : isLow
        ? isMobile ? 12 : 32
        : isMobile ? 18 : 60;

      const particleArea = isMinimal
        ? isMobile ? 1800 : 1400
        : isLow
        ? isMobile ? 1500 : 1100
        : isMobile ? 1200 : 850;

      const particleSpeed = isMinimal ? speed * 0.75 : speed;

      const minOpacity = isMinimal ? 0.08 : 0.2;
      const maxOpacity = isMinimal ? 0.45 : 0.75;

      return {
        fullScreen: {
          enable: false,
          zIndex: 0,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: isMobile ? 30 : 60,
        particles: {
          color: {
            value: ["#ffffff", "#F4C95D", "#FFEBB2", "#D4DCFF"],
          },
          move: {
            direction: "none" as const,
            enable: true,
            outModes: {
              default: "out" as const,
            },
            random: true,
            speed: particleSpeed,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: particleArea,
            },
            value: particleCount,
          },
          opacity: {
            animation: {
              enable: !isMobile && !isMinimal,
              speed: 0.45,
              minimumValue: 0.15,
              sync: false,
            },
            value: { min: minOpacity, max: maxOpacity },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: isMinimal ? { min: 0.6, max: 1.6 } : { min: 0.8, max: 2.2 },
          },
        },
        detectRetina: !isMobile,
      };
    },
    [isMobile, density, speed]
  );

  if (!isReady) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <ParticlesProvider init={initParticles}>
        <Particles
          id={id}
          className="absolute inset-0 w-full h-full pointer-events-none"
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
}
