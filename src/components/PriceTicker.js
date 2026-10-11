"use client";

/**
 * PriceTicker — horizontally scrolling live price strip.
 *
 * Items are duplicated to create a seamless infinite loop.
 * Respects prefers-reduced-motion by pausing the animation.
 *
 * @param {{ products: Array }} props
 */
import { formatPrice, formatUnit, formatPct } from "@/lib/format";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TickerItem({ product }) {
  const { nameBn, image, today, unit, change } = product;
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  const colorClass = isUp
    ? "text-emerald-400"
    : isDown
    ? "text-red-400"
    : "text-slate-400";

  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;

  return (
    <span className="flex items-center gap-2 px-6 py-1 shrink-0 select-none">
      <span aria-hidden="true" className="text-base">
        {image}
      </span>
      <span className="text-slate-200 text-sm font-medium">{nameBn}</span>
      <span className="text-white font-bold text-sm">
        ৳{formatPrice(today)}
        <span className="text-slate-400 font-normal text-xs ml-0.5">
          /{formatUnit(unit)}
        </span>
      </span>
      {change && (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${colorClass}`}>
          <Icon size={12} aria-hidden="true" />
          {formatPct(change.pct, change.dir)}
        </span>
      )}
      {/* Separator */}
      <span className="text-slate-600 ml-2" aria-hidden="true">•</span>
    </span>
  );
}

export default function PriceTicker({ products }) {
  if (!products || products.length === 0) return null;

  // Duplicate for seamless loop
  const doubled = [...products, ...products];

  return (
    <div
      className="bg-slate-900 border-b border-slate-800 overflow-hidden"
      role="marquee"
      aria-label="আজকের বাজার দর"
    >
      <div className="flex items-center h-10 ticker-track motion-safe:animate-ticker">
        {doubled.map((product, i) => (
          <TickerItem key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </div>
  );
}
