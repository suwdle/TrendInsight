import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrendInsight - Personalized News & Trends",
  description: "Get personalized news, trends, and insights tailored to your interests",
  keywords: "news, trends, personalized, insights, AI, curated content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-white dark:bg-gray-900">
            {children}
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
