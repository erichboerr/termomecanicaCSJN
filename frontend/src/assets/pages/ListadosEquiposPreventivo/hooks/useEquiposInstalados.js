import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../utils/axiosInstance.js";

const useEquiposInstalados = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const refrescar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/equiposInstalados`);      

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
            
    } catch (err) {
      console.error("Error al cargar equipos:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    refrescar();
  }, [refrescar]); 

  return { equipos, setEquipos, loading, refrescar };
};

export default useEquiposInstalados;
