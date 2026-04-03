"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState<any>(null);
  const [selected, setSelected] = useState({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("results");
    if (stored) {
      setResults(JSON.parse(stored));
    }

    const savedSelections = localStorage.getItem("userSelections");
    if (savedSelections) {
        setSelected(JSON.parse(savedSelections));
    }
  }, []);

  if (!results) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { race, age, gender } = results.data;

  const formatAndSort = (obj: any) => {
    return Object.entries(obj)
      .sort((a: any, b: any) => b[1] - a[1])
      .map(([key, value]: any) => ({
        label: key,
        value: (value * 100).toFixed(2),
      }));
  };

  const handleSelect = (category: string, value: string) => {
    const updated = {
      ...selected,
      [category]: value,
    };

    setSelected(updated);

    localStorage.setItem("userSelections", JSON.stringify(updated));
  };

  const raceData = formatAndSort(race);
  const ageData = formatAndSort(age);
  const genderData = formatAndSort(gender);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar selected={selected} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Results</h1>

        {/* Race */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Race</h2>

          {raceData.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect("race", item.label)}
              className={`flex justify-between border p-2 rounded mb-2 cursor-pointer ${
                selected.race === item.label
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Age */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Age</h2>

          {ageData.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect("age", item.label)}
              className={`flex justify-between border p-2 rounded mb-2 cursor-pointer ${
                selected.age === item.label
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>

        {/* Gender */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Gender</h2>

          {genderData.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect("gender", item.label)}
              className={`flex justify-between border p-2 rounded mb-2 cursor-pointer ${
                selected.gender === item.label
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
