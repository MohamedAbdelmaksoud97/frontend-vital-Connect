import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="mb-3 text-3xl font-extrabold">Vital Connect Blog</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Healthcare insights, wellness tips, medical updates — all in one place.
      </p>

      <Card className="mx-auto max-w-md">
        <CardContent className="p-6 text-gray-700 dark:text-gray-300">
          🚧 <span className="font-semibold">Our blog is launching soon!</span>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Stay tuned for expert tips, health advice, and product updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
