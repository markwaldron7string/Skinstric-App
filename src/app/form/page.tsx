"use client";

import { useState } from "react";

export default function FormPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white relative flex items-center justify-center">

      {/* BACK BUTTON */}
      <div className="absolute top-[32px] left-[32px] text-[12px] tracking-[0.08em] cursor-pointer">
        ← BACK
      </div>

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[400px] px-6">

        <h1 className="text-[32px] tracking-[-0.02em]">
          Enter your details
        </h1>

        {/* NAME INPUT */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full border-b border-[#1A1B1C]
            py-3 outline-none
            text-[16px]
          "
        />

        {/* LOCATION INPUT */}
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="
            w-full border-b border-[#1A1B1C]
            py-3 outline-none
            text-[16px]
          "
        />

      </div>

      {/* CTA (we’ll animate later) */}
      <div className="absolute bottom-[32px] right-[32px] text-[12px] tracking-[0.08em] opacity-30">
        NEXT →
      </div>

    </div>
  );
}