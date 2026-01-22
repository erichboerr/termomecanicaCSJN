import axios from "axios";
import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;

//actualiza el usuario dado de baja pasa flaghabilitado a false
export const updateUsuario = async (usuarioId, flagHabilitado) => {
  try {
    const response = await axios.put(
      `${API_URL}/usuarios/${usuarioId}`,
      { flagHabilitado }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error.response?.data || error.message);
    throw error;
  }
};