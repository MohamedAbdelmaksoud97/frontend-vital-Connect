import React from "react";

export const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);
