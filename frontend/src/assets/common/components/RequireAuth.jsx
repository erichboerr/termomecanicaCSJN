import { useAuth } from "../../../context/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to={`/Login?redirect=${location.pathname}`} replace />;
  }

  return children;
}