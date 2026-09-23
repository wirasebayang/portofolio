"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Aurora from "@/components/react-bits/Aurora";
import Particles from "@/components/react-bits/Particles";
import MoltenMetal from "@/components/react-bits/MoltenMetal";

type AtmosphereLayer = "aurora" | "particles" | "molten" | "none";

const SECTION_LAYER: Record<string, AtmosphereLayer> = {
  top: "aurora",
  about: "aurora",
  stack: "particles",
  projects: "particles",
  experience: "molten",
  education: "molten",
  certificates: "molten",
  contact: "molten",
};

/**
 * Section-aware WebGL atmosphere — mounts only the active layer.
 * Respects prefers-reduced-motion and pauses when the tab is hidden
 * (via each effect's own visibility handling + unmount on layer change).
 */
export default function ProfessionalAtmosphere() {
  const [layer, setLayer] = useState<AtmosphereLayer>("aurora");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const ids = Object.keys(SECTION_LAYER);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = "top";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        const next = SECTION_LAYER[bestId] ?? "aurora";
        setLayer((prev) => (prev === next ? prev : next));
      },
      {
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -35% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  const active: AtmosphereLayer =
    reducedMotion || !pageVisible ? "none" : layer;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#08060c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(199,85,247,0.14),transparent_55%)]" />

      <AnimatePresence mode="wait">
        {active === "aurora" && (
          <motion.div
            key="aurora"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="absolute inset-0 opacity-70">
              <Aurora
                colorStops={["#2e1065", "#c755f7", "#4c1d95"]}
                amplitude={1.05}
                blend={0.55}
                speed={0.55}
              />
            </div>
          </motion.div>
        )}

        {active === "particles" && (
          <motion.div
            key="particles"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="absolute inset-0 bg-[#0a0710]" />
            <div className="absolute inset-0 opacity-85">
              <Particles
                particleCount={48}
                particleSpread={11}
                speed={0.06}
                particleColors={["#e879f9", "#c755f7", "#a78bfa"]}
                moveParticlesOnHover={false}
                alphaParticles
                particleBaseSize={64}
                sizeRandomness={0.8}
                cameraDistance={22}
                pixelRatio={1}
              />
            </div>
          </motion.div>
        )}

        {active === "molten" && (
          <motion.div
            key="molten"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="absolute inset-0 opacity-[0.32]">
              <MoltenMetal
                colorMode="ember"
                color1="#2e1065"
                color2="#c755f7"
                color3="#f5d0fe"
                speed={0.18}
                scale={5}
                detail={2}
                glow={1}
                swirl={0.6}
                opacity={1}
                brightness={1}
                grain={false}
                mouseInteraction={false}
                backgroundColor="#08060c"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,6,12,0.65)_100%)]" />
    </div>
  );
}
