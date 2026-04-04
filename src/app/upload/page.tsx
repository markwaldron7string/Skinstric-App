"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  // 📸 Capture selfie
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (!imageSrc) return;

    const base64 = imageSrc.split(",")[1];
    setImage(base64);
  };

  // 📁 Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      const cleanBase64 = base64.split(",")[1];
      setImage(cleanBase64);
    };

    reader.readAsDataURL(file);
  };

  // 🚀 Send to API
  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload or capture an image");
      return;
    }

    try {
      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image }),
        }
      );

      const data = await res.json();
      console.log("API response:", data);

      // Save results
      localStorage.setItem("results", JSON.stringify(data));

      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-10 gap-6">
      <h1 className="text-3xl font-bold">Upload or Take a Selfie</h1>

      <p className="text-gray-500">
        Upload an image OR take a selfie
      </p>

      {/* 📸 Webcam */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-64 h-48 rounded border"
      />

      <button
        onClick={capture}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Take Selfie
      </button>

      {/* 📁 File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mt-4"
      />

      {/* 🖼 Preview */}
      {image && (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="Preview"
          className="w-40 rounded mt-4 border"
        />
      )}

      {/* 🚀 Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-4"
      >
        Analyze Image
      </button>
    </div>
  );
}