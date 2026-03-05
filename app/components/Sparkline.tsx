"use client";

import { useMemo } from "react";

function toPath(values: number[], w: number, h: number) {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return [x, y] as const;
  });

  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
}

export default function Sparkline({
  values,
  width = 120,
  height = 28,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  const d = useMemo(() => toPath(values, width, height), [values, width, height]);
  const trendUp = values.length >= 2 ? values[values.length - 1] >= values[0] : true;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="opacity-90">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={trendUp ? "text-emerald-300/80" : "text-rose-300/80"}
      />
    </svg>
  );
}