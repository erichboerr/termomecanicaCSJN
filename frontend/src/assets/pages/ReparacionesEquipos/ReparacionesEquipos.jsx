import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance.js";
import ReparacionesListar from "./components/ReparecionesListar";
import SelectorTecnico from "./components/SelectorTecnico";
import filtrarReparaciones from "./helpers/filtrarReparaciones";
import "../../common/css/ListadoEquipo.css";
import "../../common/css/estadoVisual.css";

const ReparacionesEquipos = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = parseInt(sessionStorage.getItem("userId"), 10);
  const rolId = parseInt(sessionStorage.getItem("rolId"), 10) || 0;
  const [tecnicos, setTecnicos] = useState([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      setLoading(false);
      return;
    }

    const fetchReparaciones = async () => {
      try {
        const res = await axiosInstance.get(`/reparacionesConDetalles`);
        const reparacionesFiltradas = filtrarReparaciones(
          res.data,
          rolId,
          userId,
          tecnicoSeleccionado
        );
        // Guarda las reparaciones filtradas directamente
        setReparaciones(reparacionesFiltradas);
      } catch (err) {
        console.error("Error al cargar reparaciones:", err);
        setError("Error al cargar reparaciones");        
      } finally {
        setLoading(false);
      }
    };

    fetchReparaciones();
  }, [userId, rolId, tecnicoSeleccionado]); 

  useEffect(() => {
    const fetchTecnicos = async () => {
      try {
        const res = await axiosInstance.get(`/usuariosTecnicos`);
        setTecnicos(res.data);
      } catch (err) {
        console.error("Error al cargar técnicos:", err);
      }
    };

    if (rolId !== 4) {
      fetchTecnicos();
    }
  }, [rolId]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando reparaciones...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }
  return (
    <div className="listado-wrapper container mt-4">
      <h2 className="text-center fw-bold mb-4">
        <i className="bi bi-tools me-2"></i>Mis Reparaciones Asignadas
      </h2>

      {rolId !== 4 && (
        <SelectorTecnico
          tecnicos={tecnicos}
          tecnicoSeleccionado={tecnicoSeleccionado}
          setTecnicoSeleccionado={setTecnicoSeleccionado}
        />
      )}

      {reparaciones.length > 0 ? (
        // Pasa las reparaciones a ReparacionesListar
        <ReparacionesListar reparaciones={reparaciones} rolId={rolId} />
      ) : (
        <div className="text-center mt-5">
          <p>No tienes reparaciones asignadas en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default ReparacionesEquipos;
