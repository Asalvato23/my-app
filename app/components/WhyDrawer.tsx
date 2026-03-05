"use client";

import { useEffect } from "react";
import SignalPill, { Signal } from "./SignalPill";

export type WhyData = {
  id: string;
  name: string;
  signal: Signal;
  confidence: number;
  metrics: {
    priceNow: number;
    avg30d: number;
    vsTrendPct: number;
    volatility: "Low" | "Medium" | "High";
  };
  reasons: string[];
};

export default function WhyDrawer({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: WhyData | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">Why this signal</div>
            <div className="mt-1 text-xl font-semibold text-white">{data.name}</div>
            <div className="mt-2 flex items-center gap-2">
              <SignalPill signal={data.signal} />
              <span className="text-sm text-white/60">Confidence</span>
              <span className="text-sm font-semibold text-white">{data.confidence}%</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Metric label="Price now" value={`$${data.metrics.priceNow.toFixed(0)}`} />
          <Metric label="30D avg" value={`$${data.metrics.avg30d.toFixed(0)}`} />
          <Metric label="Vs trend" value={`${data.metrics.vsTrendPct.toFixed(1)}%`} />
          <Metric label="Volatility" value={data.metrics.volatility} />
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-white">Key reasons</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {data.reasons.map((r, i) => (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-xs text-white/40">
          (These are placeholders until we wire real pricing + scoring rules.)
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}