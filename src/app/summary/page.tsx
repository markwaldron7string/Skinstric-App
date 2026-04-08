"use client";

import { useEffect, useState } from "react";

export default function SummaryPage() {
  const [data, setData] = useState<any>(null);
  const [selected, setSelected] = useState("race");

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return null;

  const current = data[selected];

  const sorted = Object.entries(current)
    .sort((a: any, b: any) => b[1] - a[1]);

  return (
    <div className="p-10">

      <h1 className="text-4xl mb-6">DEMOGRAPHICS</h1>

      {/* LEFT */}
      <div className="flex gap-10">

        <div className="w-[200px]">
          {["race", "age", "gender"].map((key) => (
            <div
              key={key}
              onClick={() => setSelected(key)}
              className={`p-4 mb-2 cursor-pointer ${
                selected === key ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-4xl">
            {(sorted[0][1] * 100).toFixed(0)}%
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[250px]">
          {sorted.map(([label, value]: any) => (
            <div
              key={label}
              className="flex justify-between py-2 cursor-pointer"
            >
              <span>{label}</span>
              <span>{(value * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}