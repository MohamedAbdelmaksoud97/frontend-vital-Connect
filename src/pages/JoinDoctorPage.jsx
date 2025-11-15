import React from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import DoctorJoin from "../components/auth/DoctorJoin";

export default function JoinDoctorPage() {
  const navigate = useNavigate();

  const handleSuccess = (formData) => {
    // Add real application logic here
    console.log("Doctor application submitted:", formData);
    alert("Application submitted! We will review it and get back to you.");
    navigate("/"); // Navigate home after submission
  };

  return (
    <section>
      <AuthCard
        title="Join as a Doctor"
        subtitle="Get discovered by patients and manage bookings"
        onBack={() => navigate(-1)}
      >
        <DoctorJoin onSuccess={handleSuccess} />
      </AuthCard>
    </section>
  );
}
