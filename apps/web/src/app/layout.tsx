import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO Analysis Tool",
  description: "Comprehensive SEO analysis and optimization recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
