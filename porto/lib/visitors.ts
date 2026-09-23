export const VISITOR_COUNT_KEY = "porto:visits";

/** Cookie: one unique visit per browser for 1 year. */
export const VISITOR_COOKIE = "porto_visited";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function formatVisitCount(n: number): string {
  const safe = Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  return String(safe).padStart(6, "0");
}
