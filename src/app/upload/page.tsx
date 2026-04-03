"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Upload Your Image</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();

          reader.onloadend = () => {
            const base64 = reader.result as string;

            // remove "data:image/...;base64,"
            const cleanBase64 = base64.split(",")[1];

            setImage(cleanBase64);
          };

          reader.readAsDataURL(file);
        }}
      />

      <button
        onClick={async () => {
          if (!image) {
            alert("Please upload an image");
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
              },
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
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Analyze Image
      </button>
      {image && <p className="text-xs">Image loaded ✅</p>}
    </div>
  );
}
