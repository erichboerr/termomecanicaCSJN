import getEstadoClass from "../../../common/helpers/getEstadoClass";
import { getMarca, getModelo } from "../../../common/helpers/getMarcaModelo";

const FilaEquipo = ({
  equipo,
  rolId,
  onReparar,
  onUrgente,
  onPreventivo,
  onVerDetalle,
  onVerQR,
}) => {
  return (
    <tr>
      <td className="text-center">{equipo.locacion?.locacion || "-"}</td>
      <td className="text-center">{equipo.oficina || "N/A"}</td>
      <td className="text-center">
        {equipo.equipo?.tipoEquipo?.tipoEquipo || "-"}
      </td>
      <td className="text-center">{getMarca(equipo)}</td>
      <td className="text-center">{getModelo(equipo)}</td>
      <td className="text-center">{equipo.serie || "N/A"}</td>
      <td className="text-center">{equipo.observaciones || "-"}</td>
      <td className="text-center">
        <span className={`badge ${getEstadoClass(equipo.estado?.estado)}`}>
          {equipo?.estado?.estado || "Sin estado"}
        </span>
      </td>
      {rolId !== 4 && (
        <td className="text nowrap text-center">
          {equipo.estado?.estado === "OPERATIVO" && (
            <button
              className="btn btn-warning btn-sm"
              onClick={() => onReparar(equipo)}
            >
              <i className="bi bi-tools"></i>{" "}
              <span className="d-none d-sm-inline ms-1">
                Pedir Mantenimiento
              </span>
            </button>
          )}
          {equipo.estado?.estado === "MANTENIMIENTO" && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onUrgente(equipo)}
            >
              <i className="bi bi-exclamation-triangle-fill"></i>{" "}
              <span className="d-none d-sm-inline ms-1">Urgente</span>
            </button>
          )}
        </td>
      )}

      {rolId !== 4 && (
        <td className="text-nowrap text-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onPreventivo && onPreventivo(equipo)}
          >
            <i className="bi bi-journal-text"></i>{" "}
            <span className="d-none d-sm-inline ms-1">Listado</span>
          </button>
        </td>
      )}

      <td className="text-nowrap text-center">
        <button
          className="btn btn-outline-primary btn-sm ver-detalle-btn"
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalle(equipo);
          }}
        >
          <i className="bi bi-search"></i>
          <span className="texto-btn ms-1">Ver detalle</span>
        </button>
      </td>
      <td className="text-nowrap text-center">
        <button
          variant="primary"
          className="btn btn-primary btn-sm"
          onClick={() => onVerQR(equipo)}
        >
          <i className="bi bi-qr-code text-white"></i>
        </button>
      </td>
    </tr>
  );
};
export default FilaEquipo;
