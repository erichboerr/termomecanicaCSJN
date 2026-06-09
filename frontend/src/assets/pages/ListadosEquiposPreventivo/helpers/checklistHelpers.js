import axiosInstance from "../../../../utils/axiosInstance.js";

// Cargar ítems acumulativos según frecuencia
export async function getChecklistByFrecuencia(frecuencia) {
  let frecuencias = [];
  if (frecuencia === "mensual") frecuencias = ["mensual"];
  if (frecuencia === "trimestral") frecuencias = ["mensual", "trimestral"];
  if (frecuencia === "semestral") frecuencias = ["mensual", "trimestral", "semestral"];
  if (frecuencia === "anual") frecuencias = ["mensual", "trimestral", "semestral", "anual"];

  const allItems = [];
  for (const f of frecuencias) {
    const res = await axiosInstance.get(`/checklistItems`, { params: { frecuencia: f } });
    allItems.push(...res.data);
  }

  allItems.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return allItems;
}

// Validar duplicados antes de abrir modal
export async function validarPreventivo(idEquipoInstalado, fecha, frecuencia) {
  try {
    const res = await axiosInstance.get(`/checklistItems/validar`, {
      params: { idEquipoInstalado, fecha, frecuencia },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "❌ Preventivo ya cargado");
  }
}
