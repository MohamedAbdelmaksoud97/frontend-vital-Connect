import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

export default function TermsPrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">Terms & Privacy</h1>

      <Card>
        <CardContent className="space-y-5 p-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold">1. Terms of Use</h2>
          <p>
            By using Vital Connect, you agree to follow our platform guidelines
            and respect our community values.
          </p>

          <h2 className="text-xl font-semibold">2. Privacy Policy</h2>
          <p>
            Your data is securely stored and never sold. We collect information
            only to improve your healthcare experience and provide accurate
            appointment management.
          </p>

          <h2 className="text-xl font-semibold">3. Data Security</h2>
          <p>
            All medical and personal information is encrypted, protected, and
            shared only with your consent.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you have privacy concerns, feel free to contact us anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
