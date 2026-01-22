import axios from "axios";
import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data; // Asumiendo que devuelve un array de objetos { idRol, nombre }
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};
