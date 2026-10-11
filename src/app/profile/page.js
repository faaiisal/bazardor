import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirectTo=%2Fprofile");

  const initials = session.user.name?.trim().slice(0, 1) || "ব";

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-800">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-slate-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <section className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-100 text-2xl font-bold text-emerald-800">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-800">{session.user.name}</h2>
          <p className="truncate text-sm text-slate-500">{session.user.email}</p>
        </div>
        <Link
          href="/profile/update"
          className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
        >
          তথ্য আপডেট
        </Link>
      </section>
    </main>
  );
}
