
export function validateEquipoInstalado(data) {
  const errores = [];

  if (!data.idEquipo) errores.push("idEquipo es obligatorio");
  if (!data.oficina) errores.push("Oficina es obligatoria");
  if (!data.serie || typeof data.serie !== "string") errores.push("Serie inválida");
  if (!data.idEstado || isNaN(Number(data.idEstado))) errores.push("idEstado inválido");

  // Observaciones opcionales, pero limitamos longitud
  if (data.observaciones && data.observaciones.length > 200) {
    errores.push("Observaciones demasiado largas max 200 caracteres");
  }

  return {
    esValido: errores.length === 0,
    errores,
  };
}