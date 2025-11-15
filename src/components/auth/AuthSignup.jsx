import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function AuthSignup({ onSuccess, gotoLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        value={name}
        onChange={setName}
        placeholder="Your name"
      />
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
        placeholder="Create a password"
      />
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <button
          type="button"
          className="text-[#377b87] hover:underline"
          onClick={gotoLogin}
        >
          Log in
        </button>
      </p>
    </form>
  );
}
