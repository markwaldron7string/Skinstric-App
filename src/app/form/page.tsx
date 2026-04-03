"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const isValid = (value: string) => /^[A-Za-z\s]+$/.test(value);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold text-center">Enter Your Info</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={async () => {
            if (!name || !location) {
              alert("Please fill in all fields");
              return;
            }

            if (!isValid(name) || !isValid(location)) {
              alert("Only letters allowed");
              return;
            }

            try {
                const res = await fetch(
                    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name, location }),
                    }
                );

                const data = await res.json();
                console.log("API response", data);

                // Save locally
                localStorage.setItem(
                    "user",
                    JSON.stringify({ name, location })
                );
            
                router.push("/upload");

            } catch (error) {
                console.error("API error:", error);
                alert("Something went wrong. Try again.");
            }
          }}
          className="bg-blue-500 text-white py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
