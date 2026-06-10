import { useAuth } from "../../../context/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/Login?redirect=${redirect}`} replace />;
  }
  return children;
}