/**
 * ProductSkeleton — loading placeholder for a product card.
 * Matches the ProductCard layout.
 */
export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm animate-pulse">
      <div className="mb-3 h-16 w-16 rounded-xl bg-slate-100" />
      <div className="mb-1 h-4 w-16 rounded-full bg-slate-100" />
      <div className="mb-2 h-5 w-3/4 rounded bg-slate-100" />
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="mb-1 h-3 w-16 rounded bg-slate-100" />
          <div className="h-6 w-24 rounded bg-slate-100" />
        </div>
        <div className="h-5 w-14 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

/**
 * ProductSkeletonGrid — renders `count` skeleton cards in a responsive grid.
 * @param {{ count?: number }} props
 */
export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
