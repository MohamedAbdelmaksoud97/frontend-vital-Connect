// hooks/useLogout.js
import { useMutation } from "@tanstack/react-query";
//import { logoutService } from "@/services/auth"; // Importing the logout service
import { logout as logoutService } from "@/services/user"; // Corrected import
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      // Handle actions after successful logout, such as redirecting the user
      console.log("Logged out successfully");
      queryClient.removeQueries(["user"]);
      navigate("/");

      toast.success("Logged out successfully");
    },
    onError: (error) => {
      // Handle errors, such as showing a toast notification
      console.error("Logout error:", error.message);
    },
  });

  return {
    logout,
    isLoading,
    isError,
    error,
  };
};
