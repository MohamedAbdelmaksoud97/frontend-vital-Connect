import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Mail } from "lucide-react";

export default function EmailSent() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl bg-white p-10 text-center shadow-xl dark:bg-gray-900">
      <div className="mb-4 flex justify-center">
        <Mail size={60} className="text-[#377b87]" />
      </div>

      <h1 className="mb-2 text-2xl font-semibold text-[#377b87]">
        Check your email
      </h1>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        If the email you entered is registered, you'll receive a link to reset
        your password.
      </p>

      <Button className="w-full" onClick={() => navigate("/login")}>
        Back to Login
      </Button>
    </div>
  );
}
