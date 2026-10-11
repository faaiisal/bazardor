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
  try {
    categories = await getCategories();
  } catch {
    // Header still renders without categories on API failure
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Row 1: Brand + Date + Auth */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded-sm"
          >
            <span aria-hidden="true" className="text-2xl">🛒</span>
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
      </div>
    </header>
  );
}
