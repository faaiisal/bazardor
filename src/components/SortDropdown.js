"use client";

/**
 * SortDropdown — client component for category page sorting.
 * Updates a URL search param on change.
 */
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "default";

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={16} className="text-slate-400 shrink-0" aria-hidden="true" />
      <label htmlFor="sort-select" className="sr-only">
        পণ্য সাজান
      </label>
      <select
        id="sort-select"
        value={current}
        onChange={handleChange}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
