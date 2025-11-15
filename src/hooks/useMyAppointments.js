import { useQuery } from "@tanstack/react-query";
import { fetchMyAppointments } from "@/services/appointments";

/**
 * React Query hook for the user's appointments.
 * Params are part of the queryKey to cache by page/sort/limit.
 */
export function useMyAppointments(params = {}) {
  const { page = 1, limit = 10, sort = "-createdAt" } = params;

  return useQuery({
    queryKey: ["appointments:me", { page, limit, sort }],
    queryFn: () => fetchMyAppointments({ page, limit, sort }),
    keepPreviousData: true,
    staleTime: 60 * 1000, // 1 min
  });
}
