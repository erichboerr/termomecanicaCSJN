import { useState, useMemo } from "react";
import useEquiposInstalados from "./hooks/useEquiposInstalados";
import {
  validarPreventivo,
  getChecklistByFrecuencia,
} from "./helpers/checklistHelpers";
import { getPreventivoRevision } from "./helpers/preventivoCalendar";
import PreventivoModal from "./components/PreventivoModal";
import FilaEquipo from "./components/FilaEquipo";
import ToastFeedback from "../../common/components/ToastFeedback";
import "../../common/css/ListadoEquipo.css";
import "../../common/css/estadoVisual.css";

function ListadoEquipoPreventivo() {
  const { equipos, loading } = useEquiposInstalados();
  const rolId = parseInt(sessionStorage.getItem("rolId"), 10) || 0;
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [filtroOficina, setFiltroOficina] = useState("");
  const [filtroLocacion, setFiltroLocacion] = useState("");
  const [filtroTipoEquipo, setFiltroTipoEquipo] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePreventivo = async (equipo) => {
    try {
      // 📅 Fecha actual en formato YYYY-MM-DD
      const fechaSeleccionada = new Date().toISOString().slice(0, 10);
      //const fechaSeleccionada = "2026-04-15";

      // ⚙️ Determinar frecuencia y año preventivo según el mes
      const { tipo, year } = getPreventivoRevision(new Date(fechaSeleccionada));

      // Validar duplicados
      await validarPreventivo(
        equipo.oficina,
        fechaSeleccionada,
        tipo,
        equipo.serie
      );

      // Checklist según frecuencia calculada
      const checklistItems = await getChecklistByFrecuencia(tipo);

      setEquipoSeleccionado({
        ...equipo,
        equipoId: equipo.idEquipoInstalado,
        checklistItems,
        yearPreventivo: year,
        frecuencia: tipo,
        serie: equipo.serie,
      });

      setModalVisible(true);
    } catch (error) {
      setToast({
        visible: true,
        message:
          error.message || "❌ Ya existe un preventivo cargado para este mes",
        type: "error",
      });
    }
  };

  const equiposFiltrados = useMemo(() => {
    return equipos.filter((e) => {
      const oficinaNombre = e.oficina?.toLowerCase() || "";
      const locacionNombre = e.locacion?.locacion?.toLowerCase() || "";
      const tipoEquipoNombre =
        e.equipo?.tipoEquipo?.tipoEquipo?.toLowerCase() || "";
      const marcaNombre = e.equipo?.marca?.marca?.toLowerCase() || "";

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
        coincideOficina &&
        coincideLocacion &&
        coincideTipoEquipo &&
        coincideMarca
      );
    });
  }, [equipos, filtroOficina, filtroLocacion, filtroTipoEquipo, filtroMarca]);

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
          para Mantenimiento Preventivo
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
                <th className="text-center">Preventivo</th>
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
                        onPreventivo={handlePreventivo}
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
      {modalVisible && (
        <>
          <PreventivoModal
            equipo={equipoSeleccionado}
            onClose={() => setModalVisible(false)}
            setToast={setToast}
          />
        </>
      )}

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

export default ListadoEquipoPreventivo;
