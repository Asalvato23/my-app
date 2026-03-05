"use client";

import { useMemo, useState } from "react";
import SignalPill, { Signal } from "./SignalPill";
import Sparkline from "./Sparkline";
import WhyDrawer, { WhyData } from "./WhyDrawer";
import { useWatchlist } from "./WatchlistProvider";
import { useToast } from "./ToastProvider";

type Pick = {
  id: string;
  name: string;
  note: string;
  signal: Signal;
  confidence: number;
  spark: number[];
  why: WhyData;
};

export default function TopPicksList({ picks }: { picks: Pick[] }) {
  const { has, toggle } = useWatchlist();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<WhyData | null>(null);

  const sorted = useMemo(() => picks, [picks]);

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="text-sm text-white/60">Today</div>
            <div className="text-xl font-semibold text-white">Top picks</div>
          </div>

          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            Export
          </button>
        </div>

        <div className="divide-y divide-white/10">
          {sorted.map((p) => {
            const starred = has(p.id);
            return (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03]">
                <button
                  onClick={() => {
                    const res = toggle(p.id);
                    toast(res.added ? `Added ${p.name} to watchlist` : `Removed ${p.name}`);
                  }}
                  className={[
                    "h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-lg leading-none text-white/70 hover:bg-white/10",
                    starred ? "text-yellow-300" : "",
                  ].join(" ")}
                  aria-label={starred ? "Remove from watchlist" : "Add to watchlist"}
                  title={starred ? "Watchlisted" : "Add to watchlist"}
                >
                  {starred ? "★" : "☆"}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="truncate text-base font-semibold text-white">{p.name}</div>
                    <div className="hidden md:block">
                      <SignalPill signal={p.signal} />
                    </div>
                    <div className="hidden lg:flex items-center gap-2 text-xs text-white/50">
                      <span>Confidence</span>
                      <span className="font-semibold text-white/80">{p.confidence}%</span>
                    </div>
                  </div>
                  <div className="mt-1 truncate text-sm text-white/60">{p.note}</div>
                </div>

                <div className="hidden sm:block">
                  <Sparkline values={p.spark} />
                </div>

                <div className="flex items-center gap-3">
                  <div className="sm:hidden">
                    <SignalPill signal={p.signal} />
                  </div>

                  <button
                    onClick={() => {
                      setActive(p.why);
                      setOpen(true);
                    }}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Why?
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 text-xs text-white/40">
          Signals shown here are placeholders — next step is wiring real pricing data + scoring rules.
        </div>
      </div>

      <WhyDrawer open={open} onClose={() => setOpen(false)} data={active} />
    </>
  );
}