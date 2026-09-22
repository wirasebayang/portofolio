"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { SHIPS, ShipSprite, type ShipId } from "@/components/ships";

type ShipStageProps = {
  /** Committed ship (cursor / storage). */
  shipId: ShipId;
  onSelect: (id: ShipId) => void;
};

const spring = { type: "spring" as const, stiffness: 120, damping: 18 };

/** Shortest signed steps on a ring: … -2,-1,0,1,2 … */
function ringOffset(index: number, focused: number, count: number) {
  let diff = index - focused;
  const half = count / 2;
  if (diff > half) diff -= count;
  if (diff < -half - Number.EPSILON) diff += count;
  return diff;
}

/**
 * Circular stage: arrows browse only; SELECT commits the focused ship.
 */
export default function ShipStage({ shipId, onSelect }: ShipStageProps) {
  const count = SHIPS.length;
  const step = 360 / count;

  const committedIndex = useMemo(() => {
    const i = SHIPS.findIndex((s) => s.id === shipId);
    return i >= 0 ? i : 0;
  }, [shipId]);

  const [focusIndex, setFocusIndex] = useState(committedIndex);

  useEffect(() => {
    setFocusIndex(committedIndex);
  }, [committedIndex]);

  const focused = SHIPS[focusIndex];
  const isPending = focused.id !== shipId;

  const browse = (dir: -1 | 1) => {
    setFocusIndex((i) => (i + dir + count) % count);
  };

  const browseTo = (index: number) => {
    setFocusIndex(index);
  };

  const confirm = () => {
    onSelect(focused.id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusIndex((i) => (i - 1 + count) % count);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusIndex((i) => (i + 1) % count);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const pending = SHIPS[focusIndex];
        if (pending) onSelect(pending.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, focusIndex, shipId, onSelect]);

  const btnBase = [
    "font-arcade z-10 shrink-0 rounded-md border border-white/20 bg-black/40",
    "text-fuchsia-200 transition-colors",
    "hover:border-fuchsia-400/60 hover:bg-fuchsia-500/15 hover:text-white",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300",
  ].join(" ");

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="font-arcade h-4 text-[8px] tracking-wider text-fuchsia-300/80 sm:h-5 sm:text-[10px]">
        SELECT SHIP
      </p>

      <div className="flex w-full flex-col items-center gap-4">
        <div
          className="relative h-[240px] w-full max-w-[300px] sm:h-[280px] sm:max-w-[380px] md:h-[300px] md:max-w-[420px]"
          style={{ perspective: "1100px" }}
        >
          <div
            className="pointer-events-none absolute inset-x-[15%] bottom-3 h-8 rounded-[100%] bg-fuchsia-500/20 blur-xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-[20%] bottom-4 h-[2px] rounded-full bg-fuchsia-300/25"
            aria-hidden
          />

          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SHIPS.map((ship, index) => {
              const rel = ringOffset(index, focusIndex, count);
              const angle = rel * step;
              const dist = Math.abs(rel);
              const isFront = dist < 0.001;
              const isNeighbor = dist === 1;

              return (
                <div
                  key={ship.id}
                  className="absolute top-1/2 left-1/2"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: angle }}
                    transition={spring}
                  >
                    <div
                      style={{
                        transform: "translateZ(175px)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <motion.div
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{ rotateY: -angle }}
                        transition={spring}
                        className="-translate-x-1/2 -translate-y-1/2"
                      >
                        <button
                          type="button"
                          title={ship.name}
                          aria-label={`Preview ${ship.name}`}
                          aria-pressed={isFront}
                          tabIndex={isFront ? 0 : -1}
                          onClick={() => {
                            if (!isFront) browseTo(index);
                          }}
                          className={[
                            "flex flex-col items-center gap-3 rounded-lg border px-6 py-5 sm:px-8 sm:py-6",
                            "transition-[box-shadow,border-color,filter,opacity,transform] duration-300",
                            isFront
                              ? "border-fuchsia-300/90 bg-fuchsia-500/20 shadow-[0_0_28px_rgba(199,85,247,0.5)]"
                              : "border-white/10 bg-black/30",
                            isNeighbor
                              ? "pointer-events-auto"
                              : "pointer-events-none",
                          ].join(" ")}
                          style={{
                            transform: isFront
                              ? "scale(1.25)"
                              : isNeighbor
                                ? "scale(0.9)"
                                : "scale(0.65)",
                            filter: isFront
                              ? "blur(0px) brightness(1.1)"
                              : isNeighbor
                                ? "blur(2.5px) brightness(0.75)"
                                : "blur(5px) brightness(0.45)",
                            opacity: isFront ? 1 : isNeighbor ? 0.72 : 0.35,
                            zIndex: isFront ? 3 : isNeighbor ? 2 : 1,
                          }}
                        >
                          <ShipSprite
                            id={ship.id}
                            title={ship.name}
                            className={
                              isFront
                                ? "h-16 w-16 sm:h-20 sm:w-20"
                                : "h-12 w-12 sm:h-14 sm:w-14"
                            }
                          />
                          {isFront && (
                            <span className="font-arcade text-[8px] text-fuchsia-100 sm:text-[10px]">
                              {ship.name}
                            </span>
                          )}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full max-w-[300px] items-center justify-center gap-3 sm:max-w-[380px] sm:gap-4 md:max-w-[420px]">
          <button
            type="button"
            aria-label="Previous ship"
            onClick={() => browse(-1)}
            className={[btnBase, "px-4 py-3 text-xs sm:px-5 sm:text-sm"].join(
              " ",
            )}
          >
            ◀
          </button>

          <button
            type="button"
            aria-label={
              isPending ? `Select ${focused.name}` : `Confirm ${focused.name}`
            }
            onClick={confirm}
            className={[
              btnBase,
              "min-w-[7.5rem] px-5 py-3 text-[9px] tracking-wider sm:min-w-[9rem] sm:text-[10px]",
              isPending
                ? "border-fuchsia-400/70 bg-fuchsia-500/25 text-white shadow-[0_0_18px_rgba(199,85,247,0.35)]"
                : "border-fuchsia-300/40 bg-fuchsia-500/10 text-fuchsia-100",
            ].join(" ")}
          >
            {isPending ? "SELECT" : "DONE"}
          </button>

          <button
            type="button"
            aria-label="Next ship"
            onClick={() => browse(1)}
            className={[btnBase, "px-4 py-3 text-xs sm:px-5 sm:text-sm"].join(
              " ",
            )}
          >
            ▶
          </button>
        </div>

        <p className="font-arcade text-[8px] tracking-wider text-purple-200/60 sm:text-[10px]">
          {focused.name}
          {isPending ? " · READY" : ""}
        </p>
      </div>
    </div>
  );
}
