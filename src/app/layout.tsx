import type { Metadata } from "next/types";
import Providers from "./providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "To-Do Manager",
  description: "Manage tasks with Next.js 15 + React 19",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-50 text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}