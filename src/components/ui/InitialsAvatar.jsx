import React from "react";

export default function InitialsAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377b87]/10 font-bold text-[#377b87]">
      {initials}
    </div>
  );
}
