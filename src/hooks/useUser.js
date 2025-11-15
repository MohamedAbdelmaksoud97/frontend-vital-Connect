// hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/user";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}
