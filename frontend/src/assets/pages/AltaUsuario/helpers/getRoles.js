import axiosInstance from "../../../../utils/axiosInstance.js";

export const getRoles = async () => {
  try {
    const response = await axiosInstance.get(`/roles`);
    return response.data; // Asumiendo que devuelve un array de objetos { idRol, nombre }
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};
