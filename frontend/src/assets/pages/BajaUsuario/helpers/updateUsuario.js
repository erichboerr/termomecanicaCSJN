import axiosInstance from "../../../../utils/axiosInstance.js";

//actualiza el usuario dado de baja pasa flaghabilitado a false
export const updateUsuario = async (usuarioId, flagHabilitado) => {
  try {
    const response = await axiosInstance.put(
      `/usuarios/${usuarioId}`,
      { flagHabilitado }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.response?.data || error.message);
    throw error;
  }
};