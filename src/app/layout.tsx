import type { Metadata } from "next/types";
import Providers from "./providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "To-Do Manager",
  description: "Manage tasks with Next.js 15 + React 19",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-slate-50 text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}