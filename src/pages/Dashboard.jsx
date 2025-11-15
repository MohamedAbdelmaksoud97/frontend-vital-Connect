// pages/Dashboard.jsx
import React from "react";
import { ShieldCheck, Clock, PhoneCall } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Dashboard() {
  return (
    <section className="mx-auto mt-12 max-w-3xl px-4">
      <Card className="border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:border-emerald-900/60 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <CardContent className="p-6 sm:p-8">
          {/* Icon + title */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Doctor profile submitted
            </p>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
              We&apos;re verifying your profile
            </h1>

            <p className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-300">
              Thank you for joining our platform. Our team is reviewing your
              doctor profile to verify your identity and confirm that you’re
              eligible for enrollment.
            </p>
          </div>

          {/* Info / steps */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
                <Clock className="h-4 w-4" />
                Review in progress
              </div>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                Our team is checking your details, experience, and clinic
                information to keep the platform safe and trustworthy.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                Identity verification
              </div>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                We may reach out to you to verify your identity, medical
                license, and other credentials if needed.
              </p>
            </div>

            <div className="rounded-xl bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm dark:bg-slate-900/70">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
                <PhoneCall className="h-4 w-4" />
                We&apos;ll contact you
              </div>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                Once everything is confirmed, we&apos;ll contact you and
                activate your account so patients can start booking with you.
              </p>
            </div>
          </div>

          {/* Bottom note / CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              If you have any questions during this process, feel free to reach
              out to our support team.
            </p>
            <Button
              variant="outline"
              className="text-xs sm:text-sm"
              onClick={() => {
                window.location.href = "mailto:support@example.com";
              }}
            >
              Contact support
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
