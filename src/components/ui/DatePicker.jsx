import React, { useState } from "react";
import Button from "./Button";

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const parse = (v) => (v ? new Date(v) : today);
  const [cursor, setCursor] = useState(parse(value));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const weeks = [];
  let day = 1 - startWeekday;
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++, day++) row.push(new Date(year, month, day));
    weeks.push(row);
  }
  const fmt = (dt) => dt.toISOString().slice(0, 10);
  const displayLabel = value
    ? new Date(value).toLocaleDateString()
    : "Select date";
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
        <div className="absolute z-10 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setCursor(new Date(year, month - 1, 1))}
            >
              ‹
            </button>
            <div className="text-sm font-semibold">
              {cursor.toLocaleString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setCursor(new Date(year, month + 1, 1))}
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
            {"SMTWTFS".split("").map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {weeks.flat().map((dt, i) => {
              const inMonth = dt.getMonth() === month;
              const isSelected = value && fmt(dt) === value;
              const classes = [
                "rounded-xl py-2 text-sm text-center",
                inMonth ? "" : "text-gray-400",
                isSelected
                  ? "bg-[#377b87] text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800",
              ].join(" ");
              return (
                <button
                  type="button"
                  key={i}
                  className={classes}
                  onClick={() => {
                    onChange(fmt(dt));
                    setOpen(false);
                  }}
                >
                  {dt.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                onChange(fmt(today));
                setOpen(false);
              }}
            >
              Today
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
