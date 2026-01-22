import { useState, useMemo } from "react";
import useEquiposInstalados from "./hooks/useEquiposInstalados";
import useTecnicos from "./hooks/userTecnicos";
import FilaAsignarTecnico from "./components/FilaAsignarTecnico";
import axios from "axios";
import ToastFeedback from "./components/ToastFeedback";
import "../../common/css/ListadoEquipo.css";
import "../../common/css/estadoVisual.css";

const AsignarTecnico = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const idSupervisor = sessionStorage.getItem("rolId");
  const {
    equipos,
    //loading: loadingEquipos,
    refrescar,
  } = useEquiposInstalados();
  const { tecnicos /*loading: loadingTecnicos */ } = useTecnicos();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const equiposParaAsignar = useMemo(() => {
    return equipos.filter((e) => e.idEstado === 2 || e.idEstado === 3);
  }, [equipos]);
  const handleAsignarTecnico = async (idEquipoInstalado, idTecnico) => {
    try {
      console.log("idEquipoInstalado:", idEquipoInstalado),
        console.log("idTecnico:", idTecnico),
        await axios.put(`${API_URL}/reparaciones/asignar`, {
          idEquipoInstalado,
          idTecnico,
          idSupervisor,
        });

      setToast({
        show: true,
        message: "Técnico asignado correctamente",
        type: "success",
      });

      refrescar(); // Esto debería volver a renderizar la lista
    } catch (error) {
      console.error("Error al asignar técnico", error);
      console.error(
        "Error al asignar técnico",
        error.response?.data || error.message
      );

      setToast({
        show: true,
        message: "Error al asignar técnico",
        type: "error",
      });
    }
  };

  return (
    <>
      {toast.show && (
        <ToastFeedback
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="listado-wrapper container-fluid mt-4">
        <h2 className="text-center fw-bold mb-4">
          <i className="bi bi-person-workspace me-2"></i>Asignar técnico
        </h2>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered align-middle table-responsive-font">
            <thead className="table-dark">
              <tr>
                <th>Oficina</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Observaciones</th>
                <th className="col-acciones">Estado</th>
                <th className="col-acciones">Técnico</th>
                <th className="col-acciones">Asignar</th>
                <th className="col-acciones">Tecnico Asignado</th>
              </tr>
            </thead>
            <tbody>
              {equiposParaAsignar.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No hay equipos pendientes de asignación.
                  </td>
                </tr>
              ) : (
                equiposParaAsignar.map((equipo) => (
                  <FilaAsignarTecnico
                    key={equipo.idEquipoInstalado}
                    equipo={equipo}
                    tecnicos={tecnicos}
                    onAsignar={handleAsignarTecnico}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AsignarTecnico;
