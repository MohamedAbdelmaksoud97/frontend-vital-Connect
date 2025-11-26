import React, { useState } from "react";
//import Input from "../ui/Input";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/user";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful. You are now logged in.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Password reset failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ token, newPassword, newPasswordConfirm });
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
      <h2 className="mb-4 text-center text-2xl font-semibold text-[#377b87]">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={newPasswordConfirm}
          onChange={setNewPasswordConfirm}
          placeholder="Confirm password"
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </div>
  );
}
