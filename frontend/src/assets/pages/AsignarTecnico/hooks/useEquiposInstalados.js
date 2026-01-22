import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const useEquiposInstalados = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);

  const refrescar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/equiposInstalados`);      

      const sorted = res.data.sort((a, b) =>
        (a.oficina?.nombre || "").localeCompare(
          b.oficina?.nombre || "",
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          }
        )
      );

      setEquipos(sorted);

      const uniqueEstados = [
        ...new Set(res.data.map((e) => e.estado?.estado).filter(Boolean)),
      ];

      setEstados(uniqueEstados);
    } catch (err) {
      console.error("Error al cargar equipos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refrescar();
  }, [refrescar]);

  return { equipos, setEquipos, estados, loading, refrescar };
};

export default useEquiposInstalados;