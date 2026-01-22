//Encapsula la visualización de cada equipo.
import { getMarca, getModelo } from "../../../common/helpers/getMarcaModelo";

const FilaEquipo = ({ equipo,  onDarDeBaja }) => {
  return (
    <tr>
      <td>{equipo.oficina || "N/A"}</td>
      <td>{getMarca(equipo)}</td>
      <td>{getModelo(equipo)}</td>
      <td>{equipo.serie || "N/A"}</td>
      <td>{equipo.observaciones || "-"}</td>

      <td className="col-acciones">
        <button
          className="btn btn-sm btn-danger btn-baja"
          onClick={() => onDarDeBaja(equipo)}
        >
          <i className="bi bi-trash"></i>
          <span className="texto-baja ms-1">Dar de baja</span>
        </button>
      </td>
    </tr>
  );
};
export default FilaEquipo;
