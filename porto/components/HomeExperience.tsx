"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProfessionalLanding from "@/components/ProfessionalLanding";
import WarpSpeed from "@/components/WarpSpeed";
import {
  THEME_STORAGE_KEY,
  isThemeId,
  skinForTheme,
  type ThemeId,
} from "@/components/landing/themes";

type Phase = "warp" | "welcome" | "menu";

/** Survives soft navigations; resets on hard refresh. */
let introPlayedThisLoad = false;

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "professional";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && isThemeId(saved)) return saved;
  } catch {
    /* ignore */
  }
  return "professional";
}

export default function HomeExperience() {
  const [phase, setPhase] = useState<Phase>(() =>
    introPlayedThisLoad ? "menu" : "warp",
  );
  const [warpSpeed, setWarpSpeed] = useState(() =>
    introPlayedThisLoad ? 0.05 : 1.05,
  );
  const [menuTheme, setMenuTheme] = useState<ThemeId>(readStoredTheme);

  const showWarp = phase !== "menu" || skinForTheme(menuTheme) === "arcade";

  const skipToMenu = useCallback(() => {
    introPlayedThisLoad = true;
    setWarpSpeed(0.05);
    setPhase("menu");
  }, []);

  useEffect(() => {
    if (introPlayedThisLoad) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      introPlayedThisLoad = true;
      setWarpSpeed(0.05);
      setPhase("menu");
      return;
    }

    const accel = window.setTimeout(() => setWarpSpeed(1.55), 400);

    const welcomeAt = window.setTimeout(() => {
      setWarpSpeed(0.65);
      setPhase("welcome");
    }, 2800);

    const menuAt = window.setTimeout(() => {
      setWarpSpeed(0.05);
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
    if (phase === "menu") return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skipToMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skipToMenu]);

  const showIntroOverlay = phase === "warp" || phase === "welcome";

  return (
    <div
      className={[
        "relative h-dvh w-full overflow-hidden",
        showWarp ? "bg-[#05010a]" : "bg-white",
      ].join(" ")}
    >
      <AnimatePresence>
        {showWarp ? (
          <motion.div
            key="warp"
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <WarpSpeed speed={warpSpeed} starCount={560} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(5,1,10,0.35)_55%,rgba(5,1,10,0.88)_100%)]" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            className="absolute inset-0 z-20 flex w-full flex-col items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(6px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <p className="font-arcade mb-5 w-full text-center text-[8px] tracking-widest text-fuchsia-300/80 sm:text-[9px]">
              EXITING HYPERSPACE
            </p>
            <h1 className="font-display w-full text-center text-[clamp(3.25rem,11vw,8rem)] leading-[0.95] font-bold tracking-[-0.04em] text-white drop-shadow-[0_0_40px_rgba(199,85,247,0.55)]">
              You’ve arrived at
              <span className="mt-2 block bg-gradient-to-r from-fuchsia-200 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                Wira’s Portfolio
              </span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {showIntroOverlay && (
        <button
          type="button"
          onClick={skipToMenu}
          className="font-arcade absolute right-4 bottom-4 z-30 text-[7px] tracking-wider text-fuchsia-300/50 transition-colors hover:text-fuchsia-200 sm:right-6 sm:bottom-6 sm:text-[8px]"
        >
          SKIP ▶
        </button>
      )}

      <motion.div
        className="absolute inset-0 z-10"
        initial={false}
        animate={
          phase === "menu"
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 12, filter: "blur(4px)" }
        }
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: phase === "menu" ? "auto" : "none" }}
      >
        {phase === "menu" ? (
          <ProfessionalLanding onThemeChange={setMenuTheme} />
        ) : null}
      </motion.div>
    </div>
  );
}
