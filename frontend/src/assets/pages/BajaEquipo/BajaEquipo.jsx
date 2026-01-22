import { useState } from "react";
import useEquiposInstalados from "./hooks/useEquiposInstalados";
import FilaEquipo from "./components/FilaEquipo";
import ToastFeedback from "../../common/components/ToastFeedback";
import ModalBajaEquipo from "./components/ModalBajaEquipo";
import darDeBajaHelper from "./helpers/darDeBajaHelper"; 
import "../../common/css/ListadoEquipo.css";
import "../../common/css/estadoVisual.css";

function BajaEquipo() {
  const { equipos, loading, refrescar } = useEquiposInstalados(); 
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const handleDarDeBaja = (equipo) => {
    setEquipoSeleccionado(equipo);
    setShowModal(true);
  };

  const handleConfirmarBaja = async (motivo) => {
    setShowModal(false);
    if (!equipoSeleccionado) return;

    try {
      await darDeBajaHelper(equipoSeleccionado.idEquipoInstalado, motivo);
      await refrescar(); 
      setToast({
        visible: true,
        message: "Equipo dado de baja correctamente.",
        type: "success",
      });
    } catch (error) {
      console.error("Error al dar de baja el equipo:", error);
      setToast({
        visible: true,
        message: "Error: No se pudo dar de baja el equipo.",
        type: "error",
      });
    } finally {
      setEquipoSeleccionado(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando equipos...</p>
      </div>
    );
  }

  return (
    <>
      <div className="listado-wrapper container-fluid mt-4">
        <h2 className="text-center fw-bold mb-4">
          <i className="bi bi-pc-display-horizontal me-2"></i> Listado de Equipos Instalados
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
                <th className="col-acciones">Dar de baja</th>
              </tr>
            </thead>
            <tbody>
              {equipos?.length > 0 ? (
                equipos.map(
                  (equipo) =>
                    equipo && (
                      <FilaEquipo
                        key={equipo.idEquipoInstalado}
                        equipo={equipo}
                        onDarDeBaja={handleDarDeBaja}
                      />
                    )
                )
              ) : (
                <tr>
                  <td colSpan="7">No hay equipos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalBajaEquipo
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmarBaja}
      />
      {toast.visible && (
        <ToastFeedback
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </>
  );
}

export default BajaEquipo;