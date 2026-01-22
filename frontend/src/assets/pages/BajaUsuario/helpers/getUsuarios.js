import axios from "axios";
import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;

//trae los usuarios habilitados para cargarlos en el select
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/habilitados`);
    return response.data;
  } catch (error) {
    console.error("Error al traer los usuarios:", error.response?.data || error.message);
    return [];
  }
};
