/**
 * ErrorState — friendly Bengali error message when API fails.
 */
import Link from "next/link";

/**
 * @param {{ message?: string, showHomeLink?: boolean }} props
 */
export default function ErrorState({
  message = "তথ্য লোড করতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।",
  showHomeLink = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl">⚠️</div>
      <h2 className="mb-2 text-xl font-semibold text-slate-700">
        কিছু একটা সমস্যা হয়েছে
      </h2>
      <p className="mb-6 max-w-md text-slate-500">{message}</p>
      {showHomeLink && (
        <Link
          href="/"
          className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          হোম পেজে ফিরে যান
        </Link>
      )}
    </div>
  );
}
