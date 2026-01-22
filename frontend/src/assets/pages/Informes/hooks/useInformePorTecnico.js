import { fetchPorTecnico } from "../helpers/reportes";
import { formatearInformeServicios } from "../utils/formatearInformeServicios";

export function useInformePorTecnico() {
  const generarInformeYTexto = async (tecnico, desde, hasta) => {
    if (!tecnico || !desde || !hasta) {
      alert("Todos los campos son requeridos");
      return { data: [], texto: "" };
    }

    try {
      const data = await fetchPorTecnico(tecnico, desde, hasta);
      if (!Array.isArray(data) || data.length === 0) {
        alert("No se encontraron servicios en ese rango");
        return { data: [], texto: "" };
      }

      const texto = formatearInformeServicios(data, desde, hasta);
      return { data, texto };
    } catch (err) {
      console.error("Error al generar informe por técnico:", err);
      alert("Error al generar el informe");
      return { data: [], texto: "" };
    }
  };

  return { generarInformeYTexto };
}