import axiosInstance from "../../../../utils/axiosInstance.js";

export const getOficinas = async (oficina) => {
    try {
        const response = await axiosInstance.get(`/oficinas/${oficina}`);
        return response.data;
    } catch (error) {
        console.error("Error al traer las oficinas:", error.response?.data || error.message);
        return { ok: false, message: "Oficina no encontrada" };;
    }
};
