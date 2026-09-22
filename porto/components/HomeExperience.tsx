"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProfessionalLanding from "@/components/ProfessionalLanding";
import WarpSpeed from "@/components/WarpSpeed";

type Phase = "warp" | "welcome" | "menu";

/** Survives soft navigations; resets on hard refresh. */
let introPlayedThisLoad = false;

export default function HomeExperience() {
  const [phase, setPhase] = useState<Phase>(() =>
    introPlayedThisLoad ? "menu" : "warp",
  );
  const [warpSpeed, setWarpSpeed] = useState(1.05);

  const skipToMenu = useCallback(() => {
    introPlayedThisLoad = true;
    setPhase("menu");
  }, []);

  useEffect(() => {
    if (introPlayedThisLoad) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      introPlayedThisLoad = true;
      setPhase("menu");
      return;
    }

    // Accelerate into warp
    const accel = window.setTimeout(() => setWarpSpeed(1.55), 400);

    // Show welcome while still warping
    const welcomeAt = window.setTimeout(() => {
      setWarpSpeed(0.85);
      setPhase("welcome");
    }, 2800);

    // Exit hyperspace → landing menu
    const menuAt = window.setTimeout(() => {
      setWarpSpeed(0.35);
      introPlayedThisLoad = true;
      setPhase("menu");
    }, 5200);

    return () => {
      window.clearTimeout(accel);
      window.clearTimeout(welcomeAt);
      window.clearTimeout(menuAt);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skipToMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skipToMenu]);

  const showIntro = phase === "warp" || phase === "welcome";

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#05010a]">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            className="absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(12px)",
              scale: 1.08,
              transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <WarpSpeed speed={warpSpeed} starCount={560} />

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(5,1,10,0.35)_55%,rgba(5,1,10,0.92)_100%)]"
              aria-hidden
            />

            <AnimatePresence>
              {phase === "welcome" && (
                <motion.div
                  className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-6"
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.35 } }}
                >
                  <p className="font-arcade mb-5 w-full text-center text-[8px] tracking-widest text-fuchsia-300/80 sm:text-[9px]">
                    EXITING HYPERSPACE
                  </p>
                  <h1 className="font-display w-full text-center text-[clamp(3.25rem,11vw,8rem)] leading-[0.95] font-bold tracking-[-0.04em] text-white drop-shadow-[0_0_40px_rgba(199,85,247,0.55)]">
                    Welcome to my
                    <span className="mt-2 block bg-gradient-to-r from-fuchsia-200 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                      Portofolio
                    </span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={skipToMenu}
              className="font-arcade absolute right-4 bottom-4 z-20 text-[7px] tracking-wider text-fuchsia-300/50 transition-colors hover:text-fuchsia-200 sm:right-6 sm:bottom-6 sm:text-[8px]"
            >
              SKIP ▶
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={
          phase === "menu"
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.96, filter: "blur(6px)" }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {phase === "menu" ? <ProfessionalLanding /> : null}
      </motion.div>
    </div>
  );
}
