export function validateEquipoForm(formData) {
  const camposObligatorios = Object.keys(formData);
  const incompletos = camposObligatorios.filter((key) => !formData[key]);

  if (incompletos.length > 0) {
    return `Faltan completar: ${incompletos.join(", ")}`;
  }

  return null;
}