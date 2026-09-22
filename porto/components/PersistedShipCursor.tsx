"use client";

import { useEffect, useState } from "react";
import ShipCursor from "@/components/ShipCursor";
import {
  DEFAULT_SHIP,
  SHIP_STORAGE_KEY,
  isShipId,
  type ShipId,
} from "@/components/ships";

/** Ship cursor using the selection saved from the arcade menu. */
export default function PersistedShipCursor() {
  const [shipId, setShipId] = useState<ShipId>(DEFAULT_SHIP);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SHIP_STORAGE_KEY);
      if (saved && isShipId(saved)) setShipId(saved);
    } catch {
      /* ignore */
    }
  }, []);

  return <ShipCursor shipId={shipId} />;
}
