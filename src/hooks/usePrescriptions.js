import { useQuery } from "@tanstack/react-query";
import {
  fetchPrescriptions,
  fetchPrescriptionById,
} from "@/services/prescriptions";

export function usePrescriptions(params) {
  return useQuery({
    queryKey: ["prescriptions", params],
    queryFn: () => fetchPrescriptions(params),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });
}

export function usePrescription(id) {
  return useQuery({
    queryKey: ["prescriptions", "one", id],
    queryFn: () => fetchPrescriptionById(id),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}
