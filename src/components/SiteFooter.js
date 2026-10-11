/**
 * SiteFooter — responsive two-column footer.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand tagline */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl" aria-hidden="true">🛒</span>
              <span className="font-bold text-emerald-700">বাজার দর</span>
            </div>
            <p className="text-sm text-slate-500">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 sm:text-right max-w-xs sm:max-w-sm">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-center text-xs text-slate-400">
            © ২০২৫ বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
