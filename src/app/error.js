"use client";

export default function AppError({ error, reset }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-5xl" aria-hidden="true">⚠️</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-800">
        পেজটি লোড করা যায়নি
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        {error.message || "একটি অপ্রত্যাশিত সমস্যা হয়েছে।"}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        আবার চেষ্টা করুন
      </button>
    </main>
  );
}
