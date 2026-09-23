import type { ReactNode } from "react";

export type ShipId = "viper" | "saucer" | "arrow" | "cruiser" | "scout";

export type ShipDef = {
  id: ShipId;
  name: string;
  /** SVG viewBox size */
  size: number;
};

export const SHIPS: ShipDef[] = [
  { id: "viper", name: "VIPER", size: 32 },
  { id: "saucer", name: "SAUCER", size: 32 },
  { id: "arrow", name: "ARROW", size: 32 },
  { id: "cruiser", name: "CRUISER", size: 32 },
  { id: "scout", name: "SCOUT", size: 32 },
];

export const DEFAULT_SHIP: ShipId = "viper";
export const SHIP_STORAGE_KEY = "porto-selected-ship";

export function isShipId(value: string): value is ShipId {
  return SHIPS.some((s) => s.id === value);
}

/** Retro pixel-ish ships — nose points up (cursor “flies” forward). */
export function ShipSprite({
  id,
  className = "",
  title,
}: {
  id: ShipId;
  className?: string;
  title?: string;
}): ReactNode {
  const common = {
    className,
    viewBox: "0 0 32 32",
    width: 32,
    height: 32,
    "aria-hidden": title ? undefined : true,
    role: title ? ("img" as const) : undefined,
    "aria-label": title,
  };

  switch (id) {
    case "viper":
      return (
        <svg {...common}>
          <path fill="#7e22ce" d="M14 2h4v2h2v2h2v4h2v6h-2v4h-2v4h-2v2h-4v-2h-2v-4h-2v-4H8v-6h2V6h2V4h2V2z" />
          <path fill="#e879f9" d="M14 4h4v2h-4V4zm-2 6h8v2h-8v-2z" />
          <path fill="#f5d0fe" d="M15 8h2v6h-2V8z" />
          <path fill="#c026d3" d="M10 20h2v4h-2v-4zm10 0h2v4h-2v-4z" />
          <path fill="#fef08a" d="M14 28h4v2h-4v-2z" />
        </svg>
      );
    case "saucer":
      return (
        <svg {...common}>
          <path fill="#6b21a8" d="M8 14h16v4H8v-4z" />
          <path fill="#c755f7" d="M4 16h24v2H4v-2z" />
          <path fill="#e879f9" d="M10 12h12v2H10v-2z" />
          <path fill="#f5d0fe" d="M12 8h8v4h-8V8z" />
          <path fill="#a78bfa" d="M14 6h4v2h-4V6z" />
          <path fill="#fef08a" d="M14 18h4v2h-4v-2z" />
          <path fill="#7e22ce" d="M6 18h2v2H6v-2zm18 0h2v2h-2v-2z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path fill="#86198f" d="M15 2h2v4h2v4h2v4h2v6h-2v4h-2v4h-2v2h-2v-2h-2v-4h-2v-4H9v-6h2v-4h2V6h2V2z" />
          <path fill="#f0abfc" d="M15 6h2v10h-2V6z" />
          <path fill="#c755f7" d="M11 14h10v2H11v-2z" />
          <path fill="#fef08a" d="M14 26h4v2h-4v-2z" />
        </svg>
      );
    case "cruiser":
      return (
        <svg {...common}>
          <path fill="#581c87" d="M6 10h20v12H6V10z" />
          <path fill="#a855f7" d="M10 6h12v4H10V6zm-2 4h16v2H8v-2z" />
          <path fill="#e879f9" d="M12 4h8v2h-8V4z" />
          <path fill="#f5d0fe" d="M14 8h4v6h-4V8z" />
          <path fill="#7e22ce" d="M4 14h2v6H4v-6zm22 0h2v6h-2v-6z" />
          <path fill="#c026d3" d="M8 22h4v4H8v-4zm12 0h4v4h-4v-4z" />
          <path fill="#fef08a" d="M14 20h4v2h-4v-2z" />
        </svg>
      );
    case "scout":
      return (
        <svg {...common}>
          <path fill="#6b21a8" d="M14 4h4v2h4v4h2v8h-2v4h-4v2h-4v-2H8v-4H6v-8h2V6h4V4z" />
          <path fill="#d946ef" d="M14 6h4v2h-4V6z" />
          <path fill="#f0abfc" d="M12 10h8v4h-8v-4z" />
          <path fill="#fef08a" d="M14 12h4v2h-4v-2z" />
          <path fill="#c755f7" d="M8 18h2v4H8v-4zm14 0h2v4h-2v-4z" />
        </svg>
      );
    default:
      return null;
  }
}
