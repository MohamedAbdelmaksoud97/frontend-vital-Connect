// hooks/useCreatePatientProfile.js
import { useMutation } from "@tanstack/react-query";
import { createPatientProfile } from "@/services/patient"; // Import the service function
import toast from "react-hot-toast";

export const useCreatePatientProfile = () => {
  return useMutation({
    mutationFn: (patientData) => createPatientProfile(patientData),

    onSuccess: (data) => {
      console.log("Profile created successfully:", data);
      toast.success("Your Patient profile created successfully!");
    },
    onError: (error) => {
      console.error("Error creating profile:", error);
      toast.error("Failed to create patient profile. Please try again.");
    },
  });
};
