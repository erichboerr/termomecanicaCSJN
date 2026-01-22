import getEstadoClass from "../../../common/helpers/getEstadoClass";

const FilaReparacionVisual = ({ reparacion, rolId, onAbrirReparacion, onAbrirFinalizar }) => {
    const equipo = reparacion.equipoInstalado;
    const equipoInfo = equipo?.equipo;

    return (
        <tr key={reparacion.idReparaciones}>
            <td>{equipo?.oficina || "N/A"}</td>
            <td>{equipoInfo?.marca?.marca || "N/A"}</td>
            <td>{equipoInfo?.modelo?.modelo || "N/A"}</td>
            <td>{equipo?.serie || "N/A"}</td>
            <td>{reparacion.ObservacionPedido || "-"}</td>
            <td>
                <span className={`badge ${getEstadoClass(equipo?.estado?.estado)}`}>
                    {equipo?.estado?.estado || "N/A"}
                </span>
            </td>
            {rolId === 4 && (
                <td className="text-center">
                    <button
                        className="btn btn-sm btn-info me-2 d-inline d-md-none"
                        onClick={onAbrirReparacion}
                        title="Reparación"
                    >
                        <i className="bi bi-tools"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-info me-2 d-none d-md-inline"
                        onClick={onAbrirReparacion}
                    >
                        <i className="bi bi-tools me-1"></i>
                        Reparación
                    </button>
                    <button
                        className="btn btn-sm btn-success me-2 d-inline d-md-none"
                        onClick={onAbrirFinalizar}
                        title="Finalizar"
                    >
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-success d-none d-md-inline"
                        onClick={onAbrirFinalizar}
                    >
                        <i className="bi bi-check-lg me-1"></i>
                        Finalizar
                    </button>
                </td>
            )}
        </tr>
    );
};

export default FilaReparacionVisual;