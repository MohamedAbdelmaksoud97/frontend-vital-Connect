import React from "react";

export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="w-full">
      <div className="no-scrollbar flex w-full gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`rounded-full border px-4 py-2 text-sm whitespace-nowrap transition ${value === t ? "border-[#377b87] bg-[#377b87] text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
