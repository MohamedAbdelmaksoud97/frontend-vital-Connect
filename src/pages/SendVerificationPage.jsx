import { useUser } from "@/hooks/useUser";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE;

const VerifyEmailPage = () => {
  // Access refetch from useUser hook to refresh the user data after verification
  const { refetch } = useUser();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Call your backend API to verify the email using the token
      fetch(`${BASE_URL}/users/verify-email?token=${token}`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included if needed
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            // Refetch the user data after email verification
            refetch();

            // Clean up the URL to remove the token (optional)
            window.history.replaceState({}, "", window.location.pathname);

            // Redirect to home or login page
            navigate("/verify-success"); // Or navigate("/login") if you want to go to login
          } else {
            toast.error(data.message || "Email verification failed.");
          }
        })
        .catch((err) => {
          console.error("Error verifying email:", err);
          toast.error("Something went wrong. Please try again.");
        });
    }
  }, [token, refetch, navigate]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold">Verifying your email...</h2>
      <p className="mt-2 text-gray-500">
        Please wait while we confirm your account.
      </p>
    </div>
  );
};

export default VerifyEmailPage;
