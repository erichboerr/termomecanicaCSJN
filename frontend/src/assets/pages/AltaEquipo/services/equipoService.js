import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//funcion para traer todas las opciones
export const fetchAllSelects = async () => {
  const res = await axios.get(`${API_URL}/options`);
  const parsed = {};

  for (const key in res.data) {
    parsed[key] = res.data[key].map((opt) => {
      const base = {
        id: opt.id,
        value: opt.value,
      };

      // Solo incluir idMarca si el select es "modelo"
      if (key === "modelo" && opt.idMarca !== undefined) {
        base.idMarca = opt.idMarca;
      }

      return base;
    });
  }

  return parsed;
};


export const addSelectOption = async (key, value) => {
  const res = await axios.post(`${API_URL}/select/${key}`, { value });
  return res.data; // { id, value }
};

export const createEquipo = async (formData) => {
  return await axios.post(`${API_URL}/equipos`, formData);
};

