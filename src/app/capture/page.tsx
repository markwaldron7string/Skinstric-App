"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCamera } from "react-icons/md";
import Link from "next/link";
import { RiPlayReverseFill } from "react-icons/ri";

export default function CapturePage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start camera
  useEffect(() => {
    let mediaStream: MediaStream;

    const startCamera = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
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
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Take picture
  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const base64Full = canvas.toDataURL("image/jpeg");

    setCapturedImage(base64Full);

    stream?.getTracks().forEach((track) => track.stop());
  };

  return (
    <div className="fixed inset-0 bg-black">
      {capturedImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={capturedImage}
            alt="Captured preview"
            className="w-full h-full object-cover"
          />
        </>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      )}

      {/* DARK OVERLAY (optional for contrast) */}
      <div className="absolute inset-0 bg-black/20" />

      {capturedImage && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-sm tracking-[0.2em] cursor-default">
          GREAT SHOT!
        </div>
      )}

      {/* HEADER (CUSTOM - NO NAVBAR) */}
      <div
        className="
        absolute top-0 
        left-0 w-full 
        flex justify-between 
        items-center px-10 py-6 
        z-20 text-white
      "
      >
        <div className="text-[12px] max-[230px]:flex flex-col tracking-[0.15em]">
          <Link href="/">
            <span className="font-semibold">SKINSTRIC</span>
          </Link>
          <span className="ml-2 opacity-60 cursor-default">[ INTRO ]</span>
        </div>
      </div>

      {capturedImage && (
        <div
          className="
          absolute bottom-20 
          left-1/2 
          -translate-x-1/2 
          text-center 
          text-white
          max-[768px]:mb-18
          "
        >
          <p className="text-sm font-semibold mb-4 cursor-default">Preview</p>

          <div className="flex gap-4 justify-center max-[348px]:gap-2">
            {/* RETAKE */}
            <button
              onClick={() => {
                setCapturedImage(null);

                setTimeout(() => {
                  if (videoRef.current && stream) {
                    videoRef.current.srcObject = stream;

                    videoRef.current.play().catch(() => {
                      console.log("Video play interrupted");
                    });
                  }
                }, 50);
              }}
              className="
              px-4 py-2 
              bg-gray-200
              opacity-70
              text-black 
              text-xs 
              cursor-pointer
              rounded-sm     
              "
            >
              Retake
            </button>

            {/* USE PHOTO */}
            <button
              onClick={async () => {
                if (!capturedImage) return;

                // STOP CAMERA
                if (stream) {
                  stream.getTracks().forEach((track) => track.stop());
                }

                try {
                  const base64 = capturedImage.split(",")[1];

                  localStorage.setItem("image", base64);
                  router.push("/upload?loading=true");
                } catch (err) {
                  console.error(err);
                  alert("Something went wrong");
                }
              }}
              className="
                px-4 py-2
                bg-black
                opacity-70
                text-white 
                text-xs 
                cursor-pointer
                rounded-sm
                max-[348px]:w-20
              "
            >
              Use Photo
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM TEXT */}
      {!capturedImage && (
        <div
          className="
        absolute bottom-20 
        w-full text-center text-white 
        text-xs tracking-[0.15em] 
        cursor-default
        max-[768px]:mb-24
        "
        >
          TO GET BETTER RESULTS MAKE SURE TO HAVE
          <div className="mt-2 flex justify-center gap-6 text-[10px] max-[360px]:flex-col">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}

      {/* BACK BUTTON */}
      <div
        className="
          absolute left-16 bottom-16 flex items-center gap-3 cursor-pointer group
          max-[768px]:left-1/2
          max-[768px]:-translate-x-1/2
          max-[768px]:bottom-15
          "
      >
        {/* DESKTOP */}
        <div
          onClick={() => router.back()}
          className="hidden md:flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="-rotate-45 text-[20px]">
              <RiPlayReverseFill />
            </span>
          </div>
          <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
        </div>

        {/* MOBILE */}
        <div className="md:hidden text-white">
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
      {!capturedImage && (
        <div
          onClick={handleCapture}
          className="
          absolute right-10 
          top-1/2 -translate-y-1/2 
          flex items-center gap-3 
          text-white 
          cursor-pointer group
          max-[768px]:left-1/2
          max-[768px]:right-auto
          max-[768px]:top-auto
          max-[768px]:bottom-15
          max-[768px]:-translate-x-1/2
          max-[768px]:-translate-y-44
          max-[360px]:-translate-y-60
          max-[328px]:-translate-y-66
          max-[175px]:-translate-y-70
          "
        >
          <span className="text-xs tracking-widest max-[768px]:hidden">
            TAKE PICTURE
          </span>
          <MdOutlineCamera
            size={42}
            className="
            group-hover:scale-110 
            transition
            max-[768px]:size-16
            "
          />
        </div>
      )}
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
