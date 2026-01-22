import getEstadoClass from "../EquipoCard/helpers/getEstadoClass";
const EquipoInfo = ({ equipo }) => {
  console.log("Equipo recibido:", equipo);

  return (
    <div className="equipo-info">
      {[
        { label: "Marca", value: equipo.equipo?.marca?.marca },
        { label: "Modelo", value: equipo.equipo?.modelo?.modelo },
        { label: "Serie", value: equipo.serie },
        { label: "Oficina", value: equipo.oficina },
        {
          label: "Estado",
          value: equipo.estado?.estado || "Sin estado",
          className: `badge ${getEstadoClass(equipo.estado?.estado)}`,
        },

        { label: "Observaciones", value: equipo.observaciones },
      ].map(({ label, value, className }, i) => (
        <div key={i} className="mb-2">
          <span className="text-muted fw-semibold me-1">{label}:</span>
          <span className={`fw-bold ${className || ""}`}>
            {value || <em className="text-muted">Sin dato</em>}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EquipoInfo;
