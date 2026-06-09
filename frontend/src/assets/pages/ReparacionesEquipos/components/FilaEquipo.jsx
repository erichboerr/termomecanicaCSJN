
import getEstadoClass from "../../../common/helpers/getEstadoClass";
import { getMarca, getModelo } from "../../../common/helpers/getMarcaModelo";

const FilaEquipo = ({ equipo, rolId, onReparar, onUrgente, onVerDetalle }) => {
  return (
    <tr>
      <td>{equipo.oficina || "N/A"}</td>
      <td>{getMarca(equipo)}</td>
      <td>{getModelo(equipo)}</td>
      <td>{equipo.serie || "N/A"}</td>
      <td>{equipo.observaciones || "-"}</td>
      <td>
        <span className={`badge ${getEstadoClass(equipo.estado?.estado)}`}>
          {equipo?.estado?.estado || "Sin estado"}
        </span>
      </td>
      {rolId !== 4 && (
        <td className="col-acciones">
          {equipo.estado?.estado === "Funcionando" && (
            <button
              className="btn btn-warning btn-xs btn-accion"
              onClick={() => onReparar(equipo)}
            >
              <i className="bi bi-tools"></i> <span>Pedir Reparación</span>
            </button>
          )}
          {equipo.estado?.estado === "En Reparación" && (
            <button
              className="btn btn-danger btn-xs btn-accion"
              onClick={() => onUrgente(equipo)}
            >
              <i className="bi bi-exclamation-triangle-fill"></i>{" "}
              <span>Urgente</span>
            </button>
          )}
        </td>
      )}
      <td className="col-acciones">
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
    </tr>
  );
};
export default FilaEquipo;
