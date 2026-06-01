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

  // ---------------- STATE ----------------
  const [data, setData] = useState<AnalysisData | null>(null);

  const [activeCategory, setActiveCategory] = useState<
    "race" | "age" | "gender"
  >("race");

  const [selected, setSelected] = useState({
    race: "",
    age: "",
    gender: "",
  });

  const [isZero, setIsZero] = useState(false);

  // ---------------- LOAD DATA ----------------

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = localStorage.getItem("analysisData");
    if (!stored) return;

    try {
      setData(JSON.parse(stored));
    } catch {
      setData(null);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ---------------- DERIVED DATA ----------------
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

  // ---------------- ANIMATION ----------------
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (selectedValue === 0) {
      timeout = setTimeout(() => setIsZero(true), 700);
    } else {
      timeout = setTimeout(() => setIsZero(false), 0);
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
    <div className="w-full min-h-[calc(100vh-64px)] bg-white relative flex flex-col">
      {/* HEADER */}
      <div className="text-black md:absolute md:top-6 md:left-16 px-6 pt-5 lg:px-0 lg:pt-0 max-[234px]:text-center">
        <p className="text-[11px] font-semibold tracking-[0.12em] mb-1.5 max-[234px]:text-[9px]">
          A.I. ANALYSIS
        </p>
        <h1 className="text-[32px] lg:text-[72px] max-[376px]:text-[22px] max-[234px]:font-semibold max-[234px]:text-[16px] leading-none">
          DEMOGRAPHICS
        </h1>
        <p className="text-[11px] mt-1.5 text-gray-600 max-[234px]:text-[9px]">
          PREDICTED RACE & AGE
        </p>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col text-black md:block">

        {/* LEFT PANEL — category tabs */}
        <div
          className="
          md:absolute md:left-16 md:top-50
          flex md:flex-col
          gap-2 px-6 mt-4
          overflow-x-auto
          max-[411px]:flex-col
          max-[411px]:gap-2
          lg:mt-6
          max-[1024px]:mt-0
          max-[768px]:mt-4
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
                  min-w-[120px] sm:w-45 p-3 sm:p-4 border cursor-pointer flex-shrink-0
                  ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }
                `}
              >
                <p className="text-[13px] capitalize truncate">{value}</p>
                <p className="text-[10px] tracking-[0.12em] mt-1">
                  {cat.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>

        {/* CENTER — progress circle */}
        <div
          className="
          md:absolute
          md:left-65
          md:right-80
          lg:left-75
          lg:right-100
          md:top-50
          md:min-w-40
          md:bottom-50
          mt-4 mx-6 lg:mx-0
          flex-1
          min-h-[220px]
          max-[1024px]:mt-0
          bg-[#F3F3F3] border-t pt-6
          max-[768px]:mt-4
        "
        >
          <h2 className="text-[28px] sm:text-[36px] mb-4 ml-6 capitalize max-[200px]:text-[18px]">
            {currentSelected}
          </h2>

          {/* CIRCLE */}
          <div className="flex justify-end items-end h-full pr-4 pb-16 sm:pb-24">
            <div className="relative w-[clamp(140px,28vw,380px)] h-[clamp(140px,28vw,380px)]">
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

              <div className="absolute inset-0 flex items-center justify-center text-[18px] lg:text-[30px]">
                {(selectedValue * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — values list */}
        <div
          className="
          md:absolute md:right-16
          md:top-50 md:bottom-30
          md:w-60 lg:w-75
          mt-4 mx-6 lg:mx-0
          bg-[#F3F3F3] border-t pt-4
          max-[1024px]:mt-0
          max-[768px]:mt-4
          mb-4 md:mb-0
        "
        >
          <div className="flex justify-between mx-3 text-[11px] mb-3">
            <span>{activeCategory.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {sortedEntries.map(([key, value]) => {
            const dv = value < 0.01 ? 0 : value;

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
                  flex items-center justify-between px-3 py-2.5 cursor-pointer
                  ${
                    currentSelected === key
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 border rotate-45 flex items-center justify-center flex-shrink-0">
                    {currentSelected === key && (
                      <div className="w-1.5 h-1.5 bg-white rotate-90" />
                    )}
                  </div>

                  <span className="capitalize text-[13px]">{key}</span>
                </div>

                <span className="text-[13px]">{(dv * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM AREA */}
      <div className="mt-auto px-6 pb-6 md:pb-0">
        <p className="text-center text-[12px] text-gray-500 mb-4 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2">
          If A.I. estimate is wrong, select the correct one.
        </p>

        <div className="flex justify-between items-center md:absolute md:left-16 md:right-16 md:bottom-16 md:px-0">
          {/* BACK */}
          <div
            onClick={() => router.back()}
            className="flex items-center gap-3 text-black cursor-pointer group"
          >
            <div className="w-8 h-8 border rotate-45 flex items-center justify-center group-hover:scale-110 transition">
              <span className="-rotate-45 text-[20px]">
                <RiPlayReverseFill />
              </span>
            </div>
            <span className="text-[12px] pl-2 tracking-[0.08em]">BACK</span>
          </div>

          {/* RESET / CONFIRM */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 border text-gray-400 text-[12px] cursor-pointer hover:text-gray-600 transition min-h-[44px]"
            >
              RESET
            </button>

            <button
              onClick={() => router.push("/")}
              className="px-5 py-2.5 bg-black text-white text-[12px] cursor-pointer hover:opacity-80 transition min-h-[44px]"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
