import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl" aria-hidden="true">🔎</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-800">তথ্যটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-slate-500">লিংকটি সঠিক কি না দেখে আবার চেষ্টা করুন।</p>
      <Link href="/" className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
