import { useState } from "react";
import FilaReparacionVisual from "./FilaReparacionVisual"; 
import ModalReparacion from "./ModalReparacion";
import ModalFinalizar from "./ModalFinalizar";
import "../../../common/css/ListadoEquipo.css";
import "../../../common/css/estadoVisual.css";

const ReparacionesListar = ({ reparaciones, rolId }) => {
  const [showReparacionModal, setShowReparacionModal] = useState(false);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);
  const [reparacionSeleccionada, setReparacionSeleccionada] = useState(null);

  const handleAbrirReparacion = (reparacion) => {
    setReparacionSeleccionada(reparacion);
    setShowReparacionModal(true);
  };

  const handleAbrirFinalizar = (reparacion) => {
    setReparacionSeleccionada(reparacion);
    setShowFinalizarModal(true);
  };

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped table-hover table-bordered align-middle table-responsive-font">
        <tbody>
          {reparaciones.length > 0 ? (
            reparaciones.map((reparacion) => (
              <FilaReparacionVisual
                key={reparacion.idReparaciones}
                reparacion={reparacion}
                rolId={rolId}
                onAbrirReparacion={() => handleAbrirReparacion(reparacion)}
                onAbrirFinalizar={() => handleAbrirFinalizar(reparacion)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={rolId === 4 ? 7 : 6} className="text-center">
                No hay reparaciones asignadas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Modales */}
      <ModalReparacion
        show={showReparacionModal}
        onClose={() => setShowReparacionModal(false)}
        reparacion={reparacionSeleccionada}
        onSuccess={() => window.location.reload()}
      />
      <ModalFinalizar
        show={showFinalizarModal}
        onClose={() => setShowFinalizarModal(false)}
        reparacion={reparacionSeleccionada}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
};
export default ReparacionesListar;
