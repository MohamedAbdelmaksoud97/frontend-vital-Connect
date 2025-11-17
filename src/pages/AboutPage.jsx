import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">About Vital Connect</h1>

      <Card>
        <CardContent className="space-y-4 p-6 text-gray-700 dark:text-gray-300">
          <p>
            Vital Connect is a modern healthcare platform built to make finding,
            booking, and managing medical appointments effortless. Our mission
            is to bridge the gap between patients and trusted healthcare
            professionals through technology, transparency, and accessibility.
          </p>

          <p>
            Whether you're searching for a specialist, booking your next visit,
            or managing prescriptions, Vital Connect brings everything into one
            simplified experience.
          </p>

          <p>
            We are committed to improving healthcare experience for everyone —
            patients, doctors, and clinics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
