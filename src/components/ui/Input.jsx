import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-700 dark:text-gray-200">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
      />
    </label>
  );
}
