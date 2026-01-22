import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { revalidateAuth } from "./helpers/revalidateAuth.js";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    rolId: null,
    userId: null,
    isLoading: true,
  });

  useEffect(() => {
    revalidateAuth(setAuthState);
  }, []);

  const logout = (navigate) => {
    sessionStorage.clear();
    setAuthState({
      isAuthenticated: false,
      rolId: null,
      userId: null,
      isLoading: false,
    });
    if (navigate) navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
}