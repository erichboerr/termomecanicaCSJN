const SelectorTecnico = ({ tecnicos, tecnicoSeleccionado, setTecnicoSeleccionado }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Filtrar por técnico:</label>
      <select
        className="form-select "
        value={tecnicoSeleccionado || ""}
        onChange={(e) => setTecnicoSeleccionado(e.target.value)}
      >
        <option value="">Seleccionar Tecnico</option>
        {tecnicos.map((t) => (
          <option key={t.idUsuario} value={t.idUsuario}>
            {t.usuario}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorTecnico;