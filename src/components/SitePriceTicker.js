import PriceTicker from "@/components/PriceTicker";
import { getProducts } from "@/lib/api";

export default async function SitePriceTicker() {
  let products;
  let unavailable = false;
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products for the price ticker:", error);
    unavailable = true;
  }

  if (unavailable) {
    return (
      <p
        className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800"
        role="status"
      >
        বাজারদরের তালিকা এখন লোড করা যাচ্ছে না।
      </p>
    );
  }
  return <PriceTicker products={products} />;
}
