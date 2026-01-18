import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Save a Uma",
  description: "Let's run to save the horses!",
  icons: {
    icon: '/Uma_Musume_Pretty_Derby_JP_Logo.webp',
    shortcut: '/Uma_Musume_Pretty_Derby_JP_Logo.webp',
    apple: '/Uma_Musume_Pretty_Derby_JP_Logo.webp',
  },
  openGraph: {
    title: "Save a Uma",
    description: "Let's run to save the horses!",
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
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
