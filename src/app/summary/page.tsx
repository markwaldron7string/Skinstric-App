"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiPlayReverseFill } from "react-icons/ri";

export default function SummaryPage() {
  const router = useRouter();

  type AnalysisData = {
    race: Record<string, number>;
    age: Record<string, number>;
    gender: Record<string, number>;
  };

  const getTop = (obj: Record<string, number>) => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return "";

    return entries.sort((a, b) => b[1] - a[1])[0][0];
  };

  const [data] = useState<AnalysisData | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("analysisData");
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const [activeCategory, setActiveCategory] = useState<
    "race" | "age" | "gender"
  >("race");

  const [selected, setSelected] = useState({
    race: "",
    age: "",
    gender: "",
  });

  const [isZero, setIsZero] = useState(false);

  const currentData: Record<string, number> = data?.[activeCategory] || {};
  const defaultSelected = data
  ? {
      race: getTop(data.race),
      age: getTop(data.age),
      gender: getTop(data.gender),
    }
  : { race: "", age: "", gender: "" };
  const currentSelected =
  selected[activeCategory] || defaultSelected[activeCategory];

  const rawValue = currentData[currentSelected] || 0;
  const selectedValue = rawValue < 0.01 ? 0 : rawValue;
  const displayValue = selectedValue === 0 ? 0.0001 : selectedValue;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (selectedValue === 0) {
      timeout = setTimeout(() => {
        setIsZero(true);
      }, 700);
    } else {
      timeout = setTimeout(() => {
        setIsZero(false);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [selectedValue]);

  if (!data) return null;

  const sortedEntries = Object.entries(currentData).sort((a, b) => b[1] - a[1]);

  const radius = 180;
  const center = 240;
  const circumference = 2 * Math.PI * radius;

  const handleReset = () => {
    setSelected({
      race: getTop(data.race),
      age: getTop(data.age),
      gender: getTop(data.gender),
    });
    setActiveCategory("race");
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white relative flex flex-col">
      {/* HEADER */}
      <div className="text-black md:absolute md:top-6 md:left-16 px-6 pt-6 lg:px-0 lg:pt-0 max-[234px]:text-center">
        <p className="text-[12px] font-semibold tracking-[0.12em] mb-2 max-[234px]:text-[9px]">
          A.I. ANALYSIS
        </p>
        <h1 className="text-[42px] lg:text-[72px] max-[376px]:text-[24px] max-[234px]:font-semibold max-[234px]:text-[16px] leading-none">
          DEMOGRAPHICS
        </h1>
        <p className="text-[12px] mt-2 text-gray-600 max-[234px]:text-[9px]">
          PREDICTED RACE & AGE
        </p>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col text-black overflow-y-auto md:block">
        {/* LEFT PANEL */}
        <div
          className="
          md:absolute md:left-16 md:top-50
          flex md:flex-col lg:mt-6 max-[411px]:flex-col 
          gap-4 px-6 mt-6
        "
        >
          {(["race", "age", "gender"] as const).map((cat) => {
            const value =
              selected[cat as keyof typeof selected] ||
              defaultSelected[cat as keyof typeof defaultSelected];

            return (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  w-35 sm:w-45 p-3 sm:p-4 max-[411px]:w-full border cursor-pointer
                  ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                `}
              >
                <p className="text-[14px] capitalize">{value}</p>
                <p className="text-[10px] tracking-[0.12em] mt-1">
                  {cat.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>

        {/* CENTER */}
        <div
          className="
          md:absolute
          md:left-65 
          md:right-80 
          lg:left-75 
          lg:right-100
          md:top-50 
          md:min-w-40
          md:bottom-50 mt-6 mx-6 lg:mx-0 
          flex-1 min-h-90 sm:min-h-105 
          max-h-150
          bg-[#F3F3F3] border-t pt-8
        "
        >
          <h2 className="text-[36px] mb-8 ml-8 capitalize max-[444]:text-[24px] max-[200px]:text-[18px]">
            {currentSelected}
          </h2>

          {/* CIRCLE */}
          <div className="flex justify-end items-end h-full pr-4 pb-24 max-[324px]:pb-24">
            <div className="relative w-[clamp(180px,30vw,420px)] h-[clamp(180px,30vw,420px)]">
              <svg viewBox="0 0 480 480" className="w-full h-full -rotate-90">
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="#ddd"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${circumference - 0.5} ${circumference}`}
                  strokeLinecap="butt"
                />

                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="#111"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - displayValue)}
                  strokeLinecap="butt"
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    opacity: isZero ? 0 : 1,
                    transition:
                      "stroke-dashoffset 0.7s ease, opacity 0.2s ease",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-[20px] lg:text-[32px]">
                {(selectedValue * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="
          md:absolute md:right-16 
          md:top-50 md:bottom-30 
          md:w-60 lg:w-75 
          mt-6 mx-6 lg:mx-0 
          bg-[#F3F3F3] border-t pt-6
          max-h-150
        "
        >
          <div className="flex justify-between mx-3 text-[12px] mb-4">
            <span>{activeCategory.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {sortedEntries.map(([key, value]) => {
            const displayValue = value < 0.01 ? 0 : value;

            return (
              <div
                key={key}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [activeCategory]: key,
                  }))
                }
                className={`
                  flex items-center justify-between px-3 py-2 cursor-pointer
                  ${
                    currentSelected === key
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 border rotate-45 flex items-center justify-center">
                    {currentSelected === key && (
                      <div className="w-1.5 h-1.5 bg-white rotate-90" />
                    )}
                  </div>

                  <span className="capitalize">{key}</span>
                </div>

                <span>{(displayValue * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM AREA */}
      <div className="mt-auto">
        <div className="lg:absolute flex-center text-center text-[14px] text-gray-500 mb-2 md:bottom-8 md:left-1/2 lg:-translate-x-1/2 max-[324px]:text-[12px]">
          If A.I. estimate is wrong, select the correct one.
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 md:absolute md:left-16 md:right-16 md:bottom-16 md:px-0">
          {/* BACK */}
          <div
            onClick={() => router.back()}
            className="flex items-center gap-3 mt-1 text-black cursor-pointer group max-[768px]:mb-3 max-[768px]:mx-4"
          >
            <div className="w-8 h-8 border rotate-45 flex items-center justify-center group-hover:scale-110 transition">
              <span className="-rotate-45 text-[20px]">
                <RiPlayReverseFill />
              </span>
            </div>
            <span className="text-[12px] pl-2 tracking-[0.08em]">BACK</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 max-[768px]:mb-3">
            <button
              onClick={handleReset}
              className="px-6 py-2 border text-gray-300 text-[12px] cursor-pointer"
            >
              RESET
            </button>

            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-black text-white text-[12px] cursor-pointer"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
