import axios from "axios";
import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;

export const updateFotos = async (idEquipoInstalado, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/equipos_instalados/${idEquipoInstalado}/fotos`,
      formData,
      {
        headers: {
          // 👇 Esto es clave para que axios no rompa el boundary
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar fotos:", error.response?.data || error.message);
    throw error;
  }
};

