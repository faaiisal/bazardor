/**
 * Homepage — BazarDor
 * Server component: fetches all products + categories, renders sections.
 */
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import PriceChangeBadge from "@/components/PriceChangeBadge";
import ProductCard from "@/components/ProductCard";
import { getProducts, getRisers, getFallers } from "@/lib/api";
import { formatCount } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown, ShoppingCart, ArrowDown } from "lucide-react";

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম",
  description:
    "বাংলাদেশের বাজারের প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।",
};

export default async function HomePage() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (err) {
    error = err.message ?? "API থেকে তথ্য আনতে সমস্যা হয়েছে।";
  }

  const risers = products.length > 0 ? getRisers(products, 6) : [];
  const fallers = products.length > 0 ? getFallers(products, 6) : [];

  return (
      <main className="flex-1">
        {/* ========================================================
            Hero Section
        ======================================================== */}
        <section className="bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-10 lg:py-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
              {/* Text block */}
              <div className="flex-1 text-slate-800">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800">
                  <ShoppingCart size={14} aria-hidden="true" />
                  বাংলাদেশের বাজার দর
                </p>
                <h1 className="mb-4 text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
                  প্রয়োজনীয় পণ্যের দাম{" "}
                  <span className="text-emerald-700">এক নজরে</span>
                </h1>
                <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-600">
                  চাল, ডাল, তেল, সবজি, মাছ, মাংস সহ সকল প্রয়োজনীয় পণ্যের আজকের
                  বাজার দর জানুন। বিভিন্ন বাজারের তুলনামূলক মূল্য এক জায়গায়।
                </p>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <ArrowDown size={16} aria-hidden="true" />
                  সব পণ্য দেখুন
                </Link>
              </div>

              {/* Hero illustration */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative flex h-48 w-48 items-center justify-center sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                  <Image
                    src="/bazar-hero.svg"
                    alt="তাজা বাজারের পণ্যভর্তি একটি বাজারের ঝুড়ি"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 288px"
                    className="object-contain p-2"
                  />
                  {/* Floating price badges */}
                  <div className="absolute -top-1 right-0 rounded-xl bg-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-900 shadow-sm">
                    আজকের দাম
                  </div>
                  {products.length > 0 && (
                    <div className="absolute -bottom-1 left-0 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-sm">
                      {formatCount(products.length)} পণ্য
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error state — shown only when API fails */}
        {error && (
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <ErrorState message={error} showHomeLink={false} />
          </div>
        )}

        {/* ========================================================
            Price Risers Section
        ======================================================== */}
        {risers.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                <TrendingUp className="text-red-600" size={20} aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                আজ দাম বেড়েছে ▲
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            Price Fallers Section
        ======================================================== */}
        {fallers.length > 0 && (
          <section className="bg-white mx-auto max-w-6xl px-4 py-10 sm:px-6 rounded-2xl my-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <TrendingDown className="text-emerald-600" size={20} aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                আজ দাম কমেছে ▼
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            All Products Section
        ======================================================== */}
        <section id="সব-পণ্য" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">সব পণ্য</h2>
            <span className="text-sm text-slate-400">
              {products.length} টি পণ্য
            </span>
          </div>

          {error ? (
            <ErrorState showHomeLink={false} />
          ) : products.length === 0 ? (
            <EmptyState />
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </main>
  );
}
