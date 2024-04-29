import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Type Script Login Project",
  description: "This web app was used to learn about TypeScript, Postgres, Vercel and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="initial-scale=1, width=device-width" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
