export const getRedirectPath = (redirectParam) => {
  if (redirectParam) return redirectParam;

  const rawRol = sessionStorage.getItem("rolId");
  const idRol = rawRol && !isNaN(Number(rawRol)) ? Number(rawRol) : null;

  if (idRol >= 1 && idRol <= 3) {
    return "/ListadoEquipos"; // Admin y Supervisores
  } else if (idRol === 4) {
    return "/ReparacionesEquipos"; // Técnico
  } else if (idRol === 6) {
    return "/ListadoEquipoPreventivo"; // Preventivo (corregido)
  } else {
    return "/"; // Fallback seguro para Cliente u otros
  }
};
