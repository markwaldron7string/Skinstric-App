"use client";

import { useRouter } from "next/navigation";

function Diamond({ label, onClick, disabled, isMain }: any) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center justify-center group
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* HOVER DIAMONDS (PER-DIAMOND) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* INNER */}
        <div className="absolute opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition duration-200">
          <div className="w-[260px] h-[260px] border-[2.5px] border-dotted border-[#1A1B1C]/70 rotate-45 opacity-35" />
        </div>

        {/* MIDDLE */}
        <div className="absolute opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition duration-300">
          <div className="w-[320px] h-[320px] border-[2.5px] border-dotted border-[#1A1B1C]/50 rotate-45 opacity-30" />
        </div>

        {/* OUTER */}
        <div className="absolute opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition duration-400">
          <div className="w-[380px] h-[380px] border-[2.5px] border-dotted border-[#1A1B1C]/30 rotate-45 opacity-25" />
        </div>
      </div>

      {/* MAIN DIAMOND */}
      <div
        className={`
          w-[180px] h-[180px]
          rotate-45 flex items-center justify-center
          transition-all duration-300 ease-out

          ${isMain ? "bg-gray-200" : "bg-gray-100"}

          group-hover:bg-gray-300
          ${isMain ? "group-hover:scale-105" : ""}
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

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center relative">
      
      {/* HEADER */}
      <div className="absolute top-[24px] left-[36px]">
        <p className="text-s tracking-[0.1em] font-semibold text-black mb-2">
          A.I. ANALYSIS
        </p>
        <p className="text-[14px] text-gray-500 leading-relaxed">
          A.I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      {/* DIAMOND SYSTEM */}
      <div className="relative w-[160px] h-[160px] flex items-center justify-center">

        {/* HOVER DIAMONDS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  
            {/* INNER */}
            <div className="absolute opacity-0 scale-90 group-hover/system:opacity-100 group-hover/system:scale-100 transition duration-300">
                <div className="w-[400px] h-[400px] border border-dotted border-[#1A1B1C] rotate-45 opacity-40" />
            </div>

            {/* MIDDLE */}
            <div className="absolute opacity-0 scale-90 group-hover/system:opacity-100 group-hover/system:scale-100 transition duration-500">
                <div className="w-[500px] h-[500px] border border-dotted border-[#1A1B1C] rotate-45 opacity-30" />
            </div>

            {/* OUTER */}
            <div className="absolute opacity-0 scale-90 group-hover/system:opacity-100 group-hover/system:scale-100 transition duration-700">
                <div className="w-[600px] h-[600px] border border-dotted border-[#1A1B1C] rotate-45 opacity-20" />
            </div>
        </div>

        {/* TOP (MAIN) */}
        <div className="absolute -top-[140px]">
          <Diamond
            label="DEMOGRAPHICS"
            onClick={() => router.push("/summary")}
            isMain
          />
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
      <div className="absolute left-[64px] bottom-[64px] text-black">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-[12px] cursor-pointer group"
        >
          <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[14px] pr-1">◀</span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>
      </div>

      {/* GET SUMMARY */}
      <div className="absolute right-[64px] bottom-[64px] text-black">
        <div
          onClick={() => router.push("/summary")}
          className="flex items-center gap-[12px] cursor-pointer group"
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