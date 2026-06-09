import axiosInstance from "../../../../utils/axiosInstance.js";

//actualiza las fotos del equipo dado
export const updateFotos = async (idEquipoInstalado, formData) => {
  try {
    const response = await axiosInstance.put(
      `/equipos_instalados/${idEquipoInstalado}/fotos`,
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

