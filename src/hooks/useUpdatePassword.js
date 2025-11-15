import { useMutation } from "@tanstack/react-query";
import { updateMyPassword } from "@/services/user";
import { toast } from "react-hot-toast";

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (payload) => updateMyPassword(payload),
    onSuccess: () => {
      toast.success("Password updated");
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update password");
    },
  });
}
