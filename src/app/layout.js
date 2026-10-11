import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import SiteHeader from "@/components/SiteHeader";
import SitePriceTicker from "@/components/SitePriceTicker";
import SiteFooter from "@/components/SiteFooter";
import { Suspense } from "react";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <ToastProvider />
        <Suspense fallback={<div className="h-24 bg-white" aria-hidden="true" />}>
          <SiteHeader />
        </Suspense>
        <Suspense
          fallback={
            <div
              className="h-10 border-b border-slate-200 bg-slate-900"
              aria-hidden="true"
            />
          }
        >
          <SitePriceTicker />
        </Suspense>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
