"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { MdOutlineCamera } from "react-icons/md";
import { RiImageCircleAiFill } from "react-icons/ri";

export default function UploadPage() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [cameraStep, setCameraStep] = useState<"idle" | "confirm" | "camera">(
    "idle",
  );

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const base64 = imageSrc.split(",")[1];

    setImage(base64);
    setCameraStep("idle");

    setIsAnalyzing(true);
    handleAnalyze(base64);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const cleanBase64 = base64.split(",")[1];
      setImage(cleanBase64);
      setIsAnalyzing(true);
      handleAnalyze(cleanBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (img?: string) => {
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

      localStorage.setItem("results", JSON.stringify(data));

      alert("Image analyzed successfully!");
      router.push("/results");

      // later → router.push("/results")
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

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
      <div className="fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white flex items-center justify-center z-[200]">
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
        <div className="
          absolute left-[64px] bottom-[64px]
          max-[640px]:left-1/2
          max-[640px]:-translate-x-1/2
          max-[640px]:bottom-[80px]
        ">
          {/* DESKTOP */}
          <div
            onClick={() => router.back()}
            className="hidden sm:flex items-center gap-[12px] cursor-pointer group"
          >
            <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="-rotate-45 text-[14px] pr-1">◀</span>
            </div>
            <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
          </div>

          {/* MOBILE */}
          <div className="sm:hidden">
            <div className="relative w-[64px] h-[64px] flex items-center justify-center">
              <div className="absolute animate-spin-outer opacity-20">
                <Diamond size={80} />
              </div>

              <div className="absolute animate-spin-middle opacity-40">
                <Diamond size={60} />
              </div>

              <div
                onClick={() => router.back()}
                className="relative w-[48px] h-[48px] border rotate-45 flex items-center justify-center bg-white cursor-pointer group"
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
            <img
              src={`data:image/jpeg;base64,${image}`}
              className="w-[100px] h-[100px] object-cover border"
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
          w-[1000px]
          max-[1240px]:w-[90%]
          max-[1024px]:w-[80%]

          /* 🔥 STACK AT 886px */
          max-[886px]:flex-col
          max-[886px]:gap-20

          mb-40
        "
        >
          {/* CAMERA */}
          <div
            className="
            relative flex items-center justify-center group
            w-[300px] h-[300px]

            max-[1240px]:scale-90
            max-[1024px]:scale-80
            max-[768px]:scale-70
            max-[324px]:scale-60
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
              <div className="absolute left-1/2 top-1/2 w-[96px] h-[1px] bg-[#1A1B1C]/70 origin-left rotate-[316deg] translate-x-[20px] translate-y-[-50px]" />

              <div className="absolute left-1/2 top-1/2 w-[6px] h-[6px] border border-[#1A1B1C]/70 rounded-full translate-x-[88px] translate-y-[-121px]" />

              <div className="absolute left-1/2 top-1/2 translate-x-[120px] translate-y-[-128px]">
                <p className="text-[12px] text-gray-600 font-medium tracking-[0.12em] leading-[20px]">
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
            w-[300px] h-[300px]
            max-[1240px]:scale-90
            max-[1024px]:scale-80
            max-[768px]:scale-70
            max-[324px]:scale-60
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
              <div className="absolute left-1/2 top-1/2 w-[96px] h-[1px] bg-[#1A1B1C]/70 origin-right -rotate-[44deg] translate-x-[-126px] translate-y-[44px]" />

              <div className="absolute left-1/2 top-1/2 w-[6px] h-[6px] border border-[#1A1B1C]/70 rounded-full translate-x-[-104px] translate-y-[110px]" />

              <div className="absolute left-1/2 top-1/2 translate-x-[-252px] translate-y-[112px] text-right">
                <p className="text-[12px] text-gray-600 font-medium tracking-[0.12em] leading-[20px]">
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
        absolute top-[2px]
        left-[32px]
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
        absolute left-[64px] bottom-[64px]
        max-[640px]:left-1/2
        max-[640px]:-translate-x-1/2
        max-[640px]:bottom-[80px]
        text-black
      "
      >
        {/* DESKTOP */}
        <div
          onClick={() => router.back()}
          className="hidden sm:flex items-center gap-[12px] cursor-pointer group"
        >
          <div className="w-[32px] h-[32px] border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[14px] pr-1">◀</span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>

        {/* MOBILE */}
        <div className="sm:hidden text-gray-200">
          <div className="relative w-[64px] h-[64px] flex items-center justify-center">
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
                relative w-[48px] h-[48px]
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
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
          onClick={() => setCameraStep("idle")}
        >
          <div
            className="bg-black text-white w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP SECTION */}
            <div className="px-8 pt-4 pb-8">
              <p className="text-lg tracking-wide select-none cursor-default">
                ALLOW A.I. TO ACCESS YOUR CAMERA
              </p>
            </div>

            {/* FULL WIDTH DIVIDER */}
            <div className="w-full h-[1px] bg-white/60" />

            {/* BUTTON ROW */}
            <div className="flex justify-between px-12 py-3 text-sm">
              <button
                onClick={() => setCameraStep("idle")}
                className="text-gray-400 hover:text-gray-500 font-semibold transition cursor-pointer"
              >
                DENY
              </button>

              <button
                onClick={() => setCameraStep("camera")}
                className="text-white hover:opacity-80 font-semibold transition cursor-pointer"
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CAMERA VIEW */}
      {cameraStep === "camera" && !isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[100]">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-[300px] rounded"
          />
          <button onClick={capture} className="mt-4 bg-white px-4 py-2">
            Capture
          </button>
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
