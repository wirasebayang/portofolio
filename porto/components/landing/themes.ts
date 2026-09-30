export const THEME_STORAGE_KEY = "porto-landing-theme";

export const THEMES = [
  { id: "professional", label: "Professional", href: "/professional" },
  { id: "unprofessional", label: "Unprofessional", href: null },
  { id: "dad", label: "Made by my dad", href: "/dad" },
  { id: "hardselling", label: "Hard Selling", href: null },
  { id: "lazy", label: "Lazy", href: "/lazy" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type ThemeDef = (typeof THEMES)[number];

/** Skins we actually restyle the landing for. Others fall back to arcade. */
export type LandingSkinId = "arcade" | "lazy" | "dad";

export function skinForTheme(id: ThemeId): LandingSkinId {
  if (id === "lazy") return "lazy";
  if (id === "dad") return "dad";
  return "arcade";
}

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
