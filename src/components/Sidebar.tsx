"use client";

type Props = {
  selected: {
    race: string;
    age: string;
    gender: string;
  };
};

export default function Sidebar({ selected }: Props) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-semibold">{user.name || "-"}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-semibold">{user.location || "-"}</p>
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <p className="text-sm text-gray-500">Race</p>
        <p className="font-semibold">{selected.race || "-"}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Age</p>
        <p className="font-semibold">{selected.age || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Gender</p>
        <p className="font-semibold">{selected.gender || "-"}</p>
      </div>
    </div>
  );
}