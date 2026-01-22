import { useState } from "react";
import getEstadoClass from "../../../common/helpers/getEstadoClass";
import {
  getMarca,
  getModelo,
} from "../../../common/helpers/getMarcaModelo";
import getTecnicoAsignadoActivo from "../helpers/getTecnicoAsignadoActivo";

const FilaAsignarTecnico = ({ equipo, tecnicos, onAsignar }) => {
  const [tecnicoId, setTecnicoId] = useState("");

  const marca = getMarca(equipo);
  const modelo = getModelo(equipo);
  const estado = equipo?.estado?.estado || "Sin estado";
  const serie = equipo?.serie || "Sin serie";

  const tecnicoAsignado = getTecnicoAsignadoActivo(equipo);

  const handleAsignar = () => {
    if (tecnicoId) {
      onAsignar(equipo.idEquipoInstalado, tecnicoId);
      setTecnicoId("");
    }
  };

  return (
    <tr>
      <td className="text-center">{equipo.oficina}</td>
      <td className="text-center">{marca}</td>
      <td className="text-center">{modelo}</td>
      <td className="text-center">{serie}</td>
      <td>{equipo.observaciones || "-"}</td>
      <td className="text-center">
        <span className={`badge ${getEstadoClass(estado)}`}>{estado}</span>
      </td>
      <td>
        <select
          className="form-select form-select-sm"
          value={tecnicoId}
          onChange={(e) => setTecnicoId(e.target.value)}
        >
          <option value="">Seleccionar técnico</option>
          {tecnicos.map((t) => (
            <option key={t.idUsuario} value={t.idUsuario}>
              {t.usuario}
            </option>
          ))}
        </select>
      </td>
      {/* Column for the "Asignar" button */}
      <td className="text-center">
        <button className="btn btn-sm btn-success" onClick={handleAsignar}>
          Asignar
        </button>
      </td>
      {/* New column for the assigned technician's name */}
      <td className="text-center">
        {tecnicoAsignado ? (
          <span className="fw-bold text-success">{tecnicoAsignado}</span>
        ) : (
          <span className="text-danger fw-bold">Sin asignar</span>
        )}
      </td>
    </tr>
  );
};

export default FilaAsignarTecnico;
