import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/?redirect=${location.pathname}${location.search}`} />
  }

  return children;
}
export default ProtectedRoute;