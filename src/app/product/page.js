import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getProducts } from "@/lib/api";
import { formatCount } from "@/lib/format";

export const metadata = {
  title: "সব পণ্য",
  description: "বাজার দর অ্যাপে থাকা সকল পণ্যের বাজারদর একসাথে দেখুন।",
};

export default async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    products = await getProducts();
  } catch (err) {
    console.error("Failed to load the product catalog:", err);
    error = "পণ্যের তালিকা এখন লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।";
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">সব পণ্য</h1>
          <p className="mt-1 text-sm text-slate-500">
            প্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।
          </p>
        </div>
        {!error && (
          <p className="text-sm text-slate-500">
            {formatCount(products.length)} টি পণ্য
          </p>
        )}
      </div>

      {error ? (
        <ErrorState message={error} showHomeLink />
      ) : products.length === 0 ? (
        <EmptyState showHomeLink />
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
