// components/RequireAuth.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

export function RequireAuth() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <Navigate to="/login" replace />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
