function FormRow({
  type = "input", 
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  checkboxLabel = "",
  checkboxColor = { true: "green", false: "red" },
}) {
  return (
    <div className="row mb-3">
      <div className="col-12 ">
        <label htmlFor={name} className="form-label fw-bold">
          {label}
        </label>
      </div>

      <div className="col-12">
        {type === "input" && (
          <input
            type="text"
            name={name}
            id={name}
            className="form-control"
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}

        {type === "select" && (
          <select
            name={name}
            id={name}
            className="form-select "
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Seleccionar</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.value || opt.usuario}
              </option>
            ))}
          </select>
        )}

        {type === "checkbox" && (
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id={name}
              name={name}
              checked={value}
              onChange={onChange}
            />
            <label
              className="form-check-label"
              htmlFor={name}
              style={{ color: checkboxColor[value] }}
            >
              {checkboxLabel}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormRow;

