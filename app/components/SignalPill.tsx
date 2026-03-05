"use client";

export type Signal = "BUY" | "HOLD" | "AVOID";

export default function SignalPill({ signal }: { signal: Signal }) {
  const styles =
    signal === "BUY"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 shadow-[0_0_0_1px_rgba(52,211,153,0.18)]"
      : signal === "HOLD"
      ? "border-sky-400/30 bg-sky-400/10 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.18)]"
      : "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200 shadow-[0_0_0_1px_rgba(232,121,249,0.18)]";

  const icon = signal === "BUY" ? "↗" : signal === "HOLD" ? "→" : "↘";

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        styles,
      ].join(" ")}
      title={signal}
    >
      <span className="opacity-90">{icon}</span>
      {signal}
    </span>
  );
}