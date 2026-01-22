// helpers/estadoReparacion.js
export const formatearEstadoReparacion = (estado) => {
  const estadoNormalizado = String(estado).trim();
  return estadoNormalizado === "1" || estadoNormalizado === "true"
    ? "(Equipo Reparado)"
    : "(Pendiente de reparación)";
};