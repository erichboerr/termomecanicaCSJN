import { useLocation } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect } from "react";
import useEquiposInstalados from "./hooks/useEquiposInstalados";
import { marcarUrgente, pedirReparacion } from "./helpers/accionesEquipo";
import FilaEquipo from "./components/FilaEquipo";
import ListadoModal from "./components/ListadoModal";
import ModalEquipoCard from "../../common/modals/ModalEquipoCard";
import ModalMotivo from "../../common/modals/ModalMotivo";
import ToastFeedback from "../../common/components/ToastFeedback";
import ModalQR from "../../common/modals/ModalQR";
import "../../common/css/ListadoEquipo.css";
import "../../common/css/estadoVisual.css";
import { exportarEquiposAExcel } from "../../common/helpers/exportarExcel";

function ListadoEquipo() {
  const { equipos, estados, loading, refrescar } = useEquiposInstalados();
  const [filtroEstado, setFiltroEstado] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const rolId = parseInt(sessionStorage.getItem("rolId"), 10) || 0;
  const [showCardModal, setShowCardModal] = useState(false);
  const [equipoParaVer, setEquipoParaVer] = useState(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [showListadoModal, setShowListadoModal] = useState(false);
  const [equipoParaQR, setEquipoParaQR] = useState(null);
  const location = useLocation();
  const [filtroOficina, setFiltroOficina] = useState("");
  const [filtroLocacion, setFiltroLocacion] = useState("");
  const [filtroTipoEquipo, setFiltroTipoEquipo] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idDesdeQR = params.get("id");

    if (!idDesdeQR || equipos.length === 0) return;

    const idNum = Number(idDesdeQR);
    if (isNaN(idNum)) return;

    const equipo = equipos.find((e) => e.idEquipoInstalado === idNum);
    if (equipo) {
      console.log("✅ Equipo encontrado desde QR:", equipo);
      setEquipoParaVer(equipo);
      setShowCardModal(true);
    } else {
      console.warn("⚠️ ID no encontrado en equipos:", idNum);
    }
  }, [location.search, equipos]);

  const handleListado = (equipo) => {
    setEquipoSeleccionado(equipo);
    setShowListadoModal(true);
  };

  const handleVerQR = (equipo) => {
    setEquipoParaQR(equipo);
    setShowQRModal(true);
  };

  const handleVerDetalle = (equipo) => {
    setEquipoParaVer(equipo);
    setShowCardModal(true);
  };

  const handlePedirReparacion = (equipo) => {
    setEquipoSeleccionado(equipo);
    setShowModal(true);
  };

  const handleUrgente = async (equipo) => {
    await marcarUrgente({ equipo, refrescar });
  };

  const handleConfirmMotivo = useCallback(
    async (motivo) => {
      await pedirReparacion({
        equipo: equipoSeleccionado,
        motivo,
        rolId,
        refrescar,
      });

      setShowModal(false);
      setToast({
        visible: true,
        message: "Pedido de mantenimiento registrada correctamente.",
        type: "success",
      });
    },
    [equipoSeleccionado, rolId, refrescar]
  );

  const equiposFiltrados = useMemo(() => {
    return equipos.filter((e) => {
      const estadoNombre = e.estado?.estado?.toLowerCase() || "";
      const oficinaNombre = e.oficina?.toLowerCase() || "";
      const locacionNombre = e.locacion?.locacion?.toLowerCase() || "";
      const tipoEquipoNombre =
        e.equipo?.tipoEquipo?.tipoEquipo?.toLowerCase() || "";
      const marcaNombre = e.equipo?.marca?.marca?.toLowerCase() || "";

      const coincideEstado =
        !filtroEstado ||
        estadoNombre === filtroEstado.toLowerCase() ||
        (filtroEstado.toLowerCase() === "urgente" && e.estado?.idEstado === 3);

      const coincideOficina =
        !filtroOficina || oficinaNombre.includes(filtroOficina.toLowerCase());

      const coincideLocacion =
        !filtroLocacion || locacionNombre === filtroLocacion.toLowerCase();

      const coincideTipoEquipo =
        !filtroTipoEquipo ||
        tipoEquipoNombre === filtroTipoEquipo.toLowerCase();

      const coincideMarca =
        !filtroMarca || marcaNombre === filtroMarca.toLowerCase();

      return (
        coincideEstado &&
        coincideOficina &&
        coincideLocacion &&
        coincideTipoEquipo &&
        coincideMarca
      );
    });
  }, [
    equipos,
    filtroEstado,
    filtroOficina,
    filtroLocacion,
    filtroTipoEquipo,
    filtroMarca,
  ]);

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
          <i className="bi bi-pc-display-horizontal me-2"></i>Listado de Equipos
          Instalados
        </h2>

        <div className="row justify-content-between mb-3">
          <div className="row g-2 mb-3">
            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={filtroLocacion}
                onChange={(e) => setFiltroLocacion(e.target.value)}
              >
                <option value="">Todas las locaciones</option>
                {[...new Set(equipos.map((e) => e.locacion?.locacion))]
                  .filter(Boolean)
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filtrar por oficina..."
                value={filtroOficina}
                onChange={(e) => setFiltroOficina(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={filtroTipoEquipo}
                onChange={(e) => setFiltroTipoEquipo(e.target.value)}
              >
                <option value="">Tipo de Equipos</option>
                {[
                  ...new Set(
                    equipos.map((e) => e.equipo?.tipoEquipo?.tipoEquipo)
                  ),
                ]
                  .filter(Boolean)
                  .map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
              >
                <option value="">Todas las marcas</option>
                {[...new Set(equipos.map((e) => e.equipo?.marca?.marca))]
                  .filter(Boolean)
                  .map((marca) => (
                    <option key={marca} value={marca}>
                      {marca}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <button
                className="btn btn-success btn-sm w-100"
                onClick={() =>
                  exportarEquiposAExcel(equiposFiltrados, {
                    locacion: filtroLocacion,
                    oficina: filtroOficina,
                    tipoEquipo: filtroTipoEquipo,
                    marca: filtroMarca,
                    estado: filtroEstado,
                  })
                }
              >
                <i className="bi bi-file-earmark-excel"></i> Exportar Excel
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered align-middle table-responsive-font">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Locación</th>
                <th className="text-center">Oficina</th>
                <th className="text-center">TipoEquipo</th>
                <th className="text-center">Marca</th>
                <th className="text-center">Modelo</th>
                <th className="text-center">Serie</th>
                <th className="text-center">Observaciones</th>
                <th className="text-center">Estados</th>

                {rolId !== 4 && <th className="text-center">Acciones</th>}
                {rolId !== 4 && <th className="text-center">Preventivo</th>}
                <th className="text-center">Detalles</th>
                <th className="text-center">QR</th>
              </tr>
            </thead>
            <tbody>
              {equiposFiltrados?.length > 0 ? (
                equiposFiltrados.map(
                  (equipo) =>
                    equipo && (
                      <FilaEquipo
                        key={equipo.idEquipoInstalado}
                        equipo={equipo}
                        rolId={rolId}
                        onReparar={handlePedirReparacion}
                        onUrgente={handleUrgente}
                        onVerDetalle={handleVerDetalle}
                        onVerQR={handleVerQR}
                        onPreventivo={handleListado}
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
        <ModalEquipoCard
          show={showCardModal}
          onClose={() => setShowCardModal(false)}
          equipo={equipoParaVer}
          rol={rolId}
          refrescar={refrescar}
        />
        <ModalMotivo
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmMotivo}
        />
        <ModalQR
          show={showQRModal}
          onClose={() => setShowQRModal(false)}
          equipo={equipoParaQR}
        />
        {showListadoModal && equipoSeleccionado && (
          <ListadoModal
            onClose={() => setShowListadoModal(false)}
            equipoSeleccionado={equipoSeleccionado}
          />
        )}
      </div>
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

export default ListadoEquipo;
