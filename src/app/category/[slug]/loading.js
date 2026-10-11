/**
 * Category page loading skeleton.
 */
import { ProductSkeletonGrid } from "@/components/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <div className="flex-1">
      {/* Category hero skeleton */}
      <div className="bg-gradient-to-r from-emerald-200 to-teal-200 animate-pulse">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/50" />
          <div>
            <div className="h-8 w-32 rounded-lg bg-white/50 mb-2" />
            <div className="h-4 w-24 rounded bg-white/40" />
          </div>
        </div>
      </div>
      {/* Products skeleton */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-9 w-44 animate-pulse rounded-lg bg-slate-200" />
        </div>
        <ProductSkeletonGrid count={8} />
      </div>
    </div>
  );
}
