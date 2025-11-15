// src/hooks/useGetDoctors.js
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../services/doctorApi"; // This just works

// NO CHANGES HERE. This is the beauty of abstracting your fetcher.
export const useGetDoctors = (filters = {}) => {
  return useQuery({
    queryKey: ["doctors", filters],
    queryFn: () => getAllDoctors(filters), // It just calls the new function
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
