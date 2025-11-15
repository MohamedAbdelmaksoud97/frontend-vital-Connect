import { useQuery } from "@tanstack/react-query";
import { fetchDoctors } from "@/services/doctors";
import { fetchDoctorById } from "@/services/doctors";

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 2 * 60 * 1000,
  });
}

export function useDoctor(id) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
  });
}
