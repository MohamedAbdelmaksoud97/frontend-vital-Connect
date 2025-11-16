import React, { use, useState } from "react";
//import { useSignup } from "@/hooks/useSignup";
//import { useSignup } from "@/hooks/useSignup";
import { useSignup } from "@/hooks/useSignUp";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useLocation } from "react-router-dom";
import is from "zod/v4/locales/is.cjs";

export default function SignupPage() {
  const location = useLocation();

  // location = { pathname, search, hash, state, key }

  console.log(location.pathname); // e.g. "/doctors/123"

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: location.pathname === "/joinForDoctors" ? "doctor" : "patient",
  });

  const { signup, isPending, isError, error } = useSignup();

  // Parse backend error safely
  let emailError = null;
  let dublicationError = null;
  let passwordLengthError = null;

  if (isError && error?.message) {
    let parsed = null;
    try {
      parsed = JSON.parse(error.message);
    } catch {
      parsed = null;
    }

    console.log(parsed);

    const isDuplicate = parsed?.code === 11000 || parsed?.error?.code === 11000;
    const isPasswordError = parsed?.error?.statusCode === 500;
    console.log(isPasswordError);

    if (isDuplicate) {
      emailError = "This email is already registered. Try logging in instead.";
    } else if (isPasswordError) {
      if (parsed.message.includes("passwordConfirm")) {
        dublicationError = "Passwords are not matching";
      } else if (parsed?.message?.includes("is shorter than the minimum")) {
        passwordLengthError = "Password must be at least 9 characters long.";
      }
    } else {
      emailError = "Something went wrong. Please try again.";
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form); // triggers request
  };

  return (
    <section className="mx-auto mt-12 max-w-lg">
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-bold">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
              />
              {passwordLengthError && (
                <p className="mt-1 text-xs text-red-600">
                  {passwordLengthError}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-900"
              />
              {dublicationError && (
                <p className="mt-1 text-xs text-red-600">{dublicationError}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating Account…" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
