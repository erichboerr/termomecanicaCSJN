import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerCapacidadesPorModelo(idMarca, idModelo) {
  const res = await axios.get(`${API_URL}/equipos/obtenerCapacidadesPorModelo`, {
    params: { idMarca, idModelo },
  });
  return res.data.map((item) => ({ id: item.id, value: item.capacidad }));
}

export async function buscarEquipoPorMarcaModelo(idMarca, idModelo) {
  const res = await axios.get(`${API_URL}/equipos/buscarMarcaModelo`, {
    params: { idMarca, idModelo },
  });
  return res.data;
}

export async function crearEquipoInstalado(data) {
  return await axios.post(`${API_URL}/createEquipoInstalado`, data);  
}