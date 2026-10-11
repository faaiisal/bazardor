import { io } from "next/cache";
import { formatBengaliDate } from "@/lib/format";

export default async function BengaliDate() {
  await io();
  const todayBn = formatBengaliDate(new Date());

  return (
    <p className="hidden flex-1 text-center text-xs text-slate-400 sm:block">
      {todayBn}
    </p>
  );
}
