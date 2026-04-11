import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
