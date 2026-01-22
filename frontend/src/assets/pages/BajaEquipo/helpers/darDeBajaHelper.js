import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const darDeBajaHelper = async (id, motivo) => {
  try {
    const res = await axios.put(`${API_URL}/equiposInstalados/${id}/baja`, { motivo });
    return res.data;
  } catch (error) {
    console.error("Error al dar de baja el equipo:", error);
    throw new Error("No se pudo completar la operación de baja.");
  }
};

export default darDeBajaHelper;