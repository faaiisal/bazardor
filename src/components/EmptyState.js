/**
 * EmptyState — friendly Bengali message when no results are found.
 */
import Link from "next/link";

/**
 * @param {{ title?: string, description?: string, showHomeLink?: boolean }} props
 */
export default function EmptyState({
  title = "কোনো পণ্য পাওয়া যায়নি",
  description = "এই মুহূর্তে কোনো তথ্য পাওয়া যাচ্ছে না।",
  showHomeLink = false,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-6xl">📭</div>
      <h2 className="mb-2 text-xl font-semibold text-slate-700">{title}</h2>
      <p className="mb-6 max-w-md text-slate-500">{description}</p>
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
