/**
 * SiteHeader — server component.
 * Fetches categories from the API and renders the two-row header.
 * Auth state is handled by the AuthNav client sub-component.
 */
import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import CategoryNavigation from "./CategoryNavigation";
import AuthNav from "./AuthNav";
import BengaliDate from "./BengaliDate";

export default async function SiteHeader() {
  let categories = [];
  let categoriesUnavailable = false;
  try {
    categories = await getCategories();
  } catch (error) {
    categoriesUnavailable = true;
    console.error("Failed to load categories for site navigation:", error);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Row 1: Brand + Date + Auth */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm text-xl font-bold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white shadow-sm"
            >
              🛒
            </span>
            <span>বাজার দর</span>
          </Link>

          {/* Date (hidden on very small screens) */}
          <Suspense
            fallback={
              <p
                className="hidden h-4 flex-1 text-center text-xs text-slate-400 sm:block"
                aria-hidden="true"
              />
            }
          >
            <BengaliDate />
          </Suspense>

          {/* Auth nav */}
          <AuthNav />
        </div>

        {/* Row 2: Category navigation */}
        {categories.length > 0 && (
          <div className="pb-3">
            <CategoryNavigation categories={categories} />
          </div>
        )}
        {categoriesUnavailable && (
          <p className="pb-2 text-xs text-amber-700" role="status">
            বিভাগগুলো এখন লোড করা যাচ্ছে না।
          </p>
        )}
      </div>
    </header>
  );
}
