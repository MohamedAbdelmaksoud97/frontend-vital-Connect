import React from "react";

export default function Avatar({ src, name = "", size = 32, className = "" }) {
  // Generate initials from the name
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return src ? (
    <img
      src={src}
      alt={name || "User avatar"}
      width={size}
      height={size}
      className={`inline-block rounded-full object-cover ${className}`}
      referrerPolicy="no-referrer"
    />
  ) : (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center rounded-full bg-[#377b87]/10 font-semibold text-[#377b87] ${className}`}
    >
      {initials || "U"} {/* Default to 'U' if no initials */}
    </span>
  );
}
