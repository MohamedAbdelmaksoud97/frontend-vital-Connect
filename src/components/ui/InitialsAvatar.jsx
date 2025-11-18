import React from "react";

export default function InitialsAvatar({ name = "", doc }) {
  const assetsBase = import.meta.env.VITE_ASSETS_BASE;
  const profilePic = doc?.userId?.profilePic;

  let imageUrl = null;

  if (profilePic) {
    // If profilePic is already a full URL (e.g. from Cloudinary, S3, etc.)
    if (profilePic.startsWith("http://") || profilePic.startsWith("https://")) {
      imageUrl = profilePic;
    } else if (assetsBase) {
      // Safely join base URL and path, avoiding double slashes
      const base = assetsBase.replace(/\/+$/, "");
      imageUrl = `${base}/img/profilePics/${profilePic}`;
    }
  }

  console.log(imageUrl);
  console.log("InitialsAvatar doc:", doc);
  console.log("InitialsAvatar profilePic:", profilePic);
  console.log("InitialsAvatar imageUrl:", imageUrl);

  // If we have a valid image URL, show the image
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name || "Profile picture"}
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }

  // Fallback: initials avatar
  const safeName = name.trim() || "U N"; // fallback to avoid crash on empty string
  const initials = safeName
    .split(/\s+/)
    .map((n) => n[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377b87]/10 font-bold text-[#377b87]">
      {initials}
    </div>
  );
}
