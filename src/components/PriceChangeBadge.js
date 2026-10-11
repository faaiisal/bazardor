/**
 * PriceChangeBadge — shows direction + percentage of a price change.
 * "up" → green, "down" → red, "flat" → slate.
 */

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatPct } from "@/lib/format";

/**
 * @param {{ dir: "up"|"down"|"flat", pct: number, size?: "sm"|"md" }} props
 */
export default function PriceChangeBadge({ dir, pct, size = "md" }) {
  const isUp = dir === "up";
  const isDown = dir === "down";

  const colorClass = isUp
    ? "bg-red-100 text-red-700 border-red-200"
    : isDown
    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : "bg-slate-100 text-slate-500 border-slate-200";

  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${
        size === "sm" ? "text-xs" : "text-sm"
      } ${colorClass}`}
      aria-label={`দাম ${isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"} ${formatPct(pct, dir)}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      <span>{formatPct(pct, dir)}</span>
    </span>
  );
}
