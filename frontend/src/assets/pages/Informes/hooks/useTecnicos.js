// src/hooks/useTecnicos.js
import { useEffect, useState } from 'react';
import axiosInstance from "../../../../utils/axiosInstance.js";

export function useTecnicos() {
  const [tecnicos, setTecnicos] = useState([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchTecnicos = async () => {
    try {
      const { data } = await axiosInstance.get("/usuariosTecnicos");
      setTecnicos(data);
    } catch (err) {
      console.error("Error al obtener técnicos:", err);
      setTecnicos([]);
    } finally {
      setLoading(false);
    }
  };
  fetchTecnicos();
}, []);

  return { tecnicos, loading }
}