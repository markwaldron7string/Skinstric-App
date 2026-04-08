"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "name" | "city" | "loading" | "done";

export default function FormPage() {
  const [step, setStep] = useState<Step>("name");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const isValid = (val: string) => /^[a-zA-Z\s]+$/.test(val.trim());

  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;

    if (!isValid(value)) {
      setError("Only letters allowed");
      return;
    }

    setError("");

    if (step === "name") {
      setName(value);
      setValue("");
      setStep("city");
      return;
    }

    if (step === "city") {
      const finalName = name;
      const finalCity = value;

      setCity(value);
      setStep("loading");

      try {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: finalName, location: finalCity })
        );

        await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: finalName,
              location: finalCity,
            }),
          }
        );

        setTimeout(() => setStep("done"), 1200);
      } catch {
        setError("Something went wrong");
        setStep("city");
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white relative flex items-center justify-center">

      {/* CENTER WRAPPER */}
      <div className="relative flex flex-col items-center text-center -translate-y-[80px]">

        {/* ================= DIAMONDS ================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <div className="absolute animate-spin-outer opacity-30 scale-[0.4] min-[480px]:scale-[0.5] sm:scale-[0.7] md:scale-100">
            <Diamond size={800} />
          </div>

          <div className="absolute animate-spin-middle opacity-50 scale-[0.4] min-[480px]:scale-[0.5] sm:scale-[0.7] md:scale-100">
            <Diamond size={700} />
          </div>

          <div className="absolute animate-spin-inner opacity-70 scale-[0.4] min-[480px]:scale-[0.5] sm:scale-[0.7] md:scale-100">
            <Diamond size={600} />
          </div>

        </div>

        {/* ================= CONTENT ================= */}

        {(step === "name" || step === "city") && (
          <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-3">
            CLICK TO TYPE
          </p>
        )}

        {/* NAME */}
        {step === "name" && (
          <InputBlock
            value={value}
            setValue={setValue}
            handleEnter={handleEnter}
            placeholder="Introduce Yourself"
            width="75%"
          />
        )}

        {/* CITY */}
        {step === "city" && (
          <InputBlock
            value={value}
            setValue={setValue}
            handleEnter={handleEnter}
            placeholder="your city name"
            width="62%"
          />
        )}

        {/* LOADING */}
        {step === "loading" && (
          <>
            <p className="text-gray-500 mb-4 text-[14px] sm:text-[16px]">
              Processing submission
            </p>
            <div className="flex gap-2 justify-center">
              <span className="dot" />
              <span className="dot delay-150" />
              <span className="dot delay-300" />
            </div>
          </>
        )}

        {/* DONE */}
        {step === "done" && (
          <>
            <h2 className="text-gray-500 text-[22px] sm:text-[26px] md:text-[28px] mb-2">
              Thank you!
            </h2>
            <p className="text-gray-500 text-[14px] sm:text-[16px]">
              Proceed for the next step
            </p>
          </>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}
      </div>

      {/* TOP LEFT */}
      <div className="
        absolute top-[2px]
        left-[32px]
        text-gray-600 font-bold text-[12px] tracking-[0.08em]
        max-[324px]:left-1/2
        max-[324px]:-translate-x-1/2
        max-[324px]:text-center
        select-none
        cursor-default
      ">
        TO START ANALYSIS
      </div>

      {/* DESKTOP BUTTONS */}
      <div className="hidden sm:block text-black">
        <div
          onClick={() => router.back()}
          className="absolute left-[64px] bottom-[64px] flex items-center gap-[12px] cursor-pointer group"
        >
          <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[14px] pr-1">◀</span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>

        {step === "done" && (
          <div
            onClick={() => router.push("/upload")}
            className="absolute right-[64px] bottom-[64px] flex items-center gap-[12px] cursor-pointer group animate-bounce-once"
          >
            <span className="text-[12px] tracking-[0.08em] pr-2" >PROCEED</span>
            <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="-rotate-45 text-[14px] pl-1">▶</span>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BUTTONS */}
      <div className="
        sm:hidden
        absolute bottom-6 left-0 w-full px-6
        flex justify-between items-center
        max-[640px]:flex-col
        max-[640px]:bottom-14
        max-[640px]:gap-5
        max-[324px]:justify-center
        max-[324px]:gap-4
        max-[324px]:bottom-19
      ">
        <MobileButton label="BACK" left onClick={() => router.back()} />

        {step === "done" && (
          <MobileButton
            label="PROCEED"
            right
            onClick={() => router.push("/upload")}
          />
        )}
      </div>
    </div>
  );
}

/* ================= INPUT BLOCK ================= */
function InputBlock({ value, setValue, handleEnter, placeholder, width }) {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center justify-center gap-[6px]">

      <input
        autoFocus
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleEnter}
        className="
          w-full
          text-[clamp(28px,6vw,56px)]
          text-center
          text-[#1A1B1C]
          placeholder:text-[#9CA3AF]
          outline-none
          bg-transparent
          tracking-[-0.05em]
          leading-none
        "
        style={{
          fontFamily: "var(--font-roobert)",
          fontVariationSettings: '"wght" 400'
        }}
      />

      <div className="h-[1px] bg-[#c3cad1]" style={{ width }} />
    </div>
  );
}

/* ================= MOBILE BUTTON ================= */
function MobileButton({ label, onClick, left, right }) {
  return (
    <div>
      <div className="relative w-[64px] h-[64px] flex items-center justify-center">

        <div className="absolute animate-spin-outer opacity-20">
          <Diamond size={80} />
        </div>

        <div className="absolute animate-spin-middle opacity-40">
          <Diamond size={60} />
        </div>

        <div
          onClick={onClick}
          className="
            relative w-[48px] h-[48px]
            border rotate-45
            flex items-center justify-center
            bg-white
            cursor-pointer
            group
          "
        >
          <span className="
            -rotate-45 text-[11px]
            text-[#1A1B1C]
            transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-110
          ">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================= DIAMOND ================= */
function Diamond({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path
        d={`
          M ${size / 2} 0
          L ${size} ${size / 2}
          L ${size / 2} ${size}
          L 0 ${size / 2}
          Z
        `}
        fill="none"
        className="
          stroke-[#A0A4AB]
          max-[640px]:stroke-[#6B7280]
          max-[324px]:stroke-[#1A1B1C]
        "
        strokeWidth="2"
        strokeDasharray="0 6"
        strokeLinecap="round"
      />
    </svg>
  );
}