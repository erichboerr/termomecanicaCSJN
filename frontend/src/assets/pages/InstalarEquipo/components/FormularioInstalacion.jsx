function FormularioInstalacion({
  formData,
  selectOptions,
  fileInputRef,
  handleInputChange,
  handleFileUpload,
  handleSubmit,
}) {
  const renderRow = (key, label, isInput = false) => (
    <div className="row mb-3">
      <div className="col-12 col-md-4">
        <label htmlFor={key} className="form-label fw-bold">
          {label}
        </label>
      </div>
      <div className="col-12 col-md-8">
        {isInput ? (
          <input
            type="text"
            name={key}
            id={key}
            className="form-control"
            value={formData[key]}
            onChange={handleInputChange}
          />
        ) : (
          <select
            name={key}
            id={key}
            className="form-select"
            value={formData[key]}
            onChange={handleInputChange}
            disabled={
              (key === "modelo" && !formData.marca) ||
              (key === "capacidad" && !formData.modelo)
            }
          >
            <option value="">Seleccionar</option>
            {key === "modelo"
              ? selectOptions.modelo
                  ?.filter((opt) => opt.idMarca === Number(formData.marca))
                  .map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.value}
                    </option>
                  ))
              : selectOptions[key]?.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.value}
                  </option>
                ))}
          </select>
        )}
      </div>
    </div>
  );

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      {renderRow("marca", "Marca")}
      {renderRow("modelo", "Modelo")}
      {renderRow("capacidad", "Capacidad (F)")}
      {renderRow("serie", "Serie", true)}
      {renderRow("estado", "Estado")}
      {renderRow("oficina", "Oficina", true)}

      {/* Observaciones */}
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="observaciones" className="form-label fw-bold">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            id="observaciones"
            className="form-control"
            maxLength="200"
            rows="3"
            value={formData.observaciones}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      {/* Fotos */}
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="fotos" className="form-label fw-bold">
            Fotos (máx 2)
          </label>
          <input
            type="file"
            id="fotos"
            name="fotos"
            accept="image/*"
            multiple
            className="form-control"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
        </div>
      </div>

      {/* Botón */}
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-success">
          <i className="bi bi-save"></i> Agregar Equipo
        </button>
      </div>
    </form>
  );
}

export default FormularioInstalacion;