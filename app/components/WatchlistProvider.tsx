"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadWatchlist, saveWatchlist } from "../lib/watchlist";
type WatchlistCtxValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => { added: boolean };
  count: number;
};

const WatchlistCtx = createContext<WatchlistCtxValue | null>(null);

export function useWatchlist() {
  const ctx = useContext(WatchlistCtx);
  if (!ctx) throw new Error("useWatchlist must be used inside <WatchlistProvider />");
  return ctx;
}

export default function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(loadWatchlist());
  }, []);

  useEffect(() => {
    saveWatchlist(ids);
  }, [ids]);

  const value = useMemo<WatchlistCtxValue>(() => {
    return {
      ids,
      count: ids.length,
      has: (id) => ids.includes(id),
      toggle: (id) => {
        let added = false;
        setIds((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id);
          added = true;
          return [...prev, id];
        });
        return { added };
      },
    };
  }, [ids]);

  return <WatchlistCtx.Provider value={value}>{children}</WatchlistCtx.Provider>;
}