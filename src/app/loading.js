/**
 * Homepage loading skeleton.
 */
import { ProductSkeletonGrid } from "@/components/ProductSkeleton";

export default function HomeLoading() {
  return (
    <div className="flex-1">
      {/* Hero skeleton */}
      <div className="h-64 animate-pulse bg-gradient-to-br from-emerald-200 to-teal-200 sm:h-80" />

      {/* Sections */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
        {/* Section header skeleton */}
        <div>
          <div className="mb-6 h-7 w-52 animate-pulse rounded-lg bg-slate-200" />
          <ProductSkeletonGrid count={6} />
        </div>
        <div>
          <div className="mb-6 h-7 w-52 animate-pulse rounded-lg bg-slate-200" />
          <ProductSkeletonGrid count={8} />
        </div>
      </div>
    </div>
  );
}
