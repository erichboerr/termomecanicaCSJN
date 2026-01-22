import { useEffect, useState } from "react";
import { getUsuarios } from "../helpers/getUsuarios";

export default function useUsuariosHabilitados() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      const filtrados = Array.isArray(data)
        ? data.filter((u) => u.usuario && u.idUsuario)
        : [];
      setUsuarios(filtrados);
    } catch (err) {
      setError("No se pudo cargar la lista de usuarios"+( err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, error, refrescar: fetchUsuarios };
}