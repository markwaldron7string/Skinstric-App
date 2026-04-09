"use client";

import { useState } from "react";
import { RiPlayFill, RiPlayReverseFill } from "react-icons/ri";
import { LuArrowBigRightDash } from "react-icons/lu";

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
        {/* GLOBAL EXPANDING DIAMONDS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Diamond 1 */}
          <div
            className={`
    absolute border border-dashed border-[#A0A4AB]/40
    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${hovered === "right" ? "opacity-100" : "opacity-0"}
  `}
            style={{
              width: "720px",
              height: "720px",
              top: "50%",
              right: "-520px",
              transform: "translateY(-50%) rotate(45deg)",
            }}
          />

          {/* Diamond 2 */}
          <div
            className={`
    absolute border border-dashed border-[#A0A4AB]/25
    transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${hovered === "right" ? "opacity-100" : "opacity-0"}
  `}
            style={{
              width: "860px",
              height: "860px",
              top: "50%",
              right: "-640px",
              transform: "translateY(-50%) rotate(45deg)",
            }}
          />
        </div>
      </div>

      {/* ================= DESKTOP CENTER ================= */}
      <main
        className={`
          hidden lg:flex absolute inset-0 items-center justify-center
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${hovered === "left" ? "translate-x-[140px]" : ""}
          ${hovered === "right" ? "-translate-x-[140px]" : ""}
        `}
        >
        <h1
          className="text-center opacity-0 animate-fadeIn cursor-default max-w-[900px]"
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
              ${hovered === "right" ? "-translate-x-[clamp(80px,12vw,220px)]" : ""}
              ${hovered === "left" ? "translate-x-[clamp(80px,12vw,220px)]" : ""}
            `}
          >
            Sophisticated
          </span>

          <span
            className={`
              block transition-transform duration-1000
              ${hovered === "right" ? "-translate-x-[clamp(120px,19vw,345px)]" : ""}
              ${hovered === "left" ? "translate-x-[clamp(120px,19vw,345px)]" : ""}
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

          {/* HOVER LINES */}
          <div
            className={`
            absolute inset-0 pointer-events-none
            transition-opacity duration-500
            ${hovered === "right" ? "opacity-100" : "opacity-0"}
          `}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute border-t border-dashed border-[#A0A4AB]"
                style={{
                  width: `${200 + i * 80}px`,
                  right: `${-40 - i * 20}px`,
                  top: "50%",
                  transform: `rotate(45deg) translateY(${i * 12}px)`,
                  opacity: 0.4,
                  transition: "all 0.6s ease",
                }}
              />
            ))}
          </div>

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
              <span className="text-[12px] font-semibold mt-3 tracking-[0.08em]">
                ENTER EXPERIENCE
              </span>

              <div className="w-[24px] h-[24px] mt-3 border rotate-45 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <LuArrowBigRightDash className="-rotate-45 text-[32px]" />
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
            className={`
              relative
              w-[32px] h-[32px]
              rotate-45 flex items-center justify-center
              transition-all duration-500
              ${hovered === "right" ? "scale-125" : ""}
            `}
          >
            <div className="absolute inset-0 border" />
            <div
              className="
              absolute inset-[-6px]
              border border-dashed
              opacity-0
              scale-75
              transition-all duration-500
              group-hover:opacity-100
              group-hover:scale-100
              animate-spin-slow
            "
            />
            <RiPlayReverseFill className="-rotate-45 text-[18px]" />
          </div>

          <span className="text-[13px] tracking-[0.08em]">DISCOVER A.I.</span>
        </div>

        {/* RIGHT */}
        <Link
          href="/form"
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          className={`
            group
            absolute right-[96px] top-1/2 -translate-y-1/2 
            flex items-center gap-[16px] cursor-pointer
            transition-all duration-500
            ${hovered === "left" ? "opacity-0" : "opacity-100"}
          `}
        >
          <span
            className="
            text-[13px] tracking-[0.08em]
            transition-transform duration-500
            group-hover:-translate-x-[8px]
          "
          >
            TAKE TEST
          </span>

          <div
            className={`
              relative
              w-[32px] h-[32px]
              rotate-45 flex items-center justify-center
              transition-all duration-300 ease-out
              ${hovered === "right" ? "scale-110 pulse-hover" : ""}
            `}
          >
            {/* MAIN BORDER */}
            <div className="absolute inset-0 border" />

            {/* INNER BEADED DIAMOND */}
            <div
              className={`
                absolute inset-[4px]
                opacity-0 scale-75
                transition-all duration-300
                ${hovered === "right" ? "opacity-100 scale-100" : ""}
              `}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  fill="none"
                  stroke="#1A1B1C"
                  strokeWidth="2"
                  strokeDasharray="3 6"
                />
              </svg>
            </div>
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
