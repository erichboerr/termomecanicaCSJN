import { useState, useEffect } from "react";
import axios from "axios";

export const usePreventivo = (equipoId, autoFetch = false, periodo) => {
  const [planilla, setPlanilla] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!autoFetch || !equipoId || !periodo) return;

    const fetchPreventivo = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_URL}/equipos/${equipoId}/preventivo?periodo=${periodo}` 
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

