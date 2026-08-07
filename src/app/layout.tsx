import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHYSFLIX | Platform Pembelajaran & Video Fizik SPM KSSM",
  description: "Platform pembelajaran online khusus untuk Fizik SPM (KSSM Tingkatan 4 & 5). Tonton video pembelajaran mengikut minggu, dwibahasa BM & DLP (English), nota PDF & latihan SPM.",
  keywords: ["Physics SPM", "Fizik SPM", "PHYSFLIX", "Tingkatan 4", "Tingkatan 5", "KSSM", "DLP Physics", "SPM Revision"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PHYSFLIX",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ms"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100">{children}</body>
    </html>
  );
}
