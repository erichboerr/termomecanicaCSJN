import { getCamposIncompletos } from "../../Login/helpers/validateForm.js";

export function validateAltaUsuario({ user, password, rol }) {
  const campos = getCamposIncompletos({ user, password });
  if (campos.length > 0) {
    return `Faltan completar: ${campos.join(", ")}`;
  }

  if (rol === "0") {
    return "Seleccioná un rol válido.";
  }

  return null;
}