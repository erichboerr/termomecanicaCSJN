import axiosInstance from "../../../../utils/axiosInstance.js";


const darDeBajaHelper = async (id, motivo) => {
  try {
    const res = await axiosInstance.put(`/equiposInstalados/${id}/baja`, { motivo });
    return res.data;
  } catch (error) {
    console.error("Error al dar de baja el equipo:", error);
    throw new Error("No se pudo completar la operación de baja.");
  }
};

export default darDeBajaHelper;