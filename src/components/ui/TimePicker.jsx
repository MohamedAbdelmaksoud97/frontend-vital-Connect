import React, { useState } from "react";

export default function TimePicker({ value, onChange, slots }) {
  const [open, setOpen] = useState(false);
  const displayLabel = value || "Select time";
  const list =
    slots && slots.length
      ? slots
      : [
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "15:00",
          "15:30",
          "16:00",
        ];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-left text-sm outline-none focus:ring-2 focus:ring-[#377b87] dark:border-gray-700 dark:bg-gray-950"
      >
        <span>{displayLabel}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="grid grid-cols-3 gap-2">
            {list.map((t) => (
              <button
                type="button"
                key={t}
                className={`rounded-xl px-2 py-2 text-sm ${value === t ? "bg-[#377b87] text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                onClick={() => {
                  onChange(t);
                  setOpen(false);
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
