import axios from "axios";
import.meta.env.VITE_API_URL;

const API_URL = import.meta.env.VITE_API_URL;

export const getOficinas = async (oficina) => {
    try {
        const response = await axios.get(`${API_URL}/oficinas/${oficina}`);
        return response.data;
    } catch (error) {
        console.error("Error al traer las oficinas:", error.response?.data || error.message);
        return { ok: false, message: "Oficina no encontrada" };;
    }
};
