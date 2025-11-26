import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
//import { login } from "../../api/auth";
import { login } from "@/services/user";
import { toast } from "react-hot-toast";
//import { navigate } from "gatsby";
import { useNavigate } from "react-router-dom";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("You have logged in ", data);
      navigate("/"); // Navigate to home page after login
      toast.success(`Welcome Back!`);
    },
    onError: (error) => {
      console.error("Error:", error.message);
      toast.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ important
    mutation.mutate({ email, password });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
      />
      <Button type="submit" className="w-full">
        Log in
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        <button
          type="button"
          className="cursor-pointer text-[#377b87] hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </p>

      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        No account?{" "}
        <button
          type="button"
          className="cursor-pointer text-[#377b87] hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
