export const WATCHLIST_KEY = "hardwaremarket_watchlist_v1";

export function loadWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WATCHLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(ids));
}