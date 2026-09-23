"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ArcadeLandingSkin from "@/components/landing/ArcadeLandingSkin";
import LazyLandingSkin from "@/components/landing/LazyLandingSkin";
import {
  THEME_STORAGE_KEY,
  getTheme,
  isThemeId,
  skinForTheme,
  type ThemeId,
} from "@/components/landing/themes";
import { useIrisNavigate } from "@/components/IrisTransition";
import {
  DEFAULT_SHIP,
  SHIP_STORAGE_KEY,
  isShipId,
  type ShipId,
} from "@/components/ships";

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

type MenuView = "mode" | "ship";

type ProfessionalLandingProps = {
  /** Notify parent so background (warp) can follow the skin. */
  onThemeChange?: (theme: ThemeId) => void;
};

export default function ProfessionalLanding({
  onThemeChange,
}: ProfessionalLandingProps) {
  const { irisTo } = useIrisNavigate();
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(readStoredTheme);
  const [shipId, setShipId] = useState<ShipId>(DEFAULT_SHIP);
  const [menuView, setMenuView] = useState<MenuView>("mode");

  const selected = getTheme(selectedTheme);
  const canStart = Boolean(selected.href);
  const skin = skinForTheme(selectedTheme);

  useEffect(() => {
    try {
      const savedShip = localStorage.getItem(SHIP_STORAGE_KEY);
      if (savedShip && isShipId(savedShip)) setShipId(savedShip);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    onThemeChange?.(selectedTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    } catch {
      /* ignore */
    }
  }, [selectedTheme, onThemeChange]);

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

  // Leaving lazy skin? reset ship submenu so arcade opens clean
  useEffect(() => {
    if (skin !== "arcade") setMenuView("mode");
  }, [skin]);

  const selectTheme = (id: ThemeId) => {
    setSelectedTheme(id);
  };

  const pressStart = () => {
    if (selected.href) irisTo(selected.href);
  };

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
    <AnimatePresence mode="wait">
      {skin === "lazy" ? (
        <motion.div
          key="lazy-skin"
          className="h-dvh w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <LazyLandingSkin
            selectedTheme={selectedTheme}
            onSelectTheme={selectTheme}
            canStart={canStart}
            onStart={pressStart}
          />
        </motion.div>
      ) : (
        <motion.div
          key="arcade-skin"
          className="h-dvh w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <ArcadeLandingSkin
            selectedTheme={selectedTheme}
            onSelectTheme={selectTheme}
            canStart={canStart}
            onStart={pressStart}
            shipId={shipId}
            menuView={menuView}
            onMenuView={setMenuView}
            onSelectShip={selectShip}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
