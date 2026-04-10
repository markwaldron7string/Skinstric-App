"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCamera } from "react-icons/md";
import { RiImageCircleAiFill, RiPlayReverseFill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";

function UploadPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldAutoStart = searchParams.get("loading") === "true";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cameraStep, setCameraStep] = useState<
    "idle" | "confirm" | "loading" | "camera"
  >("idle");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const cleanBase64 = base64.split(",")[1];
      setImage(cleanBase64);
      handleAnalyze(cleanBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = useCallback(
    async (img?: string) => {
      const imageToSend = img || image;

      if (!imageToSend) return;

      setIsLoading(true);

      try {
        const res = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageToSend }),
          },
        );

        const data = await res.json();

        localStorage.setItem("analysisData", JSON.stringify(data.data));

        router.push("/select");
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    [image, router],
  );

  useEffect(() => {
    if (shouldAutoStart) {
      const storedImage = localStorage.getItem("image");
      if (storedImage) {
        handleAnalyze(storedImage);
      }
    }
  }, [shouldAutoStart, handleAnalyze]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCameraStep("idle");
      }
    };

    if (cameraStep !== "idle") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cameraStep]);

  return (
    <div className="w-full h-[calc(100vh-64px)] bg-white relative overflow-hidden">
      {isLoading && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-white flex items-center justify-center z-200">
          {/* CENTER CONTENT */}
          <div className="flex flex-col items-center justify-center text-center -translate-y-6">
            <RotatingDiamonds />

            <p className="text-sm tracking-[0.2em] text-[#1A1B1C] mt-6">
              PREPARING YOUR ANALYSIS...
            </p>

            <div className="flex gap-2 mt-3">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
          {/* BACK BUTTON */}
          <div
            className="
          absolute left-16 bottom-16
          max-[640px]:left-1/2
          max-[640px]:-translate-x-1/2
          max-[640px]:bottom-20
        "
          >
            {/* DESKTOP */}
            <div
              onClick={() => router.back()}
              className="hidden sm:flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="-rotate-45 text-[20px]">
                  <RiPlayReverseFill />
                </span>
              </div>
              <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
            </div>

            {/* MOBILE */}
            <div className="sm:hidden">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute animate-spin-outer opacity-20">
                  <Diamond size={80} />
                </div>

                <div className="absolute animate-spin-middle opacity-40">
                  <Diamond size={60} />
                </div>

                <div
                  onClick={() => router.back()}
                  className="relative w-12 h-12 border rotate-45 flex items-center justify-center bg-white cursor-pointer group"
                >
                  <span className="-rotate-45 text-[11px] text-[#1A1B1C] group-hover:scale-110 transition">
                    BACK
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* TOP RIGHT PREVIEW */}
          {image && (
            <div className="absolute top-10 right-10 text-right">
              <p className="text-xs text-gray-500 mb-2">Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt="Uploaded preview"
                className="w-25 h-25 object-cover border"
              />
            </div>
          )}
        </div>
      )}
      {/* MAIN */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="
          flex items-center justify-between
          w-250
          lg:w-225
          lg:mb-40
          max-[1094px]:w-197.5
          
          /* STACK AT 886px */
          max-[886px]:flex-col
          max-[886px]:gap-20
          max-[886px]:mb-12
          max-[640px]:gap-5
        "
        >
          {/* CAMERA */}
          <div
            className="
            relative flex items-center justify-center group
            w-75 h-75

            max-[1240px]:scale-90
            max-[1024px]:scale-80
            max-[886px]:scale-70
            max-[640px]:scale-60
          "
          >
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
              <RotatingDiamonds />
            </div>

            <div
              onClick={() => setCameraStep("confirm")}
              className="z-50 cursor-pointer text-[#1A1B1C] transition-transform duration-300 group-hover:scale-110"
            >
              <MdOutlineCamera
                className="
                text-[128px]
                max-[324px]:text-[90px]
              "
              />
            </div>

            {/* WAND (HIDDEN AT 524px) */}
            <div className="absolute inset-0 pointer-events-none max-[524px]:hidden">
              <div className="absolute left-1/2 top-1/2 w-24 h-px bg-[#1A1B1C]/70 origin-left rotate-316 translate-x-5 -translate-y-12.5" />

              <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 border border-[#1A1B1C]/70 rounded-full translate-x-22 -translate-y-30.25" />

              <div className="absolute left-1/2 top-1/2 translate-x-26.5 -translate-y-32">
                <p className="text-[12px] text-gray-600 font-medium tracking-[0.12em] leading-5">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
              </div>
            </div>

            {/* MOBILE TEXT (≤524px) */}
            <div className="hidden max-[524px]:block pointer-events-none absolute mb-42 font-bold text-center w-full">
              <p className="text-[11px] tracking-[0.12em] text-gray-600">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </p>
            </div>
          </div>

          {/* GALLERY */}
          <div
            className="
            relative flex items-center justify-center group
            w-75 h-75
            max-[1240px]:scale-90
            max-[1024px]:scale-80
            max-[886px]:scale-70
            max-[640px]:scale-60
          "
          >
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
              <RotatingDiamonds />
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="z-10 cursor-pointer text-[#1A1B1C] transition-transform duration-300 group-hover:scale-110"
            >
              <RiImageCircleAiFill
                className="
                text-[128px]
                max-[324px]:text-[90px]
              "
              />
            </div>

            {/* WAND (HIDDEN AT 524px) */}
            <div className="absolute inset-0 pointer-events-none max-[524px]:hidden">
              <div className="absolute left-1/2 top-1/2 w-24 h-px bg-[#1A1B1C]/70 origin-right -rotate-44 -translate-x-31.5 translate-y-11" />

              <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 border border-[#1A1B1C]/70 rounded-full -translate-x-26 translate-y-27.5" />

              <div className="absolute left-1/2 top-1/2 -translate-x-63 translate-y-28 text-right">
                <p className="text-[12px] text-gray-600 font-medium tracking-[0.12em] leading-5">
                  ALLOW A.I.
                  <br />
                  TO ACCESS GALLERY
                </p>
              </div>
            </div>

            {/* MOBILE TEXT (≤524px) */}
            <div className="hidden max-[524px]:block pointer-events-none font-bold absolute mt-42 text-center w-full">
              <p className="text-[11px] tracking-[0.12em] text-gray-600">
                ALLOW A.I.
                <br />
                TO ACCESS GALLERY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* TOP LEFT */}
      <div
        className="
        absolute top-0.5
        left-8
        text-gray-600 font-bold text-[12px] tracking-[0.08em]
        max-[324px]:left-1/2
        max-[324px]:-translate-x-1/2
        max-[324px]:text-center
        select-none
        cursor-default
      "
      >
        TO START ANALYSIS
      </div>

      {/* BACK BUTTON */}
      <div
        className="
        absolute left-16 bottom-16
        max-[640px]:left-1/2
        max-[640px]:-translate-x-1/2
        max-[640px]:bottom-20
        text-black
      "
      >
        {/* DESKTOP */}
        <div
          onClick={() => router.back()}
          className="hidden sm:flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[20px]">
              <RiPlayReverseFill />
            </span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>

        {/* MOBILE */}
        <div className="sm:hidden text-gray-200">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* OUTER */}
            <div className="absolute animate-spin-outer opacity-20">
              <Diamond size={80} />
            </div>

            {/* INNER */}
            <div className="absolute animate-spin-middle opacity-40">
              <Diamond size={60} />
            </div>

            {/* BUTTON */}
            <div
              onClick={() => router.back()}
              className="
                relative w-12 h-12
                border rotate-45
                flex items-center justify-center
                bg-white
                cursor-pointer
                group
              "
            >
              <span
                className="
                -rotate-45 text-[11px]
                text-[#1A1B1C]
                transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-110
              "
              >
                BACK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CAMERA CONFIRM MODAL */}
      {cameraStep === "confirm" && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-100"
          onClick={() => setCameraStep("idle")}
        >
          <div
            className="bg-black text-white w-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP SECTION */}
            <div className="px-8 pt-4 pb-8">
              <p className="text-lg tracking-wide select-none cursor-default">
                ALLOW A.I. TO ACCESS YOUR CAMERA
              </p>
            </div>

            {/* FULL WIDTH DIVIDER */}
            <div className="w-full h-px bg-white/60" />

            {/* BUTTON ROW */}
            <div className="flex justify-between px-12 py-3 text-sm">
              <button
                onClick={() => setCameraStep("idle")}
                className="text-gray-400 hover:text-gray-500 font-semibold transition cursor-pointer"
              >
                DENY
              </button>

              <button
                onClick={() => {
                  setCameraStep("loading");

                  setTimeout(() => {
                    router.push("/capture");
                  }, 1500);
                }}
                className="text-white hover:opacity-80 font-semibold transition cursor-pointer"
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CAMERA LOADING */}
      {cameraStep === "loading" && (
        <div className="fixed inset-0 bg-white flex items-center justify-center pt-60 z-120">
          <div
            className="
            flex flex-col items-center justify-center text-center
            mb-12
            max-[540px]:scale-75
            max-[400px]:scale-65 
          "
          >
            {/* DIAMONDS */}
            <div className="relative flex items-center justify-center">
              <RotatingDiamonds />

              {/* CAMERA ICON */}
              <div className="absolute animate-camera-pulse text-[#1A1B1C]">
                <MdOutlineCamera className="text-[120px] max-[540px]:text-[80px]" />
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-16 text-[12px] font-semibold text-gray-400 tracking-[0.2em] animate-text-pulse">
              SETTING UP CAMERA...
            </p>

            {/* BOTTOM TEXT */}
            <div className="mt-46 text-[13px] font-semibold tracking-[0.08em] text-gray-500 space-y-4">
              <p className="uppercase">
                To get better results make sure to have
              </p>

              <div className="flex gap-6 justify-center max-[324px]:gap-4 max-[280px]:flex-col">
                <span>◇ NEUTRAL EXPRESSION</span>
                <span>◇ FRONTAL POSE</span>
                <span>◇ ADEQUATE LIGHTING</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* DIAMONDS */
function RotatingDiamonds({ small = false }: { small?: boolean }) {
  const size = small ? 140 : 380;

  return (
    <>
      <div className="diamond d1" />
      <div className="diamond d2" />
      <div className="diamond d3" />

      <style jsx>{`
        .diamond {
          position: absolute;
          pointer-events: none;
          width: ${size}px;
          height: ${size}px;
          transform: rotate(45deg);
          border-style: dotted;
        }

        .d1 {
          border: 3px dotted rgba(0, 0, 0, 0.06);
          animation: spin 60s linear infinite;
        }

        .d2 {
          width: ${size - 40}px;
          height: ${size - 40}px;
          border: 3px dotted rgba(0, 0, 0, 0.12);
          animation: spin 80s linear infinite;
        }

        .d3 {
          width: ${size - 80}px;
          height: ${size - 80}px;
          border: 3px dotted rgba(0, 0, 0, 0.2);
          animation: spin 100s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(45deg) rotate(0deg);
          }
          to {
            transform: rotate(45deg) rotate(360deg);
          }
        }
      `}</style>
    </>
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

export default function UploadPage() {
  return (
    <Suspense fallback={null}>
      <UploadPageContent />
    </Suspense>
  );
}
