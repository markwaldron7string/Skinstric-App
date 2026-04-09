"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const router = useRouter();

  const [data, setData] = useState<any>(null);

  const [activeCategory, setActiveCategory] = useState<
    "race" | "age" | "gender"
  >("race");

  const [selected, setSelected] = useState({
    race: "",
    age: "",
    gender: "",
  });

  const [isZero, setIsZero] = useState(false);

  const getTop = (obj: any) =>
    Object.entries(obj).sort((a: any, b: any) => b[1] - a[1])[0][0];

  useEffect(() => {
    const stored = localStorage.getItem("analysisData");
    if (!stored) return;

    const parsed = JSON.parse(stored);

    setData(parsed);

    setSelected({
      race: getTop(parsed.race),
      age: getTop(parsed.age),
      gender: getTop(parsed.gender),
    });
  }, []);

  const currentData = data?.[activeCategory] || {};
  const currentSelected = selected[activeCategory];

  const rawValue = currentData[currentSelected] || 0;
  const selectedValue = rawValue < 0.01 ? 0 : rawValue;
  const displayValue = selectedValue === 0 ? 0.0001 : selectedValue;

  useEffect(() => {
    if (selectedValue === 0) {
      const timeout = setTimeout(() => {
        setIsZero(true);
      }, 700); 

      return () => clearTimeout(timeout);
    } else {
      setIsZero(false);
    }
  }, [selectedValue]);

  if (!data) return null;

  const sortedEntries = Object.entries(currentData).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const radius = 190;
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
      <div className="text-black md:absolute md:top-[24px] md:left-[64px] px-6 pt-6 lg:px-0 lg:pt-0 max-[234px]:text-center">
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
        <div className="
          md:absolute md:left-[64px] md:top-[200px]
          flex md:flex-col lg:mt-6 max-[411px]:flex-col 
          gap-4 px-6 mt-6 lg:mt-0
        ">
          {["race", "age", "gender"].map((cat) => {
            const value = selected[cat as keyof typeof selected];

            return (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`
                  w-[140px] sm:w-[180px] p-3 sm:p-4 max-[411px]:w-full border cursor-pointer
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
        <div className="
          md:absolute
          md:left-[260px] 
          md:right-[320px] 
          lg:left-[300px] 
          lg:right-[400px]
          md:top-[200px] 
          md:min-w-40
          md:bottom-[200px] mt-6 mx-6 lg:mx-0 
          flex-1 min-h-[300px] sm:min-h-[360px] 
          bg-[#F3F3F3] border-t pt-8
        ">
          <h2 className="text-[36px] mb-8 ml-8 capitalize max-[444]:text-[24px] max-[200px]:text-[18px]">
            {currentSelected}
          </h2>

          {/* CIRCLE */}
          <div className="flex justify-end items-end h-full pr-4 pb-24 max-[324px]:pb-24">
            <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[475px] lg:h-[475px]">
              <svg
                viewBox="0 0 480 480"
                className="w-full h-full rotate-[-90deg]"
              >
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
                  className="transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
        <div className="
          md:absolute md:right-[64px] 
          md:top-[200px] md:bottom-[120px] 
          md:w-[240px] lg:w-[300px] 
          mt-6 mx-6 lg:mx-0 
          bg-[#F3F3F3] border-t pt-6
          md:bottom-[200px]
        ">
          <div className="flex justify-between mx-3 text-[12px] mb-4">
            <span>{activeCategory.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {sortedEntries.map(([key, value]: any) => {
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
                  <div className="w-[10px] h-[10px] border rotate-45 flex items-center justify-center">
                    {currentSelected === key && (
                      <div className="w-[6px] h-[6px] bg-white rotate-90" />
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
        <div className="lg:absolute flex-center text-center text-[14px] text-gray-500 mb-2 md:bottom-[32px] md:left-1/2 lg:-translate-x-1/2 max-[324px]:text-[12px]">
          If A.I. estimate is wrong, select the correct one.
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 md:absolute md:left-[64px] md:right-[64px] md:bottom-[64px] md:px-0">
          {/* BACK */}
          <div
            onClick={() => router.back()}
            className="flex items-center gap-3 mt-1 text-black cursor-pointer group max-[768px]:mb-3 max-[768px]:mx-4"
          >
            <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center group-hover:scale-110 transition">
              <span className="-rotate-45 text-[14px] pr-1">◀</span>
            </div>
            <span className="text-[12px] pl-2 tracking-[0.08em]">BACK</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 max-[768px]:mb-3">
            <button
              onClick={handleReset}
              className="px-6 py-2 border text-gray-300 text-[12px]"
            >
              RESET
            </button>

            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-black text-white text-[12px]"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
