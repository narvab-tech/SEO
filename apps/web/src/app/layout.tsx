import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GSC Intelligence",
  description: "Supabase + Vercel SaaS for marketers: GSC ingest, clustering, cannibalization, CTR gap, opportunities, briefs, link planner.",
  keywords: ["SEO", "Google Search Console", "GSC", "Marketing", "Analytics", "SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
