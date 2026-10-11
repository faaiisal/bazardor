import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের বাজারের প্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন। চাল, ডাল, তেল, সবজি, মাছ, মাংস সহ সকল পণ্যের তাজা বাজার দর।",
  keywords: ["বাজার দর", "market price", "Bangladesh", "বাংলাদেশ", "পণ্যের দাম"],
  metadataBase: new URL(
    process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
  ),
};

/**
 * @param {{ children: React.ReactNode }} props
 */
export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
