"use client";

/**
 * AuthNav — client component that shows auth state in the header.
 * Shows sign-in/sign-up when logged out, profile link + sign-out when logged in.
 *
 * Uses better-auth client. During Phase 1 (before auth is configured),
 * this component renders gracefully in signed-out state.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";

export default function AuthNav() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to get session — if auth client isn't configured yet, fail silently
    async function loadSession() {
      try {
        const { authClient } = await import("@/lib/auth-client");
        const { data } = await authClient.getSession();
        setSession(data?.session ?? null);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  async function handleSignOut() {
    try {
      const { authClient } = await import("@/lib/auth-client");
      await authClient.signOut();
      setSession(null);
      window.location.href = "/";
    } catch {
      window.location.href = "/";
    }
  }

  if (loading) {
    return <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          <User size={15} aria-hidden="true" />
          <span className="hidden sm:inline">প্রোফাইল</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          aria-label="সাইন আউট"
        >
          <LogOut size={15} aria-hidden="true" />
          <span className="hidden sm:inline">সাইন আউট</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        <LogIn size={15} aria-hidden="true" />
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
      >
        <UserPlus size={15} aria-hidden="true" />
        সাইন আপ
      </Link>
    </div>
  );
}
