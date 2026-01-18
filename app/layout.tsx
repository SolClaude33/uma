import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMAX | Race. Shine. Moon.",
  description: "A high-energy racing-idol memecoin on Solana. Join the academy of racers and shine on the track!",
  openGraph: {
    title: "UMAX | Race. Shine. Moon.",
    description: "A high-energy racing-idol memecoin on Solana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
