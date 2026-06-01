"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCamera } from "react-icons/md";
import Link from "next/link";
import { RiPlayReverseFill } from "react-icons/ri";

const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
};

export default function CapturePage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      return mediaStream;
    } catch (err) {
      console.error("Camera error:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    startCamera().then((s) => {
      mediaStream = s;
    });

    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [startCamera]);

  const handleCapture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    // Draw raw (non-mirrored) frame so the API gets the true face orientation
    ctx?.drawImage(video, 0, 0);

    const base64Full = canvas.toDataURL("image/jpeg", 0.95);

    setCapturedImage(base64Full);
    stream?.getTracks().forEach((track) => track.stop());
  };

  const handleRetake = async () => {
    setCapturedImage(null);
    await startCamera();
  };

  const handleUsePhoto = async () => {
    if (!capturedImage) return;

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
  };

  return (
    <div className="fixed inset-0 bg-black">
      {capturedImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={capturedImage}
          alt="Captured preview"
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {capturedImage && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-sm tracking-[0.2em] cursor-default z-10">
          GREAT SHOT!
        </div>
      )}

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-20 text-white">
        <div className="text-[12px] tracking-[0.15em]">
          <Link href="/">
            <span className="font-semibold">SKINSTRIC</span>
          </Link>
          <span className="ml-2 opacity-60 cursor-default">[ INTRO ]</span>
        </div>
      </div>

      {/* DESKTOP: Capture button (right side, vertically centered) */}
      {!capturedImage && (
        <div
          onClick={handleCapture}
          className="
            hidden md:flex
            absolute right-10 top-1/2 -translate-y-1/2
            items-center gap-3
            text-white cursor-pointer group z-10
          "
        >
          <span className="text-xs tracking-widest">TAKE PICTURE</span>
          <MdOutlineCamera
            size={42}
            className="group-hover:scale-110 transition"
          />
        </div>
      )}

      {/* DESKTOP: Preview buttons */}
      {capturedImage && (
        <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 flex-col items-center gap-4 text-white z-10">
          <p className="text-sm font-semibold cursor-default">Preview</p>
          <div className="flex gap-4">
            <button
              onClick={handleRetake}
              className="px-5 py-2 bg-gray-200 opacity-70 text-black text-xs cursor-pointer rounded-sm hover:opacity-90 transition"
            >
              Retake
            </button>
            <button
              onClick={handleUsePhoto}
              className="px-5 py-2 bg-black opacity-70 text-white text-xs cursor-pointer rounded-sm hover:opacity-90 transition"
            >
              Use Photo
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP: Instructions */}
      {!capturedImage && (
        <div className="hidden md:block absolute bottom-20 w-full text-center text-white text-xs tracking-[0.15em] cursor-default z-10">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
          <div className="mt-2 flex justify-center gap-6 text-[10px]">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}

      {/* DESKTOP: Back button */}
      <div
        onClick={() => router.back()}
        className="hidden md:flex absolute left-16 bottom-16 items-center gap-3 cursor-pointer group text-white z-10"
      >
        <div className="w-8 h-8 border rotate-45 flex items-center justify-center transition-transform group-hover:scale-110">
          <span className="-rotate-45 text-[20px]">
            <RiPlayReverseFill />
          </span>
        </div>
        <span className="text-[12px] tracking-[0.08em] pl-2">BACK</span>
      </div>

      {/* MOBILE: Full bottom bar */}
      <div className="md:hidden absolute bottom-0 left-0 w-full z-10">
        {!capturedImage ? (
          <div className="flex flex-col items-center pb-10 pt-4 gap-5 text-white">
            {/* Instructions */}
            <div className="text-center text-[10px] tracking-[0.13em] px-4">
              <p className="mb-2 opacity-80">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
              <div className="flex justify-center gap-3 flex-wrap opacity-70 text-[9px]">
                <span>◇ NEUTRAL EXPRESSION</span>
                <span>◇ FRONTAL POSE</span>
                <span>◇ ADEQUATE LIGHTING</span>
              </div>
            </div>

            {/* Capture button */}
            <button
              onClick={handleCapture}
              className="cursor-pointer active:scale-95 transition-transform"
              aria-label="Take picture"
            >
              <MdOutlineCamera size={72} />
            </button>

            {/* Back */}
            <button
              onClick={() => router.back()}
              className="text-[11px] tracking-[0.12em] opacity-60 hover:opacity-100 transition cursor-pointer"
            >
              BACK
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center pb-10 pt-4 gap-5 text-white">
            <p className="text-sm font-semibold cursor-default">Preview</p>
            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className="px-5 py-2.5 bg-gray-200 opacity-75 text-black text-xs cursor-pointer rounded-sm active:scale-95 transition"
              >
                Retake
              </button>
              <button
                onClick={handleUsePhoto}
                className="px-5 py-2.5 bg-black opacity-75 text-white text-xs cursor-pointer rounded-sm active:scale-95 transition"
              >
                Use Photo
              </button>
            </div>
            <button
              onClick={() => router.back()}
              className="text-[11px] tracking-[0.12em] opacity-60 hover:opacity-100 transition cursor-pointer"
            >
              BACK
            </button>
          </div>
        )}
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

// Diamond is used by other components that may import from this file
export { Diamond };
