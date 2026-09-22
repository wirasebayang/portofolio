"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  techCategories,
  technologies,
  type TechCategory,
  type TechItem,
} from "@/lib/professional-content";

function TechIcon({ item }: { item: TechItem }) {
  const [failed, setFailed] = useState(false);
  const src = `https://cdn.simpleicons.org/${item.icon}`;

  if (failed) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-fuchsia-500/15 font-mono text-[10px] font-semibold text-fuchsia-300">
        {item.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={40}
      height={40}
      className="h-10 w-10 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/** ~2 full rows on xl (6 cols); 3rd row peeks under the blur */
const COLLAPSE_MIN = 12;

export default function TechIndex() {
  const [active, setActive] = useState<TechCategory>("All");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    if (active === "All") return technologies;
    return technologies.filter((t) => t.category === active);
  }, [active]);

  const needsCollapse = !expanded && filtered.length > COLLAPSE_MIN;

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
            03 — Stack
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The tools behind{" "}
            <span className="text-fuchsia-400">the work.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            From the interface to the database, these are the technologies I
            use across my projects.
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
          {technologies.length} technologies
        </p>
      </div>

      <div className="mt-10">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
          Tech index
        </p>
        <div
          role="tablist"
          aria-label="Filter technologies"
          className="mt-4 flex flex-wrap gap-2"
        >
          {techCategories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={[
                  "rounded-full border px-3.5 py-2 font-mono text-[9px] tracking-wider uppercase transition-colors sm:text-[10px]",
                  isActive
                    ? "border-fuchsia-500 bg-fuchsia-500 text-white"
                    : "border-white/12 bg-white/[0.03] text-white/55 hover:border-fuchsia-400/40 hover:text-white",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10">
        <div
          className={
            needsCollapse ? "max-h-[22.5rem] overflow-hidden sm:max-h-[24rem]" : ""
          }
        >
          <motion.ul
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.li
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-white/8 bg-[#121018] px-3 py-5 text-center"
                >
                  <TechIcon item={item} />
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 font-mono text-[8px] tracking-wider text-white/35 uppercase">
                      {item.category}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        {needsCollapse && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-36 flex-col items-center justify-end pb-2 sm:h-40">
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08060c]/55 to-[#08060c] backdrop-blur-[2px]"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="pointer-events-auto relative z-10 rounded-full border border-fuchsia-400/50 bg-fuchsia-500/90 px-5 py-2.5 font-mono text-[10px] tracking-wider text-white uppercase transition-colors hover:bg-fuchsia-400"
            >
              Show all · {filtered.length}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
