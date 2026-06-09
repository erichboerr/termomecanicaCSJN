import axiosInstance from "../../../../utils/axiosInstance.js";

//trae los usuarios habilitados para cargarlos en el select
export const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get(`/usuarios/habilitados`);
    return response.data;
  } catch (error) {
    console.error("Error al traer los usuarios:", error.response?.data || error.message);
    return [];
  }
};
