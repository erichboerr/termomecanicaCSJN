import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Cargar ítems acumulativos según frecuencia
export async function getChecklistByFrecuencia(frecuencia) {
  let frecuencias = [];
  if (frecuencia === "mensual") frecuencias = ["mensual"];
  if (frecuencia === "trimestral") frecuencias = ["mensual", "trimestral"];
  if (frecuencia === "semestral") frecuencias = ["mensual", "trimestral", "semestral"];
  if (frecuencia === "anual") frecuencias = ["mensual", "trimestral", "semestral", "anual"];

  const allItems = [];
  for (const f of frecuencias) {
    const res = await axios.get(`${API_URL}/checklistItems`, { params: { frecuencia: f } });
    allItems.push(...res.data);
  }

  allItems.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return allItems;
}

// Validar duplicados antes de abrir modal
export async function validarPreventivo(idEquipoInstalado, fecha, frecuencia) {
  try {
    const res = await axios.get(`${API_URL}/checklistItems/validar`, {
      params: { idEquipoInstalado, fecha, frecuencia },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "❌ Preventivo ya cargado");
  }
}
