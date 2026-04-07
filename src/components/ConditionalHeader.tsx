"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isCapturePage = pathname === "/capture";

  if (isCapturePage) return null;

  return (
    <header
      className="
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
      "
    >
      {/* LOGO */}
      <div
        className="
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

        <span className="opacity-50 ml-4 cursor-default">[ INTRO ]</span>
      </div>

      {/* BUTTON */}
      <button className="bg-black text-white text-[9px] font-bold px-3 py-2 max-[324px]:mx-auto">
        ENTER CODE
      </button>
    </header>
  );
}