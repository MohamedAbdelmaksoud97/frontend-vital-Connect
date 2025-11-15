import React from "react";
import Button from "./Button";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#377b87] dark:border-gray-800 dark:bg-gray-900"
      >
        <span className="pl-2" aria-hidden>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 15.5L20 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by doctor name or specialization..."
          className="w-full bg-transparent px-2 py-2 text-base outline-none placeholder:text-gray-400"
        />
        <Button type="submit" className="shrink-0">
          Search
        </Button>
      </form>
    </div>
  );
}
