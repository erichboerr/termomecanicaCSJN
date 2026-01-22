export const revalidateAuth = (setAuthState) => {
  // 🔄 Primero: indicar que está cargando
  setAuthState((prev) => ({ ...prev, isLoading: true }));

  const storedRol = sessionStorage.getItem("rolId");
  const storedUser = sessionStorage.getItem("userId");
  const expiresAt = sessionStorage.getItem("expiresAt");

  const isExpired = expiresAt && Date.now() > Number(expiresAt);

  // ✅ Validación completa
  if (storedRol && storedUser && !isExpired) {
    setAuthState({
      isAuthenticated: true,
      rolId: Number(storedRol),
      userId: Number(storedUser),
      isLoading: false,
    });
  } else {
    sessionStorage.clear();
    setAuthState({
      isAuthenticated: false,
      rolId: null,
      userId: null,
      isLoading: false,
    });
  }
};