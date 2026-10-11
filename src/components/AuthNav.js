"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AuthNav() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    authClient
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          toast.error("অ্যাকাউন্টের তথ্য লোড করা যায়নি।");
          return;
        }
        setSession(data?.session ? data : null);
      })
      .catch(() => {
        if (active) toast.error("অ্যাকাউন্টের তথ্য লোড করা যায়নি।");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }
      toast.success("সাইন আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  if (loading) {
    return <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />;
  }

  if (session?.user) {
    const { user } = session;
    const initials = user.name?.trim().slice(0, 1) || "ব";

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
            {initials}
          </span>
          <span className="hidden max-w-28 truncate sm:inline">
            {user.name || user.email}
          </span>
          <span aria-hidden="true">⌄</span>
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-100 bg-white p-3 shadow-xl"
            role="menu"
          >
            <p className="truncate font-semibold text-slate-800">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="mb-2 truncate text-xs text-slate-500">{user.email}</p>
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-emerald-50"
            >
              <User size={15} aria-hidden="true" />
              আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              role="menuitem"
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={15} aria-hidden="true" />
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <LogIn size={15} aria-hidden="true" />
        <span className="hidden sm:inline">সাইন ইন</span>
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
      >
        <UserPlus size={15} aria-hidden="true" />
        <span className="hidden sm:inline">সাইন আপ</span>
      </Link>
    </div>
  );
}
