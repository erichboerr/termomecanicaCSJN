const EquipoTextArea = ({ id, onChange }) => (
  <div className="mt-3">
    <label htmlFor={`tareas-${id}`} className="form-label fw-semibold">
      Tareas realizadas:
    </label>
    <textarea
      id={`tareas-${id}`}
      className="form-control"
      rows={4}
      placeholder="Describí las tareas realizadas..."
      onChange={onChange}
    />
  </div>
);
export default EquipoTextArea;
