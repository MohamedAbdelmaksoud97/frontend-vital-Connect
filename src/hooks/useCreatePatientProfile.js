// hooks/useCreatePatientProfile.js
import { useMutation } from "@tanstack/react-query";
import { createPatientProfile } from "@/services/patient"; // Import the service function

export const useCreatePatientProfile = () => {
  return useMutation({
    mutationFn: (patientData) => createPatientProfile(patientData),

    onSuccess: (data) => {
      console.log("Profile created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating profile:", error);
    },
  });
};
