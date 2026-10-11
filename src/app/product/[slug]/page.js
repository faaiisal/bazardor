import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, formatUnit, formatPct } from "@/lib/format";
import PriceChangeBadge from "@/components/PriceChangeBadge";
import { auth } from "@/lib/auth";
import { safeReturnTo } from "@/lib/redirect";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "পণ্য পাওয়া যায়নি" };
  return {
    title: `${product.nameBn} — বাজার দর`,
    description: `${product.nameBn} এর বাজারভিত্তিক দাম ও মূল্য পরিবর্তন দেখুন।`,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const returnTo = safeReturnTo(`/product/${slug}`, "/");
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirectTo=${encodeURIComponent(returnTo)}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const markets = Array.isArray(product.markets) ? product.markets : [];
  const min = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : null;
  const max = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : null;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <nav aria-label="ব্রেডক্রাম্ব" className="mb-5 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">হোম</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700"
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-700">{product.nameBn}</span>
      </nav>

      <section className="mb-6 flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-4xl">
            <span role="img" aria-label={product.nameBn}>{product.image}</span>
          </div>
          <div>
            <p className="mb-1 text-sm text-slate-500">{product.categoryNameBn}</p>
            <h1 className="text-2xl font-bold text-slate-800">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-slate-500">
              একক: {formatUnit(product.unit)}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4 sm:min-w-40 sm:text-right">
          <p className="text-sm text-emerald-800">আজকের দাম</p>
          <p className="text-2xl font-bold text-emerald-900">
            ৳{formatPrice(product.today)}
          </p>
          <p className="text-xs text-emerald-800">/{formatUnit(product.unit)}</p>
          {product.change && (
            <div className="mt-2">
              <PriceChangeBadge
                dir={product.change.dir}
                pct={product.change.pct}
                size="sm"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-800">দামের সারসংক্ষেপ</h2>
        {min === null || max === null ? (
          <p className="text-sm text-slate-500">বাজারভিত্তিক দাম পাওয়া যায়নি।</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryValue label="সর্বনিম্ন বাজারদর" value={min} unit={product.unit} />
            <SummaryValue label="সর্বোচ্চ বাজারদর" value={max} unit={product.unit} />
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">পরিবর্তন</p>
              <p className="mt-1 font-semibold text-slate-800">
                {formatPct(product.change?.pct ?? 0, product.change?.dir ?? "flat")}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-800">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length === 0 ? (
          <p className="text-sm text-slate-500">বাজারভিত্তিক দাম পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">বাজার</th>
                  <th scope="col" className="px-4 py-3 font-semibold">বিভাগ</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বনিম্ন</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {markets.map((market, index) => (
                  <tr key={`${market.market}-${market.division}-${index}`}>
                    <td className="px-4 py-3 font-medium text-slate-800">{market.market}</td>
                    <td className="px-4 py-3 text-slate-600">{market.division}</td>
                    <td className="px-4 py-3 text-right">৳{formatPrice(market.min)}</td>
                    <td className="px-4 py-3 text-right">৳{formatPrice(market.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Link
        href="/product"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        সব পণ্যে ফিরে যান
      </Link>
    </main>
  );
}

function SummaryValue({ label, value, unit }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">
        ৳{formatPrice(value)} <span className="text-sm font-normal">/{formatUnit(unit)}</span>
      </p>
    </div>
  );
}
