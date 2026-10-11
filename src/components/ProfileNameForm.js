"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileNameForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 80) {
      toast.error("নাম ১ থেকে ৮০ অক্ষরের মধ্যে লিখুন।");
      return;
    }

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmedName });
      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }
      toast.success("নাম আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch {
      toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-slate-700">
        নাম
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          maxLength={80}
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </label>
      <button
        type="submit"
        disabled={saving}
        className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {saving ? "আপডেট হচ্ছে…" : "আপডেট করুন"}
      </button>
    </form>
  );
}
