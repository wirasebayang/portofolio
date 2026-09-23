"use client";

import { useEffect, useState } from "react";
import { formatVisitCount } from "@/lib/visitors";

/** Survives React Strict Mode double-mount in the same page load. */
let visitRequestStarted = false;

/**
 * Arcade HUD visitor counter — POST once (cookie dedupe on server),
 * then display zero-padded total.
 */
export default function VisitorCounter() {
  const [label, setLabel] = useState("------");

  useEffect(() => {
    let cancelled = false;
    const method = visitRequestStarted ? "GET" : "POST";
    visitRequestStarted = true;

    async function load() {
      try {
        const res = await fetch("/api/visitors", { method });
        const json = (await res.json()) as { count?: number };
        if (!cancelled) {
          setLabel(formatVisitCount(Number(json.count ?? 0)));
        }
      } catch {
        if (!cancelled) setLabel("000000");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <p className="text-[7px] leading-relaxed text-fuchsia-300/60 sm:text-[8px]">
        VISITS
      </p>
      <p className="mt-1 text-[9px] text-white/80 sm:text-[10px] tabular-nums">
        {label}
      </p>
    </>
  );
}
