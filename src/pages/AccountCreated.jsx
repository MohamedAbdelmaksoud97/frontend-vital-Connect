// pages/VerifyEmailPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MailCheck, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AccountCreated({ email }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4">
      <Card className="w-full border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:border-emerald-900/60 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <CardContent className="p-6 sm:p-8">
          {/* Icon + badge */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
              <MailCheck className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Account created successfully
            </p>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
              Verify your email to get started
            </h1>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              We’ve sent a verification link
              {email ? (
                <>
                  {" "}
                  to{" "}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {email}
                  </span>
                  .
                </>
              ) : (
                " to your email address."
              )}{" "}
              Please check your inbox (and spam folder) and click the link to
              activate your account.
            </p>
          </div>

          {/* Helpful tips */}
          <div className="mt-4 rounded-xl bg-white/70 p-4 text-xs text-gray-600 shadow-sm backdrop-blur-sm dark:bg-slate-900/60 dark:text-gray-300">
            <ul className="space-y-1.5 text-left">
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  Didn’t get the email? Wait a minute or two and refresh your
                  inbox.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Check your spam or promotions folder just in case.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>
                  If the link expires, you can request a new verification email
                  from the login page.
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            {/* (Optional) Resend button – wire it up later if you have an endpoint */}
            {/* <Button variant="outline" size="sm" onClick={handleResend}>
              Resend verification email
            </Button> */}

            <Button className="w-full sm:w-auto" onClick={handleGoHome}>
              Back to home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
