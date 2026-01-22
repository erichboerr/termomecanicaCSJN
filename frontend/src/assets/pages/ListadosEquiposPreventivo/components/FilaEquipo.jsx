
import { getMarca, getModelo } from "../../../common/helpers/getMarcaModelo";

const FilaEquipo = ({
  equipo,
  rolId,
  onPreventivo,
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

      {rolId !== 3 && (
        <td className="text-nowrap text-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onPreventivo(equipo)}
          >
            <i className="bi bi-journal-text"></i>{" "}
            <span className="d-none d-sm-inline ms-1">Preventivo</span>
          </button>
        </td>
      )}
    </tr>
  );
};
export default FilaEquipo;
