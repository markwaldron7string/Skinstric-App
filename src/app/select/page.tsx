"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Diamond({ label, onClick, disabled, isMain }: any) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center justify-center group/diamond
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* DESKTOP: PER-DIAMOND HOVER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none max-[768px]:hidden">
        <div className="absolute opacity-0 scale-90 group-hover/diamond:opacity-100 group-hover/diamond:scale-100 transition duration-200">
          <div className="w-[260px] h-[260px] border-[2px] border-dotted border-[#1A1B1C]/70 rotate-45 opacity-40" />
        </div>

        <div className="absolute opacity-0 scale-90 group-hover/diamond:opacity-100 group-hover/diamond:scale-100 transition duration-300">
          <div className="w-[320px] h-[320px] border-[2px] border-dotted border-[#1A1B1C]/50 rotate-45 opacity-30" />
        </div>

        <div className="absolute opacity-0 scale-90 group-hover/diamond:opacity-100 group-hover/diamond:scale-100 transition duration-400">
          <div className="w-[380px] h-[380px] border-[2px] border-dotted border-[#1A1B1C]/30 rotate-45 opacity-25" />
        </div>
      </div>

      {/* MAIN DIAMOND */}
      <div
        className={`
          w-[180px] h-[180px]
          rotate-45 flex items-center justify-center
          transition-all duration-300 ease-out

          ${isMain ? "bg-gray-200" : "bg-gray-100"}

          group-hover/diamond:bg-gray-300
          ${isMain ? "group-hover/diamond:scale-105" : ""}
        `}
      >
        <span
          className="
            -rotate-45 
            text-[16px] 
            text-[#1A1B1C] 
            font-semibold
            text-center
            px-3
          "
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function SelectPage() {
  const router = useRouter();

  const [systemHover, setSystemHover] = useState(false);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center relative">
      {/* HEADER */}
      <div className="absolute top-[24px] left-[36px] max-[324px]:text-[12px]">
        <p className="text-s tracking-[0.1em] font-semibold text-black mb-2">
          A.I. ANALYSIS
        </p>
        <p className="text-[14px] max-[768px]:text-[12px] max-[324px]:text-[10px] text-gray-500 leading-relaxed">
          A.I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      {/* DIAMOND SYSTEM */}
      <div
        className="
          relative w-[160px] h-[160px]
          flex items-center justify-center
          scale-100
          max-[768px]:scale-90
          max-[640px]:scale-80
          max-[418px]:scale-70
          max-[366px]:scale-60
          max-[314px]:scale-55
          max-[324px]:-translate-y-12
          max-[287px]:scale-50
          max-[260px]:scale-45
          max-[235px]:scale-40
          max-[210px]:scale-35
          max-[182px]:scale-30
          transition-transform duration-300
        "
      >
        {/* MOBILE: SYSTEM HOVER (DEMOGRAPHICS) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden max-[768px]:flex">
          {/* INNER */}
          <div
            className={`
            absolute transition duration-200
            ${systemHover ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
          >
            <div className="w-[440px] h-[440px] border-[2px] border-dotted border-[#1A1B1C]/40 rotate-45" />
          </div>

          {/* MIDDLE */}
          <div
            className={`
            absolute transition duration-300
            ${systemHover ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
          >
            <div className="w-[480px] h-[480px] border-[2px] border-dotted border-[#1A1B1C]/25 rotate-45" />
          </div>

          {/* OUTER */}
          <div
            className={`
            absolute transition duration-400
            ${systemHover ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
          >
            <div className="w-[520px] h-[520px] border-[2px] border-dotted border-[#1A1B1C]/15 rotate-45" />
          </div>
        </div>

        {/* TOP (DEMOGRAPHICS) */}
        <div className="absolute -top-[140px]">
          <div
            onMouseEnter={() => setSystemHover(true)}
            onMouseLeave={() => setSystemHover(false)}
          >
            <Diamond
              label="DEMOGRAPHICS"
              onClick={() => router.push("/summary")}
              isMain
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="absolute right-[-140px]">
          <Diamond label="COSMETIC CONCERNS" disabled />
        </div>

        {/* BOTTOM */}
        <div className="absolute bottom-[-140px]">
          <Diamond label="WEATHER" disabled />
        </div>

        {/* LEFT */}
        <div className="absolute left-[-140px]">
          <Diamond label="SKIN TYPE DETAILS" disabled />
        </div>
      </div>

      {/* BACK */}
      <div
        className="
        absolute left-[0] bottom-[64px] 
        text-black
        w-full
        flex justify-between px-[64px]
        max-[418px]:left-1/2 
        max-[418px]:-translate-x-1/2
        max-[418px]:w-auto
        max-[418px]:flex-col
        max-[418px]:items-center
        max-[418px]:gap-8
        max-[418px]:px-0
        max-[418px]:scale-90
        max-[418px]:scale-80
        max-[366px]:scale-75
      "
      >
        {/* BACK */}
        <div
          onClick={() => router.back()}
          className="
            flex items-center gap-[12px] cursor-pointer group
            max-[418px]:order-1
            max-[418px]:flex-col
            max-[418px]:-translate-y-2
          "
        >
          <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[14px] pr-1">◀</span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>

        {/* GET SUMMARY */}
        <div
          onClick={() => router.push("/summary")}
          className="
            flex items-center gap-[12px] cursor-pointer group
            max-[418px]:order-2
            max-[418px]:flex-col-reverse
            max-[418px]:-translate-y-2
            animate-text-pulse
          "
        >
          <span className="text-[12px] tracking-[0.08em] pr-2">
            GET SUMMARY
          </span>

          <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[14px] pl-1">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
