/**
 * ProductCard — displays a single product in a responsive grid card.
 * Links to /product/[slug].
 */

import Link from "next/link";
import PriceChangeBadge from "./PriceChangeBadge";
import { formatPrice, formatUnit } from "@/lib/format";

/**
 * @param {{ product: import("@/lib/types").Product }} props
 */
export default function ProductCard({ product }) {
  const { slug, nameBn, image, categoryNameBn, unit, today, change } = product;

  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      aria-label={`${nameBn} — আজকের দাম ৳${today}`}
    >
      {/* Emoji illustration */}
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-50 text-4xl">
        <span role="img" aria-hidden="true">
          {image}
        </span>
      </div>

      {/* Category pill */}
      {categoryNameBn && (
        <span className="mb-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
          {categoryNameBn}
        </span>
      )}

      {/* Product name */}
      <h3 className="mb-2 font-semibold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
        {nameBn}
      </h3>

      {/* Price row */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">আজকের দাম</p>
          <p className="text-lg font-bold text-slate-900">
            ৳{formatPrice(today)}
            <span className="ml-1 text-xs font-normal text-slate-400">
              /{formatUnit(unit)}
            </span>
          </p>
        </div>
        {change && (
          <PriceChangeBadge dir={change.dir} pct={change.pct} size="sm" />
        )}
      </div>
    </Link>
  );
}
