import { useMutation } from "@tanstack/react-query";
//import { createDoctorProfile } from "@/services/doctor";
//import { createDoctorProfile } from "@/services/user";
import { createDoctorProfile } from "@/services/doctors";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateDoctorProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: createProfile,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createDoctorProfile,
    onSuccess: (data) => {
      toast.success("Doctor profile created successfully!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create profile");
    },
  });

  return { createProfile, isPending, isError, error };
}
