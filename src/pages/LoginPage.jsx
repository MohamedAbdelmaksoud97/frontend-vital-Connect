import React from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLogin from "../components/auth/AuthLogin";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Add real login logic here
    console.log("Login success");
    navigate("/"); // Navigate home after login
  };

  return (
    <section>
      <AuthCard
        title="Welcome back"
        subtitle="Log in to manage your appointments"
        onBack={() => navigate(-1)} // Go back to previous page
      >
        <AuthLogin
          onSuccess={handleSuccess}
          gotoSignup={() => navigate("/signup")}
        />
      </AuthCard>
    </section>
  );
}
