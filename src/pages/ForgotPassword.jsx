import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/user";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      navigate("/email-sent");
    },
    onError: (error) => {
      toast.error(error.message || "Error sending reset email");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email });
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
      <h2 className="mb-4 text-center text-2xl font-semibold text-[#377b87]">
        Forgot Password
      </h2>

      <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Enter your email and we'll send you a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />

        <Button type="submit" className="curser-pointer w-full">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
