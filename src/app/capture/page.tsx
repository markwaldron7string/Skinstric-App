"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCamera } from "react-icons/md";
import Link from "next/link";

export default function CapturePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const [stream, setStream] = useState<MediaStream | null>(null);

  // 🎥 Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        setStream(mediaStream);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      // cleanup camera
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // 📸 Take picture
  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];

    // send back to upload flow
    localStorage.setItem("capturedImage", base64);

    router.push("/upload"); // or results flow later
  };

  return (
    <div className="fixed inset-0 bg-black">

      {/* VIDEO FEED */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* DARK OVERLAY (optional for contrast) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* HEADER (CUSTOM - NO NAVBAR) */}
      <div className="
        absolute top-0 
        left-0 w-full 
        flex justify-between 
        items-center px-[40px] py-[24px] 
        z-20 text-white
      ">
        <div className="text-[12px] max-[230px]:flex flex-col tracking-[0.15em]">
          <Link href="/">
            <span className="font-semibold">SKINSTRIC</span>
          </Link>
          <span className="ml-2 opacity-60 cursor-default">[ INTRO ]</span>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="
        absolute bottom-[80px] 
        w-full text-center text-white 
        text-xs tracking-[0.15em] 
        cursor-default
        max-[662px]:mb-24
        ">
        TO GET BETTER RESULTS MAKE SURE TO HAVE
        <div className="mt-2 flex justify-center gap-6 text-[10px] max-[360px]:flex-col">
          <span>◇ NEUTRAL EXPRESSION</span>
          <span>◇ FRONTAL POSE</span>
          <span>◇ ADEQUATE LIGHTING</span>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div
        className="
        absolute left-[64px] bottom-[64px]
        max-[640px]:left-1/2
        -translate-x-1/2
        bottom-[80px]
        text-white
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
        <div className="sm:hidden text-white">
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
                bg-transparent
                cursor-pointer
                group
              "
            >
              <span
                className="
                -rotate-45 text-[11px]
                text-white
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

      {/* CAPTURE BUTTON (RIGHT SIDE) */}
      <div
        onClick={handleCapture}
        className="
          absolute right-[40px] 
          top-1/2 -translate-y-1/2 
          flex items-center gap-3 
          text-white 
          cursor-pointer group
          max-[640px]:left-1/2
          max-[640px]:right-auto
          max-[640px]:top-auto
          max-[640px]:bottom-[60px]
          max-[640px]:-translate-x-1/2
          max-[640px]:-translate-y-44
          max-[360px]:-translate-y-60
          max-[328px]:-translate-y-66
          max-[175px]:-translate-y-70
          ">
        <span className="text-xs tracking-[0.1em] max-[640px]:hidden">TAKE PICTURE</span>
        <MdOutlineCamera size={42} 
          className="
            group-hover:scale-110 
            transition
            max-[640px]:size-16
            " 
            />
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
        className="stroke-[white]"
        strokeWidth="2"
        strokeDasharray="0 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

<style jsx global>{`
  @keyframes cameraPulse {
    0% {
      transform: scale(1);
      opacity: 1;
      color: white;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.4;
      color: white;
    }
    100% {
      transform: scale(1);
      opacity: 1;
      color: white;
    }
  }`}</style>