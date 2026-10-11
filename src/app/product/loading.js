import { ProductSkeletonGrid } from "@/components/ProductSkeleton";

export default function ProductCatalogLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 h-7 w-40 animate-pulse rounded bg-slate-200" />
      <ProductSkeletonGrid count={8} />
    </main>
  );
}
