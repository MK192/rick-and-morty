import { Navigate, Outlet } from "react-router-dom";

//hooks
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
