import React from "react";

export default function Button({
  className = "",
  variant = "default",
  children,
  ...props
}) {
  const base =
    "inline-flex  items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const styles = {
    default: "bg-[#377b87] text-white hover:opacity-90",
    outline:
      "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:bg-transparent",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
    link: "text-[#377b87] hover:underline px-0 py-0 shadow-none",
  };
  return (
    <button
      className={`${base} ${styles[variant] || styles.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
