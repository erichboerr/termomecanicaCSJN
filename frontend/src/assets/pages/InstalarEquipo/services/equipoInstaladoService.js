import axiosInstance from "../../../../utils/axiosInstance.js";

export async function obtenerCapacidadesPorModelo(idMarca, idModelo) {
  const res = await axiosInstance.get(`/equipos/obtenerCapacidadesPorModelo`, {
    params: { idMarca, idModelo },
  });
  return res.data.map((item) => ({ id: item.id, value: item.capacidad }));
}

export async function buscarEquipoPorMarcaModelo(idMarca, idModelo) {
  const res = await axiosInstance.get(`/equipos/buscarMarcaModelo`, {
    params: { idMarca, idModelo },
  });
  return res.data;
}

export async function crearEquipoInstalado(data) {
  return await axiosInstance.post(`/createEquipoInstalado`, data);  
}