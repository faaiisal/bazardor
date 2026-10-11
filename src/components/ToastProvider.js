"use client";

/**
 * ToastProvider — wraps react-hot-toast's Toaster with BazarDor styling.
 * Must be rendered once in the root layout (client component).
 */
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: "var(--font-noto-bengali), sans-serif",
          fontSize: "0.875rem",
          maxWidth: "360px",
          borderRadius: "0.75rem",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        },
        success: {
          iconTheme: { primary: "#059669", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#dc2626", secondary: "#fff" },
        },
      }}
    />
  );
}
