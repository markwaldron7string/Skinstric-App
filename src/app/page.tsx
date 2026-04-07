"use client";

import { useState } from "react";
import { RiPlayFill, RiPlayReverseFill } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <div className="w-full min-h-screen bg-white text-[#1A1B1C] relative overflow-hidden mt-[-64px]">
      {/* ================= DESKTOP DIAGONALS ================= */}
      <div className="absolute inset-0 hidden lg:block">
        {/* LEFT */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "50%",
            left: "-301px",
            transform: "translateY(-50%)",
            width: "602px",
            height: "602px",
          }}
        >
          {/* MAIN */}
          <svg
            width="602"
            height="602"
            className={`transition-opacity duration-500 ${
              hovered === "right" ? "opacity-0" : "opacity-100"
            }`}
          >
            <path
              d="M301 0 L602 301 L301 602 L0 301 Z"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1.25"
              strokeDasharray="0 2"
              strokeLinecap="round"
            />
          </svg>

          
        </div>

        {/* RIGHT */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "50%",
            right: "-301px",
            transform: "translateY(-50%)",
            width: "602px",
            height: "602px",
          }}
        >
          {/* MAIN */}
          <svg
            width="602"
            height="602"
            className={`transition-opacity duration-500 ${
              hovered === "left" ? "opacity-0" : "opacity-100"
            }`}
          >
            <path
              d="M301 0 L602 301 L301 602 L0 301 Z"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1.25"
              strokeDasharray="0 2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* ================= DESKTOP CENTER ================= */}
      <main
        className={`
          hidden lg:flex absolute inset-0 items-center justify-center
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${hovered === "left" ? "translate-x-[120px]" : ""}
          ${hovered === "right" ? "-translate-x-[120px]" : ""}
        `}
      >
        <h1
          className="text-center opacity-0 animate-fadeIn cursor-default"
          style={{
            fontSize: "clamp(56px, 8vw, 128px)",
            lineHeight: "0.92",
            letterSpacing: "-0.07em",
            fontVariationSettings: '"wght" 300',
          }}
        >
          <span
            className={`
              block transition-transform duration-1000
              ${hovered === "right" ? "-translate-x-[140px]" : ""}
              ${hovered === "left" ? "translate-x-[140px]" : ""}
            `}
          >
            Sophisticated
          </span>

          <span
            className={`
              block transition-transform duration-1000
              ${hovered === "right" ? "-translate-x-[260px]" : ""}
              ${hovered === "left" ? "translate-x-[260px]" : ""}
            `}
          >
            skincare
          </span>
        </h1>
      </main>

      {/* ================= RESPONSIVE DIAMOND ================= */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* OUTER */}
          <svg
            viewBox="0 0 520 520"
            className="absolute"
            style={{
              width: "clamp(420px, 60vw, 600px)",
              height: "clamp(420px, 60vw, 600px)",
            }}
          >
            <path
              d="M260 0 L520 260 L260 520 L0 260 Z"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1.25"
              strokeDasharray="0 2"
              strokeLinecap="round"
            />
          </svg>

          {/* INNER */}
          <svg
            viewBox="0 0 420 420"
            className="absolute"
            style={{
              width: "clamp(360px, 48vw, 520px)",
              height: "clamp(360px, 48vw, 520px)",
            }}
          >
            <path
              d="M210 0 L420 210 L210 420 L0 210 Z"
              fill="none"
              stroke="#A0A4AB"
              strokeWidth="1.25"
              strokeDasharray="0 2"
              strokeLinecap="round"
            />
          </svg>

          {/* CONTENT */}
          <div className="relative text-center px-6 mt-12 md:mt-0 max-w-[320px] flex flex-col items-center">
            <h1
              className="mb-5"
              style={{
                fontSize: "clamp(28px, 4vw, 56px)",
                lineHeight: "clamp(30px, 4.2vw, 58px)",
                letterSpacing: "-0.06em",
                fontVariationSettings: '"wght" 500',
              }}
            >
              Sophisticated <br /> skincare
            </h1>

            <p className="text-[#8a8e96] font-bold mb-5 text-[14px] leading-[20px]">
              Skinstric developed an A.I. that creates a highly-personalised
              routine tailored to what your skin needs.
            </p>

            <Link
              href="/form"
              className="
              flex flex-col md:flex-row
              items-center justify-center
              gap-3 md:gap-3 gap-y-2
              cursor-pointer
              transition-all duration-300
              hover:opacity-70
            "
            >
              <span className="text-[12px] mt-3 tracking-[0.08em]">
                ENTER EXPERIENCE
              </span>

              <div className="w-[24px] h-[24px] mt-3 border rotate-45 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <IoIosArrowRoundForward className="-rotate-45 text-[32px]" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SIDE BUTTONS ================= */}
      <div className="hidden lg:block">
        {/* LEFT */}
        <div
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute left-[96px] top-1/2 -translate-y-1/2 flex items-center gap-[16px] cursor-pointer ${
            hovered === "right" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform ${
              hovered === "left" ? "scale-110" : ""
            }`}
          >
            <RiPlayReverseFill className="-rotate-45 text-[18px]" />
          </div>

          <span className="text-[13px] tracking-[0.08em]">DISCOVER A.I.</span>
        </div>

        {/* RIGHT */}
        <Link
          href="/form"
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          className={`absolute right-[96px] top-1/2 -translate-y-1/2 flex items-center gap-[16px] cursor-pointer ${
            hovered === "left" ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-[13px] tracking-[0.08em]">TAKE TEST</span>

          <div
            className={`w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform ${
              hovered === "right" ? "scale-110" : ""
            }`}
          >
            <RiPlayFill className="-rotate-45 text-[18px]" />
          </div>
        </Link>
      </div>

      {/* ================= BOTTOM TEXT ================= */}
      <div className="hidden lg:block absolute left-[64px] bottom-[96px] w-[316px] text-[14px] leading-[20px] uppercase">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
}
