import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "@/services/user";
import { toast } from "react-hot-toast";

export function useUpdateMe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData) => updateMe(formData),
    onSuccess: () => {
      toast.success("Profile updated");
      qc.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update profile");
    },
  });
}
