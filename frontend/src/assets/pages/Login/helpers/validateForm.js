export function getCamposIncompletos(formData) {
  return Object.entries(formData)
    .filter(([, value]) => !value.trim())
    .map(([key]) => key);
}
