import React from "react";
import { Card, CardContent } from "../ui/Card";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
          <div className="mt-6 space-y-4">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
