"use client";

/**
 * CategoryNavigation — horizontal scrollable category pill list.
 * Highlights the active category based on the current route.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * @param {{ categories: Array<{id: string, slug: string, nameBn: string, icon: string}> }} props
 */
export default function CategoryNavigation({ categories }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="বিভাগ নেভিগেশন"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
    >
      <Link
        href="/product"
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
          pathname === "/" || pathname.startsWith("/product")
            ? "bg-emerald-600 text-white"
            : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
        }`}
        aria-current={
          pathname === "/" || pathname.startsWith("/product") ? "page" : undefined
        }
      >
        সব পণ্য
      </Link>
      {categories.map((cat) => {
        const isActive = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
              isActive
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
