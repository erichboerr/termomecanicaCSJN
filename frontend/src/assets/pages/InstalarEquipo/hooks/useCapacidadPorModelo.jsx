import { useState, useEffect } from "react";
import { obtenerCapacidadesPorModelo } from "../services/equipoInstaladoService";

export function useCapacidadesPorModelo(idMarca, idModelo) {
  const [capacidades, setCapacidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!idMarca || !idModelo) return setCapacidades([]);

    setLoading(true);
    obtenerCapacidadesPorModelo(idMarca, idModelo)
      .then((data) => setCapacidades(data))
      .catch((err) => {
        console.error("❌ Error al obtener capacidades:", err.message);
        setCapacidades([]);
      })
      .finally(() => setLoading(false));
  }, [idMarca, idModelo]);

  return { capacidades, loading };
}