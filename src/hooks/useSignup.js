import { useMutation } from "@tanstack/react-query";
//import { signupService } from "@/services/auth";
import { signup as signupService } from "@/services/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: signupService,
    onSuccess: (data) => {
      toast.success("Account created successfully!");

      navigate("/account-created");

      // instantly cache user if your API returns user after signup
      if (data?.data?.user) {
        queryClient.setQueryData(["user"], data.data.user);
      }
    },
  });

  return { signup, isPending, isError, error };
}
