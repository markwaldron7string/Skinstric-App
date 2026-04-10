import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ConditionalHeader from "@/components/ConditionalHeader";

const roobert = localFont({
  src: "../../public/fonts/Roobert.ttf",
  variable: "--font-roobert",
});

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Skinstric AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roobert.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1B1C]">
        <ConditionalHeader />

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
