function EquipoRow({
  keyName,
  label,
  isInput,
  value,
  onChange,
  options,
  disabled,
  onAdd,
}) {
  return (
    <div className="row mb-3">
      <div className="col-12 col-sm-4">
        <label htmlFor={keyName} className="form-label fw-bold">
          {label}
        </label>
      </div>
      <div className="col-12 col-sm-8 d-flex align-items-center">
        {isInput ? (
          <input
            type="text"
            name={keyName}
            id={keyName}
            className="form-control"
            value={value}
            onChange={onChange}
          />
        ) : (
          <select
            name={keyName}
            id={keyName}
            className="form-select flex-grow-1 me-2"
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Seleccionar</option>
            {options?.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.value}
              </option>
            ))}
          </select>
        )}
        {!isInput && keyName !== "alimentacion" && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm flex-shrink-0"
            onClick={onAdd}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default EquipoRow;
