import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileNameForm from "@/components/ProfileNameForm";
import { auth } from "@/lib/auth";

export const metadata = { title: "প্রোফাইল আপডেট" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirectTo=%2Fprofile%2Fupdate");

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <Link href="/profile" className="text-sm font-medium text-emerald-700 hover:underline">
        ← প্রোফাইলে ফিরে যান
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-800">প্রোফাইল আপডেট</h1>
      <section className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
        <p className="mb-5 text-sm text-slate-500">{session.user.email}</p>
        <ProfileNameForm initialName={session.user.name || ""} />
      </section>
    </main>
  );
}
