import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";

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
        {/* GLOBAL HEADER */}
        <header className="
          h-[64px] 
          flex items-center justify-between 
          px-6 md:px-8 
          bg-white relative z-50
          max-[324px]:
          max-[324px]:flex-col
          max-[324px]:justify-center
          max-[324px]:gap-4
          max-[324px]:h-auto
          max-[324px]:py-3
          ">
          {/* LOGO / HOME LINK */}
          <div className="
            text-[11px] 
          text-black tracking-[0.08em]
            flex items-center
            max-[324px]:justify-center
            max-[182px]:text-[8px]

            "
          style={{ fontVariationSettings: '"wght" 600' }}
          >
            <Link href="/" className="hover:opacity-70 transition">
              SKINSTRIC
            </Link>

            <span className="opacity-50 transition cursor-default ml-4"> 
              [ INTRO ] 
            </span>
          </div>

          {/* RIGHT BUTTON */}
          <button className="
          bg-black text-white text-[9px] font-bold px-3 py-2
            max-[324px]:mx-auto
          ">
            ENTER CODE
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
