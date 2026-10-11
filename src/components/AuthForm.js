"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { safeReturnTo } from "@/lib/redirect";

function OAuthButtons({ returnTo, googleEnabled, githubEnabled }) {
  const providers = [
    {
      id: "google",
      label: "Google দিয়ে চালিয়ে যান",
      available: googleEnabled,
      icon: <span className="font-bold text-blue-600" aria-hidden="true">G</span>,
    },
    {
      id: "github",
      label: "GitHub দিয়ে চালিয়ে যান",
      available: githubEnabled,
      icon: (
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white"
          aria-hidden="true"
        >
          GH
        </span>
      ),
    },
  ].filter((provider) => provider.available);

  if (providers.length === 0) return null;

  return (
    <div className="mt-5">
      <div className="mb-4 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        অথবা
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={async () => {
              try {
                const { error } = await authClient.signIn.social({
                  provider: provider.id,
                  callbackURL: returnTo,
                });
                if (error) toast.error(error.message || "সাইন ইন করা যায়নি।");
              } catch {
                toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
              }
            }}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
          >
            {provider.icon}
            {provider.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AuthForm({
  mode,
  returnTo = "/",
  registered = false,
  googleOAuthEnabled = false,
  githubOAuthEnabled = false,
}) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const destination = safeReturnTo(returnTo, "/");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (
      isSignup &&
      password !== String(formData.get("passwordConfirm") || "")
    ) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      setSubmitting(false);
      return;
    }

    try {
      const result = isSignup
        ? await authClient.signUp.email({
            name: String(formData.get("name") || "").trim(),
            email,
            password,
            callbackURL: "/signin?registered=1",
          })
        : await authClient.signIn.email({
            email,
            password,
            callbackURL: destination,
          });

      if (result.error) {
        toast.error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি।");
        return;
      }

      if (isSignup) {
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.replace("/signin?registered=1");
        return;
      }

      toast.success("সাইন ইন হয়েছে।");
      router.replace(destination);
      router.refresh();
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {isSignup
            ? "বাজারের দর ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।"
            : "বাজার দর ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
      >
        {registered && !isSignup && (
          <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
            অ্যাকাউন্ট তৈরি হয়েছে। আপনার ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।
          </p>
        )}

        {isSignup && (
          <label className="mb-4 block text-sm font-medium text-slate-700">
            নাম
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="আপনার নাম"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        )}
        <label className="mb-4 block text-sm font-medium text-slate-700">
          ইমেইল
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        <label className="mb-5 block text-sm font-medium text-slate-700">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            minLength={8}
            maxLength={128}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
        {isSignup && (
          <label className="mb-5 block text-sm font-medium text-slate-700">
            পাসওয়ার্ড নিশ্চিত করুন
            <input
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              placeholder="আবার পাসওয়ার্ড লিখুন"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "অপেক্ষা করুন…"
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন"}
        </button>

        <OAuthButtons
          returnTo={destination}
          googleEnabled={googleOAuthEnabled}
          githubEnabled={githubOAuthEnabled}
        />

        <p className="mt-5 text-center text-sm text-slate-500">
          {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-semibold text-emerald-700 hover:underline"
          >
            {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </form>
    </main>
  );
}
