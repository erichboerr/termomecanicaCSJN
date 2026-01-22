function LocacionRow({ value, options, onChange, onAdd }) {
  return (
    <div className="row mb-3">
      <div className="col-12 col-md-4">
        <label htmlFor="locacion" className="form-label fw-bold">Locación</label>
      </div>
      <div className="col-12 col-md-8 d-flex align-items-center">
        <select
          name="locacion"
          id="locacion"
          className="form-select flex-grow-1 me-2"
          value={value}
          onChange={onChange}
        >
          <option value="">Seleccionar</option>
          {options?.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.value}</option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm flex-shrink-0"
          onClick={onAdd}
        >
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default LocacionRow;