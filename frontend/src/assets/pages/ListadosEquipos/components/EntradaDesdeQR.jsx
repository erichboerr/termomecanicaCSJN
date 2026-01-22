import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EntradaDesdeQR = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate(`/listadoEquipos?id=${id}`);
    }
  }, [id, navigate]);

  return null; // No renderiza nada, solo redirige
};

export default EntradaDesdeQR;