import React from "react";
import { Card, CardContent } from "@/components/ui/Card";

export default function HelpCenterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">Help Center</h1>

      <Card>
        <CardContent className="space-y-5 p-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

          <div>
            <h3 className="font-medium">How do I book an appointment?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search for a doctor → View profile → Choose a time → Confirm
              booking.
            </p>
          </div>

          <div>
            <h3 className="font-medium">How do I create a doctor account?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click "Join as a Doctor" and follow the verification steps.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Can I manage prescriptions online?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Yes. Patients can view all prescriptions from the "Prescriptions"
              section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
