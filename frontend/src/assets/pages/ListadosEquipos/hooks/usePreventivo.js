import { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance.js";

export const usePreventivo = (equipoId, autoFetch = false, periodo) => {
  const [planilla, setPlanilla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!autoFetch || !equipoId || !periodo) return;

    const fetchPreventivo = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/equipos/${equipoId}/preventivo?periodo=${periodo}` 
        );
        setPlanilla(res.data.planilla || []);
      } catch (err) {
        console.error("Error cargando planilla preventiva:", err);
        setError("No hay datos para mostrar");
      } finally {
        setLoading(false);
      }
    };

    fetchPreventivo();
  }, [equipoId, autoFetch, periodo]);

  return { planilla, loading, error };
};

