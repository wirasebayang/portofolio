"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CRTWarp from "@/components/CRTWarp";
import ClickSpark from "@/components/react-bits/ClickSpark";
import DecryptedText from "@/components/react-bits/DecryptedText";
import LavaButton from "@/components/LavaButton";
import CurvedRetroHero from "@/components/CurvedRetroHero";
import ShipCursor from "@/components/ShipCursor";
import ShipStage from "@/components/ShipStage";
import { useIrisNavigate } from "@/components/IrisTransition";
import {
  DEFAULT_SHIP,
  SHIPS,
  SHIP_STORAGE_KEY,
  isShipId,
  type ShipId,
} from "@/components/ships";

const THEMES = [
  { id: "professional", label: "Professional" },
  { id: "unprofessional", label: "Unprofessional" },
  { id: "meme", label: "Meme" },
  { id: "hardselling", label: "Hard Selling" },
  { id: "lazy", label: "Lazy" },
] as const;

type MenuView = "mode" | "ship";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ProfessionalLanding() {
  const { irisTo } = useIrisNavigate();
  const selectedTheme = "professional";
  const [shipId, setShipId] = useState<ShipId>(DEFAULT_SHIP);
  const [menuView, setMenuView] = useState<MenuView>("mode");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHIP_STORAGE_KEY);
      if (saved && isShipId(saved)) setShipId(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (menuView !== "ship") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuView("mode");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuView]);

  const shipName =
    SHIPS.find((s) => s.id === shipId)?.name ?? SHIPS[0].name;

  const selectShip = (id: ShipId) => {
    setShipId(id);
    setMenuView("mode");
    try {
      localStorage.setItem(SHIP_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <ClickSpark
      sparkColor="#e879f9"
      sparkCount={10}
      sparkRadius={20}
      sparkSize={10}
      duration={400}
      className="h-dvh"
    >
      <ShipCursor shipId={shipId} />

      <div className="relative h-dvh w-full overflow-hidden bg-[#05010a] text-[#f3e8ff]">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <CRTWarp
            color="#c755f7"
            backgroundColor="#05010a"
            speed={0.5}
            curvature={0.28}
            scanlineStrength={0.28}
            scanlineFrequency={200}
            waveAmplitude={0.3}
            waveFrequency={2.5}
            bloom={1.5}
            bloomRadius={1}
            noise={0.12}
            vignette={0.4}
            brightness={1.22}
            pixelation={1}
            rgbShift={0.016}
            mouseReact
            mouseStrength={0.5}
            dpr={1}
            fps={30}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(5,1,10,0.08)_0%,rgba(5,1,10,0.4)_60%,rgba(5,1,10,0.82)_100%)]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="text-watermark text-[min(42vw,18rem)] select-none">
            PLAY
          </span>
        </div>

        {/* HUD */}
        <div className="absolute inset-x-0 top-0 z-[3] flex items-start justify-between gap-3 px-4 pt-5 sm:px-8 sm:pt-6">
          <motion.div
            className="font-arcade text-left"
            custom={0.05}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <p className="text-[7px] leading-relaxed text-fuchsia-300/75 sm:text-[8px]">
              1UP
            </p>
            <p className="mt-1 text-[9px] text-white sm:text-[10px]">000000</p>
          </motion.div>

          <motion.div
            className="font-arcade text-center"
            custom={0.1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <p className="text-[7px] leading-relaxed text-amber-300/90 sm:text-[8px]">
              HI-SCORE
            </p>
            <p className="mt-1 text-[9px] text-amber-100 sm:text-[10px]">
              999999
            </p>
          </motion.div>

          <motion.div
            className="font-arcade text-right"
            custom={0.15}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <p className="text-[7px] leading-relaxed text-fuchsia-300/75 sm:text-[8px]">
              CREDIT
            </p>
            <p className="mt-1 text-[9px] text-white sm:text-[10px]">02</p>
          </motion.div>
        </div>

        <main className="relative z-[2] flex h-full w-full flex-col justify-start px-1 pt-16 pb-10 sm:px-2 sm:pt-20 lg:px-3 lg:pt-24">
          <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col gap-5 sm:gap-6 lg:gap-7">
            {/* Hero — curved pixel 3D (pinned higher) */}
            <motion.header
              className="flex w-full shrink-0 flex-col items-center gap-1 text-center sm:gap-2"
              custom={0.2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <CurvedRetroHero />
              <p className="font-arcade text-[11px] uppercase tracking-wider text-fuchsia-300/85 sm:text-sm md:text-base">
                <DecryptedText
                  text="MAIN MENU"
                  animateOn="view"
                  sequential
                  speed={40}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                  className="text-fuchsia-300"
                  encryptedClassName="text-fuchsia-700"
                />
              </p>
            </motion.header>

            {/* Centered menu: mode view OR ship picker */}
            <motion.div
              className="flex min-h-0 w-full flex-1 flex-col items-center justify-start pt-2 sm:pt-3"
              custom={0.45}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <div className="flex w-full max-w-xl flex-col items-center gap-8 sm:gap-10">
                <AnimatePresence mode="wait">
                  {menuView === "mode" ? (
                    <motion.div
                      key="mode"
                      {...panelMotion}
                      className="flex w-full flex-col items-center gap-8 sm:gap-10"
                    >
                      <div
                        role="group"
                        aria-label="Theme selection"
                        className="flex w-full max-w-[280px] flex-col items-center gap-4 sm:max-w-[320px] sm:gap-5"
                      >
                        <p className="font-arcade h-4 text-[8px] tracking-wider text-fuchsia-300/80 sm:h-5 sm:text-[10px]">
                          CHOOSE MODE
                        </p>
                        <div className="flex w-full flex-col gap-4 sm:gap-5">
                          {THEMES.map((theme) => {
                            const isSelected = theme.id === selectedTheme;
                            return (
                              <button
                                key={theme.id}
                                type="button"
                                aria-pressed={isSelected}
                                className={[
                                  "font-arcade w-full text-center",
                                  "text-[10px] uppercase leading-none tracking-wide sm:text-xs md:text-[13px]",
                                  "transition-colors duration-200",
                                  isSelected
                                    ? "text-white"
                                    : "text-purple-200/55 hover:text-fuchsia-200",
                                ].join(" ")}
                              >
                                {theme.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setMenuView("ship")}
                        className={[
                          "font-arcade flex flex-col items-center gap-2",
                          "px-2 py-2 text-[9px] tracking-wider text-fuchsia-200 transition-colors sm:text-[10px]",
                          "hover:text-white",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300",
                        ].join(" ")}
                      >
                        <span>SELECT SHIP</span>
                        <span className="text-[8px] text-purple-200/70 sm:text-[9px]">
                          {shipName}
                        </span>
                      </button>

                      <div className="flex flex-col items-center gap-3">
                        <LavaButton onClick={() => irisTo("/professional")}>
                          <span className="arcade-blink">Press Start</span>
                        </LavaButton>
                        <p className="font-arcade text-[7px] leading-relaxed text-purple-300/55 sm:text-[8px]">
                          INSERT SKILL TO CONTINUE
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ship"
                      {...panelMotion}
                      className="flex w-full flex-col items-center gap-5"
                    >
                      <ShipStage shipId={shipId} onSelect={selectShip} />
                      <button
                        type="button"
                        onClick={() => setMenuView("mode")}
                        className={[
                          "font-arcade rounded-md border border-white/15 bg-black/30",
                          "px-5 py-2 text-[8px] tracking-wider text-purple-200/80 transition-colors sm:text-[9px]",
                          "hover:border-fuchsia-400/50 hover:text-fuchsia-100",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300",
                        ].join(" ")}
                      >
                        ◀ BACK
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </main>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] px-4 pb-5 text-center">
          <p className="font-arcade text-[7px] leading-relaxed text-fuchsia-400/40 sm:text-[8px]">
            © 2026 · ARCADE MODE
          </p>
        </div>
      </div>
    </ClickSpark>
  );
}
