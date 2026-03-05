"use client";

import { useEffect, useMemo, useState } from "react";

function formatRelative(msAgo: number) {
  const s = Math.max(0, Math.floor(msAgo / 1000));
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export default function LiveBadge({
  lastUpdatedAt,
  label = "Live",
}: {
  lastUpdatedAt: number; // Date.now()
  label?: string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(id);
  }, []);

  const text = useMemo(() => formatRelative(now - lastUpdatedAt), [now, lastUpdatedAt]);

  return (
    <div className="flex items-center gap-2 text-xs text-white/70">
      <span className="relative inline-flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-medium text-white/80">{label}</span>
      <span className="text-white/50">• updated {text}</span>
    </div>
  );
}<LiveBadge lastUpdatedAt={Date.now()} />