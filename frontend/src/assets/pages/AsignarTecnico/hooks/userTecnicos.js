import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance.js";

const useTecnicos = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTecnicos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get(`/usuarios?rol=4`);

      const tecnicosFiltrados = Array.isArray(data)
        ? data.filter((t) => t.usuario && t.idUsuario)
        : [];

      setTecnicos(tecnicosFiltrados);
    } catch (err) {
      console.error("Error al traer técnicos", err);
      setError("No se pudo cargar la lista de técnicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTecnicos();
  }, []);

  return { tecnicos, loading, error, refrescar: fetchTecnicos };
};

export default useTecnicos;
