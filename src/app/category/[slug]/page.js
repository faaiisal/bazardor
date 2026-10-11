/**
 * Category page — /category/[slug]
 * Shows all products in a category with sorting support.
 * Params is a Promise in Next.js 16 — must be awaited.
 */
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import SortDropdown from "@/components/SortDropdown";
import { ProductSkeletonGrid } from "@/components/ProductSkeleton";
import { getProducts, getCategoryBySlug, sortByPrice } from "@/lib/api";
import { formatCount } from "@/lib/format";
import { Suspense } from "react";

/**
 * Generate metadata for the category page.
 * @param {{ params: Promise<{slug: string}> }} args
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "বিভাগ পাওয়া যায়নি" };
  return {
    title: `${category.nameBn} — বাজার দর`,
    description: `${category.nameBn} বিভাগের সকল পণ্যের আজকের বাজার দর।`,
  };
}

/**
 * @param {{ params: Promise<{slug: string}>, searchParams: Promise<{sort?: string}> }} props
 */
export default async function CategoryPage({ params, searchParams }) {
  // Next.js 16: both params and searchParams are Promises
  const { slug } = await params;
  const { sort } = await searchParams;

  // Validate category
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  // Fetch products
  let products = [];
  let error = null;
  try {
    products = await getProducts(slug);
  } catch (err) {
    error = err.message ?? "পণ্য লোড করতে সমস্যা হয়েছে।";
  }

  // Sort (numeric, not lexicographic)
  let sorted = [...products];
  if (sort === "price-asc") {
    sorted = sortByPrice(products, "asc");
  } else if (sort === "price-desc") {
    sorted = sortByPrice(products, "desc");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Category hero */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl backdrop-blur-sm">
                <span role="img" aria-label={category.nameBn}>
                  {category.icon}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {category.nameBn}
                </h1>
                {!error && (
                  <p className="mt-1 text-emerald-100 text-sm">
                    {formatCount(sorted.length)} টি পণ্য পাওয়া গেছে
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="font-semibold text-slate-700">
              {category.nameBn} — সকল পণ্য
            </h2>
            <Suspense fallback={null}>
              <SortDropdown />
            </Suspense>
          </div>

          {error ? (
            <ErrorState message={error} showHomeLink />
          ) : sorted.length === 0 ? (
            <EmptyState
              title="এই বিভাগে কোনো পণ্য নেই"
              description={`${category.nameBn} বিভাগে এখন কোনো পণ্য পাওয়া যাচ্ছে না।`}
              showHomeLink
            />
          ) : (
            <ProductGrid products={sorted} />
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
