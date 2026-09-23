"use client";

import { AnimatePresence, motion } from "motion/react";
import ClickSpark from "@/components/react-bits/ClickSpark";
import DecryptedText from "@/components/react-bits/DecryptedText";
import LavaButton from "@/components/LavaButton";
import CurvedRetroHero from "@/components/CurvedRetroHero";
import ShipCursor from "@/components/ShipCursor";
import ShipStage from "@/components/ShipStage";
import VisitorCounter from "@/components/landing/VisitorCounter";
import { THEMES, type ThemeId } from "@/components/landing/themes";
import { SHIPS, type ShipId } from "@/components/ships";

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

export type ArcadeLandingSkinProps = {
  selectedTheme: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  canStart: boolean;
  onStart: () => void;
  shipId: ShipId;
  menuView: MenuView;
  onMenuView: (view: MenuView) => void;
  onSelectShip: (id: ShipId) => void;
};

export default function ArcadeLandingSkin({
  selectedTheme,
  onSelectTheme,
  canStart,
  onStart,
  shipId,
  menuView,
  onMenuView,
  onSelectShip,
}: ArcadeLandingSkinProps) {
  const shipName =
    SHIPS.find((s) => s.id === shipId)?.name ?? SHIPS[0].name;

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

      <div className="relative h-dvh w-full overflow-hidden bg-transparent text-[#f3e8ff]">
        <div className="absolute inset-x-0 top-0 z-[3] flex items-start justify-between gap-3 px-4 pt-5 sm:px-8 sm:pt-6">
          <motion.div
            className="font-arcade text-left"
            custom={0.05}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <VisitorCounter />
          </motion.div>

          <motion.div
            className="font-arcade text-center"
            custom={0.1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <p className="text-[7px] leading-relaxed text-amber-300/70 sm:text-[8px]">
              HI-SCORE
            </p>
            <p className="mt-1 text-[9px] text-amber-100/80 sm:text-[10px]">
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
            <p className="text-[7px] leading-relaxed text-fuchsia-300/60 sm:text-[8px]">
              CREDIT
            </p>
            <p className="mt-1 text-[9px] text-white/80 sm:text-[10px]">02</p>
          </motion.div>
        </div>

        <main className="relative z-[2] flex h-full w-full flex-col justify-start px-1 pt-16 pb-10 sm:px-2 sm:pt-20 lg:px-3 lg:pt-24">
          <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col gap-5 sm:gap-6 lg:gap-7">
            <motion.header
              className="flex w-full shrink-0 flex-col items-center gap-1 text-center sm:gap-2"
              custom={0.2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <div className="zero-g-a w-full">
                <CurvedRetroHero />
              </div>
            </motion.header>

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
                        className="zero-g-b flex w-full max-w-[280px] flex-col items-center gap-4 sm:max-w-[320px] sm:gap-5"
                      >
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
                                onClick={() => onSelectTheme(theme.id)}
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
                                {!theme.href && isSelected ? (
                                  <span className="mt-1 block text-[7px] normal-case tracking-wide text-amber-200/70 sm:text-[8px]">
                                    coming soon
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onMenuView("ship")}
                        className={[
                          "zero-g-c font-arcade flex flex-col items-center gap-2",
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

                      <div className="zero-g-a flex flex-col items-center gap-3 [animation-delay:-3.2s]">
                        <LavaButton
                          onClick={onStart}
                          disabled={!canStart}
                          className={
                            !canStart ? "cursor-not-allowed opacity-40" : ""
                          }
                        >
                          <span className="arcade-blink">Press Start</span>
                        </LavaButton>
                        <p className="font-arcade text-[7px] leading-relaxed text-purple-300/55 sm:text-[8px]">
                          {canStart
                            ? "INSERT SKILL TO CONTINUE"
                            : "MODE NOT READY YET"}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ship"
                      {...panelMotion}
                      className="flex w-full flex-col items-center gap-5"
                    >
                      <div className="zero-g-b flex w-full flex-col items-center gap-5">
                        <ShipStage shipId={shipId} onSelect={onSelectShip} />
                        <button
                          type="button"
                          onClick={() => onMenuView("mode")}
                          className={[
                            "font-arcade rounded-md border border-white/15 bg-black/30",
                            "px-5 py-2 text-[8px] tracking-wider text-purple-200/80 transition-colors sm:text-[9px]",
                            "hover:border-fuchsia-400/50 hover:text-fuchsia-100",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300",
                          ].join(" ")}
                        >
                          ◀ BACK
                        </button>
                      </div>
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
