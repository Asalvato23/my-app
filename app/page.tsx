"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TopPicksList from "./components/TopPicksList";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const signalCards = [
    {
      label: "BUY",
      subtitle: "Best value right now",
      value: "8 picks",
      accent: "from-emerald-400 to-cyan-400",
      ring: "ring-emerald-400/30",
      dot: "bg-emerald-400",
    },
    {
      label: "HOLD",
      subtitle: "Fair price / wait",
      value: "12 picks",
      accent: "from-sky-400 to-indigo-400",
      ring: "ring-sky-400/30",
      dot: "bg-sky-400",
    },
    {
      label: "AVOID",
      subtitle: "Overpriced today",
      value: "5 picks",
      accent: "from-fuchsia-400 to-rose-400",
      ring: "ring-fuchsia-400/30",
      dot: "bg-fuchsia-400",
    },
  ] as const;

  const categories = [
    { name: "GPUs", hint: "RTX / RX", tag: "Trending", glow: "hover:ring-emerald-400/25" },
    { name: "CPUs", hint: "Ryzen / Intel", tag: "Hot", glow: "hover:ring-sky-400/25" },
    { name: "RAM", hint: "DDR5", tag: "Stable", glow: "hover:ring-fuchsia-400/25" },
    { name: "Motherboards", hint: "AM5 / LGA", tag: "Watchlist", glow: "hover:ring-indigo-400/25" },
  ] as const;

  const picks = [
    {
      id: "rtx-5070",
      name: "RTX 5070",
      note: "Price dipped below 30-day avg",
      signal: "BUY",
      confidence: 82,
      spark: [699, 691, 688, 680, 672, 668, 664, 659],
      why: {
        id: "rtx-5070",
        name: "RTX 5070",
        signal: "BUY",
        confidence: 82,
        metrics: { priceNow: 659, avg30d: 690, vsTrendPct: -5.6, volatility: "Medium" },
        reasons: [
          "Price is meaningfully below 30D average (value entry).",
          "Downtrend is slowing — recent stabilization suggests better timing.",
          "Demand remains strong, but current pricing looks favorable vs trend.",
        ],
      },
    },
    {
      id: "ryzen-5-7600",
      name: "Ryzen 5 7600",
      note: "Best performance per dollar",
      signal: "BUY",
      confidence: 79,
      spark: [189, 185, 182, 179, 176, 178, 175, 172],
      why: {
        id: "ryzen-5-7600",
        name: "Ryzen 5 7600",
        signal: "BUY",
        confidence: 79,
        metrics: { priceNow: 172, avg30d: 184, vsTrendPct: -4.2, volatility: "Low" },
        reasons: [
          "Strong value vs competing CPUs in this tier.",
          "Price has drifted lower over the last month.",
          "Stable pricing suggests good buy timing.",
        ],
      },
    },
    {
      id: "ddr5-32gb-6000",
      name: "DDR5 32GB 6000",
      note: "Flat pricing, good bundles",
      signal: "HOLD",
      confidence: 63,
      spark: [122, 121, 119, 120, 121, 120, 121, 121],
      why: {
        id: "ddr5-32gb-6000",
        name: "DDR5 32GB 6000",
        signal: "HOLD",
        confidence: 63,
        metrics: { priceNow: 121, avg30d: 120, vsTrendPct: +0.8, volatility: "Low" },
        reasons: [
          "Pricing is stable — no strong edge to buying today.",
          "Bundles can be good, but baseline price hasn’t dipped.",
          "Waiting may improve value if promos pop up.",
        ],
      },
    },
    {
      id: "b650-wifi",
      name: "B650 WiFi",
      note: "Slightly elevated vs trendline",
      signal: "HOLD",
      confidence: 58,
      spark: [179, 182, 184, 186, 185, 187, 188, 186],
      why: {
        id: "b650-wifi",
        name: "B650 WiFi",
        signal: "HOLD",
        confidence: 58,
        metrics: { priceNow: 186, avg30d: 182, vsTrendPct: +1.9, volatility: "Medium" },
        reasons: [
          "Price is a bit above the recent average.",
          "Good boards exist at this tier — waiting could save money.",
          "No urgent catalyst suggesting buy-now value.",
        ],
      },
    },
    {
      id: "rtx-4090",
      name: "RTX 4090",
      note: "Premium inflated, low value",
      signal: "AVOID",
      confidence: 71,
      spark: [1899, 1940, 1999, 2050, 2080, 2140, 2199, 2299],
      why: {
        id: "rtx-4090",
        name: "RTX 4090",
        signal: "AVOID",
        confidence: 71,
        metrics: { priceNow: 2299, avg30d: 2040, vsTrendPct: +9.3, volatility: "High" },
        reasons: [
          "Price is significantly above the 30D average.",
          "Value-per-dollar is weak compared to alternatives.",
          "High volatility + premium pricing makes timing risky.",
        ],
      },
    },
  ] as const;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* subtle grid + glow */}
      <div className="pointer-events-none fixed inset-0 opacity-25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.20),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.16),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8">
        {/* NAV */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_30px_rgba(34,211,238,0.35)]" />
            <div>
              <div className="text-lg font-semibold tracking-tight">Hardware Market</div>
              <div className="text-xs text-white/60">Buy / Hold signals for PC parts</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/watchlist"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Watchlist
            </Link>

            <Link
              href="/insights"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Insights
            </Link>

            <Link
              href="/get-signals"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Get Signals
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="mt-10 grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Real-time <span className="text-white/70">buy/hold</span> signals for PC parts
                </h1>
                <p className="mt-2 text-white/60 max-w-2xl">
                  Track pricing momentum, value vs trend, and best picks across GPUs, CPUs, RAM, and motherboards.
                </p>
              </div>

              {/* Search (click + Enter) */}
              <div className="w-full md:w-[420px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const slug = slugify(query);
                    if (!slug) return;
                    router.push(`/parts/${slug}`);
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2"
                >
                  <div className="h-9 w-9 rounded-xl bg-white/5 grid place-items-center text-white/70">⌕</div>

                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent px-2 py-2 text-sm text-white/90 placeholder:text-white/40 outline-none"
                    placeholder="Search a part (ex: RTX 5070, Ryzen 7600)"
                  />

                  <button
                    type="submit"
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/15"
                  >
                    Search
                  </button>
                </form>

                <div className="mt-2 text-xs text-white/50">Tip: start with “RTX”, “Ryzen”, “DDR5”, “B650”, “Z790”</div>
              </div>
            </div>
          </div>

          {/* SIGNAL CARDS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {signalCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur ring-1 ${c.ring}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Signal</div>

                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    Live
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold tracking-tight">{c.label}</div>
                    <div className="mt-1 text-sm text-white/55">{c.subtitle}</div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-semibold bg-gradient-to-r ${c.accent} bg-clip-text text-transparent`}>
                      {c.value}
                    </div>
                    <div className="text-xs text-white/45">updated just now</div>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full w-2/3 bg-gradient-to-r ${c.accent}`} />
                </div>
              </div>
            ))}
          </div>

          {/* CATEGORIES + PANELS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {/* Categories */}
            <div className="md:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/60">Quick Filters</div>
                  <div className="text-xl font-semibold mt-1">Categories</div>
                </div>
                <button className="text-sm text-white/70 hover:text-white" type="button">
                  View all →
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    className={`group rounded-2xl border border-white/10 bg-black/30 p-4 text-left ring-1 ring-transparent ${cat.glow} hover:bg-black/40 transition`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{cat.name}</div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                        {cat.tag}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-white/55">{cat.hint}</div>
                    <div className="mt-3 text-xs text-white/60 group-hover:text-white/80">Open signals →</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Market Overview */}
            <div className="md:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/60">Market Overview</div>
                  <div className="text-xl font-semibold mt-1">Momentum + Value</div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10"
                  >
                    7D
                  </button>
                  <button type="button" className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white">
                    30D
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10"
                  >
                    90D
                  </button>
                </div>
              </div>

              {/* Fake chart placeholder */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Value vs Trendline</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent font-semibold">
                    +2.4% overall
                  </span>
                </div>

                <div className="mt-4 h-36 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_70%,rgba(34,211,238,0.25),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(244,114,182,0.20),transparent_45%)]" />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(90deg,rgba(34,211,238,0.0),rgba(34,211,238,0.22),rgba(244,114,182,0.22),rgba(244,114,182,0.0))] blur-[18px]" />
                  <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="self-end rounded-lg bg-white/10"
                        style={{ height: `${20 + (i % 5) * 14 + ((i * 3) % 18)}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-white/55">Best deals</div>
                    <div className="mt-1 font-semibold">GPUs</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-white/55">Most volatile</div>
                    <div className="mt-1 font-semibold">CPUs</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-white/55">Most stable</div>
                    <div className="mt-1 font-semibold">RAM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP PICKS */}
          <TopPicksList picks={picks as any} />

          <div className="mt-4 text-xs text-white/50">
            Signals shown here are placeholders — next step is wiring real pricing data + your scoring rules.
          </div>

          {/* FOOTER */}
          <footer className="pb-10 pt-2 text-center text-xs text-white/45">
            Built with Next.js • Tailwind • Your future “buy/hold” model
          </footer>
        </section>
      </div>
    </main>
  );
}